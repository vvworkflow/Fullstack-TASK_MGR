import { useState } from 'react'
import { TaskStatus, TaskPriority } from '../types'

const STATUSES: Array<TaskStatus | 'ALL'> = ['ALL', 'BACKLOG', 'IN_PROGRESS', 'REVIEW', 'DONE']
const PRIORITIES: Array<TaskPriority | 'ALL'> = ['ALL', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL']

interface FilterState {
    title: string
    status: TaskStatus | 'ALL'
    priority: TaskPriority | 'ALL'
}

interface Props {
    filters: FilterState
    onChange: (filters: FilterState) => void
}

export default function Filters({ filters, onChange }: Props) {
    const [titleInput, setTitleInput] = useState(filters.title)

    function handleTitleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') onChange({ ...filters, title: titleInput })
    }

    function handleTitleBlur() {
        onChange({ ...filters, title: titleInput })
    }

    const isFiltered = filters.title || filters.status !== 'ALL' || filters.priority !== 'ALL'

    return (
        <div className="flex flex-wrap gap-3 items-center">
            {/* Title */}
            <div className="flex items-center">
        <span className="text-gb-muted text-xs px-2 py-2 border-2 border-r-0 border-gb-border bg-gb-bg uppercase tracking-wider">
          TITLE:
        </span>
                <input
                    type="text"
                    className="gb-input border-2 border-gb-border w-44"
                    placeholder="search..."
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    onKeyDown={handleTitleKeyDown}
                    onBlur={handleTitleBlur}
                />
            </div>

            {/* Status */}
            <div className="flex items-center">
        <span className="text-gb-muted text-xs px-2 py-2 border-2 border-r-0 border-gb-border bg-gb-bg uppercase tracking-wider">
          STATUS:
        </span>
                <div className="relative">
                    <select
                        className="gb-select border-2 border-gb-border pr-8 pl-3"
                        value={filters.status}
                        onChange={(e) => onChange({ ...filters, status: e.target.value as TaskStatus | 'ALL' })}
                    >
                        {STATUSES.map((s) => (
                            <option key={s} value={s}>{s.replace('_', ' ')}</option>
                        ))}
                    </select>
                    <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gb-muted text-xs">▼</span>
                </div>
            </div>

            {/* Priority */}
            <div className="flex items-center">
        <span className="text-gb-muted text-xs px-2 py-2 border-2 border-r-0 border-gb-border bg-gb-bg uppercase tracking-wider">
          PRIORITY:
        </span>
                <div className="relative">
                    <select
                        className="gb-select border-2 border-gb-border pr-8 pl-3"
                        value={filters.priority}
                        onChange={(e) => onChange({ ...filters, priority: e.target.value as TaskPriority | 'ALL' })}
                    >
                        {PRIORITIES.map((p) => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                    <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gb-muted text-xs">▼</span>
                </div>
            </div>

            {/* Clear */}
            {isFiltered && (
                <button
                    className="gb-btn text-xs px-3 py-2"
                    onClick={() => {
                        setTitleInput('')
                        onChange({ title: '', status: 'ALL', priority: 'ALL' })
                    }}
                >
                    [CLEAR]
                </button>
            )}
        </div>
    )
}