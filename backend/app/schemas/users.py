from datetime import datetime

from pydantic import BaseModel

from enums.users import UserRole


class UserBase(BaseModel):
    pass


class UserCreate(BaseModel):
    username: str
    fullname: str
    password: str
    role: UserRole


class UserRead(BaseModel):
    id: int
    username: str
    fullname: str
    role: UserRole
    created_at: datetime


class UserUpdatePartial(BaseModel):
    username: str | None = None
    fullname: str | None = None
    password: str | None = None
    role: UserRole | None = None
