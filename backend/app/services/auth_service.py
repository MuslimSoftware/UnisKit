from fastapi import HTTPException
from typing import Optional
import random
import string
from datetime import datetime, timedelta
import jwt

from app.utils.security.jwt import create_access_token, create_refresh_token
from app.repositories.user_repository import UserRepository
from app.schemas.auth_schema import (
    Token,
    VerifyEmailResponse,
    RequestOTPResponse,
    VerifyOTPResponse,
    CompleteSignupResponse,
)
from app.database.models.user import User
from app.core.settings import settings

class AuthService:
    def __init__(self):
        self.repository = UserRepository()
        # In-memory OTP store - in production, use Redis or similar
        self._otp_store = {}
        self._signup_tokens = {}  # In production, use Redis
        self._otp_expiry = 10  # minutes
        self._signup_token_expiry = 10  # minutes

    def _generate_otp(self, length: int = 6) -> str:
        """Generate a numeric OTP of specified length."""
        return ''.join(random.choices(string.digits, k=length))

    def _generate_signup_token(self, email: str) -> str:
        """Generate a temporary signup token."""
        token = jwt.encode(
            {
                'email': email,
                'exp': datetime.utcnow() + timedelta(minutes=self._signup_token_expiry),
                'type': 'signup'
            },
            settings.jwt_secret,
            algorithm='HS256'
        )
        self._signup_tokens[email] = {
            'token': token,
            'expires_at': datetime.utcnow() + timedelta(minutes=self._signup_token_expiry)
        }
        return token

    def _verify_signup_token(self, token: str) -> str:
        """Verify signup token and return email if valid."""
        try:
            payload = jwt.decode(token, settings.jwt_secret, algorithms=['HS256'])
            email = payload.get('email')
            if not email:
                raise HTTPException(status_code=400, detail="Invalid signup token")
            
            stored = self._signup_tokens.get(email)
            if not stored or stored['token'] != token:
                raise HTTPException(status_code=400, detail="Invalid signup token")
            
            if datetime.utcnow() > stored['expires_at']:
                del self._signup_tokens[email]
                raise HTTPException(status_code=400, detail="Signup token expired")
            
            return email
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=400, detail="Signup token expired")
        except jwt.JWTError:
            raise HTTPException(status_code=400, detail="Invalid signup token")

    def _store_otp(self, email: str, otp: str):
        """Store OTP with expiry time."""
        self._otp_store[email] = {
            'otp': otp,
            'expires_at': datetime.utcnow() + timedelta(minutes=self._otp_expiry)
        }

    def _verify_otp(self, email: str, otp: str) -> bool:
        """Verify if OTP is valid and not expired."""
        stored = self._otp_store.get(email)
        if not stored:
            return False
        
        if datetime.utcnow() > stored['expires_at']:
            del self._otp_store[email]
            return False
        
        is_valid = stored['otp'] == otp
        if is_valid:
            del self._otp_store[email]
        return is_valid

    async def verify_email(self, email: str) -> VerifyEmailResponse:
        """Check if email exists and return appropriate message."""
        user = await self.repository.find_by_email(email)
        exists = user is not None
        message = "Account already exists" if exists else "Email available for signup"
        return VerifyEmailResponse(email=email, exists=exists, message=message)

    async def request_otp(self, email: str, type: str) -> RequestOTPResponse:
        """Request an OTP for authentication."""
        # For login attempts, verify user exists
        if type == 'login' or type == 'reset-password':
            user = await self.repository.find_by_email(email)
            if not user:
                raise HTTPException(
                    status_code=400,
                    detail="No account found with this email"
                )
            
        # For signup attempts, verify user does not exist
        if type == 'signup':
            user = await self.repository.find_by_email(email)
            if user:
                raise HTTPException(
                    status_code=400,
                    detail="Account already exists with this email"
                )
        
        # Generate and store OTP
        otp = self._generate_otp()
        self._store_otp(email, otp)

        # TODO: Send OTP via email service
        # For development, print OTP to console
        print(f"OTP for {email}: {otp}")

        return RequestOTPResponse(email=email)

    async def verify_signup_otp(self, email: str, otp: str) -> VerifyOTPResponse:
        """Verify OTP for signup and return temporary signup token."""
        if not self._verify_otp(email, otp):
            raise HTTPException(
                status_code=400,
                detail="Invalid or expired OTP"
            )
        
        # Generate temporary signup token
        signup_token = self._generate_signup_token(email)
        
        return VerifyOTPResponse(
            signup_token=signup_token,
            expires_in=self._signup_token_expiry * 60  # convert to seconds
        )

    async def complete_signup(self, signup_token: str, password: str) -> CompleteSignupResponse:
        """Complete signup with temporary token and password."""
        email = self._verify_signup_token(signup_token)
        
        # Create the user
        try:
            user = await self.repository.create(email=email, password=password)
            
            # Generate tokens
            access_token = create_access_token(user.email)
            refresh_token = create_refresh_token(user.email)
            
            # Clean up signup token
            if email in self._signup_tokens:
                del self._signup_tokens[email]
            
            return CompleteSignupResponse(
                access_token=access_token,
                refresh_token=refresh_token,
                token_type="bearer"
            )
        except Exception as e:
            print(f"Failed to create user: {str(e)}")
            raise HTTPException(
                status_code=500,
                detail="Failed to create user account"
            )
