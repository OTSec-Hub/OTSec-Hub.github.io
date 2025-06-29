from fastapi import FastAPI
from app.routes import user as user_routes
from app.routes import auth
from app.routes import educators
from app.database import engine, Base
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

origins = [
    os.getenv("REACT_DOT_SERVER")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(user_routes.router, tags=["users"])
app.include_router(auth.router, prefix="/api/auth")
app.include_router(educators.router, prefix="/api")

# Initialize database
# Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)