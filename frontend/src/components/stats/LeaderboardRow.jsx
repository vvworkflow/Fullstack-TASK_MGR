import { formatSeconds } from '../../utils/formatSeconds'

export default function LeaderboardRow({ rank, entry }) {
  const isFirst = rank === 1
  return (
    <div
      className="bg-gb-card border-2 flex items-center gap-4 px-5 py-4"
      style={{ borderColor: isFirst ? '#f97316' : '#3d3d3d' }}
    >
      <div
        className="text-2xl font-bold w-10 text-center flex-shrink-0"
        style={{ color: isFirst ? '#f97316' : '#9ca3af' }}
      >
        #{rank}
      </div>
      <div className="w-px h-10 bg-gb-border flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p
          className="font-bold text-sm uppercase tracking-wider truncate"
          style={{ color: isFirst ? '#f97316' : '#f5f5f5' }}
        >
          {entry.username || `USER_${entry.user_id || rank}`}
        </p>
        <p className="text-gb-muted text-xs mt-0.5">{entry.tasks_done ?? '—'} TASKS DONE</p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-gb-muted text-xs uppercase tracking-wider">AVG TO DONE</p>
        <p className="text-lg font-bold tracking-wider" style={{ color: isFirst ? '#f97316' : '#f5f5f5' }}>
          {formatSeconds(entry.avg_seconds_to_done)}
        </p>
      </div>
    </div>
  )
}