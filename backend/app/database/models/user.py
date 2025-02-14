from typing import Optional
from beanie import Document, Indexed
from pydantic import EmailStr

class User(Document):
    email: Indexed(EmailStr, unique=True)  # type: ignore
    hashed_password: str
    is_active: bool = True
    is_superuser: bool = False

    class Settings:
        name = "users"
        
    class Config:
        json_schema_extra = {
            "example": {
                "email": "user@example.com",
                "is_active": True,
                "is_superuser": False,
            }
        } 