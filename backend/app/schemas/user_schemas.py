
# Token refresh
from pydantic import BaseModel


class RefreshTokenRequest(BaseModel):
    """Request to refresh expired access token."""
    refresh_token: str

class RefreshTokenResponse(BaseModel):
    """Response with new access token."""
    access_token: str
    token_type: str = "bearer"
    expires_in: int
