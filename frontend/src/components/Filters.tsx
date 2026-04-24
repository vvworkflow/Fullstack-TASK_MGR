import { useState } from 'react'

const STATUSES = ['ALL', 'BACKLOG', 'IN_PROGRESS', 'DONE']
const PRIORITIES = ['ALL', 'LOW', 'MEDIUM', 'HIGH']

export default function Filters({ filters, onChange }) {
    const [titleInput, setTitleInput] = useState(filters.title || '')

    function handleTitleKeyDown(e) {
        if (e.key === 'Enter') {
            onChange({ ...filters, title: titleInput })
        }
    }

    function handleTitleBlur() {
        onChange({ ...filters, title: titleInput })
    }

    return (
        <div className="flex flex-wrap gap-3 items-center">
            {/* Title filter */}
            <div className="flex items-center gap-0">
        <span className="text-gb-muted text-xs px-2 py-2 border-2 border-r-0 border-gb-border bg-gb-bg uppercase tracking-wider whitespace-nowrap">
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

            {/* Status filter */}
            <div className="flex items-center gap-0">
        <span className="text-gb-muted text-xs px-2 py-2 border-2 border-r-0 border-gb-border bg-gb-bg uppercase tracking-wider whitespace-nowrap">
          STATUS:
        </span>
                <div className="relative">
                    <select
                        className="gb-select border-2 border-gb-border pr-8 pl-3"
                        value={filters.status || 'ALL'}
                        onChange={(e) => onChange({ ...filters, status: e.target.value })}
                    >
                        {STATUSES.map((s) => (
                            <option key={s} value={s}>{s.replace('_', ' ')}</option>
                        ))}
                    </select>
                    <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gb-muted text-xs">▼</span>
                </div>
            </div>

            {/* Priority filter */}
            <div className="flex items-center gap-0">
        <span className="text-gb-muted text-xs px-2 py-2 border-2 border-r-0 border-gb-border bg-gb-bg uppercase tracking-wider whitespace-nowrap">
          PRIORITY:
        </span>
                <div className="relative">
                    <select
                        className="gb-select border-2 border-gb-border pr-8 pl-3"
                        value={filters.priority || 'ALL'}
                        onChange={(e) => onChange({ ...filters, priority: e.target.value })}
                    >
                        {PRIORITIES.map((p) => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                    <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gb-muted text-xs">▼</span>
                </div>
            </div>

            {/* Clear */}
            {(filters.title || filters.status !== 'ALL' || filters.priority !== 'ALL') && (
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