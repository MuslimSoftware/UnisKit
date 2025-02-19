from fastapi import APIRouter, Depends
from typing import List

from app.services.user_service import UserService

prefix = "/users"
tags = ["Users"]

router = APIRouter(
    prefix=prefix,
    tags=tags
)
service = UserService()