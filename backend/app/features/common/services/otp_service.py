from dataclasses import dataclass
from datetime import datetime, timedelta
from typing import Optional, Literal
import random
import string
from app.features.common.services.base_service import BaseService

OTPType = Literal["signup", "login", "reset"]

@dataclass
class OTPResult:
    """Result of OTP operations."""
    success: bool
    message: str
    expires_in: int = 0  # in seconds
    token: Optional[str] = None
    otp_type: Optional[OTPType] = None

class OTPService(BaseService):
    """Service for handling OTP operations."""
    
    def __init__(self):
        # In production, use Redis or similar
        self._otp_store = {}
        self._otp_length = 6
        self._otp_expiry = 10  # minutes
    
    def _generate_otp(self) -> str:
        """Generate a random OTP."""
        return ''.join(random.choices(string.digits, k=self._otp_length))
    
    def _store_otp(self, email: str, otp: str, otp_type: OTPType) -> None:
        """Store OTP with expiry time and type."""
        self._otp_store[email] = {
            'otp': otp,
            'type': otp_type,
            'expires_at': datetime.utcnow() + timedelta(minutes=self._otp_expiry)
        }
    
    def _is_expired(self, stored_data: dict) -> bool:
        """Check if stored OTP is expired."""
        return datetime.utcnow() > stored_data['expires_at']
    
    def request_otp(self, email: str, otp_type: OTPType) -> OTPResult:
        """
        Generate and store a new OTP for the given email.
        
        Args:
            email: The email to generate OTP for
            otp_type: The type of OTP (signup, login, reset)
            
        Returns:
            OTPResult with success status and expiry time
        """
        otp = self._generate_otp()
        self._store_otp(email, otp, otp_type)
        
        # TODO: Send OTP via email service
        # For development, print OTP to console
        print(f"OTP for {email} ({otp_type}): {otp}")
        
        return OTPResult(
            success=True,
            message="Verification code sent",
            expires_in=self._otp_expiry * 60  # convert to seconds
        )
    
    def verify_otp(self, email: str, otp: str) -> OTPResult:
        """
        Verify an OTP for the given email.
        
        Args:
            email: The email to verify OTP for
            otp: The OTP to verify
            
        Returns:
            OTPResult with verification status and OTP type
        """
        stored = self._otp_store.get(email)
        
        if not stored:
            return OTPResult(
                success=False,
                message="No verification code found for this email"
            )
        
        if self._is_expired(stored):
            del self._otp_store[email]
            return OTPResult(
                success=False,
                message="Verification code has expired"
            )
        
        is_valid = stored['otp'] == otp
        
        if is_valid:
            otp_type = stored['type']
            # Clean up used OTP
            del self._otp_store[email]
            return OTPResult(
                success=True,
                message="Code verified successfully",
                otp_type=otp_type
            )
            
        return OTPResult(
            success=False,
            message="Invalid code"
        )
    
    def clear_otp(self, email: str) -> None:
        """Clear stored OTP for an email."""
        if email in self._otp_store:
            del self._otp_store[email] 