from dataclasses import dataclass
from typing import Optional, Dict

@dataclass
class Result:
    """Standard result for operations."""
    success: bool
    message: str
    data: Optional[Dict] = None