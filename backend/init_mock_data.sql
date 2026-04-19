
-- ─── USERS ───────────────────────────────────────────────────
INSERT INTO users (id, name, created_at) VALUES
  (1, 'Alice Johnson',  NOW() - INTERVAL 30 DAY),
  (2, 'Bob Smith',      NOW() - INTERVAL 25 DAY),
  (3, 'Carol White',    NOW() - INTERVAL 20 DAY),
  (4, 'David Brown',    NOW() - INTERVAL 15 DAY),
  (5, 'Eve Davis',      NOW() - INTERVAL 10 DAY)
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  created_at = VALUES(created_at);
-- ─── TASKS ───────────────────────────────────────────────────
INSERT INTO tasks (id, title, description, status, priority, created_by_id, assignee_id, created_at) VALUES
  (1,'Setup CI/CD pipeline','Configure GitHub Actions for automated testing and deployment','done','high',1,2, '2026-03-21 09:00:00'),
  (2,'Design database schema','Create ERD and define all table relationships','done','high',1,1, '2026-03-22 10:30:00'),
  (3,'Implement user authentication','Add JWT-based auth with refresh tokens','in_progress','high',2,3, '2026-03-25 11:00:00'),
  (4,'Write API documentation','Document all endpoints using OpenAPI/Swagger','in_progress','medium',3,4, '2026-03-31 14:20:00'),
  (5,'Add unit tests for CRUD operations','Cover all task and user endpoints with pytest','backlog','medium',2,2, '2026-04-01 15:00:00'),
  (6,'Optimize slow database queries','Profile queries and add missing indexes','backlog','high',1,3, '2026-04-02 16:45:00'),
  (7,'Build frontend task list page','React page with filters, pagination and task cards','done','high',4,4, '2026-04-03 08:30:00'),
  (8,'Implement task changelog','Track all field changes with who changed what and when','done','medium',3,5, '2026-04-05 12:00:00'),
  (9,'Add email notifications','Send email when task is assigned or status changes','backlog','low',5,1, '2026-04-06 13:15:00'),
  (10,'Setup Docker Compose','Containerize backend, frontend and database services','in_progress','medium',1,5, '2026-04-07 10:00:00'),
  (11,'Code review: auth module','Review PR #42 — authentication and session handling','backlog','medium',2,1, '2026-04-08 11:30:00'),
  (12,'Fix pagination bug','Last page returns duplicate items when total is divisible by page size','done','high',3,3, '2026-04-09 17:45:00'),
  (13,'Migrate to async SQLAlchemy','Replace sync DB calls with async equivalents throughout the app','done','high',1,2, '2026-04-10 09:20:00'),
  (14,'Create statistics dashboard','Charts for avg time per status and top productive users','in_progress','medium',4,4, '2026-04-12 14:00:00'),
  (15,'Refactor error handling','Centralize exception handling with custom FastAPI exception handlers','backlog','low',5,5, '2026-04-13 15:30:00'),
  (16,'Add task search endpoint','Full-text search across title and description fields','backlog','medium',2,3, '2026-04-14 11:00:00'),
  (17,'Setup logging system','Structured JSON logging with log levels and rotation','done','medium',3,1, '2026-04-15 12:45:00'),
  (18,'Performance load testing','Run k6 load tests against all critical API endpoints','backlog','high',1,4, '2026-04-16 13:00:00'),
  (19,'Update dependencies','Bump all outdated packages and check for breaking changes','done','low',4,2, '2026-04-17 10:15:00'),
  (20,'Write onboarding guide','Developer onboarding doc','in_progress','low',5,3, '2026-04-18 16:00:00')
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  description = VALUES(description),
  status = VALUES(status),
  priority = VALUES(priority),
  created_by_id = VALUES(created_by_id),
  assignee_id = VALUES(assignee_id),
  created_at = VALUES(created_at);
-- ─── TASKS CHANGELOGS ────────────────────────────────────────


INSERT INTO tasks_changelogs (id, task_id, changed_by_id, field, old_value, new_value, created_at) VALUES
  (1, 1, 1, 'status', 'backlog', 'in_progress', '2026-03-22 21:50:24'),
  (2, 1, 2, 'status', 'in_progress', 'done', '2026-03-24 21:50:24'),
  (3, 2, 1, 'status', 'backlog', 'in_progress', '2026-03-27 21:50:24'),
  (4, 2, 1, 'status', 'in_progress', 'done', '2026-03-29 21:50:24'),
  (5, 7, 4, 'status', 'backlog', 'in_progress', '2026-04-01 21:50:24'),
  (6, 7, 4, 'status', 'in_progress', 'done', '2026-04-05 21:50:24'),
  (7, 7, 4, 'assignee_id', '5', '4', '2026-04-03 21:50:24'),
  (8, 8, 3, 'status', 'backlog', 'in_progress', '2026-04-07 21:50:24'),
  (9, 8, 5, 'status', 'in_progress', 'done', '2026-04-09 21:50:24'),
  (10, 12, 3, 'status', 'backlog', 'in_progress', '2026-04-10 21:50:24'),
  (11, 12, 3, 'status', 'in_progress', 'done', '2026-04-12 21:50:24'),
  (12, 12, 1, 'priority', 'low', 'high', '2026-04-11 21:50:24'),
  (13, 13, 1, 'status', 'backlog', 'in_progress', '2026-04-13 21:50:24'),
  (14, 13, 2, 'status', 'in_progress', 'done', '2026-04-15 21:50:24'),
  (15, 17, 3, 'status', 'backlog', 'in_progress', '2026-04-14 21:50:24'),
  (16, 17, 1, 'status', 'in_progress', 'done', '2026-04-16 21:50:24'),
  (17, 19, 4, 'status', 'backlog', 'in_progress', '2026-04-15 21:50:24'),
  (18, 19, 2, 'status', 'in_progress', 'done', '2026-04-17 21:50:24'),
  (19, 3, 2, 'status', 'backlog', 'in_progress', '2026-04-16 21:50:24'),
  (20, 14, 4, 'status', 'backlog', 'in_progress', '2026-04-17 21:50:24')
ON DUPLICATE KEY UPDATE
  changed_by_id = VALUES(changed_by_id),
  field = VALUES(field),
  old_value = VALUES(old_value),
  new_value = VALUES(new_value),
  created_at = VALUES(created_at);