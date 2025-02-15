from pydantic import BaseModel, EmailStr, Field
from typing import Literal

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    refresh_token: str

class LoginRequest(BaseModel):
    email: EmailStr
    otp: str

class LoginResponse(Token):
    pass

class VerifyEmailRequest(BaseModel):
    email: EmailStr

class VerifyEmailResponse(BaseModel):
    email: str
    exists: bool
    message: str

class RequestOTPRequest(BaseModel):
    email: EmailStr = Field(..., description="Email address to send OTP to")
    type: Literal['login', 'signup', 'reset-password'] = Field(..., description="Type of OTP request")

    class Config:
        json_schema_extra = {
            "example": {
                "email": "user@example.com",
                "type": "login"
            }
        }

class RequestOTPResponse(BaseModel):
    email: str
    message: str = "OTP sent successfully"

class VerifyOTPRequest(BaseModel):
    email: EmailStr
    otp: str

class VerifyOTPResponse(BaseModel):
    signup_token: str
    expires_in: int  # seconds until expiration

class CompleteSignupRequest(BaseModel):
    signup_token: str
    password: str

class CompleteSignupResponse(Token):
    pass
