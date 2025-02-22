from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.config.env import settings
from app.config.db_config import init_db
from app.features.user.controllers import user_controller
from app.features.auth.controllers import auth_controller
import logging

logger = logging.getLogger(__name__)

async def lifespan(app: FastAPI):
    await init_db()
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    description=settings.PROJECT_DESCRIPTION,
    version=settings.PROJECT_VERSION,
    lifespan=lifespan,
)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"An unexpected error occurred: {exc} on {request}")
    return JSONResponse(
        status_code=500,
        content={"success": False, "message": "An unexpected error occurred"}
    )

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
app.include_router(user_controller.router, prefix=api_prefix)

@app.get("/")
async def root():
    """Root endpoint."""
    return {"message": "Welcome to the API"} 