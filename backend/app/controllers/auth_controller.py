from fastapi import APIRouter
from app.services.auth_service import AuthService
from app.services.user_service import UserService
from app.schemas.auth_schemas import (
    UserExistsRequest,
    UserExistsResponse,
    VerifyCredentialsRequest,
    VerifyCredentialsResponse,
    RequestOTPRequest,
    RequestOTPResponse,
    ValidateOTPRequest,
    ValidateOTPResponse,
    LoginRequest,
    LoginResponse,
    SignupRequest,
    SignupResponse, 
    ResetPasswordRequest,
    ResetPasswordResponse,
)
from app.services.otp_service import OTPService

prefix = "/auth"
tags = ["Authentication"]

router = APIRouter(
    prefix=prefix,
    tags=tags
)
auth_service = AuthService()
otp_service = OTPService()

@router.post("/user-exists", response_model=UserExistsResponse)
async def user_exists(request: UserExistsRequest):
    exists = await auth_service.user_exists(request.email)
    return UserExistsResponse(exists=exists, message="User exists" if exists else "User does not exist")

@router.post("/verify-credentials", response_model=VerifyCredentialsResponse)
async def verify_credentials(request: VerifyCredentialsRequest):
    return await auth_service.verify_credentials(request.email, request.password)

@router.post("/request-otp", response_model=RequestOTPResponse)
async def request_otp(request: RequestOTPRequest):
    return await otp_service.request_otp(request.email, request.type)

@router.post("/validate-otp", response_model=ValidateOTPResponse)
async def validate_otp(request: ValidateOTPRequest):
    return await otp_service.verify_otp(request.email, request.otp)

@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest):
    return await auth_service.login(request.email, request.otp)

@router.post("/signup", response_model=SignupResponse)
async def complete_signup(request: SignupRequest):
    return await auth_service.signup(request.email, request.password)

@router.post("/reset-password", response_model=ResetPasswordResponse)
async def reset_password(request: ResetPasswordRequest):
    return await auth_service.reset_password(request.email, request.password)