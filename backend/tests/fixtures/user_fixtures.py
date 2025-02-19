"""Common user fixtures for tests."""
import pytest
from typing import Dict, Any

from app.models.user_model import User
from app.utils.security.password import get_password_hash

@pytest.fixture
def user_data() -> Dict[str, Any]:
    """Return test user data."""
    return {
        "email": "test@example.com",
        "password": "password123"
    }

@pytest.fixture
async def test_user(user_data: Dict[str, Any]) -> User:
    """Create and return a test user in the database."""
    user = User(
        email=user_data["email"],
        hashed_password=get_password_hash(user_data["password"]),
        is_active=True
    )
    await user.save()
    return user

@pytest.fixture
def admin_user_data() -> Dict[str, Any]:
    """Return test admin user data."""
    return {
        "email": "admin@example.com",
        "password": "admin123",
        "is_superuser": True
    }

@pytest.fixture
async def test_admin_user(admin_user_data: Dict[str, Any]) -> User:
    """Create and return a test admin user in the database."""
    user = User(
        email=admin_user_data["email"],
        hashed_password=get_password_hash(admin_user_data["password"]),
        is_active=True,
        is_superuser=True
    )
    await user.save()
    return user 