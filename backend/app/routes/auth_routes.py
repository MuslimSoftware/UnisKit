from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from app.services.auth_service import AuthService
from app.schemas.auth_schema import (
    LoginRequest,
    RegisterRequest,
    RegisterResponse,
    RequestOTPRequest,
    RequestOTPResponse,
    VerifyOTPRequest,
    VerifyOTPResponse,
    LoginResponse,
)
from app.utils.security.jwt import create_access_token

router = APIRouter()
service = AuthService()

@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest):
    return await service.authenticate_user(request.email, request.otp)

@router.post("/register", response_model=RegisterResponse)
async def register(request: RegisterRequest):
    """Register a new user."""

    try:
        print("Verifying OTP")
        # Verify the OTP
        verify_result = await service.verify_otp(request.email, request.otp)
        print("OTP verified")
        if not verify_result.success:
            raise HTTPException(
                status_code=400,
                detail="Invalid or expired OTP"
            )

        # Register the user
        user = await service.register_user(request.email)

        # Create the access token
        access_token = create_access_token(user.email)

        # Return the access token
        return RegisterResponse(access_token=access_token)
    except HTTPException:
        # Re-raise HTTP exceptions to preserve their status codes and details
        print("HTTP exception")
        raise
    except Exception as e:
        # Log unexpected errors and return a generic error message
        print("Unexpected error")
        print(f"Error during registration: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to complete registration"
        )

@router.post("/request-otp", response_model=RequestOTPResponse)
async def request_otp(request: RequestOTPRequest) -> RequestOTPResponse:
    """Request an OTP for authentication."""
    return await service.request_otp(request.email, request.type)

@router.post("/verify-otp", response_model=VerifyOTPResponse)
async def verify_otp(request: VerifyOTPRequest) -> VerifyOTPResponse:
    """Verify OTP and return access token if valid."""
    return await service.verify_otp(request.email, request.otp)
