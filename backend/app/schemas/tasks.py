from pydantic import BaseModel


class TaskBase(BaseModel):
    title: str
    user_id: int


class TaskCreate(TaskBase):
    pass


class TaskRead(TaskBase):
    id: int


class TaskUpdatePartial(TaskBase):
    title: str | None = None
    user_id: int | None = None
