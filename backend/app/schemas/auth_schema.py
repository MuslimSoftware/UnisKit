from pydantic import BaseModel, EmailStr

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class RequestOTPRequest(BaseModel):
    email: EmailStr

class RequestOTPResponse(BaseModel):
    email: EmailStr
    message: str = "OTP sent successfully"

class VerifyOTPRequest(BaseModel):
    email: EmailStr
    otp: str

class VerifyOTPResponse(Token):
    pass

class LoginResponse(Token):
    pass

class RegisterResponse(BaseModel):
    email: str
    message: str = "User registered successfully"
