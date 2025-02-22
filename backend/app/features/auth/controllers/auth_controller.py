from fastapi import APIRouter, HTTPException
from app.features.auth.services.auth_service import AuthService
from app.features.auth.schemas.auth_schemas import (
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
from app.features.common.services.otp_service import OTPService
from app.features.auth.services.jwt_service import JWTService, TokenType
from app.features.auth.schemas.auth_dtos import AuthResult

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
async def check_email_availability(request: UserExistsRequest) -> UserExistsResponse:
    """Check if email exists and get verification token."""
    result: AuthResult = await auth_service.check_email_availability(request.email)

    return UserExistsResponse(
        exists=result.success,
        message=result.message
    )

@router.post("/verify-credentials", response_model=VerifyCredentialsResponse)
async def verify_credentials(request: VerifyCredentialsRequest) -> VerifyCredentialsResponse:
    """Verify credentials and get OTP token."""
    isValid = await auth_service.verify_credentials(
        request.email,
        request.password
    )
    if not isValid:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    return VerifyCredentialsResponse(
        valid=isValid,
        message="Credentials verified"
    )

@router.post("/request-otp", response_model=RequestOTPResponse)
async def request_otp(request: RequestOTPRequest) -> RequestOTPResponse:
    """Request OTP using verification token."""
    result = await auth_service.request_otp(request.email, request.otp_token)
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
    isValid = await auth_service.validate_otp(
        request.email,
        request.otp
    )

    if not isValid:
        raise HTTPException(status_code=401, detail="Invalid OTP")

    completion_token = jwt_service.create_auth_token(request.email)
    
    return ValidateOTPResponse(
        valid=isValid,
        message="OTP verified successfully",
        completion_token=completion_token
    )

# TODO: De-couple auth service functions
@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest) -> LoginResponse:
    """Complete login and get access/refresh tokens."""
    result = await auth_service.login(
        request.email,
        request.password,
        request.completion_token
    )
    if not result.success:
        raise HTTPException(status_code=401, detail=result.message)
    
    return LoginResponse(
        access_token=result.data["access_token"],
        refresh_token=result.data["refresh_token"],
        token_type=result.data["token_type"],
        expires_in=result.data["expires_in"],
        user_id=result.data["user_id"]
    )

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
    
    return SignupResponse(
        access_token=result.data["access_token"],
        refresh_token=result.data["refresh_token"],
        token_type=result.data["token_type"],
        expires_in=result.data["expires_in"],
        user_id=result.data["user_id"]
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