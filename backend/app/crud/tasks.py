from typing import Sequence

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from enums.tasks import TaskStatus, TaskPriority
from models import Task
from schemas.tasks import TaskCreate, TaskUpdatePartial


async def create_task(task_data: TaskCreate, session: AsyncSession) -> Task:
    task = Task(**task_data.model_dump(exclude_unset=True))
    session.add(task)
    await session.commit()
    await session.refresh(task)
    return task


# одна функция для применения опциональных фильтров
async def get_tasks(
    session: AsyncSession,
    title: str | None = None,
    status: TaskStatus | None = None,
    priority: TaskPriority | None = None,
) -> Sequence[Task]:
    stmt = select(Task)
    if title:
        stmt = stmt.where(Task.title.ilike(f"%{title}%"))
    if status:
        stmt = stmt.where(Task.status == status)
    if priority:
        stmt = stmt.where(Task.priority == priority)
    result = await session.execute(stmt)
    tasks = result.scalars().all()
    return tasks


async def get_task_by_id(id: int, session: AsyncSession) -> Task | None:
    task = await session.get(Task, id)
    return task


async def update_task_partial(
    task: Task, new_task_data: TaskUpdatePartial, session: AsyncSession
) -> Task:
    for key, value in new_task_data.model_dump(exclude_unset=True).items():
        setattr(task, key, value)
    await session.commit()
    await session.refresh(task)
    return task


async def delete_task(task: Task, session: AsyncSession) -> None:
    await session.delete(task)
    await session.commit()
