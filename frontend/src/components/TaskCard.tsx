import {useState} from 'react'
import StatusBadge from './StatusBadge'
import PriorityBadge from './PriorityBadge'

export default function TaskCard({task, users = [], onEdit, onDelete}) {
    const [confirming, setConfirming] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const assignee = users.find((u) => u.id === task.assignee_id)
    const creator = users.find((u) => u.id === task.created_by_id)

    async function handleDelete() {
        setDeleting(true)
        await onDelete(task.id)
        setDeleting(false)
        setConfirming(false)
    }

    return (
        <div
            className="bg-gb-card border-2 border-gb-border font-mono transition-all duration-100 table-row-hover"
            style={{borderLeft: '3px solid transparent'}}
        >
            {/* Header row */}
            <div className="flex items-start justify-between gap-4 p-4 border-b border-gb-border">
                <div className="flex items-center gap-3 flex-wrap min-w-0">
                    <span className="text-gb-muted text-xs whitespace-nowrap">#{task.id}</span>
                    <span className="text-gb-text font-bold text-sm truncate max-w-xs">{task.title}</span>
                    <StatusBadge status={task.status}/>
                    <PriorityBadge priority={task.priority}/>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    {!confirming ? (
                        <>
                            <button
                                className="gb-btn text-xs px-3 py-1"
                                onClick={() => onEdit(task)}
                            >
                                EDIT
                            </button>
                            <button
                                className="gb-btn-danger text-xs px-3 py-1"
                                onClick={() => setConfirming(true)}
                            >
                                DEL
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-2">
                            <span className="text-red-400 text-xs uppercase tracking-wider whitespace-nowrap">CONFIRM DELETE?</span>
                            <button
                                className="gb-btn-danger text-xs px-2 py-1"
                                onClick={handleDelete}
                                disabled={deleting}
                            >
                                {deleting ? '...' : 'YES'}
                            </button>
                            <button
                                className="gb-btn text-xs px-2 py-1"
                                onClick={() => setConfirming(false)}
                            >
                                NO
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Body row */}
            <div className="px-4 py-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div>
                    <span className="text-gb-muted uppercase tracking-wider">DESC:</span>
                    <p className="text-gb-text mt-0.5 line-clamp-2">{task.description ||
                        <span className="text-gb-muted">—</span>}</p>
                </div>
                <div>
                    <span className="text-gb-muted uppercase tracking-wider">CREATED_BY:</span>
                    <p className="text-gb-text mt-0.5">{creator?.name ?? '—'}</p>
                </div>
                <div>
                    <span className="text-gb-muted uppercase tracking-wider">ASSIGNEE:</span>
                    <p className="text-gb-text mt-0.5">{assignee?.name ?? '—'}</p>
                </div>
            </div>
        </div>
    )
}