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


@router.put("/users/{user_id}", response_model=UserSchema)
def update_user(user_id: int, updated_user: UserUpdate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    for field, value in updated_user.dict(exclude_unset=True).items():
        setattr(user, field, value)

    db.commit()
    db.refresh(user)
    return user
