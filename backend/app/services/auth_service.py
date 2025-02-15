from fastapi import HTTPException
from typing import Optional
import random
import string
from datetime import datetime, timedelta

from app.utils.security.jwt import create_access_token
from app.repositories.user_repository import UserRepository
from app.schemas.auth_schema import Token, RegisterResponse, RequestOTPResponse, VerifyOTPResponse

class AuthService:
    def __init__(self):
        self.repository = UserRepository()
        # In-memory OTP store - in production, use Redis or similar
        self._otp_store = {}
        self._otp_expiry = 10  # minutes

    def _generate_otp(self, length: int = 6) -> str:
        """Generate a numeric OTP of specified length."""
        return ''.join(random.choices(string.digits, k=length))

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

    async def verify_otp(self, email: str, otp: str) -> Optional[VerifyOTPResponse]:
        """Verify OTP and return access token if valid."""
        if not self._verify_otp(email, otp):
            raise HTTPException(
                status_code=400,
                detail="Invalid or expired OTP"
            )

        # OTP is valid, create access token
        access_token = create_access_token(email)
        return VerifyOTPResponse(access_token=access_token)

    async def authenticate_user(self, email: str, password: str) -> Optional[Token]:
        user = await self.repository.find_by_email(email)
        if not user or not await self.repository.verify_password(user, password):
            raise HTTPException(status_code=400, detail="Incorrect email or password")
        
        access_token = create_access_token(user.email)
        return Token(access_token=access_token, token_type="bearer")

    async def register_user(self, email: str, password: str) -> RegisterResponse:
        existing_user = await self.repository.find_by_email(email)
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        user = await self.repository.create(email=email, password=password)
        return RegisterResponse(email=user.email)
