from typing import List
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
import certifi

from app.config.settings import settings
from app.database.models.user import User

async def init_mongodb():
    """Initialize MongoDB connection and register models."""
    try:
        # Use TLS/SSL certificate and set server API version
        client = AsyncIOMotorClient(
            settings.MONGODB_URL,
            tlsCaFile=certifi.where(),
            serverSelectionTimeoutMS=5000,
            connectTimeoutMS=10000
        )
        
        # Test the connection
        await client.server_info()
        
        # Initialize Beanie with the models
        await init_beanie(
            database=client[settings.MONGODB_DB_NAME],
            document_models=get_models()
        )
        print("Successfully connected to MongoDB!")
        
    except Exception as e:
        print(f"Error connecting to MongoDB: {str(e)}")
        raise

def get_models() -> List[type]:
    """Get all MongoDB document models."""
    return [
        User,
        # Add more models here as they are created
    ] 