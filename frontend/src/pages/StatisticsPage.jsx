import { useState, useEffect } from 'react'
import { fetchAvgTimePerStatus, fetchTopProductiveUsers } from '../api/statisticsApi'
import Section from '../components/stats/Section'
import AvgTimeBlock from '../components/stats/AvgTimeBlock'
import LeaderboardRow from '../components/stats/LeaderboardRow'

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

function StateBlock({ loading, error, children }) {
  if (loading) return (
    <p className="text-gb-muted text-sm uppercase tracking-widest text-center py-8 blink">[ LOADING... ]</p>
  )
  if (error) return (
    <p className="text-red-400 text-sm uppercase tracking-widest text-center py-8">! API ERROR: {error}</p>
  )
  return children
}

export default function StatisticsPage() {
  const avgTime  = useStatData(fetchAvgTimePerStatus)
  const topUsers = useStatData(fetchTopProductiveUsers)

  const avgList  = Array.isArray(avgTime.data)
    ? avgTime.data
    : Object.entries(avgTime.data ?? {}).map(([status, avg_seconds]) => ({ status, avg_seconds }))

  const userList = Array.isArray(topUsers.data) ? topUsers.data : []

  return (
    <div className="font-mono">
      {/* Page Header */}
      <div className="mb-6 border-b-2 border-gb-border pb-4">
        <h1 className="text-gb-text text-lg font-bold uppercase tracking-widest">
          &gt; STATISTICS
        </h1>
        <p className="text-gb-muted text-xs mt-0.5">SYSTEM PERFORMANCE DASHBOARD</p>
      </div>

      {/* Avg Time Per Status */}
      <Section title="[ AVG TIME PER STATUS ]">
        <StateBlock loading={avgTime.loading} error={avgTime.error}>
          {avgList.length === 0 ? (
            <p className="text-gb-muted text-sm uppercase tracking-widest text-center py-8">&gt; NO DATA FOUND</p>
          ) : (
            <div className="flex flex-col gap-3">
              {avgList.map((entry, i) => (
                <AvgTimeBlock key={entry.status || i} entry={entry} />
              ))}
            </div>
          )}
        </StateBlock>
      </Section>

      {/* Top 3 Productive Users */}
      <Section title="[ TOP 3 PRODUCTIVE USERS ]">
        <StateBlock loading={topUsers.loading} error={topUsers.error}>
          {userList.length === 0 ? (
            <p className="text-gb-muted text-sm uppercase tracking-widest text-center py-8">&gt; NO DATA FOUND</p>
          ) : (
            <div className="flex flex-col gap-3 max-w-2xl">
              {userList.slice(0, 3).map((entry, i) => (
                <LeaderboardRow key={entry.user_id || i} rank={i + 1} entry={entry} />
              ))}
            </div>
          )}
        </StateBlock>
      </Section>
    </div>
  )
}