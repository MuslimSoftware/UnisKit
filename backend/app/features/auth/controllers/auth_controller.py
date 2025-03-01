from fastapi import APIRouter, HTTPException
from app.features.auth.services.auth_service import AuthService
from app.features.auth.schemas.auth_schemas import (
    CheckEmailRequest,
    CheckEmailResponse,
    RequestOTPRequest,
    RequestOTPResponse,
    ValidateOTPRequest,
    ValidateOTPResponse,
    ResetPasswordRequest,
    ResetPasswordResponse,
    AuthRequest,
    AuthResponse
)
from app.features.common.services.otp_service import OTPService
from app.features.auth.services.jwt_service import JWTService, TokenType
from app.features.user.services.user_service import UserService
from app.features.common.schemas.common_dtos import ServiceResult

prefix = "/auth"
tags = ["Authentication"]

router = APIRouter(
    prefix=prefix,
    tags=tags
)
auth_service = AuthService()
user_service = UserService()
otp_service = OTPService()
jwt_service = JWTService()

@router.post("/check-email", response_model=CheckEmailResponse)
async def check_email_availability(request: CheckEmailRequest) -> CheckEmailResponse:
    """Check if email exists and get verification token."""
    result = await auth_service.check_email_availability(request.email)

    return CheckEmailResponse(
        exists=result.success,
        message=result.message
    )


@router.post("/request-otp", response_model=RequestOTPResponse)
async def request_otp(request: RequestOTPRequest) -> RequestOTPResponse:
    """Request OTP using verification token."""
    result: ServiceResult = await auth_service.request_otp(request.email, request.otp_token)
    if not result.success:
        raise HTTPException(status_code=401, detail=result.message)
    
    return RequestOTPResponse(
        message=result.message,
        expires_in=result.data["expires_in"],
        email=request.email
    )

@router.post("/validate-otp", response_model=ValidateOTPResponse)
async def validate_otp(request: ValidateOTPRequest) -> ValidateOTPResponse:
    """Validate OTP and get completion token."""
    result = await auth_service.validate_otp(
        request.email,
        request.otp
    )

    if not result.success:
        return ValidateOTPResponse(
            valid=result.success,
            message=result.message
        )

    token = jwt_service.create_auth_flow_token(request.email)
    
    return ValidateOTPResponse(
        valid=result.success,
        message="OTP verified successfully",
        token=token
    )
@router.post("/auth", response_model=AuthResponse)
async def auth(request: AuthRequest) -> AuthResponse:
    """Verify token and either login or signup"""
    # Use auth_service to handle the entire authentication flow
    result: ServiceResult = await auth_service.authenticate_with_token(request.token)
    
    if not result.success:
        return AuthResponse(
            valid=result.success,
            message=result.message
        )
    
    return AuthResponse(
        valid=True,
        message=result.message,
        access_token=result.data["access_token"],
        refresh_token=result.data["refresh_token"],
    )

@router.post("/reset-password", response_model=ResetPasswordResponse)
async def reset_password(request: ResetPasswordRequest):
    result = await auth_service.reset_password(
        request.email,
        request.password,
        request.completion_token
    )

    if not result.success:
        raise HTTPException(status_code=401, detail=result.message)
    
    return ResetPasswordResponse(
        success=result.success,
        message=result.message
    )
