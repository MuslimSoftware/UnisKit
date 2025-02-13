from fastapi import APIRouter, HTTPException, Depends
from typing import List

from app.crud import user as user_crud
from app.models.user import User

router = APIRouter()

@router.get("/", response_model=List[User])
async def read_users():
    users = await User.find_all().to_list()
    return users

@router.get("/{email}", response_model=User)
async def read_user(email: str):
    user = await user_crud.get_user_by_email(email)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user 