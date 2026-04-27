from datetime import datetime
from enums.users import UserRole
from fastapi_users import schemas
from custom_types.user_id import UserIDType


class UserCreate(schemas.BaseUserCreate):
    username: str
    fullname: str
    role: UserRole


class UserRead(schemas.BaseUser[UserIDType]):
    username: str
    fullname: str
    role: UserRole
    created_at: datetime


class UserUpdatePartial(schemas.BaseUserUpdate):
    username: str | None = None
    fullname: str | None = None
    role: UserRole | None = None
