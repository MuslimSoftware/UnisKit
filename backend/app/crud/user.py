from typing import Optional
from app.models.user import User
from app.core.security import get_password_hash, verify_password

async def get_user_by_email(email: str) -> Optional[User]:
    return await User.find_one(User.email == email)

async def create_user(email: str, password: str) -> User:
    hashed_password = get_password_hash(password)
    user = User(
        email=email,
        hashed_password=hashed_password
    )
    return await user.insert()

async def authenticate_user(email: str, password: str) -> Optional[User]:
    user = await get_user_by_email(email)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user 