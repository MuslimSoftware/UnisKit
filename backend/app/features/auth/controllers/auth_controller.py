from fastapi import APIRouter, Depends
from app.features.auth.services import AuthService
from app.features.auth.schemas import (
    CheckEmailRequest,
    CheckEmailResponse,
    RequestOTPRequest,
    RequestOTPResponse,
    ValidateOTPRequest,
    ValidateOTPResponse,
    AuthRequest,
    AuthResponse
)
from app.features.common.schemas import ServiceResult
from app.config.dependencies import AuthServiceDep

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
        success=result.success,
        message=result.message,
        data={"exists": result.data["exists"]}
    )

@router.post("/request-otp", response_model=RequestOTPResponse)
async def request_otp(
    request: RequestOTPRequest,
    auth_service: AuthService = Depends(AuthServiceDep)
) -> RequestOTPResponse:
    """Request OTP using verification token."""
    result: ServiceResult = await auth_service.request_otp(request.email)
    
    return RequestOTPResponse(
        success=result.success,
        message=result.message,
        data={"expires_in": result.data["expires_in"]}
    )

@router.post("/validate-otp", response_model=ValidateOTPResponse)
async def validate_otp(
    request: ValidateOTPRequest,
    auth_service: AuthService = Depends(AuthServiceDep)
) -> ValidateOTPResponse:
    """Validate OTP and get completion token."""
    result = await auth_service.validate_otp(
        request.email,
        request.otp
    )
    
    return ValidateOTPResponse(
        success=result.success,
        message=result.message,
        data={"token": result.data["token"]}
    )

@router.post("/auth", response_model=AuthResponse)
async def auth(
    request: AuthRequest,
    auth_service: AuthService = Depends(AuthServiceDep)
) -> AuthResponse:
    """Verify token and either login or signup"""
    # Use auth_service to handle the entire authentication flow
    result: ServiceResult = await auth_service.authenticate_with_token(request.token)
    
    return AuthResponse(
        success=result.success,
        message=result.message,
        data={
            "access_token": result.data["access_token"] if "access_token" in result.data else None,
            "refresh_token": result.data["refresh_token"] if "refresh_token" in result.data else None,
        }
    )