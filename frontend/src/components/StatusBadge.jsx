const STATUS_COLORS = {
    BACKLOG:     { bg: '#6b7280', text: '#f5f5f5' },
    IN_PROGRESS: { bg: '#f97316', text: '#1a1a1a' },
    DONE:        { bg: '#22c55e', text: '#1a1a1a' },
}

export default function StatusBadge({ status }) {
    const colors = STATUS_COLORS[status] || { bg: '#3d3d3d', text: '#f5f5f5' }
    return (
        <span
            className="font-mono text-xs font-bold px-2 py-0.5 uppercase tracking-wider"
            style={{
                backgroundColor: colors.bg,
                color: colors.text,
                border: `1px solid ${colors.bg}`,
            }}
        >
      {status?.replace('_', ' ') || '—'}
    </span>
    )
}

export { STATUS_COLORS }