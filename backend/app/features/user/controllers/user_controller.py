from fastapi import APIRouter, HTTPException

from app.features.user.services.user_service import UserService
from app.features.user.schemas.user_schemas import RefreshTokenRequest, RefreshTokenResponse
from app.features.auth.services.jwt_service import JWTService

prefix = "/users"
tags = ["Users"]

router = APIRouter(
    prefix=prefix,
    tags=tags
)
user_service = UserService()
jwt_service = JWTService()

@router.post("/refresh", response_model=RefreshTokenResponse)
async def refresh_token(request: RefreshTokenRequest) -> RefreshTokenResponse:
    """Refresh access token using refresh token."""
    try:
        result = jwt_service.refresh_access_token(request.refresh_token)
        return RefreshTokenResponse(**result)
    except HTTPException as e:
        raise HTTPException(status_code=401, detail="Invalid refresh token")