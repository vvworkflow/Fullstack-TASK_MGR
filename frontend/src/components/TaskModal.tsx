import { useState, useEffect } from 'react'
import { Task, User, TaskStatus, TaskPriority, TaskCreatePayload, TaskUpdatePayload } from '../types'

const STATUSES: TaskStatus[] = ['BACKLOG', 'IN_PROGRESS', 'REVIEW', 'DONE', 'ARCHIVE']
const PRIORITIES: TaskPriority[] = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']

interface FormState {
    title: string
    description: string
    status: TaskStatus
    priority: TaskPriority
    created_by_id: number | ''
    assignee_id: number | ''
    changed_by_id: number | ''
}

const EMPTY_FORM: FormState = {
    title: '',
    description: '',
    status: 'BACKLOG',
    priority: 'MEDIUM',
    created_by_id: '',
    assignee_id: '',
    changed_by_id: '',
}

interface Props {
    mode: 'create' | 'edit'
    task?: Task
    users: User[]
    onClose: () => void
    onSubmit: (payload: TaskCreatePayload | TaskUpdatePayload, changedById: number) => Promise<void>
}

export default function TaskModal({ mode, task, users, onClose, onSubmit }: Props) {
    const isEdit = mode === 'edit'
    const [form, setForm] = useState<FormState>(EMPTY_FORM)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (isEdit && task) {
            setForm({
                title: task.title,
                description: task.description ?? '',
                status: task.status,
                priority: task.priority,
                assignee_id: task.assignee_id ?? '',
                created_by_id: '',
                changed_by_id: '',
            })
        } else {
            setForm(EMPTY_FORM)
        }
    }, [task, isEdit])

    function set<K extends keyof FormState>(field: K) {
        return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
            setForm((prev) => ({ ...prev, [field]: e.target.value }))
        }
    }

    async function handleSubmit() {
        if (!form.title.trim()) {
            setError('TITLE IS REQUIRED')
            return
        }
        if (!isEdit && !form.created_by_id) {
            setError('CREATED_BY IS REQUIRED')
            return
        }

        setSubmitting(true)
        setError(null)

        try {
            const changedById = form.changed_by_id ? Number(form.changed_by_id) : 1

            if (isEdit) {
                const payload: TaskUpdatePayload = {
                    title: form.title,
                    description: form.description || null,
                    status: form.status,
                    priority: form.priority,
                    assignee_id: form.assignee_id !== '' ? Number(form.assignee_id) : null,
                }
                await onSubmit(payload, changedById)
            } else {
                const payload: TaskCreatePayload = {
                    title: form.title,
                    description: form.description || null,
                    status: form.status,
                    priority: form.priority,
                    created_by_id: Number(form.created_by_id),
                    assignee_id: form.assignee_id !== '' ? Number(form.assignee_id) : null,
                }
                await onSubmit(payload, changedById)
            }
            onClose()
        } catch (err) {
            setError('! API ERROR: ' + (err as Error).message)
        } finally {
            setSubmitting(false)
        }
    }

    function handleBackdrop(e: React.MouseEvent<HTMLDivElement>) {
        if (e.target === e.currentTarget) onClose()
    }

    const SelectArrow = () => (
        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gb-muted text-xs">▼</span>
    )

    return (
        <div
            className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
            onClick={handleBackdrop}
        >
            <div className="modal-box bg-gb-card border-2 border-gb-orange w-full max-w-lg font-mono">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-3 border-b-2 border-gb-border">
          <span className="text-gb-orange text-sm font-bold uppercase tracking-widest">
            {isEdit ? `[ EDIT TASK #${task?.id} ]` : '[ NEW TASK ]'}
          </span>
                    <button onClick={onClose} className="text-gb-muted hover:text-gb-orange text-lg leading-none transition-colors">
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col gap-4">
                    {/* Title */}
                    <div>
                        <label className="text-gb-muted text-xs uppercase tracking-wider block mb-1">TITLE *</label>
                        <input type="text" className="gb-input" value={form.title} onChange={set('title')} placeholder="task title..." />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-gb-muted text-xs uppercase tracking-wider block mb-1">DESCRIPTION</label>
                        <textarea className="gb-input resize-none h-24" value={form.description} onChange={set('description')} placeholder="task description..." />
                    </div>

                    {/* Status + Priority */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-gb-muted text-xs uppercase tracking-wider block mb-1">STATUS</label>
                            <div className="relative">
                                <select className="gb-select w-full pr-8" value={form.status} onChange={set('status')}>
                                    {STATUSES.map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                                </select>
                                <SelectArrow />
                            </div>
                        </div>
                        <div>
                            <label className="text-gb-muted text-xs uppercase tracking-wider block mb-1">PRIORITY</label>
                            <div className="relative">
                                <select className="gb-select w-full pr-8" value={form.priority} onChange={set('priority')}>
                                    {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
                                </select>
                                <SelectArrow />
                            </div>
                        </div>
                    </div>

                    {/* IDs */}
                    <div className="grid grid-cols-2 gap-3">
                        {!isEdit && (
                            <div>
                                <label className="text-gb-muted text-xs uppercase tracking-wider block mb-1">CREATED_BY *</label>
                                <div className="relative">
                                    <select className="gb-select w-full pr-8" value={form.created_by_id} onChange={set('created_by_id')}>
                                        <option value="">— select —</option>
                                        {users.map((u) => <option key={u.id} value={u.id}>{u.fullname} (#{u.id})</option>)}
                                    </select>
                                    <SelectArrow />
                                </div>
                            </div>
                        )}
                        <div className={isEdit ? 'col-span-2' : ''}>
                            <label className="text-gb-muted text-xs uppercase tracking-wider block mb-1">ASSIGNEE</label>
                            <div className="relative">
                                <select className="gb-select w-full pr-8" value={form.assignee_id} onChange={set('assignee_id')}>
                                    <option value="">— select —</option>
                                    {users.map((u) => <option key={u.id} value={u.id}>{u.fullname} (#{u.id})</option>)}
                                </select>
                                <SelectArrow />
                            </div>
                        </div>
                    </div>

                    {/* Changed by — только при редактировании */}
                    {isEdit && (
                        <div>
                            <label className="text-gb-muted text-xs uppercase tracking-wider block mb-1">CHANGED_BY</label>
                            <div className="relative">
                                <select className="gb-select w-full pr-8" value={form.changed_by_id} onChange={set('changed_by_id')}>
                                    <option value="">— select —</option>
                                    {users.map((u) => <option key={u.id} value={u.id}>{u.fullname} (#{u.id})</option>)}
                                </select>
                                <SelectArrow />
                            </div>
                        </div>
                    )}

                    {error && <p className="text-red-400 text-xs uppercase tracking-wider">{error}</p>}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-5 py-3 border-t-2 border-gb-border">
                    <button className="gb-btn text-xs" onClick={onClose}>CANCEL</button>
                    <button className="gb-btn-primary text-xs" onClick={handleSubmit} disabled={submitting}>
                        {submitting ? '[ SAVING... ]' : isEdit ? 'SAVE CHANGES' : 'CREATE'}
                    </button>
                </div>
            </div>
        </div>
    )
}