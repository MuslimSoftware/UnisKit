from fastapi import APIRouter, HTTPException
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
from app.services.jwt_service import JWTService, TokenType

prefix = "/auth"
tags = ["Authentication"]

router = APIRouter(
    prefix=prefix,
    tags=tags
)
auth_service = AuthService()
otp_service = OTPService()
jwt_service = JWTService()

@router.post("/check-email", response_model=UserExistsResponse)
async def check_email(request: UserExistsRequest) -> UserExistsResponse:
    """Check if email exists and get verification token."""
    result = await auth_service.check_email_exists(request.email)
    return UserExistsResponse(
        exists=result.data["exists"],
        message=result.message,
        verify_token=result.data["verify_token"]
    )

@router.post("/verify-credentials", response_model=VerifyCredentialsResponse)
async def verify_credentials(request: VerifyCredentialsRequest) -> VerifyCredentialsResponse:
    """Verify credentials and get OTP token."""
    result = await auth_service.verify_credentials(
        request.email,
        request.password
    )
    if not result.success:
        raise HTTPException(status_code=401, detail=result.message)
    
    return VerifyCredentialsResponse(
        valid=result.success,
        message=result.message,
        otp_token=result.data["otp_token"]
    )

@router.post("/request-otp", response_model=RequestOTPResponse)
async def request_otp(request: RequestOTPRequest) -> RequestOTPResponse:
    """Request OTP using OTP token."""
    # Verify OTP token before proceeding
    try:
        jwt_service.verify_token(request.otp_token, TokenType.TEMP_OTP)
    except HTTPException as e:
        raise HTTPException(status_code=401, detail="Invalid OTP token")
    
    result = auth_service.otp_service.request_otp(request.email)
    return RequestOTPResponse(
        message=result.message,
        expires_in=result.expires_in,
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
        raise HTTPException(status_code=401, detail=result.message)
    
    return ValidateOTPResponse(
        valid=result.success,
        message=result.message,
        completion_token=result.data["completion_token"]
    )

@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest) -> LoginResponse:
    """Complete login and get access/refresh tokens."""
    result = await auth_service.login(
        request.email,
        request.completion_token
    )
    if not result.success:
        raise HTTPException(status_code=401, detail=result.message)
    
    return LoginResponse(**result.data)

@router.post("/signup", response_model=SignupResponse)
async def signup(request: SignupRequest) -> SignupResponse:
    """Signup and get access/refresh tokens."""
    result = await auth_service.signup(
        request.email,
        request.password,
        request.completion_token
    )
    if not result.success:
        raise HTTPException(status_code=401, detail=result.message)
    
    return SignupResponse(**result.data)

@router.post("/reset-password", response_model=ResetPasswordResponse)
async def reset_password(request: ResetPasswordRequest):
    return await auth_service.reset_password(request.email, request.password)