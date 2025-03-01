from pydantic import BaseModel, EmailStr
from typing import Optional

class TokenResponse(BaseModel):
    """Base response schema for authentication tokens.
    Used as a base class for login and signup responses to ensure consistent token format."""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int  # in seconds

# Email verification
class CheckEmailRequest(BaseModel):
    """First step in both login and signup flows.
    Used to check if an email is already registered, determining whether to proceed
    with login or signup flow."""
    email: EmailStr

class CheckEmailResponse(BaseModel):
    """Response for email existence check.
    Informs frontend whether to proceed with login (exists=true) or
    signup (exists=false) flow."""
    exists: bool
    message: str

# OTP request
class RequestOTPRequest(BaseModel):
    """Request OTP using token from credential verification."""
    email: EmailStr

class RequestOTPResponse(BaseModel):
    """Response after OTP is sent.
    Includes expiration time for the OTP and confirmation of delivery."""
    message: str
    expires_in: int # in seconds
    email: EmailStr

# OTP validation
class ValidateOTPRequest(BaseModel):
    """Third step in authentication flow.
    Validates the OTP entered by the user."""
    email: EmailStr
    otp: str

class ValidateOTPResponse(BaseModel):
    """Response after OTP validation.
    If valid=true, provides token for final login/signup step."""
    valid: bool
    message: str
    token: Optional[str] = None  # Token for completing auth

# Auth Completion (login or signup)
class AuthRequest(BaseModel):
    """Final step in authentication flow.
    Verifies token and either logs in or signs up."""
    token: str

class AuthResponse(TokenResponse):
    """Response after authentication completion.
    Provides access/refresh tokens and user ID."""
    user_id: str

# Reset password
class ResetPasswordRequest(BaseModel):
    """Request to reset user's password.
    Requires email and new password."""
    email: EmailStr
    password: str
    completion_token: str  # Token from OTP validation

class ResetPasswordResponse(BaseModel):
    """Response after password reset.
    Confirms that password has been updated successfully."""
    success: bool
    message: str
