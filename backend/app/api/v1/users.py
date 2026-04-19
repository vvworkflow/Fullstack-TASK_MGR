from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from core.database.db_helper import db_helper
from schemas.users import UserCreate, UserUpdatePartial
from crud import users as users_crud

router = APIRouter(tags=["Users"], prefix="/users")


@router.post("")
async def create_user(
    user: UserCreate,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    return await users_crud.create_user(user=user, session=session)


@router.get("")
async def get_users(
    name: str | None = None,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    if name:
        return await users_crud.get_users_by_name(name=name, session=session)
    return await users_crud.get_users(session=session)


@router.patch("/{id}")
async def update_user(
    id: int,
    new_user_data: UserUpdatePartial,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    user = await users_crud.get_user_by_id(id=id, session=session)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )
    return await users_crud.update_user_partial(
        user=user, new_user_data=new_user_data, session=session
    )


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(
    id: int,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    user = await users_crud.get_user_by_id(id=id, session=session)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )
    await users_crud.delete_user(user=user, session=session)
