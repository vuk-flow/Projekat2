from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas.user_schema import (
    User as UserSchema,
    UserCreate,
    UserUpdate,
)
from app.models.user_model import User

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/users/", response_model=list[UserSchema])
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    if not users:
        return []
    return users
