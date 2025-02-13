"""Color definitions for terminal output."""

class Colors:
    # ANSI escape codes for colors
    RESET = "\033[0m"
    BOLD = "\033[1m"
    
    # Method colors
    GET = "\033[38;5;82m"      # Green
    POST = "\033[38;5;214m"    # Orange
    PUT = "\033[38;5;75m"      # Blue
    DELETE = "\033[38;5;196m"  # Red
    PATCH = "\033[38;5;141m"   # Purple
    
    # Status code colors
    SUCCESS = "\033[38;5;82m"      # Green (2xx)
    REDIRECT = "\033[38;5;214m"    # Orange (3xx)
    CLIENT_ERROR = "\033[38;5;196m" # Red (4xx)
    SERVER_ERROR = "\033[38;5;161m" # Pink (5xx)
    
    # Other colors
    PATH = "\033[38;5;87m"     # Cyan
    TIME = "\033[38;5;248m"    # Gray 