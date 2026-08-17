import { useEffect, useState } from 'react'
import { fetchTopScores, subscribeToNewScores } from '../lib/leaderboard'
import type { LeaderboardEntry } from '../types/leaderboard'
import { Button } from './Button'
import { HomeButton } from './HomeButton'
import { NotebookPage } from './NotebookPage'
import { TitleBar } from './TitleBar'

type LeaderboardScreenProps = {
  onHome: () => void
}

type Status = 'loading' | 'success' | 'error'

const PAGE_SIZE = 10

function formatWhen(isoDate: string) {
  const date = new Date(isoDate)
  const diffMs = Date.now() - date.getTime()
  const diffMinutes = Math.round(diffMs / 60000)
  if (diffMinutes < 1) return 'just now'
  if (diffMinutes < 60) return `${diffMinutes}m ago`
  const diffHours = Math.round(diffMinutes / 60)
  if (diffHours < 24) return `${diffHours}h ago`
  return date.toLocaleDateString()
}

export function LeaderboardScreen({ onHome }: LeaderboardScreenProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [status, setStatus] = useState<Status>('loading')
  const [page, setPage] = useState(0)

  function loadScores() {
    setStatus('loading')
    fetchTopScores()
      .then((data) => {
        setEntries(data)
        setStatus('success')
      })
      .catch(() => {
        setStatus('error')
      })
  }

  useEffect(() => {
    loadScores()
    // New scores from other players stream in live — refresh quietly without
    // disturbing the current list if this background fetch happens to fail.
    const unsubscribe = subscribeToNewScores(() => {
      fetchTopScores()
        .then((data) => setEntries(data))
        .catch(() => {})
    })
    return unsubscribe
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const totalPages = Math.max(1, Math.ceil(entries.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages - 1)
  const pageEntries = entries.slice(currentPage * PAGE_SIZE, currentPage * PAGE_SIZE + PAGE_SIZE)

  return (
    <NotebookPage>
      <div className="mb-6 flex items-center justify-between">
        <HomeButton onClick={onHome} />
      </div>
      <TitleBar className="mb-6">
        <h1 className="text-2xl font-bold sm:text-3xl">🏆 Leaderboard</h1>
      </TitleBar>

      {status === 'loading' && <p className="text-center text-lg font-semibold text-ink/70">Loading scores…</p>}

      {status === 'error' && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-wrong font-semibold">Couldn't load the leaderboard. Please try again.</p>
          <Button variant="secondary" onClick={loadScores}>
            Retry
          </Button>
        </div>
      )}

      {status === 'success' && entries.length === 0 && (
        <p className="text-center text-lg font-semibold text-ink/70">No scores yet — be the first to play!</p>
      )}

      {status === 'success' && entries.length > 0 && (
        <>
          <ul className="flex flex-col gap-2">
            {pageEntries.map((entry, i) => (
              <li
                key={entry.id}
                className="border-ink flex items-center justify-between gap-3 rounded-xl border-2 bg-white px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 text-center font-bold text-ink/60">{currentPage * PAGE_SIZE + i + 1}</span>
                  <span className="font-semibold">{entry.player_name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-ink/50 text-sm">{formatWhen(entry.created_at)}</span>
                  <span className="text-correct font-bold">
                    {entry.score}/{entry.total}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-center gap-4">
              <Button
                variant="secondary"
                onClick={() => setPage((p) => p - 1)}
                disabled={currentPage === 0}
                className="px-4 py-2 text-sm"
              >
                ← ก่อนหน้า
              </Button>
              <span className="text-sm font-semibold text-ink/70">
                หน้า {currentPage + 1} / {totalPages}
              </span>
              <Button
                variant="secondary"
                onClick={() => setPage((p) => p + 1)}
                disabled={currentPage >= totalPages - 1}
                className="px-4 py-2 text-sm"
              >
                ถัดไป →
              </Button>
            </div>
          )}
        </>
      )}
    </NotebookPage>
  )
}
