from typing import Optional
from app.database.models.user import User
from app.utils.security.password import get_password_hash, verify_password

class UserRepository:
    @staticmethod
    async def find_by_email(email: str) -> Optional[User]:
        return await User.find_one({"email": email})
    
    @staticmethod
    async def find_all():
        return await User.find_all().to_list()
    
    @staticmethod
    async def create(email: str, password: str) -> User:
        user = User(email=email, hashed_password=get_password_hash(password))
        await user.save()
        return user
    
    @staticmethod
    async def verify_password(user: User, password: str) -> bool:
        return verify_password(password, user.hashed_password)
