from enum import Enum


class TaskStatus(str, Enum):
    backlog="BACKLOG"
    in_progress="IN_PROGRESS"
    done="DONE"

class TaskPriority(str, Enum):
    high = "HIGH"
    medium = "MEDIUM"
    low = "LOW"
