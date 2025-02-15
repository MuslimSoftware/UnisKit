from datetime import datetime, timedelta
from typing import Optional
import jwt

from app.core.settings import settings

def create_token(subject: str, expires_delta: timedelta, token_type: str = "access") -> str:
    """Create a JWT token."""
    expire = datetime.utcnow() + expires_delta
    to_encode = {
        "exp": expire,
        "sub": str(subject),
        "type": token_type
    }
    encoded_jwt = jwt.encode(
        to_encode,
        settings.jwt_secret,
        algorithm=settings.jwt_algorithm
    )
    return encoded_jwt

def create_access_token(subject: str) -> str:
    """Create a new access token."""
    expires_delta = timedelta(minutes=settings.jwt_access_token_expire_minutes)
    return create_token(subject, expires_delta, "access")

def create_refresh_token(subject: str) -> str:
    """Create a new refresh token."""
    expires_delta = timedelta(days=settings.jwt_refresh_token_expire_days)
    return create_token(subject, expires_delta, "refresh")

def verify_token(token: str) -> Optional[str]:
    """Verify a JWT token and return the subject."""
    try:
        payload = jwt.decode(
            token,
            settings.jwt_secret,
            algorithms=[settings.jwt_algorithm]
        )
        return payload.get("sub")
    except jwt.ExpiredSignatureError:
        return None
    except jwt.JWTError:
        return None 