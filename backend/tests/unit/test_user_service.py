"""Unit tests for UserService."""
import pytest
from unittest.mock import AsyncMock, MagicMock

from app.services.user_service import UserService
from app.schemas.user_schema import UserCreate
from app.database.models.user import User

@pytest.fixture
def user_repository():
    """Create a mock user repository."""
    repository = MagicMock()
    repository.find_by_email = AsyncMock()
    repository.create = AsyncMock()
    repository.find_all = AsyncMock()
    return repository

@pytest.fixture
def user_service(user_repository):
    """Create a UserService instance with a mock repository."""
    service = UserService()
    service.repository = user_repository
    return service

@pytest.mark.asyncio
async def test_create_user_success(user_service, user_repository):
    """Test successful user creation."""
    # Arrange
    user_data = UserCreate(email="test@example.com", password="password123")
    user_repository.find_by_email.return_value = None
    user_repository.create.return_value = User(
        email=user_data.email,
        hashed_password="hashed_password",
        is_active=True
    )
    
    # Act
    user = await user_service.create_user(user_data)
    
    # Assert
    assert user.email == user_data.email
    assert user.is_active is True
    user_repository.find_by_email.assert_called_once_with(user_data.email)
    user_repository.create.assert_called_once_with(
        email=user_data.email,
        password=user_data.password
    )

@pytest.mark.asyncio
async def test_create_user_email_exists(user_service, user_repository):
    """Test user creation with existing email."""
    # Arrange
    user_data = UserCreate(email="existing@example.com", password="password123")
    user_repository.find_by_email.return_value = User(
        email=user_data.email,
        hashed_password="hashed_password"
    )
    
    # Act & Assert
    with pytest.raises(Exception) as exc_info:
        await user_service.create_user(user_data)
    
    assert "Email already registered" in str(exc_info.value)
    user_repository.find_by_email.assert_called_once_with(user_data.email)
    user_repository.create.assert_not_called() 