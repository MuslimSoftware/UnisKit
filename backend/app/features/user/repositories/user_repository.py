from typing import Optional

import pymongo.errors
from app.features.user.models import User
from app.features.common.exceptions import AppException
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserRepository():
    @staticmethod
    async def find_by_email(email: str) -> Optional[User]:
        """Find a user by email."""
        return await User.find_one(User.email == email)
    
    @staticmethod
    async def create(email: str) -> Optional[User]:
        """Create a new user."""
        try:
            user = await User.find_one(User.email == email)
            if user:
                raise AppException(message="User already exists", error_code="USER_ALREADY_EXISTS", status_code=400)
            
            user = User(email=email)
            await user.insert()
            return user
        except pymongo.errors.DuplicateKeyError:
            raise AppException(
                message="User already exists",
                error_code="USER_ALREADY_EXISTS",
                status_code=400
            )
        except pymongo.errors.PyMongoError as e:
            raise AppException(
                message=f"Database error creating user: {str(e)}",
                error_code="DB_USER_CREATE_FAILED",
                status_code=500
            )
    