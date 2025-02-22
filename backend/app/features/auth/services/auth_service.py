from fastapi import HTTPException

from app.features.auth.services.jwt_service import JWTService, TokenType
from app.features.common.services.otp_service import OTPService
from app.features.user.repositories.user_repository import UserRepository
from passlib.context import CryptContext
from app.features.auth.schemas.auth_dtos import AuthResult
from app.features.common.services.base_service import BaseService

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class AuthService(BaseService):
    def __init__(self):
        self.user_repository = UserRepository()
        self.jwt_service = JWTService()
        self.otp_service = OTPService()

    async def check_email_availability(self, email: str) -> AuthResult:
        """Check if user with email exists."""
        result = await self.user_repository.find_by_email(email) is not None
        return AuthResult(
            success=result,
            message="Email exists" if result else "Email does not exist"
        )

    async def verify_credentials(
        self,
        email: str,
        password: str
    ) -> bool:
        """Verify user credentials and return OTP token."""
        user = await self.user_repository.find_by_email(email)
        if not user:
            return False

        if not pwd_context.verify(password, user.hashed_password):
            return False

        return True

    async def request_otp(self, email: str, token: str) -> AuthResult:
        """Request OTP based on the verification token type."""
        try:
            self.jwt_service.verify_token(token, token_type=TokenType.AUTH)
            result = self.otp_service.request_otp(email)
            return AuthResult(
                success=result.success,
                message=result.message,
                data={"expires_in": result.expires_in}
            )
        except HTTPException:
            return AuthResult(
                success=False,
                message="Invalid verification token"
            )

    async def validate_otp(
        self,
        email: str,
        otp: str
    ) -> bool:
        """Validate OTP and return completion token."""
        # Verify the OTP
        isValid = self.otp_service.verify_otp(email, otp)
        if not isValid:
            return False

        return True

    async def login(
        self,
        email: str,
        password: str,
        token: str
    ) -> AuthResult:
        """Complete login and return access/refresh tokens."""
        try:
            self.jwt_service.verify_token(token, token_type=TokenType.AUTH)

            # Verify password
            user = await self.user_repository.find_by_email(email)
            if not user or not pwd_context.verify(password, user.hashed_password):
                return AuthResult(
                    success=False,
                    message="Invalid credentials"
                )

            # Create final tokens
            tokens = self.jwt_service.create_tokens(email)

            return AuthResult(
                success=True,
                message="Login successful",
                data=tokens
            )
        except HTTPException:
            return AuthResult(
                success=False,
                message="Invalid completion token"
            )

    async def signup(
        self,
        email: str,
        password: str,
        token: str
    ) -> AuthResult:
        """Complete signup and return access/refresh tokens."""
        try:
            self.jwt_service.verify_token(token, token_type=TokenType.AUTH)

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
        except HTTPException:
            return AuthResult(
                success=False,
                message="Invalid completion token"
            )
        
    async def reset_password(
        self,
        email: str,
        password: str,
        token: str
    ) -> AuthResult:
        """Reset password and return success message."""
        try:
            self.jwt_service.verify_token(token, token_type=TokenType.AUTH)
            await self.user_repository.update_password(email, password)
            return AuthResult(success=True, message="Password reset successful")
        except HTTPException:
            return AuthResult(success=False, message="Invalid completion token")
    
    
    
    
    