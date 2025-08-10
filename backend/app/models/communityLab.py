from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship
from app.database import Base

class CommunityLab(Base):
    __tablename__ = "community_labs"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    lab_img = Column(String, nullable=False)
    pdf = Column(String, nullable=False)
    status = Column(String, nullable=False)
    message = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    
    user = relationship("User", back_populates="community_labs")
    
    @property
    def user_name(self):
        return self.user.name if self.user else None