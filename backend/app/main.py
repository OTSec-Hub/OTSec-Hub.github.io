from fastapi import FastAPI
from app.routes import user as user_routes
from app.database import engine, Base
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import os

load_dotenv()

app = FastAPI()

origins = [
    os.getenv("REACT_DOT_SERVER")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       # or ["*"] to allow all origins
    allow_credentials=True,
    allow_methods=["*"],         # allow all HTTP methods
    allow_headers=["*"],         # allow all headers
)

app.include_router(user_routes.router, tags=["users"])
Base.metadata.create_all(bind=engine)