
from app.features.user.repositories import UserRepository
from app.features.common.schemas import ServiceResult

class UserService:
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    async def does_user_exist(self, email: str) -> ServiceResult:
        exists = await self.user_repository.find_by_email(email) is not None
        return ServiceResult(success=exists, message="User exists" if exists else "User does not exist")
    
    async def create_user(self, email: str) -> ServiceResult:
        user = await self.user_repository.create(email)
        return ServiceResult(
            success=user is not None,
            message="User created successfully" if user else "Failed to create user",
            data=user.model_dump() if user else None
        )
    
    async def get_user(self, email: str) -> ServiceResult:
        user = await self.user_repository.find_by_email(email)
        return ServiceResult(
            success=user is not None,
            message="User found successfully" if user else "User not found",
            data=user.model_dump() if user else None
        )
