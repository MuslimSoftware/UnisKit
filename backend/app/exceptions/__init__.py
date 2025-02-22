# exceptions/__init__.py
from .database_exceptions import DatabaseConnectionError, DatabaseQueryError
from .http_exceptions import BadRequestError, NotFoundError

__all__ = [
    "DatabaseConnectionError",
    "DatabaseQueryError",
    "BadRequestError",
    "NotFoundError",
]