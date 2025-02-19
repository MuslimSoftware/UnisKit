from datetime import datetime, timedelta
from typing import Optional, Dict, Tuple
from jose import jwt, JWTError
from app.config.env import settings

class JWTService:
    """Service for handling JWT tokens."""

    def __init__(self):
        self.secret_key = settings.JWT_SECRET_KEY
        self.algorithm = settings.JWT_ALGORITHM
        self.access_token_expire_minutes = settings.ACCESS_TOKEN_EXPIRE_MINUTES
        # 7 days for refresh token
        self.refresh_token_expire_days = 7
        # 15 minutes for signup token
        self.signup_token_expire_minutes = 15

    def _create_token(
        self,
        subject: str,
        expires_delta: timedelta,
        token_type: str,
        additional_data: Optional[Dict] = None
    ) -> str:
        """
        Create a JWT token with the given subject and expiration.

        Args:
            subject: The subject of the token (usually user email)
            expires_delta: Token expiration time
            token_type: Type of token (access, refresh, signup)
            additional_data: Additional claims to include in the token

        Returns:
            str: The encoded JWT token
        """
        to_encode = {
            "sub": str(subject),
            "type": token_type,
            "iat": datetime.utcnow(),
            "exp": datetime.utcnow() + expires_delta
        }
        
        if additional_data:
            to_encode.update(additional_data)

        return jwt.encode(to_encode, self.secret_key, algorithm=self.algorithm)

    def create_access_token(self, subject: str) -> str:
        """
        Create a new access token.

        Args:
            subject: The subject of the token (usually user email)

        Returns:
            str: The encoded access token
        """
        expires_delta = timedelta(minutes=self.access_token_expire_minutes)
        return self._create_token(subject, expires_delta, "access")

    def create_refresh_token(self, subject: str) -> str:
        """
        Create a new refresh token.

        Args:
            subject: The subject of the token (usually user email)

        Returns:
            str: The encoded refresh token
        """
        expires_delta = timedelta(days=self.refresh_token_expire_days)
        return self._create_token(subject, expires_delta, "refresh")

    def create_signup_token(self, email: str, otp_verified: bool = True) -> str:
        """
        Create a temporary token for completing signup.

        Args:
            email: The email address of the signing up user
            otp_verified: Whether OTP has been verified

        Returns:
            str: The encoded signup token
        """
        expires_delta = timedelta(minutes=self.signup_token_expire_minutes)
        additional_data = {"otp_verified": otp_verified}
        return self._create_token(email, expires_delta, "signup", additional_data)

    def create_token_pair(self, subject: str) -> Tuple[str, str]:
        """
        Create both access and refresh tokens.

        Args:
            subject: The subject of the tokens (usually user email)

        Returns:
            Tuple[str, str]: A tuple of (access_token, refresh_token)
        """
        access_token = self.create_access_token(subject)
        refresh_token = self.create_refresh_token(subject)
        return access_token, refresh_token

    def verify_token(
        self,
        token: str,
        expected_type: Optional[str] = None
    ) -> Optional[Dict]:
        """
        Verify a JWT token and return its payload.

        Args:
            token: The JWT token to verify
            expected_type: The expected token type (access, refresh, signup)

        Returns:
            Optional[Dict]: The token payload if valid, None otherwise
        """
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
            
            # Verify token type if expected_type is provided
            if expected_type and payload.get("type") != expected_type:
                return None
                
            return payload
        except JWTError:
            return None

    def refresh_access_token(self, refresh_token: str) -> Optional[str]:
        """
        Create a new access token using a refresh token.

        Args:
            refresh_token: The refresh token to use

        Returns:
            Optional[str]: A new access token if the refresh token is valid,
                          None otherwise
        """
        payload = self.verify_token(refresh_token, "refresh")
        if not payload:
            return None

        return self.create_access_token(payload["sub"])

    def verify_signup_token(self, token: str) -> Optional[Dict]:
        """
        Verify a signup token and return its payload.

        Args:
            token: The signup token to verify

        Returns:
            Optional[Dict]: The token payload if valid and OTP was verified,
                           None otherwise
        """
        payload = self.verify_token(token, "signup")
        if not payload or not payload.get("otp_verified"):
            return None

        return payload 