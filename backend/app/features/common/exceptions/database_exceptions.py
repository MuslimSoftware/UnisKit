from functools import wraps
from pymongo.errors import ServerSelectionTimeoutError, OperationFailure
from beanie.exceptions import DocumentNotFound
import logging

class DatabaseConnectionError(Exception):
    """Raised when there is a failure connecting to the database."""
    def __init__(self, message="Could not connect to the database"):
        self.message = message
        super().__init__(self.message)

class DatabaseQueryError(Exception):
    """Raised when a database query fails."""
    def __init__(self, message="Invalid database query"):
        self.message = message
        super().__init__(self.message)


logger = logging.getLogger(__name__)

def handle_database_exceptions(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except ServerSelectionTimeoutError:
            logger.error(f"Database connection error: {e}")
            raise DatabaseConnectionError
        except OperationFailure as e:
            logger.error(f"Database query error: {e}")
            raise DatabaseQueryError
        except DocumentNotFound:
            return None
        
    return wrapper