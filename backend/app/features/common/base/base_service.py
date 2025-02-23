from app.features.common.utils.decorator_utils import apply_exception_handler
from app.features.common.exceptions.service_exceptions import handle_service_exceptions

class BaseService:
    def __init__(self):
        # Apply the service exception handler to all methods
        apply_exception_handler(self, handle_service_exceptions)