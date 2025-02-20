from dataclasses import dataclass
from typing import Optional, Dict
from fastapi import HTTPException

from app.services.jwt_service import JWTService, TokenType
from app.services.otp_service import OTPService, OTPResult
from app.repositories.user_repository import UserRepository
from app.models.user_model import User
from app.config.env import settings
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@dataclass
class AuthResult:
    """Standard result for auth operations."""
    success: bool
    message: str
    data: Optional[Dict] = None

class AuthService:
    def __init__(self):
        self.user_repository = UserRepository()
        self.jwt_service = JWTService()
        self.otp_service = OTPService()

    async def check_email_exists(self, email: str) -> AuthResult:
        """Check if email exists and return verify token."""
        exists = await self.user_repository.find_by_email(email) is not None

        if not exists:
            verify_token = self.jwt_service.create_temporary_token(
                email,
                TokenType.TEMP_VERIFY
            )
        else:
            verify_token = None

        return AuthResult(
            success=True,
            message="User exists" if exists else "User does not exist",
            data={
                "exists": exists,
                "verify_token": verify_token
            }
        )

    async def verify_credentials(
        self,
        email: str,
        password: str,
        verify_token: str
    ) -> AuthResult:
        """Verify user credentials and return OTP token."""
        # Verify the token from previous step
        try:
            self.jwt_service.verify_token(verify_token, TokenType.TEMP_VERIFY)
        except HTTPException:
            return AuthResult(
                success=False,
                message="Invalid verification token"
            )

        user = await self.user_repository.find_by_email(email)
        if not user:
            return AuthResult(
                success=False,
                message="User not found"
            )

        if not pwd_context.verify(password, user.hashed_password):
            return AuthResult(
                success=False,
                message="Invalid password"
            )

        # Create token for OTP request
        otp_token = self.jwt_service.create_temporary_token(
            email,
            TokenType.TEMP_OTP
        )

        return AuthResult(
            success=True,
            message="Credentials verified",
            data={"otp_token": otp_token}
        )

    async def validate_otp(
        self,
        email: str,
        otp: str
    ) -> AuthResult:
        """Validate OTP and return completion token."""

        # Verify the OTP
        result = self.otp_service.verify_otp(email, otp)
        if not result.success:
            return AuthResult(
                success=False,
                message=result.message
            )

        # Create completion token
        completion_token = self.jwt_service.create_temporary_token(
            email,
            TokenType.TEMP_SIGNUP
        )

        return AuthResult(
            success=True,
            message="OTP verified",
            data={"completion_token": completion_token}
        )

    async def login(
        self,
        email: str,
        completion_token: str
    ) -> AuthResult:
        """Complete login and return access/refresh tokens."""
        # Verify completion token
        try:
            self.jwt_service.verify_token(completion_token, TokenType.TEMP_SIGNUP)
        except HTTPException:
            return AuthResult(
                success=False,
                message="Invalid completion token"
            )

        user = await self.user_repository.find_by_email(email)
        if not user:
            return AuthResult(
                success=False,
                message="User not found"
            )

        # Create final tokens
        tokens = self.jwt_service.create_tokens(email)
        tokens["user_id"] = str(user.id)

        return AuthResult(
            success=True,
            message="Login successful",
            data=tokens
        )

    async def signup(
        self,
        email: str,
        password: str,
        completion_token: str
    ) -> AuthResult:
        """Complete signup and return access/refresh tokens."""
        # Verify completion token
        try:
            self.jwt_service.verify_token(completion_token, TokenType.TEMP_SIGNUP)
        except HTTPException:
            return AuthResult(
                success=False,
                message="Invalid completion token"
            )

        # Create user
        user = await self.user_repository.create(email, password)
        if not user:
            return AuthResult(
                success=False,
                message="Failed to create user"
            )

        # Create final tokens
        tokens = self.jwt_service.create_tokens(email)
        tokens["user_id"] = str(user.id)

        return AuthResult(
            success=True,
            message="Signup successful",
            data=tokens
        )
    
    
    
    
    