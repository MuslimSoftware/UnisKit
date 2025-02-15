from beanie import Document, Indexed
from pydantic import EmailStr

class User(Document):
    email: EmailStr = Indexed(EmailStr, unique=True)

    class Settings:
        name = "users"
        
    class Config:
        json_schema_extra = {
            "example": {
                "email": "user@example.com"
            }
        } 