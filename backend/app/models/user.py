from datetime import datetime
from typing import Optional
from beanie import Document, Indexed
from pydantic import EmailStr

class User(Document):
    email: str = Indexed(EmailStr, unique=True)
    hashed_password: str
    is_active: bool = True
    created_at: datetime = datetime.utcnow()
    
    class Settings:
        name = "users" 