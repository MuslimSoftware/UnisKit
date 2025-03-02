from typing import Annotated

from fastapi import Depends

# Repository imports
from app.features.user.repositories.user_repository import UserRepository

# Service imports
from app.features.user.services.user_service import UserService
from app.features.auth.services.auth_service import AuthService
from app.features.auth.services.jwt_service import JWTService
from app.features.common.services.otp_service import OTPService

# Repositories
def get_user_repository() -> UserRepository:
    return UserRepository()

# Services
def get_user_service(
    user_repository: Annotated[UserRepository, Depends(get_user_repository)]
) -> UserService:
    return UserService(user_repository=user_repository)

def get_jwt_service() -> JWTService:
    return JWTService()

def get_otp_service() -> OTPService:
    return OTPService()

def get_auth_service(
    user_service: UserService = Depends(get_user_service),
    jwt_service: JWTService = Depends(get_jwt_service),
    otp_service: OTPService = Depends(get_otp_service)
) -> AuthService:
    return AuthService(
        user_service=user_service,
        jwt_service=jwt_service,
        otp_service=otp_service
    )

# Service dependencies
AuthServiceDep = Annotated[AuthService, Depends(get_auth_service)]

UserServiceDep = Annotated[UserService, Depends(get_user_service)]
JWTServiceDep = Annotated[JWTService, Depends(get_jwt_service)]
OTPServiceDep = Annotated[OTPService, Depends(get_otp_service)]

# Repository dependencies
UserRepositoryDep = Annotated[UserRepository, Depends(get_user_repository)]
