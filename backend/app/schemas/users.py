from datetime import datetime

from pydantic import BaseModel


class UserBase(BaseModel):
    pass


class UserCreate(BaseModel):
    name: str


class UserRead(BaseModel):
    id: int
    name: str
    created_at: datetime


class UserUpdatePartial(BaseModel):
    name: str | None = None
