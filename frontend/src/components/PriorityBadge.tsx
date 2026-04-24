import { TaskPriority } from '../types'

interface PriorityColors {
    bg: string
    text: string
}

const PRIORITY_COLORS: Record<TaskPriority, PriorityColors> = {
    LOW:      { bg: '#6b7280', text: '#f5f5f5' },
    MEDIUM:   { bg: '#3b82f6', text: '#f5f5f5' },
    HIGH:     { bg: '#f97316', text: '#1a1a1a' },
    CRITICAL: { bg: '#ef4444', text: '#f5f5f5' },
}

interface Props {
    priority: TaskPriority | string
}

export default function PriorityBadge({ priority }: Props) {
    const colors = PRIORITY_COLORS[priority as TaskPriority] ?? { bg: '#3d3d3d', text: '#f5f5f5' }
    return (
        <span
            className="font-mono text-xs font-bold px-2 py-0.5 uppercase tracking-wider"
            style={{ backgroundColor: colors.bg, color: colors.text, border: `1px solid ${colors.bg}` }}
        >
      {priority ?? '—'}
    </span>
    )
}

export { PRIORITY_COLORS }