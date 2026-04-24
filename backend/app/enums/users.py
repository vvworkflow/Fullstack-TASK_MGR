from enum import Enum


class UserRole(str, Enum):
    manager = "MANAGER"
    developer = "DEVELOPER"
    admin = "ADMIN"
