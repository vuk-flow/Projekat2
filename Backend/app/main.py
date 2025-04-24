from fastapi import FastAPI, Depends
from app.routers import users
from app.routers.users import get_db
from app.database import engine, Base
from sqlalchemy.orm import Session
from sqlalchemy import text
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, prefix="/api", tags=["Workers"])


@app.get("/")
def index():
    return {"message": "FastApi works!"}
