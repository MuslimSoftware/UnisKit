from fastapi import APIRouter, Depends
from typing import List

from app.services.user_service import UserService
from app.schemas.user_schema import UserResponse

router = APIRouter()
service = UserService()

@router.get("/", response_model=List[UserResponse])
async def get_users():
    return await service.get_users()

@router.get("/{email}", response_model=UserResponse)
async def get_user(email: str):
    return await service.get_user_by_email(email)
