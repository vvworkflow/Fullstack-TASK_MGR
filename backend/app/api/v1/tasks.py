from typing import Sequence
from fastapi import APIRouter, HTTPException, Form
from fastapi import Depends
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from core.database.db_helper import db_helper
from crud import tasks as tasks_crud
from crud import users as users_crud
from enums.tasks import TaskStatus, TaskPriority
from schemas.tasks import TaskCreate, TaskUpdatePartial, TaskRead
from services import tasks as tasks_service

router = APIRouter(tags=["Tasks"], prefix="/tasks")


@router.post("", status_code=status.HTTP_201_CREATED, response_model=TaskRead)
async def create_task(
    task_data: TaskCreate,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    try:
        return await tasks_crud.create_task(task_data=task_data, session=session)
    except IntegrityError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Please check user id that you tag as 'assignee' or 'created_by'",
        )


@router.get("", response_model=Sequence[TaskRead])
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
    changed_by_id: int,  # пока так, но вообще должно быть get_current_user через Depends() когда будет реализована аутентификация
    session: AsyncSession = Depends(db_helper.session_getter),
):
    task = await tasks_crud.get_task_by_id(id=id, session=session)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Task not found"
        )
    changed_by = await users_crud.get_user_by_id(id=changed_by_id, session=session)
    if not changed_by:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Please authorize in system. User with id: {changed_by_id} not found.",
        )
    try:
        return await tasks_service.update_task_with_changelog(
            task=task,
            new_task_data=new_task_data,
            changed_by_id=changed_by_id,
            session=session,
        )
    except IntegrityError as e:
        print(f"Integrity ERROR: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Referenced entity (assignee, priority, etc.) does not exist.",
        )
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error occurred.",
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
