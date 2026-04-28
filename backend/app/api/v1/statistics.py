from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from core.config import settings
from core.database.db_helper import db_helper
from crud import tasks_changelogs as tasks_changelogs_crud
from crud import users as users_crud

router = APIRouter(
    tags=["Statistics"],
    prefix=settings.api.v1.statistics,
)


@router.get("/avg-time-per-status")
async def get_avg_time_per_status(
    session: AsyncSession = Depends(db_helper.session_getter),
):
    return await tasks_changelogs_crud.get_avg_time_per_status(session=session)


@router.get("/top-productive-users")
async def get_top_productive_users(
    session: AsyncSession = Depends(db_helper.session_getter),
):
    return await users_crud.get_top_productive_users(session=session)
