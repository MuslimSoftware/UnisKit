from typing import Optional
from app.models.user_model import User
from app.utils.security.password import get_password_hash, verify_password
from fastapi import HTTPException
class UserRepository:
    @staticmethod
    async def find_by_email(email: str) -> Optional[User]:
        """Find a user by email."""
        return await User.find_one(User.email == email)
    
    @staticmethod
    async def find_all():
        return await User.find_all().to_list()
    
    @staticmethod
    async def create(email: str, password: str) -> User:
        """Create a new user."""
        # Check if user already exists
        user = await User.find_one(User.email == email)
        if user:
            raise HTTPException(status_code=400, detail="User already exists")
        
        # Check if password is valid
        if not password:
            raise HTTPException(status_code=400, detail="Password is required")
        
        # Check if email is valid
        if not email:
            raise HTTPException(status_code=400, detail="Email is required")
        
        hashed_password = get_password_hash(password)
        user = User(email=email, hashed_password=hashed_password)
        return await user.insert()
    
    @staticmethod
    async def update_password(email: str, password: str) -> User:
        """Update a user's password."""
        hashed_password = get_password_hash(password)
        return await User.find_one_and_update(User.email == email, {"$set": {"hashed_password": hashed_password}})
    
    
