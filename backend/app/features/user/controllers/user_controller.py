from fastapi import APIRouter, Depends, HTTPException

from app.features.user.schemas.user_schemas import RefreshTokenRequest, RefreshTokenResponse
from app.features.auth.services.jwt_service import JWTService
from app.config.dependencies import JWTServiceDep

prefix = "/users"
tags = ["Users"]

router = APIRouter(
    prefix=prefix,
    tags=tags
)
@router.post("/refresh", response_model=RefreshTokenResponse)
async def refresh_token(
    request: RefreshTokenRequest,
    jwt_service: JWTService = Depends(JWTServiceDep)
) -> RefreshTokenResponse:
    """Refresh access token using refresh token."""
    try:
        result = jwt_service.refresh_access_token(request.refresh_token)
        return RefreshTokenResponse(**result)
    except HTTPException as e:
        raise HTTPException(status_code=401, detail="Invalid refresh token")