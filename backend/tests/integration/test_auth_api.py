"""Integration tests for authentication endpoints."""
import pytest
from fastapi.testclient import TestClient

from app.database.models.user import User

def test_register_user(test_client: TestClient):
    """Test user registration endpoint."""
    # Arrange
    user_data = {
        "email": "test@example.com",
        "password": "password123"
    }
    
    # Act
    response = test_client.post(
        "/api/v1/auth/register",
        json=user_data
    )
    
    # Assert
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == user_data["email"]
    assert "message" in data
    assert data["message"] == "User registered successfully"

def test_login_user(test_client: TestClient):
    """Test user login endpoint."""
    # Arrange - Create a user first
    user_data = {
        "email": "test@example.com",
        "password": "password123"
    }
    test_client.post("/api/v1/auth/register", json=user_data)
    
    # Act - Try to login
    response = test_client.post(
        "/api/v1/auth/login",
        data={
            "username": user_data["email"],
            "password": user_data["password"]
        }
    )
    
    # Assert
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_login_invalid_credentials(test_client: TestClient):
    """Test login with invalid credentials."""
    # Act
    response = test_client.post(
        "/api/v1/auth/login",
        data={
            "username": "wrong@example.com",
            "password": "wrongpassword"
        }
    )
    
    # Assert
    assert response.status_code == 400
    data = response.json()
    assert "detail" in data
    assert data["detail"] == "Incorrect email or password" 