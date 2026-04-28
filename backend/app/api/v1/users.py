from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from api.v1.auth import fastapi_users
from core.config import settings
from core.database.db_helper import db_helper
from schemas.users import UserUpdatePartial, UserRead
from crud import users as users_crud

router = APIRouter(
    tags=["Users"],
    prefix=settings.api.v1.users,
)


@router.get("")
async def get_users(
    name: str | None = None,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    if name:
        return await users_crud.get_users_by_name(name=name, session=session)
    return await users_crud.get_users(session=session)


router.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdatePartial),
)
