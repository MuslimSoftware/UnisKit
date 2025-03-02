from fastapi import HTTPException
from app.features.auth.services.jwt_service import JWTService, TokenType
from app.features.common.services.otp_service import OTPService
from passlib.context import CryptContext
from app.features.common.schemas.common_dtos import ServiceResult
from app.features.user.services.user_service import UserService

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class AuthService:
    def __init__(
        self,
        user_service: UserService,
        jwt_service: JWTService,
        otp_service: OTPService
    ):
        self.user_service = user_service
        self.jwt_service = jwt_service
        self.otp_service = otp_service

    async def check_email_availability(self, email: str) -> ServiceResult:
        """Check if user with email exists."""
        exists: bool = await self.user_service.does_user_exist(email)
        return ServiceResult(
            success=exists,
            message="User with this email already exists" if exists else "Email is available for use"
        )
    
    async def request_otp(self, email: str) -> ServiceResult:
        """Request OTP based on the verification token type."""
        result = self.otp_service.request_otp(email)
        return ServiceResult(
            success=result.success,
            message=result.message,
            data={"expires_in": result.expires_in}
        )
    
    async def validate_otp(
        self,
        email: str,
        otp: str
    ) -> ServiceResult:
        """Validate OTP and return completion token."""
        # Verify the OTP
        result = self.otp_service.verify_otp(email, otp)
        if not result.success:
            return ServiceResult(
                success=False,
                message=result.message
            )
        
        return ServiceResult(
            success=result.success,
            message=result.message
        )
    
    async def authenticate_with_token(self, token: str) -> ServiceResult:
        verify_result: ServiceResult = await self.jwt_service.verify_token(token, data={"type": TokenType.AUTH})
        if not verify_result.success:
            return verify_result
        
        email: str = verify_result.data["email"]
        user_exists_result: ServiceResult = await self.user_service.does_user_exist(email)
        
        # Handle authentication based on existence
        if user_exists_result.success:
            message = "User logged in successfully"
            user = await self.user_service.get_user(email)
        else:
            message = "User created successfully"
            user = await self.user_service.create_user(email)
        
        if not user:
            return ServiceResult(
                success=False, 
                message="Failed to access user account"
            )
        
        # Create tokens once
        tokens = self.jwt_service.create_tokens(user.email)
        return ServiceResult(success=True, message=message, data=tokens)
    
    async def reset_password(
        self,
        email: str,
        password: str,
        token: str
    ) -> ServiceResult:
        """Reset password and return success message."""
        try:
            self.jwt_service.verify_token(token, token_type=TokenType.AUTH)
            await self.user_repository.update_password(email, password)
            return ServiceResult(success=True, message="Password reset successful")
        except HTTPException:
            return ServiceResult(success=False, message="Invalid completion token")
    
    
    
    
    