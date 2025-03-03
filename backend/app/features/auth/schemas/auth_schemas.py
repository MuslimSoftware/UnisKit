from pydantic import BaseModel, EmailStr
from typing import Optional

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
    success: bool
    message: str
    expires_in: int # in seconds

# OTP validation
class ValidateOTPRequest(BaseModel):
    """Third step in authentication flow.
    Validates the OTP entered by the user."""
    email: EmailStr
    otp: str

class ValidateOTPResponse(BaseModel):
    """Response after OTP validation.
    If valid=true, provides token for final login/signup step."""
    success: bool
    message: str
    token: Optional[str] = None  # Token for completing auth

# Auth Completion (login or signup)
class AuthRequest(BaseModel):
    """Final step in authentication flow.
    Verifies token and either logs in or signs up."""
    token: str

class AuthResponse(BaseModel):
    """Response after authentication completion.
    Provides access/refresh tokens and user ID."""
    success: bool
    message: str
    access_token: Optional[str] = None
    refresh_token: Optional[str] = None
