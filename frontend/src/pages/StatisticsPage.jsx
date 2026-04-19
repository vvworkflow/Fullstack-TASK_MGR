import { useState, useEffect } from 'react'
import { fetchAvgTimePerStatus, fetchTopProductiveUsers } from '../api/statisticsApi'
import StatusBadge from '../components/StatusBadge'

function formatSeconds(s) {
    if (s == null || isNaN(s)) return '—'
    const secs = Math.round(s)
    if (secs < 60) return `${secs}s`
    if (secs < 3600) {
        const m = Math.floor(secs / 60)
        const rem = secs % 60
        return `${m}m ${rem}s`
    }
    const h = Math.floor(secs / 3600)
    const m = Math.floor((secs % 3600) / 60)
    return `${h}h ${m}m`
}

function Section({ title, children }) {
    return (
        <div className="mb-10">
            <div className="flex items-center gap-3 mb-4 border-b-2 border-gb-border pb-3">
                <h2 className="text-gb-orange font-bold text-sm uppercase tracking-widest">{title}</h2>
            </div>
            {children}
        </div>
    )
}

function AvgTimeBlock({ entry }) {
    return (
        <div className="bg-gb-card border-2 border-gb-border flex items-center gap-4 px-5 py-4">
            <div className="flex-shrink-0">
                <StatusBadge status={entry.status} />
            </div>
            <div className="flex-1 border-l-2 border-gb-border pl-4">
                <p className="text-gb-muted text-xs uppercase tracking-wider mb-1">AVG TIME</p>
                <p className="text-gb-text text-2xl font-bold tracking-wider">{formatSeconds(entry.avg_seconds)}</p>
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

function LeaderboardRow({ rank, entry }) {
    const isFirst = rank === 1
    return (
        <div
            className="bg-gb-card border-2 flex items-center gap-4 px-5 py-4"
            style={{ borderColor: isFirst ? '#f97316' : '#3d3d3d' }}
        >
            {/* Rank */}
            <div
                className="text-2xl font-bold w-10 text-center flex-shrink-0"
                style={{ color: isFirst ? '#f97316' : '#9ca3af' }}
            >
                #{rank}
            </div>

            {/* Divider */}
            <div className="w-px h-10 bg-gb-border flex-shrink-0" />

            {/* User info */}
            <div className="flex-1 min-w-0">
                <p
                    className="font-bold text-sm uppercase tracking-wider truncate"
                    style={{ color: isFirst ? '#f97316' : '#f5f5f5' }}
                >
                    {entry.username || `USER_${entry.user_id || rank}`}
                </p>
                <p className="text-gb-muted text-xs mt-0.5">
                    {entry.tasks_done ?? '—'} TASKS DONE
                </p>
            </div>

            {/* Avg time */}
            <div className="text-right flex-shrink-0">
                <p className="text-gb-muted text-xs uppercase tracking-wider">AVG TO DONE</p>
                <p
                    className="text-lg font-bold tracking-wider"
                    style={{ color: isFirst ? '#f97316' : '#f5f5f5' }}
                >
                    {formatSeconds(entry.avg_seconds_to_done)}
                </p>
            </div>
        </div>
    )
}

function useStatData(fetcher) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetcher()
            .then(setData)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false))
    }, [])

    return { data, loading, error }
}

export default function StatisticsPage() {
    const avgTime = useStatData(fetchAvgTimePerStatus)
    const topUsers = useStatData(fetchTopProductiveUsers)

    return (
        <div className="font-mono">
            {/* Page Header */}
            <div className="mb-6 border-b-2 border-gb-border pb-4">
                <h1 className="text-gb-text text-lg font-bold uppercase tracking-widest">
                    &gt; STATISTICS
                </h1>
                <p className="text-gb-muted text-xs mt-0.5">SYSTEM PERFORMANCE DASHBOARD</p>
            </div>

            {/* Section 1: Avg Time Per Status */}
            <Section title="[ AVG TIME PER STATUS ]">
                {avgTime.loading && (
                    <p className="text-gb-muted text-sm uppercase tracking-widest text-center py-8 blink">[ LOADING... ]</p>
                )}
                {!avgTime.loading && avgTime.error && (
                    <p className="text-red-400 text-sm uppercase tracking-widest text-center py-8">! API ERROR: {avgTime.error}</p>
                )}
                {!avgTime.loading && !avgTime.error && avgTime.data && (
                    <div className="flex flex-col gap-3">
                        {(Array.isArray(avgTime.data) ? avgTime.data : Object.entries(avgTime.data).map(([status, avg_seconds]) => ({ status, avg_seconds }))).map((entry, i) => (
                            <AvgTimeBlock key={entry.status || i} entry={entry} />
                        ))}
                        {(Array.isArray(avgTime.data) ? avgTime.data : Object.entries(avgTime.data)).length === 0 && (
                            <p className="text-gb-muted text-sm uppercase tracking-widest text-center py-8">&gt; NO DATA FOUND</p>
                        )}
                    </div>
                )}
            </Section>

            {/* Section 2: Top 3 Productive Users */}
            <Section title="[ TOP 3 PRODUCTIVE USERS ]">
                {topUsers.loading && (
                    <p className="text-gb-muted text-sm uppercase tracking-widest text-center py-8 blink">[ LOADING... ]</p>
                )}
                {!topUsers.loading && topUsers.error && (
                    <p className="text-red-400 text-sm uppercase tracking-widest text-center py-8">! API ERROR: {topUsers.error}</p>
                )}
                {!topUsers.loading && !topUsers.error && topUsers.data && (
                    <div className="flex flex-col gap-3 max-w-2xl">
                        {(Array.isArray(topUsers.data) ? topUsers.data : []).slice(0, 3).map((entry, i) => (
                            <LeaderboardRow key={entry.user_id || i} rank={i + 1} entry={entry} />
                        ))}
                        {(Array.isArray(topUsers.data) ? topUsers.data : []).length === 0 && (
                            <p className="text-gb-muted text-sm uppercase tracking-widest text-center py-8">&gt; NO DATA FOUND</p>
                        )}
                    </div>
                )}
            </Section>


        </div>
    )
}