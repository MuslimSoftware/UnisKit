

from app.services.jwt_service import JWTService
from app.services.otp_service import OTPService
from app.repositories.user_repository import UserRepository
from app.models.user_model import User
from app.config.env import settings
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class AuthService:
    def __init__(self):
        self.user_repository = UserRepository()
        self.jwt_service = JWTService()
        self.otp_service = OTPService()

    def user_exists(self, email: str) -> bool:
        return self.user_repository.find_by_email(email) is not None
    
    async def verify_credentials(self, email: str, password: str) -> bool:
        user = await self.user_repository.find_by_email(email)
        if not user:
            return False
        
        return pwd_context.verify(password, user.hashed_password)
    
    async def login(self, email: str, otp: str) -> bool:
        user = await self.user_repository.find_by_email(email)
        if not user:
            return False
        
        return self.otp_service.verify_otp(email, otp)
    
    async def signup(self, email: str, password: str) -> bool:
        return self.user_repository.create(email, password)
    
    async def reset_password(self, email: str, password: str) -> bool:
        return self.user_repository.update_password(email, password)
    
    
    
    
    