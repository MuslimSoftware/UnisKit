from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config.env import settings
from app.config.db_config import init_db
from app.controllers import auth_controller, user_controller


async def lifespan(app: FastAPI):
    await init_db()
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    description=settings.PROJECT_DESCRIPTION,
    version=settings.PROJECT_VERSION,
    lifespan=lifespan,
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