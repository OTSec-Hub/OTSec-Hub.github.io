from fastapi import FastAPI
from app.routes import user, auth, educators, video, videoProgress, pieProgress
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
app.include_router(user.router, tags=["users"])
app.include_router(auth.router, prefix="/api/auth", tags=["authentication"])
app.include_router(educators.router, prefix="/api/educators", tags=["educators"])
app.include_router(video.router, prefix="/api/video", tags=["videos"])
app.include_router(videoProgress.router, prefix="/api", tags=["video_views"])
app.include_router(pieProgress.router, prefix="/api/progress", tags=["pieProgress"])

# Initialize database
# Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)