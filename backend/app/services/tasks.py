from sqlalchemy.ext.asyncio import AsyncSession

from models import Task
from schemas.tasks import TaskUpdatePartial
from crud import tasks_changelogs as task_status_changelogs_crud
from crud import tasks as tasks_crud

TRACKED_FIELDS = {"status", "priority"}


async def update_task_with_changelog(
    task: Task,
    new_task_data: TaskUpdatePartial,
    changed_by_id: int,
    session: AsyncSession,
) -> Task:
    for key, new_value in new_task_data.model_dump(exclude_unset=True).items():
        if key in TRACKED_FIELDS:
            old_value = getattr(task, key)
            if old_value != new_value:
                await task_status_changelogs_crud.create_changelog(
                    task_id=task.id,
                    changed_by_id=changed_by_id,
                    field=key,
                    old_value=old_value.value if old_value else None,
                    new_value=new_value.value if new_value else None,
                    session=session,
                )
    return await tasks_crud.update_task_partial(
        task=task,
        new_task_data=new_task_data,
        session=session,
    )
