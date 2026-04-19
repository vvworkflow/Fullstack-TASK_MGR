import asyncio
import os
from sqlalchemy import text
from core.database.db_helper import db_helper


async def run_seed():
    sql_file_path = "init_mock_data.sql"

    if not os.path.exists(sql_file_path):
        print(f"Seed file not found: {sql_file_path}")
        return

    print("Reading SQL seed file...")
    with open(sql_file_path, "r", encoding="utf-8") as f:
        sql_content = f.read()
        statements = [s.strip() for s in sql_content.split(";") if s.strip()]

    print(f"Found {len(statements)} statements. Executing...")

    async with db_helper.session_factory() as session:
        for statement in statements:
            try:
                await session.execute(text(statement))
            except Exception as e:
                print(f"Error executing statement: {e}")
                continue
        await session.commit()
    print("Seeding completed successfully!")


if __name__ == "__main__":
    asyncio.run(run_seed())
