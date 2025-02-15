from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.settings import settings
from app.routes import user_routes, auth_routes
from app.database.connection.mongodb import init_mongodb
from app.middlewares.request_logger import RequestLoggingMiddleware

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_mongodb()
    yield

app = FastAPI(
    title=settings.project_name,
    version="1.0.0",
    openapi_url=f"{settings.api_v1_str}/openapi.json",
    lifespan=lifespan
)

# Add request logging middleware
# app.add_middleware(RequestLoggingMiddleware)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.backend_cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(user_routes.router, prefix=f"{settings.api_v1_str}/users", tags=["users"])
app.include_router(auth_routes.router, prefix=f"{settings.api_v1_str}/auth", tags=["auth"]) 