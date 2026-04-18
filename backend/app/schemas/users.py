from datetime import datetime

from pydantic import BaseModel


class UserBase(BaseModel):
    name: str


class UserCreate(UserBase):
    pass


class UserRead(UserBase):
    id: int
    created_at: datetime


class UserUpdatePartial(UserBase):
    name: str | None = None
