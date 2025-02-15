from typing import List
from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    """Application settings."""
    # API Settings
    api_v1_str: str = "/api/v1"
    project_name: str = "FastAPI Backend"
    
    # MongoDB Settings
    mongodb_url: str
    mongodb_db_name: str = "fastapi_backend_db"
    
    # Security Settings
    secret_key: str
    jwt_secret: str
    jwt_algorithm: str = "HS256"
    jwt_access_token_expire_minutes: int = 30
    jwt_refresh_token_expire_days: int = 7
    access_token_expire_minutes: int = 11520  # 8 days
    
    # CORS Settings
    backend_cors_origins: List[str] = ["http://localhost:3000", "http://localhost:19006"]
    
    # Server Settings
    host: str = "0.0.0.0"
    port: int = 8000
    api_url: str = "http://localhost:8000"
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False
        extra = "allow"  # Allow extra fields from .env file

@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()

# Create a global instance
settings = get_settings() 