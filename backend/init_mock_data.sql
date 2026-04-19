-- ============================================================
--  MOCK DATA SEED — Local Task Manager
--  Run: mysql -u root -p your_db_name < seed.sql
--       or via psql / DBeaver / DataGrip
-- ============================================================

-- ─── USERS ───────────────────────────────────────────────────
INSERT INTO users (name, created_at) VALUES
  ('Alice Johnson',  NOW() - INTERVAL 30 DAY),
  ('Bob Smith',      NOW() - INTERVAL 25 DAY),
  ('Carol White',    NOW() - INTERVAL 20 DAY),
  ('David Brown',    NOW() - INTERVAL 15 DAY),
  ('Eve Davis',      NOW() - INTERVAL 10 DAY);

-- ─── TASKS ───────────────────────────────────────────────────
-- status:   backlog | in_progress | done
-- priority: low | medium | high

INSERT INTO tasks (title, description, status, priority, created_by_id, assignee_id) VALUES
  (
    'Setup CI/CD pipeline',
    'Configure GitHub Actions for automated testing and deployment',
    'done', 'high', 1, 2
  ),
  (
    'Design database schema',
    'Create ERD and define all table relationships',
    'done', 'high', 1, 1
  ),
  (
    'Implement user authentication',
    'Add JWT-based auth with refresh tokens',
    'in_progress', 'high', 2, 3
  ),
  (
    'Write API documentation',
    'Document all endpoints using OpenAPI/Swagger',
    'in_progress', 'medium', 3, 4
  ),
  (
    'Add unit tests for CRUD operations',
    'Cover all task and user endpoints with pytest',
    'backlog', 'medium', 2, 2
  ),
  (
    'Optimize slow database queries',
    'Profile queries and add missing indexes',
    'backlog', 'high', 1, 3
  ),
  (
    'Build frontend task list page',
    'React page with filters, pagination and task cards',
    'done', 'high', 4, 4
  ),
  (
    'Implement task changelog',
    'Track all field changes with who changed what and when',
    'done', 'medium', 3, 5
  ),
  (
    'Add email notifications',
    'Send email when task is assigned or status changes',
    'backlog', 'low', 5, 1
  ),
  (
    'Setup Docker Compose',
    'Containerize backend, frontend and database services',
    'in_progress', 'medium', 1, 5
  ),
  (
    'Code review: auth module',
    'Review PR #42 — authentication and session handling',
    'backlog', 'medium', 2, 1
  ),
  (
    'Fix pagination bug',
    'Last page returns duplicate items when total is divisible by page size',
    'done', 'high', 3, 3
  ),
  (
    'Migrate to async SQLAlchemy',
    'Replace sync DB calls with async equivalents throughout the app',
    'done', 'high', 1, 2
  ),
  (
    'Create statistics dashboard',
    'Charts for avg time per status and top productive users',
    'in_progress', 'medium', 4, 4
  ),
  (
    'Refactor error handling',
    'Centralize exception handling with custom FastAPI exception handlers',
    'backlog', 'low', 5, 5
  ),
  (
    'Add task search endpoint',
    'Full-text search across title and description fields',
    'backlog', 'medium', 2, 3
  ),
  (
    'Setup logging system',
    'Structured JSON logging with log levels and rotation',
    'done', 'medium', 3, 1
  ),
  (
    'Performance load testing',
    'Run k6 load tests against all critical API endpoints',
    'backlog', 'high', 1, 4
  ),
  (
    'Update dependencies',
    'Bump all outdated packages and check for breaking changes',
    'done', 'low', 4, 2
  ),
  (
    'Write onboarding guide',
    'Developer onboarding doc: local setup, env vars, DB migrations',
    'in_progress', 'low', 5, 3
  );

-- ─── TASKS CHANGELOGS ────────────────────────────────────────
-- Simulates some history of changes on completed/in-progress tasks

INSERT INTO tasks_changelogs (task_id, changed_by, field, old_value, new_value, created_at) VALUES
  -- Task 1: backlog → in_progress → done
  (1, 1, 'status', 'backlog',     'in_progress', NOW() - INTERVAL 28 DAY),
  (1, 2, 'status', 'in_progress', 'done',        NOW() - INTERVAL 26 DAY),

  -- Task 2: backlog → done
  (2, 1, 'status', 'backlog',     'in_progress', NOW() - INTERVAL 23 DAY),
  (2, 1, 'status', 'in_progress', 'done',        NOW() - INTERVAL 21 DAY),

  -- Task 7: backlog → in_progress → done
  (7, 4, 'status', 'backlog',     'in_progress', NOW() - INTERVAL 18 DAY),
  (7, 4, 'status', 'in_progress', 'done',        NOW() - INTERVAL 14 DAY),
  (7, 4, 'assignee_id', '5', '4',                NOW() - INTERVAL 16 DAY),

  -- Task 8: backlog → done
  (8, 3, 'status', 'backlog',     'in_progress', NOW() - INTERVAL 12 DAY),
  (8, 5, 'status', 'in_progress', 'done',        NOW() - INTERVAL 10 DAY),

  -- Task 12: backlog → in_progress → done
  (12, 3, 'status', 'backlog',     'in_progress', NOW() - INTERVAL 9 DAY),
  (12, 3, 'status', 'in_progress', 'done',        NOW() - INTERVAL 7 DAY),
  (12, 1, 'priority', 'low', 'high',              NOW() - INTERVAL 8 DAY),

  -- Task 13: backlog → done
  (13, 1, 'status', 'backlog',     'in_progress', NOW() - INTERVAL 6 DAY),
  (13, 2, 'status', 'in_progress', 'done',        NOW() - INTERVAL 4 DAY),

  -- Task 17: backlog → done
  (17, 3, 'status', 'backlog',     'in_progress', NOW() - INTERVAL 5 DAY),
  (17, 1, 'status', 'in_progress', 'done',        NOW() - INTERVAL 3 DAY),

  -- Task 19: backlog → done
  (19, 4, 'status', 'backlog',     'in_progress', NOW() - INTERVAL 4 DAY),
  (19, 2, 'status', 'in_progress', 'done',        NOW() - INTERVAL 2 DAY),

  -- Task 3: backlog → in_progress (still open)
  (3, 2, 'status', 'backlog',     'in_progress', NOW() - INTERVAL 3 DAY),

  -- Task 14: backlog → in_progress (still open)
  (14, 4, 'status', 'backlog',     'in_progress', NOW() - INTERVAL 2 DAY);