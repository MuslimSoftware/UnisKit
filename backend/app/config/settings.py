from typing import List
from pydantic_settings import BaseSettings
from pydantic import AnyHttpUrl, validator
from typing import Optional, Union

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "FastAPI Backend"
    
    # Server settings
    HOST: str = "0.0.0.0"  # Default host
    PORT: int = 8000       # Default port
    
    # CORS
    BACKEND_CORS_ORIGINS: List[Union[str, AnyHttpUrl]] = []
    
    # MongoDB settings
    MONGODB_URL: str
    MONGODB_DB_NAME: str
    
    # JWT settings
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    
    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)
    
    @validator("MONGODB_URL", pre=True)
    def validate_mongodb_url(cls, v: Optional[str]) -> str:
        if not v:
            raise ValueError("MONGODB_URL is required")
        return v
    
    @validator("MONGODB_DB_NAME", pre=True)
    def validate_mongodb_db_name(cls, v: Optional[str]) -> str:
        if not v:
            raise ValueError("MONGODB_DB_NAME is required")
        # Ensure the database name is valid for MongoDB
        if ' ' in v:
            v = v.replace(' ', '_')
        return v

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings() 