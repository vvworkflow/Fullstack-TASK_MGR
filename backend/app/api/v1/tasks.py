from fastapi import APIRouter, HTTPException
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from core.database.db_helper import db_helper
from crud import tasks as tasks_crud
from schemas.tasks import TaskCreate, TaskUpdatePartial

router = APIRouter(tags=["Tasks"], prefix="/tasks")


@router.post("")
async def create_task(
    task: TaskCreate,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    return await tasks_crud.create_task(task=task, session=session)


@router.get("")
async def get_tasks(
    title: str | None = None,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    if title:
        return await tasks_crud.get_tasks_by_title(title=title, session=session)
    return await tasks_crud.get_tasks(session=session)


@router.patch("/{id}")
async def update_task(
    id: int,
    new_task_data: TaskUpdatePartial,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    task = await tasks_crud.get_task_by_id(id=id, session=session)
    if task:
        return await tasks_crud.update_task_partial(
            task=task, new_task_data=new_task_data, session=session
        )
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")


@router.delete("/{id}")
async def delete_task(
    id: int,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    task = await tasks_crud.get_task_by_id(id=id, session=session)
    if task:
        await tasks_crud.delete_task(task=task, session=session)
        return {"status": "success"}
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
