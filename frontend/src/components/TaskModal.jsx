import {useState, useEffect} from 'react'
import {fetchUsers} from '../api/usersApi'

const STATUSES = ['BACKLOG', 'IN_PROGRESS', 'DONE']
const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH']

const EMPTY_FORM = {
    title: '',
    description: '',
    status: 'BACKLOG',
    priority: 'MEDIUM',
    created_by_id: '',
    assignee_id: '',
    changed_by_id: '',
}

export default function TaskModal({mode, task, onClose, onSubmit}) {
    const isEdit = mode === 'edit'
    const [form, setForm] = useState(EMPTY_FORM)
    const [users, setUsers] = useState([])
    useEffect(() => {
        fetchUsers().then(setUsers).catch(() => {
        })
    }, [])
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (isEdit && task) {
            setForm({
                title: task.title || '',
                description: task.description || '',
                status: task.status || 'BACKLOG',
                priority: task.priority || 'MEDIUM',
                assignee_id: task.assignee_id ?? '',
                changed_by_id: task.changed_by_id ?? '',
            })
        } else {
            setForm(EMPTY_FORM)
        }
    }, [task, isEdit])

    function set(field) {
        return (e) => setForm((prev) => ({...prev, [field]: e.target.value}))
    }

    async function handleSubmit() {
        if (!form.title.trim()) {
            setError('TITLE IS REQUIRED')
            return
        }
        if (!isEdit && !form.created_by_id) {
            setError('CREATED_BY_ID IS REQUIRED')
            return
        }
        setSubmitting(true)
        setError(null)
        try {
            const payload = {
                title: form.title,
                description: form.description || null,
                status: form.status,
                priority: form.priority,
                assignee_id: form.assignee_id !== '' ? Number(form.assignee_id) : null,
            }
            if (!isEdit) {
                payload.created_by_id = form.created_by_id !== '' ? Number(form.created_by_id) : null
            }
            const changedById = form.changed_by_id ? Number(form.changed_by_id) : 1  // ← добавить
            await onSubmit(payload, changedById)  // ← изменить
            onClose()
        } catch (err) {
            setError('! API ERROR: ' + err.message)
        } finally {
            setSubmitting(false)
        }
    }

    function handleBackdrop(e) {
        if (e.target === e.currentTarget) onClose()
    }

    return (
        <div
            className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
            onClick={handleBackdrop}
        >
            <div className="modal-box bg-gb-card border-2 border-gb-orange w-full max-w-lg font-mono">
                {/* Modal Header */}
                <div className="flex items-center justify-between px-5 py-3 border-b-2 border-gb-border">
          <span className="text-gb-orange text-sm font-bold uppercase tracking-widest">
            {isEdit ? `[ EDIT TASK #${task?.id} ]` : '[ NEW TASK ]'}
          </span>
                    <button
                        onClick={onClose}
                        className="text-gb-muted hover:text-gb-orange text-lg leading-none transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-5 flex flex-col gap-4">
                    {/* Title */}
                    <div>
                        <label className="text-gb-muted text-xs uppercase tracking-wider block mb-1">TITLE *</label>
                        <input
                            type="text"
                            className="gb-input"
                            value={form.title}
                            onChange={set('title')}
                            placeholder="task title..."
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-gb-muted text-xs uppercase tracking-wider block mb-1">DESCRIPTION</label>
                        <textarea
                            className="gb-input resize-none h-24"
                            value={form.description}
                            onChange={set('description')}
                            placeholder="task description..."
                        />
                    </div>

                    {/* Status + Priority */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-gb-muted text-xs uppercase tracking-wider block mb-1">STATUS</label>
                            <div className="relative">
                                <select className="gb-select w-full pr-8" value={form.status} onChange={set('status')}>
                                    {STATUSES.map((s) => (
                                        <option key={s} value={s}>{s.replace('_', ' ')}</option>
                                    ))}
                                </select>
                                <span
                                    className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gb-muted text-xs">▼</span>
                            </div>
                        </div>
                        <div>
                            <label
                                className="text-gb-muted text-xs uppercase tracking-wider block mb-1">PRIORITY</label>
                            <div className="relative">
                                <select className="gb-select w-full pr-8" value={form.priority}
                                        onChange={set('priority')}>
                                    {PRIORITIES.map((p) => (
                                        <option key={p} value={p}>{p}</option>
                                    ))}
                                </select>
                                <span
                                    className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gb-muted text-xs">▼</span>
                            </div>
                        </div>
                    </div>

                    {/* IDs */}
                    <div className="grid grid-cols-2 gap-3">
                        {!isEdit && (
                            <div>
                                <label
                                    className="text-gb-muted text-xs uppercase tracking-wider block mb-1">CREATED_BY_ID</label>
                                <select className="gb-select w-full pr-8" value={form.created_by_id}
                                        onChange={set('created_by_id')}>
                                    <option value="">— select —</option>
                                    {users.map((u) => (
                                        <option key={u.id} value={u.id}>{u.username} {u.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <div className={isEdit ? 'col-span-2' : ''}>
                            <label
                                className="text-gb-muted text-xs uppercase tracking-wider block mb-1">ASSIGNEE_ID</label>
                            <select className="gb-select w-full pr-8" value={form.assignee_id}
                                    onChange={set('assignee_id')}>
                                <option value="">— select —</option>
                                {users.map((u) => (
                                    <option key={u.id} value={u.id}>{u.username} {u.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {isEdit && (
                        <div>
                            <label
                                className="text-gb-muted text-xs uppercase tracking-wider block mb-1">CHANGED_BY_ID</label>
                            <div className="relative">
                                <select className="gb-select w-full pr-8" value={form.changed_by_id}
                                        onChange={set('changed_by_id')}>
                                    <option value="">— select —</option>
                                    {users.map((u) => (
                                        <option key={u.id} value={u.id}>{u.username} {u.name}</option>
                                    ))}
                                </select>
                                <span
                                    className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gb-muted text-xs">▼</span>
                            </div>
                        </div>
                    )}
                    {/* Error */}
                    {error && (
                        <p className="text-red-400 text-xs uppercase tracking-wider">{error}</p>
                    )}
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end gap-3 px-5 py-3 border-t-2 border-gb-border">
                    <button className="gb-btn text-xs" onClick={onClose}>CANCEL</button>
                    <button
                        className="gb-btn-primary text-xs"
                        onClick={handleSubmit}
                        disabled={submitting}
                    >
                        {submitting ? '[ SAVING... ]' : (isEdit ? 'SAVE CHANGES' : 'CREATE')}
                    </button>
                </div>
            </div>
        </div>
    )
}