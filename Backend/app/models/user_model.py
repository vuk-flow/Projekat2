from sqlalchemy import Column, Integer, String
from app.database import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(80))
    email = Column(String(80), unique=True, index=True)
    company = Column(String(80))
    age = Column(Integer)
    position = Column(String(80))
