from fastapi import APIRouter, HTTPException
from app.services.auth_service import AuthService
from app.schemas.auth_schema import (
    LoginRequest,
    LoginResponse,
    RequestOTPRequest,
    RequestOTPResponse,
    VerifyOTPRequest,
    VerifyOTPResponse,
    VerifyEmailRequest,
    VerifyEmailResponse,
    CompleteSignupRequest,
    CompleteSignupResponse,
)

router = APIRouter()
service = AuthService()

@router.post("/verify-email", response_model=VerifyEmailResponse)
async def verify_email(request: VerifyEmailRequest) -> VerifyEmailResponse:
    """Check if email exists."""
    return await service.verify_email(request.email)

@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest) -> LoginResponse:
    """Login with email and OTP."""
    return await service.authenticate_user(request.email, request.otp)

@router.post("/request-otp", response_model=RequestOTPResponse)
async def request_otp(request: RequestOTPRequest) -> RequestOTPResponse:
    """Request an OTP for authentication."""
    return await service.request_otp(request.email, request.type)

@router.post("/verify-signup-otp", response_model=VerifyOTPResponse)
async def verify_signup_otp(request: VerifyOTPRequest) -> VerifyOTPResponse:
    """Verify OTP for signup and return temporary signup token."""
    return await service.verify_signup_otp(request.email, request.otp)

@router.post("/complete-signup", response_model=CompleteSignupResponse)
async def complete_signup(request: CompleteSignupRequest) -> CompleteSignupResponse:
    """Complete signup with temporary token and password."""
    return await service.complete_signup(request.signup_token, request.password)
