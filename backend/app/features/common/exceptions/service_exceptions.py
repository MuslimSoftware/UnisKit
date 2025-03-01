from functools import wraps
from app.features.common.schemas.common_dtos import ServiceResult
import logging

logger = logging.getLogger(__name__)

# Decorator for service methods
def handle_service_exceptions(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            logger.error(f"Service exception: {e}")
            return ServiceResult(
                success=False,
                message=str(e)
            )
    return wrapper