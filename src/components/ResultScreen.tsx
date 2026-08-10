import { useEffect, useRef } from 'react'
import { POS_LABELS } from '../data/partsOfSpeech'
import type { AnswerResult, PartOfSpeech } from '../types/word'
import { Button } from './Button'
import { ResultIllustration } from './illustrations/ResultIllustration'
import { NotebookPage } from './NotebookPage'
import { TitleBar } from './TitleBar'

type ResultScreenProps = {
  results: AnswerResult[]
  onRestart: () => void
  onHome: () => void
}

function formatTypes(types: PartOfSpeech[]) {
  return types.map((type) => POS_LABELS[type]).join(', ')
}

export function ResultScreen({ results, onRestart, onHome }: ResultScreenProps) {
  const correctCount = results.filter((r) => r.outcome === 'correct').length
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
      </TitleBar>
      <ResultIllustration />

      {timeouts.length > 0 && (
        <div className="border-timeout bg-timeout/10 mt-6 rounded-xl border-2 p-4">
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

      <ul aria-label="Answer review list" className="mt-6 mb-8 flex flex-col gap-2">
        {results.map((r, i) => (
          <li
            key={r.word.id}
            className={`rounded-xl border-2 p-3 ${r.outcome === 'correct' ? 'border-correct bg-correct/10' : 'border-timeout bg-timeout/10'}`}
          >
            <p className="font-semibold">
              {i + 1}. {r.word.word} <span className="font-normal text-ink/60">({r.word.translation})</span>{' '}
              <span className={r.outcome === 'correct' ? 'text-correct' : 'text-timeout'}>
                {r.outcome === 'correct' ? '✓ Correct' : '⏱ Timeout'}
              </span>
            </p>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Button variant="primary" onClick={onRestart} className="w-full sm:w-auto">
          Play Again
        </Button>
        <Button variant="secondary" onClick={onHome} className="w-full sm:w-auto">
          Home
        </Button>
      </div>
    </NotebookPage>
  )
}
