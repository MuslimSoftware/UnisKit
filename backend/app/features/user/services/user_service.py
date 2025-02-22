
from app.features.user.repositories.user_repository import UserRepository
from app.features.common.services.base_service import BaseService

class UserService(BaseService):
    def __init__(self):
        self.user_repository = UserRepository()
