from typing import List
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
import certifi

from app.core.settings import settings
from app.database.models.user import User

async def init_mongodb():
    """Initialize MongoDB connection and Beanie ODM."""
    # Create Motor client
    client = AsyncIOMotorClient(settings.mongodb_url)
    
    # Initialize Beanie with the Product document class
    await init_beanie(
        database=client[settings.mongodb_db_name],
        document_models=[User]
    )

def get_models() -> List[type]:
    """Get all MongoDB document models."""
    return [
        User,
        # Add more models here as they are created
    ] 