from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from core.database.db_helper import db_helper
from crud import tasks as tasks_crud
from schemas.tasks import TaskCreate

router = APIRouter(tags=["Tasks"], prefix="/tasks")


@router.post("")
async def create_task(
    task: TaskCreate, session: AsyncSession = Depends(db_helper.session_getter)
):
    return await tasks_crud.create_task(task=task, session=session)


@router.get("")
async def get_tasks(session: AsyncSession = Depends(db_helper.session_getter)):
    return await tasks_crud.get_tasks(session=session)


@router.get("/{title}")
async def get_tasks_by_title(
    title: str, session: AsyncSession = Depends(db_helper.session_getter)
):
    return await tasks_crud.get_tasks_by_title(title=title, session=session)
