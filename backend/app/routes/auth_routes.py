from fastapi import APIRouter, Depends, Request
from fastapi.security import OAuth2PasswordRequestForm

from app.services.auth_service import AuthService
from app.schemas.auth_schema import (
    Token,
    RegisterResponse,
    RequestOTPRequest,
    RequestOTPResponse,
    VerifyOTPRequest,
    VerifyOTPResponse,
)

router = APIRouter()
service = AuthService()

@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    return await service.authenticate_user(form_data.username, form_data.password)

@router.post("/register", response_model=RegisterResponse)
async def register(email: str, password: str):
    return await service.register_user(email=email, password=password)

@router.post("/request-otp", response_model=RequestOTPResponse)
async def request_otp(request: RequestOTPRequest) -> RequestOTPResponse:
    """Request an OTP for authentication."""
    return await service.request_otp(request.email, request.type)

@router.post("/verify-otp", response_model=VerifyOTPResponse)
async def verify_otp(request: VerifyOTPRequest) -> VerifyOTPResponse:
    """Verify OTP and return access token if valid."""
    return await service.verify_otp(request.email, request.otp)
