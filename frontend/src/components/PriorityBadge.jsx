const PRIORITY_COLORS = {
    LOW:      { bg: '#6b7280', text: '#f5f5f5' },
    MEDIUM:   { bg: '#3b82f6', text: '#f5f5f5' },
    HIGH:     { bg: '#f97316', text: '#1a1a1a' },
}

export default function PriorityBadge({ priority }) {
    const colors = PRIORITY_COLORS[priority] || { bg: '#3d3d3d', text: '#f5f5f5' }
    return (
        <span
            className="font-mono text-xs font-bold px-2 py-0.5 uppercase tracking-wider"
            style={{
                backgroundColor: colors.bg,
                color: colors.text,
                border: `1px solid ${colors.bg}`,
            }}
        >
      {priority || '—'}
    </span>
    )
}

export { PRIORITY_COLORS }