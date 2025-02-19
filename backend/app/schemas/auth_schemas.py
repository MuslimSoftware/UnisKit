from pydantic import BaseModel, EmailStr

class TokenResponse(BaseModel):
    """Base response schema for authentication tokens.
    Used as a base class for login and signup responses to ensure consistent token format."""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int  # in seconds

# Email verification
class UserExistsRequest(BaseModel):
    """First step in both login and signup flows.
    Used to check if an email is already registered, determining whether to proceed
    with login or signup flow."""
    email: EmailStr

class UserExistsResponse(BaseModel):
    """Response for email existence check.
    Informs frontend whether to proceed with login (exists=true) or
    signup (exists=false) flow."""
    exists: bool
    message: str

# Credential verification   
class VerifyCredentialsRequest(BaseModel):
    """First step in login flow for existing users.
    Verifies user's password before proceeding to OTP authentication."""
    email: EmailStr
    password: str

class VerifyCredentialsResponse(BaseModel):
    """Response for credential verification.
    If valid=true, returns a temporary token used for requesting OTP."""
    valid: bool
    token: str
    message: str

# OTP request
class RequestOTPRequest(BaseModel):
    """Second step in authentication flow.
    Requests OTP using token from credential verification."""
    email: EmailStr
    token: str

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
    token: str

# Login completion
class LoginRequest(BaseModel):
    """Final step in login flow.
    Exchanges validated OTP token for permanent access tokens."""
    email: EmailStr
    token: str

class LoginResponse(TokenResponse):
    """Successful login response.
    Provides access/refresh tokens and basic user information."""
    user_id: str
    
# Signup completion
class SignupRequest(BaseModel):
    """Final step in signup flow.
    Creates new user account and returns authentication tokens."""
    email: EmailStr
    token: str

class SignupResponse(TokenResponse):
    """Successful signup response.
    Provides access/refresh tokens and new user's ID."""
    user_id: str

# Reset password
class ResetPasswordRequest(BaseModel):
    """Request to reset user's password.
    Requires email and new password."""
    email: EmailStr
    password: str

class ResetPasswordResponse(BaseModel):
    """Response after password reset.
    Confirms that password has been updated successfully."""
    message: str
