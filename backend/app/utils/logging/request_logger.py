"""Request logging utility for formatting log messages."""

from typing import Dict
from app.utils.colors import Colors

class RequestLogger:
    METHOD_COLORS: Dict[str, str] = {
        "GET": Colors.GET,
        "POST": Colors.POST,
        "PUT": Colors.PUT,
        "DELETE": Colors.DELETE,
        "PATCH": Colors.PATCH
    }
    
    @staticmethod
    def get_status_color(status_code: int) -> str:
        if 200 <= status_code < 300:
            return Colors.SUCCESS
        elif 300 <= status_code < 400:
            return Colors.REDIRECT
        elif 400 <= status_code < 500:
            return Colors.CLIENT_ERROR
        else:
            return Colors.SERVER_ERROR
    
    @staticmethod
    def format_log_message(
        method: str,
        path: str,
        status_code: int,
        duration: float
    ) -> str:
        method_color = RequestLogger.METHOD_COLORS.get(method, Colors.RESET)
        status_color = RequestLogger.get_status_color(status_code)
        
        return (
            f"{Colors.TIME}[{duration:.2f}ms]{Colors.RESET} "
            f"{method_color}{method}{Colors.RESET} "
            f"{Colors.PATH}{path}{Colors.RESET} "
            f"{status_color}{status_code}{Colors.RESET}"
        ) 