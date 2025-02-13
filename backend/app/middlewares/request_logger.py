"""Request logging middleware implementation."""

import time
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.types import ASGIApp

from app.utils.logging import RequestLogger

class RequestLoggingMiddleware(BaseHTTPMiddleware):
    def __init__(self, app: ASGIApp):
        super().__init__(app)
    
    async def dispatch(self, request: Request, call_next):
        # Start timer
        start_time = time.time()
        
        # Process request
        response = await call_next(request)
        
        # Calculate duration
        duration = (time.time() - start_time) * 1000  # Convert to milliseconds
        
        # Format and print log message
        log_message = RequestLogger.format_log_message(
            method=request.method,
            path=request.url.path,
            status_code=response.status_code,
            duration=duration
        )
        print(log_message)
        
        return response 