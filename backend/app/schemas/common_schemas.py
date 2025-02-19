from pydantic import BaseModel
from typing import Generic, TypeVar, Optional, List

T = TypeVar('T')

class ErrorResponse(BaseModel):
    """Standard error response model."""
    code: str
    message: str
    details: Optional[List[dict]] = None

class PaginationParams(BaseModel):
    """Standard pagination parameters."""
    page: int = 1
    limit: int = 10

class PaginatedResponse(BaseModel, Generic[T]):
    """Standard paginated response model."""
    items: List[T]
    total: int
    page: int
    pages: int
    has_next: bool
    has_prev: bool 