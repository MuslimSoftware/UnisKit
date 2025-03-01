from typing import Optional
from app.features.user.models.user_model import User
from fastapi import HTTPException
from app.features.common.base.base_repository import BaseRepository
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserRepository(BaseRepository):
    @staticmethod
    async def find_by_email(email: str) -> Optional[User]:
        """Find a user by email."""
        return await User.find_one(User.email == email)
    
    @staticmethod
    async def create(email: str) -> Optional[User]:
        """Create a new user."""
        # Check if user already exists
        user = await User.find_one(User.email == email)
        if user:
            raise HTTPException(status_code=400, detail="User already exists")
    
        user = User(email=email)
        await user.insert()

        return user
    