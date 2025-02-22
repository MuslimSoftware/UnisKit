from fastapi import HTTPException

class BadRequestError(HTTPException):
    """Raised for invalid client requests."""
    def __init__(self, detail: str = "Bad request"):
        super().__init__(status_code=400, detail=detail)

class NotFoundError(HTTPException):
    """Raised when a resource is not found."""
    def __init__(self, detail: str = "Resource not found"):
        super().__init__(status_code=404, detail=detail)