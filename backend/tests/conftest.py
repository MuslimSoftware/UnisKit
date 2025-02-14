"""
Main pytest configuration file.
Contains fixtures that can be used across all tests.
"""
import pytest
from typing import AsyncGenerator, Generator
from fastapi.testclient import TestClient
from motor.motor_asyncio import AsyncIOMotorClient

from app.main import app
from app.config.settings import settings
from app.database.connection.mongodb import init_mongodb

@pytest.fixture(scope="session")
def test_client() -> Generator:
    """
    Create a test client for the FastAPI application.
    """
    with TestClient(app) as client:
        yield client

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
    await init_mongodb()
    
    yield
    
    # Cleanup after test
    await client.drop_database(test_db_name) 