"""
Main pytest configuration file.
Contains fixtures that can be used across all tests.
"""
import pytest
from typing import AsyncGenerator, Generator
from fastapi.testclient import TestClient
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie

from app.core.settings import settings
from app.main import app
from app.database.models.user import User

@pytest.fixture
def test_client():
    """Create a test client for the FastAPI app."""
    return TestClient(app)

@pytest.fixture
async def mongodb():
    """Set up a test MongoDB database."""
    client = AsyncIOMotorClient(settings.mongodb_url)
    await init_beanie(
        database=client[settings.mongodb_db_name + "_test"],
        document_models=[User]
    )
    yield client
    # Clean up after tests
    await client.drop_database(settings.mongodb_db_name + "_test")
    client.close()

@pytest.fixture(autouse=True)
async def setup_test_db() -> AsyncGenerator:
    """
    Set up a test database before each test and clean up after.
    This fixture runs automatically for each test.
    """
    # Use a test database
    test_db_name = f"{settings.MONGODB_DB_NAME}_test"
    client = AsyncIOMotorClient(settings.MONGODB_URL)
    
    # Drop test database if it exists
    await client.drop_database(test_db_name)
    
    # Initialize test database
    settings.MONGODB_DB_NAME = test_db_name
    await init_beanie(
        database=client[test_db_name],
        document_models=[User]
    )
    
    yield
    
    # Cleanup after test
    await client.drop_database(test_db_name) 