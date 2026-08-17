import { useEffect, useRef } from 'react'
import { POS_LABELS } from '../data/partsOfSpeech'
import type { SubmitStatus } from '../types/leaderboard'
import type { AnswerResult, PartOfSpeech } from '../types/word'
import { Button } from './Button'
import { ResultIllustration } from './illustrations/ResultIllustration'
import { NotebookPage } from './NotebookPage'
import { TitleBar } from './TitleBar'

type ResultScreenProps = {
  results: AnswerResult[]
  submitStatus: SubmitStatus
  onRestart: () => void
  onHome: () => void
  onViewLeaderboard: () => void
}

function formatTypes(types: PartOfSpeech[]) {
  return types.map((type) => POS_LABELS[type]).join(', ')
}

function SubmitStatusBadge({ status }: { status: SubmitStatus }) {
  if (status === 'submitting') return <p className="mt-1 text-sm font-semibold text-white/80">Saving to leaderboard…</p>
  if (status === 'done') return <p className="mt-1 text-sm font-semibold text-white/80">Saved to leaderboard ✓</p>
  if (status === 'error') return <p className="mt-1 text-sm font-semibold text-white/80">Couldn't save score to leaderboard</p>
  return null
}

export function ResultScreen({ results, submitStatus, onRestart, onHome, onViewLeaderboard }: ResultScreenProps) {
  const correctCount = results.filter((r) => r.outcome === 'correct').length
  const wrongAnswers = results.filter((r) => r.outcome === 'wrong')
  const timeouts = results.filter((r) => r.outcome === 'timeout')
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <NotebookPage>
      <TitleBar className="mb-6">
        <h1 ref={headingRef} tabIndex={-1} className="text-2xl font-bold outline-none sm:text-3xl">
          Results
        </h1>
        <p className="mt-1 text-lg font-semibold">
          Score: {correctCount}/{results.length}
        </p>
        <SubmitStatusBadge status={submitStatus} />
      </TitleBar>
      <ResultIllustration />

      {(wrongAnswers.length > 0 || timeouts.length > 0) && (
        <div className="mt-6 flex flex-col gap-4">
          {wrongAnswers.length > 0 && (
            <div className="border-wrong bg-wrong/10 rounded-xl border-2 p-4">
              <p className="text-wrong mb-2 font-bold">
                ✗ Got {wrongAnswers.length} word{wrongAnswers.length > 1 ? 's' : ''} wrong:
              </p>
              <ul className="flex flex-col gap-1">
                {wrongAnswers.map((r) => (
                  <li key={r.word.id} className="text-sm">
                    <span className="font-semibold">{r.word.word}</span>{' '}
                    <span className="text-ink/60">({r.word.translation})</span> — correct: {formatTypes(r.word.correctTypes)}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {timeouts.length > 0 && (
            <div className="border-timeout bg-timeout/10 rounded-xl border-2 p-4">
              <p className="text-timeout mb-2 font-bold">
                ⏱ Ran out of time on {timeouts.length} word{timeouts.length > 1 ? 's' : ''}:
              </p>
              <ul className="flex flex-col gap-1">
                {timeouts.map((r) => (
                  <li key={r.word.id} className="text-sm">
                    <span className="font-semibold">{r.word.word}</span>{' '}
                    <span className="text-ink/60">({r.word.translation})</span> — correct: {formatTypes(r.word.correctTypes)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <ul aria-label="Answer review list" className="mt-6 mb-8 flex flex-col gap-2">
        {results.map((r, i) => {
          const style =
            r.outcome === 'correct'
              ? { border: 'border-correct bg-correct/10', text: 'text-correct', label: '✓ Correct' }
              : r.outcome === 'wrong'
                ? { border: 'border-wrong bg-wrong/10', text: 'text-wrong', label: '✗ Wrong' }
                : { border: 'border-timeout bg-timeout/10', text: 'text-timeout', label: '⏱ Timeout' }

          return (
            <li key={r.word.id} className={`rounded-xl border-2 p-3 ${style.border}`}>
              <p className="font-semibold">
                {i + 1}. {r.word.word} <span className="font-normal text-ink/60">({r.word.translation})</span>{' '}
                <span className={style.text}>{style.label}</span>
              </p>
            </li>
          )
        })}
      </ul>

      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Button variant="primary" onClick={onRestart} className="w-full sm:w-auto">
          Play Again
        </Button>
        <Button variant="secondary" onClick={onViewLeaderboard} className="w-full sm:w-auto">
          🏆 Leaderboard
        </Button>
        <Button variant="secondary" onClick={onHome} className="w-full sm:w-auto">
          Home
        </Button>
      </div>
    </NotebookPage>
  )
}
