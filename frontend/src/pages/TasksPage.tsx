import { useState, useEffect, useCallback } from 'react'
import { fetchTasks, createTask, updateTask, deleteTask } from '../api/tasksApi'
import { fetchUsers, createUser, deleteUser } from '../api/usersApi'
import Filters from '../components/Filters'
import TaskCard from '../components/TaskCard'
import TaskModal from '../components/TaskModal'
import UserModal from '../components/UserModal'

export default function TasksPage() {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [filters, setFilters] = useState({ title: '', status: 'ALL', priority: 'ALL' })

    const [users, setUsers] = useState([])
    const [usersOpen, setUsersOpen] = useState(false)
    const [deletingUserId, setDeletingUserId] = useState(null)

    const [modal, setModal] = useState(null)

    const loadTasks = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await fetchTasks(filters)
            setTasks(Array.isArray(data) ? data : (data.items || data.tasks || []))
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [filters])

    const loadUsers = useCallback(async () => {
        try {
            const data = await fetchUsers()
            setUsers(Array.isArray(data) ? data : (data.items || data.users || []))
        } catch {}
    }, [])

    useEffect(() => { loadTasks() }, [loadTasks])
    useEffect(() => { loadUsers() }, [loadUsers])

    async function handleCreate(payload) {
        await createTask(payload)
        await loadTasks()
    }

    async function handleEdit(payload, changedById) {
        await updateTask(modal.task.id, payload, changedById)
        await loadTasks()
    }

    async function handleDeleteTask(id) {
        await deleteTask(id)
        setTasks((prev) => prev.filter((t) => t.id !== id))
    }

    async function handleDeleteUser(id) {
        setDeletingUserId(id)
        try {
            await deleteUser(id)
            await loadUsers()
        } finally {
            setDeletingUserId(null)
        }
    }

    return (
        <div className="font-mono">
            {/* Page Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b-2 border-gb-border pb-4">
                <div>
                    <h1 className="text-gb-text text-lg font-bold uppercase tracking-widest">
                        &gt; TASK LIST
                    </h1>
                    <p className="text-gb-muted text-xs mt-0.5">
                        {loading ? '...' : `${tasks.length} RECORD(S) FOUND`}
                    </p>
                </div>

                {/* Buttons group */}
                <div className="flex items-center gap-2">
                    <button
                        className="gb-btn text-xs px-3 py-1.5 tracking-widest"
                        onClick={() => setUsersOpen((v) => !v)}
                    >
                        USERS {usersOpen ? '▲' : '▼'}
                    </button>
                    <button
                        className="gb-btn text-xs px-3 py-1.5 tracking-widest"
                        onClick={() => setModal({ mode: 'create-user' })}
                    >
                        + USER
                    </button>
                    <button
                        className="gb-btn-primary text-xs px-3 py-1.5 tracking-widest"
                        onClick={() => setModal({ mode: 'create' })}
                    >
                        + NEW TASK
                    </button>
                </div>
            </div>

            {/* Users Panel */}
            {usersOpen && (
                <div className="mb-5 bg-gb-card border-2 border-gb-border">
                    <div className="px-4 py-2 border-b border-gb-border flex items-center justify-between">
                        <span className="text-gb-orange text-xs font-bold uppercase tracking-widest">
                            [ USERS — {users.length} ]
                        </span>
                    </div>
                    {users.length === 0 ? (
                        <p className="text-gb-muted text-xs uppercase tracking-wider text-center py-6">
                            &gt; NO USERS FOUND
                        </p>
                    ) : (
                        <div className="divide-y divide-gb-border">
                            {users.map((u) => (
                                <div key={u.id} className="flex items-center justify-between px-4 py-2.5 hover:bg-gb-bg transition-colors">
                                    <div className="flex items-center gap-4">
                                        <span className="text-gb-muted text-xs">#{u.id}</span>
                                        <span className="text-gb-text text-sm">{u.name}</span>
                                        {u.email && (
                                            <span className="text-gb-muted text-xs">{u.email}</span>
                                        )}
                                    </div>
                                    <button
                                        className="gb-btn-danger text-xs px-2 py-1"
                                        onClick={() => handleDeleteUser(u.id)}
                                        disabled={deletingUserId === u.id}
                                    >
                                        {deletingUserId === u.id ? '...' : 'DEL'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Filters */}
            <div className="mb-5">
                <Filters filters={filters} onChange={setFilters} />
            </div>

            {/* Task List */}
            <div className="flex flex-col gap-2">
                {loading && (
                    <div className="text-center py-16">
                        <span className="text-gb-muted text-sm uppercase tracking-widest blink">[ LOADING... ]</span>
                    </div>
                )}
                {!loading && error && (
                    <div className="text-center py-16">
                        <span className="text-red-400 text-sm uppercase tracking-widest">! API ERROR: {error}</span>
                    </div>
                )}
                {!loading && !error && tasks.length === 0 && (
                    <div className="text-center py-16">
                        <span className="text-gb-muted text-sm uppercase tracking-widest">&gt; NO TASKS FOUND</span>
                    </div>
                )}
                {!loading && !error && tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        users={users}
                        onEdit={(t) => setModal({ mode: 'edit', task: t })}
                        onDelete={handleDeleteTask}
                    />
                ))}
            </div>

            {/* Modals */}
            {(modal?.mode === 'create' || modal?.mode === 'edit') && (
                <TaskModal
                    mode={modal.mode}
                    task={modal.task}
                    onClose={() => setModal(null)}
                    onSubmit={modal.mode === 'create' ? handleCreate : handleEdit}
                />
            )}
            {modal?.mode === 'create-user' && (
                <UserModal
                    onClose={() => setModal(null)}
                    onSubmit={async (payload) => {
                        await createUser(payload)
                        await loadUsers()
                        setModal(null)
                    }}
                />
            )}
        </div>
    )
}