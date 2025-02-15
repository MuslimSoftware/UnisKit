from pydantic import BaseModel, EmailStr, Field
from typing import Literal

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class RegisterResponse(BaseModel):
    email: str

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
    access_token: str
    token_type: str = "bearer"

class LoginResponse(Token):
    pass
