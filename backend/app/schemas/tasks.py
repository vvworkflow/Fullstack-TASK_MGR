from pydantic import BaseModel

from enums.tasks import TaskStatus, TaskPriority


class TaskBase(BaseModel):
    title: str
    description: str | None = None
    status: TaskStatus
    priority: TaskPriority
    created_by_id: int
    assignee_id: int | None = None


class TaskCreate(TaskBase):
    pass


class TaskRead(TaskBase):
    id: int


class TaskUpdatePartial(TaskBase):
    title: str | None = None
    description: str | None = None
    status: TaskStatus | None = None
    priority: TaskPriority | None = None
    created_by_id: int | None = None
    assignee_id: int | None = None
