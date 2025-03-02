from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config.env import settings
from app.config.db_config import init_db
from app.features.auth.controllers import auth_controller
from app.features.common.exceptions import AppException
from app.middlewares import app_exception_handler, global_exception_handler
from app.config.logging import setup_logging

async def lifespan(app: FastAPI):
    await init_db()
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    description=settings.PROJECT_DESCRIPTION,
    version=settings.PROJECT_VERSION,
    lifespan=lifespan,
)

setup_logging()

# Handler for custom app exceptions
app.add_exception_handler(AppException, app_exception_handler)

# Handler for all other unhandled exceptions
app.add_exception_handler(Exception, global_exception_handler)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Modify in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers with global API prefix
api_prefix = f"{settings.API_PREFIX}{settings.API_VERSION_PREFIX}"
app.include_router(auth_controller.router, prefix=api_prefix)

@app.get("/")
async def root():
    """Root endpoint."""
    return {"message": "Welcome to the API"} 

# TODO: Implement test controller with test endpoints
@app.get("/test-app-exception")
async def test():
    raise AppException(message="Test error", error_code="TEST_ERROR", status_code=400)

@app.get("/test-global-exception")
async def test():
    raise Exception("Test error")