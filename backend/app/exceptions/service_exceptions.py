from functools import wraps
from app.schemas.auth_dtos import Result
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
            return Result(
                success=False,
                message=str(e)
            )
    return wrapper