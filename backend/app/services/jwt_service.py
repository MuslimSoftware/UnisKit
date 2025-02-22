from datetime import datetime, timedelta
from typing import Optional, Dict, Tuple
from jose import jwt, JWTError
from app.config.env import settings
from fastapi import HTTPException
from app.services.base_service import BaseService

class TokenType:
    """Token types for different stages of authentication."""
    # Permanent tokens
    ACCESS = "access"
    REFRESH = "refresh"

    # Used for auth flow
    AUTH = "auth"

class JWTService(BaseService):
    """Service for handling JWT tokens and authentication flows."""

    def __init__(self):
        self.secret_key = settings.JWT_SECRET_KEY
        self.algorithm = settings.JWT_ALGORITHM
        
        # Token expiration times
        self.access_token_expire_minutes = settings.ACCESS_TOKEN_EXPIRE_MINUTES
        self.refresh_token_expire_days = settings.REFRESH_TOKEN_EXPIRE_DAYS
        self.temp_token_expire_minutes = 15  # Temporary tokens expire in 15 minutes

    def _create_token(
        self,
        subject: str,
        token_type: str,
        expires_delta: timedelta,
        additional_data: Optional[Dict] = None
    ) -> str:
        """
        Create a JWT token with standard claims and optional additional data.
        
        Args:
            subject: The subject (usually user email)
            token_type: Type of token (access, refresh, temp)
            expires_delta: Token expiration time
            additional_data: Additional claims to include
            
        Returns:
            Encoded JWT token
        """
        expires_at = datetime.utcnow() + expires_delta
        
        to_encode = {
            "sub": subject,
            "type": token_type,
            "iat": datetime.utcnow(),
            "exp": expires_at
        }
        
        if additional_data:
            to_encode.update(additional_data)
            
        return jwt.encode(to_encode, self.secret_key, algorithm=self.algorithm)

    def create_tokens(self, subject: str) -> Dict[str, str]:
        """
        Create both access and refresh tokens for a user.
        Used after successful login/signup.
        
        Args:
            subject: User identifier (usually email)
            
        Returns:
            Dict containing access and refresh tokens with their expiry
        """
        access_token = self._create_token(
            subject=subject,
            token_type=TokenType.ACCESS,
            expires_delta=timedelta(minutes=self.access_token_expire_minutes)
        )
        
        refresh_token = self._create_token(
            subject=subject,
            token_type=TokenType.REFRESH,
            expires_delta=timedelta(days=self.refresh_token_expire_days)
        )
        
        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
            "expires_in": self.access_token_expire_minutes * 60  # in seconds
        }

    def create_auth_token(
        self,
        subject: str,
        additional_data: Optional[Dict] = None
    ) -> str:
        """
        Create a temporary token for intermediate authentication steps.
        """
        return self._create_token(
            subject=subject,
            token_type=TokenType.AUTH,
            expires_delta=timedelta(minutes=self.temp_token_expire_minutes),
            additional_data=additional_data
        )

    def verify_token(
        self,
        token: str,
        token_type: Optional[str] = None
    ) -> Dict:
        """
        Verify and decode a JWT token.
        
        Args:
            token: The JWT token to verify
            
        Returns:
            Decoded token payload
            
        Raises:
            HTTPException: If token is invalid or expired
        """
        try:
            payload = jwt.decode(
                token,
                self.secret_key,
                algorithms=[self.algorithm]
            )
            
            if token_type and payload.get("type") != token_type:
                raise HTTPException(
                    status_code=401,
                    detail="Invalid token type"
                )
            return payload
        except JWTError as e:
            raise HTTPException(
                status_code=401,
                detail=f"Invalid or expired token: {str(e)}"
            )

    def refresh_access_token(self, refresh_token: str) -> Dict[str, str]:
        """
        Create a new access token using a refresh token.
        
        Args:
            refresh_token: Valid refresh token
            
        Returns:
            Dict with new access token and expiry
            
        Raises:
            HTTPException: If refresh token is invalid
        """
        payload = self.verify_token(refresh_token, TokenType.REFRESH)
        
        access_token = self._create_token(
            subject=payload["sub"],
            token_type=TokenType.ACCESS,
            expires_delta=timedelta(minutes=self.access_token_expire_minutes)
        )
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "expires_in": self.access_token_expire_minutes * 60
        }