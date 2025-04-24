from pydantic import BaseModel, EmailStr
from typing import Optional


class UserCreate(BaseModel):
    id: int
    name: str
    email: EmailStr
    company: str
    age: int
    position: str


class User(UserCreate):
    id: int
    name: str
    email: EmailStr
    company: str
    age: int
    position: str

    class Config:
        orm_mode = True


class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    company: Optional[str] = None
    age: Optional[int] = None
    position: Optional[str] = None
