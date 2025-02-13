from typing import List
from pydantic_settings import BaseSettings
from pydantic import AnyHttpUrl, validator
from typing import Optional

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "FastAPI Backend"
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []
    
    # MongoDB settings
    MONGODB_URL: str
    MONGODB_DB_NAME: str
    
    # JWT settings
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    
    @validator("MONGODB_URL", pre=True)
    def validate_mongodb_url(cls, v: Optional[str]) -> str:
        if not v:
            raise ValueError("MONGODB_URL is required")
        return v
    
    @validator("MONGODB_DB_NAME", pre=True)
    def validate_mongodb_db_name(cls, v: Optional[str]) -> str:
        if not v:
            raise ValueError("MONGODB_DB_NAME is required")
        return v

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings() 