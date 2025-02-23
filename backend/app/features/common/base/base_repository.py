
from app.features.common.utils.decorator_utils import apply_exception_handler
from app.features.common.exceptions.database_exceptions import handle_database_exceptions

class BaseRepository:
    def __init__(self):
        # Apply the database exception handler to all methods
        apply_exception_handler(self, handle_database_exceptions)