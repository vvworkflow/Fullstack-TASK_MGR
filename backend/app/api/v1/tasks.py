from fastapi import APIRouter, HTTPException
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from core.database.db_helper import db_helper
from crud import tasks as tasks_crud
from enums.tasks import TaskStatus, TaskPriority
from schemas.tasks import TaskCreate, TaskUpdatePartial, TaskRead
from services import tasks as tasks_service

router = APIRouter(tags=["Tasks"], prefix="/tasks")


@router.post("", status_code=status.HTTP_201_CREATED, response_model=TaskRead)
async def create_task(
    task_data: TaskCreate,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    return await tasks_crud.create_task(task_data=task_data, session=session)


@router.get("")
async def get_tasks(
    title: str | None = None,
    status: TaskStatus | None = None,
    priority: TaskPriority | None = None,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    return await tasks_crud.get_tasks(
        title=title,
        status=status,
        priority=priority,
        session=session,
    )


@router.patch("/{id}", response_model=TaskRead)
async def update_task(
    id: int,
    new_task_data: TaskUpdatePartial,
    changed_by: int,  # пока так, но вообще должно быть get_current_user через Depends() когда будет реализована аутентификация
    session: AsyncSession = Depends(db_helper.session_getter),
):
    task = await tasks_crud.get_task_by_id(id=id, session=session)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Task not found"
        )
    return await tasks_service.update_task(
        task=task,
        new_task_data=new_task_data,
        changed_by=changed_by,
        session=session,
    )


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    id: int,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    task = await tasks_crud.get_task_by_id(id=id, session=session)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Task not found"
        )
    await tasks_crud.delete_task(task=task, session=session)
