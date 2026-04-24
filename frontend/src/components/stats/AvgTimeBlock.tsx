import { AvgTimeEntry } from '../../types'
import StatusBadge from '../StatusBadge'
import { formatSeconds } from '../../utils/formatSeconds'

interface Props {
    entry: AvgTimeEntry
}

export default function AvgTimeBlock({ entry }: Props) {
    return (
        <div className="bg-gb-card border-2 border-gb-border flex items-center gap-4 px-5 py-4">
            <div className="flex-shrink-0">
                <StatusBadge status={entry.status} />
            </div>
            <div className="flex-1 border-l-2 border-gb-border pl-4">
                <p className="text-gb-muted text-xs uppercase tracking-wider mb-1">AVG TIME</p>
                <p className="text-gb-text text-2xl font-bold tracking-wider">
                    {formatSeconds(entry.avg_seconds)}
                </p>
            </div>
            {entry.task_count != null && (
                <div className="text-right">
                    <p className="text-gb-muted text-xs uppercase tracking-wider">TASKS</p>
                    <p className="text-gb-muted text-sm">{entry.task_count}</p>
                </div>
            )}
        </div>
    )
}