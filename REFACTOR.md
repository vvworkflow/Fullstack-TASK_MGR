Настроена структура проекта, перенесен get_db_connection() на db_helper.session_getter() и перенесен в core/database/db_helper
Перенесены все эндпоинты в api/v1
В сами эндпоинты добавлен проброс сессии с бд через Depends()
Заменил синхронный pymysql -> aiomysql
Написал отдельные crud для get_tasks()-> возвращает все tasks и get_tasks_by_title()-> возвращает все tasks с совпадением по title
