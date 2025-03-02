from fastapi import APIRouter, Depends, HTTPException
from app.features.auth.services import AuthService
from app.features.auth.schemas import (
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
from app.features.common.schemas import ServiceResult
from app.config.dependencies import AuthServiceDep, JWTServiceDep
from app.features.auth.services import JWTService

prefix = "/auth"
tags = ["Authentication"]

router = APIRouter(
    prefix=prefix,
    tags=tags
)

@router.post("/check-email", response_model=CheckEmailResponse)
async def check_email_availability(
    request: CheckEmailRequest,
    auth_service: AuthService = Depends(AuthServiceDep)
) -> CheckEmailResponse:
    """Check if email exists and get verification token."""
    result = await auth_service.check_email_availability(request.email)

    return CheckEmailResponse(
        exists=result.success,
        message=result.message
    )

@router.post("/request-otp", response_model=RequestOTPResponse)
async def request_otp(
    request: RequestOTPRequest,
    auth_service: AuthService = Depends(AuthServiceDep)
) -> RequestOTPResponse:
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
async def validate_otp(
    request: ValidateOTPRequest,
    auth_service: AuthService = Depends(AuthServiceDep),
    jwt_service: JWTService = Depends(JWTServiceDep)
) -> ValidateOTPResponse:
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
async def auth(
    request: AuthRequest,
    auth_service: AuthService = Depends(AuthServiceDep)
) -> AuthResponse:
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
async def reset_password(
    request: ResetPasswordRequest,
    auth_service: AuthService = Depends(AuthServiceDep)
) -> ResetPasswordResponse:
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
