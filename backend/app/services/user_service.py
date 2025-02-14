from typing import List, Optional
from fastapi import HTTPException

from app.repositories.user_repository import UserRepository
from app.schemas.user_schema import UserCreate
from app.database.models.user import User

class UserService:
    def __init__(self):
        self.repository = UserRepository()

    async def get_users(self) -> List[User]:
        return await self.repository.find_all()

    async def get_user_by_email(self, email: str) -> Optional[User]:
        user = await self.repository.find_by_email(email)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user

    async def create_user(self, user_data: UserCreate) -> User:
        existing_user = await self.repository.find_by_email(user_data.email)
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        return await self.repository.create(
            email=user_data.email,
            password=user_data.password
        )
