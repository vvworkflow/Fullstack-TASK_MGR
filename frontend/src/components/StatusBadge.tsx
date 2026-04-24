import { TaskStatus } from '../types'

interface StatusColors {
    bg: string
    text: string
}

const STATUS_COLORS: Record<TaskStatus, StatusColors> = {
    BACKLOG:     { bg: '#6b7280', text: '#f5f5f5' },
    IN_PROGRESS: { bg: '#f97316', text: '#1a1a1a' },
    REVIEW:      { bg: '#eab308', text: '#1a1a1a' },
    DONE:        { bg: '#22c55e', text: '#1a1a1a' },
    ARCHIVE:     { bg: '#8aaad2', text: '#1a1a1a'}
}

interface Props {
    status: TaskStatus | string
}

export default function StatusBadge({ status }: Props) {
    const colors = STATUS_COLORS[status as TaskStatus] ?? { bg: '#3d3d3d', text: '#f5f5f5' }
    return (
        <span
            className="font-mono text-xs font-bold px-2 py-0.5 uppercase tracking-wider"
            style={{ backgroundColor: colors.bg, color: colors.text, border: `1px solid ${colors.bg}` }}
        >
      {status?.replace('_', ' ') ?? '—'}
    </span>
    )
}

export { STATUS_COLORS }