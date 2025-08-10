from sqlalchemy import Column, Integer, Boolean, String, ForeignKey, DateTime, func
from app.database import Base
from sqlalchemy.orm import relationship

class CommunityVideo(Base):
    __tablename__ = 'community_videos'
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String, index=True, nullable=False)
    subtitle = Column(String, nullable=True)
    description = Column(String, nullable=True)
    url = Column(String, index=True, nullable=False)
    status = Column(String, nullable=False)
    message = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    
    user = relationship("User", back_populates="community_videos")
    
    @property
    def user_name(self):
        return self.user.name if self.user else None