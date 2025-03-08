from datetime import datetime, timedelta
import random
import string
from app.features.common.schemas import ServiceResult
from app.features.common.exceptions import AppException

# Shared storage at module level
_GLOBAL_OTP_STORE = {}

class OTPService:
    """Service for handling OTP operations."""
    
    def __init__(self):
        self._otp_length = 6
        self._otp_expiry_seconds = 600  # 10 minutes

    def request_otp(self, email: str) -> ServiceResult:
        """
        Generate and store a new OTP for the given email.
        
        Args:
            email: The email to generate OTP for
            
        Returns:
            OTPResult with success status and expiry time
        """
        otp = self._generate_otp()
        self._store_otp(email, otp)
        
        # TODO: Send OTP via email service
        # For development, print OTP to console
        print(f"OTP for {email} ({otp})")
        
        return ServiceResult(
            success=True,
            message="Verification code sent",
            data={"expires_in": self._otp_expiry_seconds}
        )
    
    def verify_otp(self, email: str, otp: str) -> ServiceResult:
        """
        Verify an OTP for the given email.
        
        Args:
            email: The email to verify OTP for
            otp: The OTP to verify
            
        Returns:
            OTPResult with verification status and OTP type
        """
        stored = _GLOBAL_OTP_STORE.get(email)
        
        if not stored:
            raise AppException(message="No verification code found for this email", error_code="OTP_NOT_FOUND", status_code=400)
        
        if self._is_expired(stored):
            del _GLOBAL_OTP_STORE[email]
            raise AppException(message="Verification code has expired", error_code="OTP_EXPIRED", status_code=400)
        
        is_valid = stored['otp'] == otp
        
        if is_valid:
            del _GLOBAL_OTP_STORE[email]
            return ServiceResult(
                success=True,
                message="Code verified successfully"
            )
        
        raise AppException(message="Invalid code", error_code="OTP_INVALID", status_code=400)
    
    def _generate_otp(self) -> str:
        """Generate a random OTP."""
        return ''.join(random.choices(string.digits, k=self._otp_length))
    
    def _store_otp(self, email: str, otp: str) -> None:
        """Store OTP with expiry time and type."""
        _GLOBAL_OTP_STORE[email] = {
            'otp': otp,
            'expires_at': datetime.utcnow() + timedelta(seconds=self._otp_expiry_seconds)
        }
    
    def _is_expired(self, stored_data: dict) -> bool:
        """Check if stored OTP is expired."""
        return datetime.utcnow() > stored_data['expires_at']
    
    
    def clear_otp(self, email: str) -> None:
        """Clear stored OTP for an email."""
        if email in _GLOBAL_OTP_STORE:
            del _GLOBAL_OTP_STORE[email] 