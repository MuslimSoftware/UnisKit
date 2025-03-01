
from app.features.user.repositories.user_repository import UserRepository
from app.features.common.base.base_service import BaseService
from app.features.common.schemas.common_dtos import ServiceResult
from app.features.user.models.user_model import User

class UserService(BaseService):
    def __init__(self):
        self.user_repository = UserRepository()

    async def does_user_exist(self, email: str) -> ServiceResult:
        user = await self.user_repository.find_by_email(email)
        if not user:
            return ServiceResult(success=False, message="User does not exist")
        
        return ServiceResult(success=True, message="User exists", data={user})
    
    async def create_user(self, email: str) -> ServiceResult:
        user = await self.user_repository.create(email)
        if not user:
            return ServiceResult(success=False, message="Failed to create user")
        
        return ServiceResult(success=True, message="User created successfully", data=user)
    
    async def get_user(self, email: str) -> ServiceResult:
        user = await self.user_repository.find_by_email(email)
        if not user:
            return ServiceResult(success=False, message="User not found")
        
        return ServiceResult(success=True, message="User found successfully", data=user)
