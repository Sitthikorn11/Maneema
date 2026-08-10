import { useEffect, useRef, useState } from 'react'
import { POS_OPTIONS } from '../data/partsOfSpeech'
import type { AnswerOutcome, PartOfSpeech, WordItem } from '../types/word'
import { isAnswerCorrect } from '../utils/checkAnswer'
import { Card } from './Card'
import { HomeButton } from './HomeButton'
import { NotebookPage } from './NotebookPage'
import { TitleBar } from './TitleBar'

const TOTAL_MS = 8000

type QuestionScreenProps = {
  word: WordItem
  questionNumber: number
  totalQuestions: number
  onNext: (outcome: AnswerOutcome) => void
  onHome: () => void
}

type Phase = 'answering' | 'wrong' | 'correct'

function TimerBadge({ secondsLeft }: { secondsLeft: number }) {
  const color = secondsLeft <= 1 ? 'var(--color-wrong)' : secondsLeft <= 2 ? 'var(--color-brand)' : 'var(--color-correct)'
  return (
    <div
      aria-hidden="true"
      className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-ink text-lg font-bold text-white"
      style={{ backgroundColor: color }}
    >
      {secondsLeft}
    </div>
  )
}

export function QuestionScreen({ word, questionNumber, totalQuestions, onNext, onHome }: QuestionScreenProps) {
  const [selected, setSelected] = useState<PartOfSpeech[]>([])
  const [phase, setPhase] = useState<Phase>('answering')
  const [remainingMs, setRemainingMs] = useState(TOTAL_MS)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const intervalRef = useRef<number | null>(null)
  const flashTimeoutRef = useRef<number | null>(null)
  // Refs mirror the state above so rapid, same-tick clicks always read the true
  // latest value instead of a stale render closure (React batches state updates).
  const selectedRef = useRef<PartOfSpeech[]>([])
  const phaseRef = useRef<Phase>('answering')
  const lowTimeAnnouncedRef = useRef(false)
  const [timeWarning, setTimeWarning] = useState('')
  // Guarantees onNext fires at most once per question, even if a timeout and a
  // just-in-time click race each other (e.g. a click already queued by the
  // browser right as the timer hits zero).
  const hasAdvancedRef = useRef(false)

  function setSelectedSync(next: PartOfSpeech[]) {
    selectedRef.current = next
    setSelected(next)
  }

  function setPhaseSync(next: Phase) {
    phaseRef.current = next
    setPhase(next)
  }

  useEffect(() => {
    headingRef.current?.focus()
    selectedRef.current = []
    phaseRef.current = 'answering'
    lowTimeAnnouncedRef.current = false
    hasAdvancedRef.current = false
    setTimeWarning('')

    const start = Date.now()
    const interval = window.setInterval(() => {
      const remaining = Math.max(0, TOTAL_MS - (Date.now() - start))
      setRemainingMs(remaining)
      if (!lowTimeAnnouncedRef.current && remaining <= 2000 && remaining > 0) {
        lowTimeAnnouncedRef.current = true
        setTimeWarning('2 seconds left!')
      }
      if (remaining <= 0) {
        window.clearInterval(interval)
        if (flashTimeoutRef.current) {
          window.clearTimeout(flashTimeoutRef.current)
          flashTimeoutRef.current = null
        }
        if (!hasAdvancedRef.current) {
          hasAdvancedRef.current = true
          onNext('timeout')
        }
      }
    }, 100)
    intervalRef.current = interval

    return () => {
      window.clearInterval(interval)
      intervalRef.current = null
      if (flashTimeoutRef.current) {
        window.clearTimeout(flashTimeoutRef.current)
        flashTimeoutRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word.id])

  function evaluate(current: PartOfSpeech[]) {
    if (hasAdvancedRef.current) return
    const hasWrongPick = current.some((t) => !word.correctTypes.includes(t))

    if (hasWrongPick) {
      setPhaseSync('wrong')
      flashTimeoutRef.current = window.setTimeout(() => {
        setSelectedSync([])
        setPhaseSync('answering')
      }, 700)
      return
    }

    if (isAnswerCorrect(current, word.correctTypes)) {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      setPhaseSync('correct')
      flashTimeoutRef.current = window.setTimeout(() => {
        if (!hasAdvancedRef.current) {
          hasAdvancedRef.current = true
          onNext('correct')
        }
      }, 700)
    }
    // otherwise: a correct-but-incomplete subset (multi-answer word) — keep waiting for more picks
  }

  function toggle(type: PartOfSpeech) {
    if (phaseRef.current !== 'answering' || hasAdvancedRef.current) return
    const current = selectedRef.current
    const next = current.includes(type) ? current.filter((t) => t !== type) : [...current, type]
    setSelectedSync(next)
    if (next.length > 0) evaluate(next)
  }

  const secondsLeft = Math.max(0, Math.ceil(remainingMs / 1000))
  const fraction = remainingMs / TOTAL_MS
  const barColor = fraction > 0.4 ? 'var(--color-correct)' : fraction > 0.2 ? 'var(--color-brand)' : 'var(--color-wrong)'
  const isPartialCorrect =
    phase === 'answering' &&
    selected.length > 0 &&
    selected.length < word.correctTypes.length &&
    selected.every((t) => word.correctTypes.includes(t))

  return (
    <NotebookPage>
      <div className="mb-2 flex items-center justify-between">
        <HomeButton onClick={onHome} />
        <p className="text-sm font-semibold text-ink/60">
          Question {questionNumber}/{totalQuestions}
        </p>
        <TimerBadge secondsLeft={secondsLeft} />
      </div>
      <div className="mb-4 h-3 w-full overflow-hidden rounded-full border-2 border-ink bg-paper-line">
        <div
          className="h-full transition-[width] duration-100 ease-linear"
          style={{ width: `${fraction * 100}%`, backgroundColor: barColor }}
        />
      </div>

      <TitleBar className="mb-6">
        <h1
          ref={headingRef}
          tabIndex={-1}
          aria-label={`${word.word}, meaning ${word.translation}. You have ${TOTAL_MS / 1000} seconds to answer.`}
          className="text-3xl font-bold outline-none sm:text-4xl"
        >
          {word.word}
        </h1>
        <p className="mt-1 text-base font-medium text-white/80">{word.translation}</p>
      </TitleBar>
      <p aria-live="assertive" className="sr-only">
        {timeWarning}
      </p>

      <div role="group" aria-label="Select the word type" className="mb-6 grid grid-cols-2 gap-4">
        {POS_OPTIONS.map((option) => {
          const isSelected = selected.includes(option.type)
          const isCorrectType = word.correctTypes.includes(option.type)

          let feedbackClass = ''
          let stateLabel = ''
          if (phase === 'wrong') {
            if (isSelected && isCorrectType) {
              feedbackClass = 'ring-4 ring-correct ring-offset-2'
              stateLabel = ' — correct'
            } else if (isSelected && !isCorrectType) {
              feedbackClass = 'ring-4 ring-wrong ring-offset-2'
              stateLabel = ' — you picked this, but it is wrong'
            } else if (!isSelected && isCorrectType) {
              feedbackClass = 'border-dashed opacity-70'
              stateLabel = ' — the correct answer you missed'
            }
          } else if (phase === 'correct' && isSelected) {
            feedbackClass = 'ring-4 ring-correct ring-offset-2'
            stateLabel = ' — correct'
          }

          return (
            <button
              key={option.type}
              type="button"
              disabled={phase !== 'answering'}
              aria-pressed={isSelected}
              aria-label={`${option.label}${stateLabel}`}
              onClick={() => toggle(option.type)}
              className="cursor-pointer text-left disabled:cursor-default"
            >
              <Card
                color={option.color}
                selected={phase === 'answering' && isSelected}
                interactive={phase === 'answering'}
                className={feedbackClass}
              >
                <p className="text-center font-semibold">{option.label}</p>
              </Card>
            </button>
          )
        })}
      </div>

      {phase === 'wrong' && (
        <p aria-live="polite" className="font-bold text-wrong">
          Not quite — try again!
        </p>
      )}
      {phase === 'correct' && (
        <p aria-live="polite" className="font-bold text-correct">
          Correct!
        </p>
      )}
      {isPartialCorrect && (
        <p aria-live="polite" className="font-bold text-brand">
          Good so far — this word needs more than one answer!
        </p>
      )}
    </NotebookPage>
  )
}
