import { useState } from 'react'
import { BackgroundDecor } from './components/BackgroundDecor'
import { LeaderboardScreen } from './components/LeaderboardScreen'
import { QuestionScreen } from './components/QuestionScreen'
import { ResultScreen } from './components/ResultScreen'
import { StartScreen } from './components/StartScreen'
import { words } from './data/words'
import { submitScore } from './lib/leaderboard'
import type { SubmitStatus } from './types/leaderboard'
import type { AnswerOutcome, AnswerResult, WordItem } from './types/word'
import { shuffle } from './utils/shuffle'

type Screen = 'start' | 'question' | 'result' | 'leaderboard'

const PLAYER_NAME_KEY = 'playerName'
const CLIENT_ID_KEY = 'clientId'

function getOrCreateClientId() {
  const existing = localStorage.getItem(CLIENT_ID_KEY)
  if (existing) return existing
  const id = crypto.randomUUID()
  localStorage.setItem(CLIENT_ID_KEY, id)
  return id
}

function App() {
  const [screen, setScreen] = useState<Screen>('start')
  const [gameWords, setGameWords] = useState<WordItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [results, setResults] = useState<AnswerResult[]>([])
  const [playerName, setPlayerName] = useState(() => localStorage.getItem(PLAYER_NAME_KEY) ?? '')
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
  const [clientId] = useState(getOrCreateClientId)

  function handlePlayerNameChange(name: string) {
    setPlayerName(name)
    localStorage.setItem(PLAYER_NAME_KEY, name)
  }

  function handleStart() {
    setGameWords(shuffle(words))
    setCurrentIndex(0)
    setResults([])
    setSubmitStatus('idle')
    setScreen('question')
  }

  function handleGoHome() {
    setScreen('start')
  }

  function handleViewLeaderboard() {
    setScreen('leaderboard')
  }

  function handleAnswer(outcome: AnswerOutcome) {
    const word = gameWords[currentIndex]
    const updatedResults = [...results, { word, outcome }]
    setResults(updatedResults)

    if (currentIndex + 1 < gameWords.length) {
      setCurrentIndex((i) => i + 1)
    } else {
      setScreen('result')
      const correctCount = updatedResults.filter((r) => r.outcome === 'correct').length
      setSubmitStatus('submitting')
      submitScore(playerName.trim(), correctCount, updatedResults.length, clientId)
        .then(() => setSubmitStatus('done'))
        .catch(() => setSubmitStatus('error'))
    }
  }

  const currentWord = gameWords[currentIndex]

  return (
    <main className="flex min-h-svh items-center justify-center overflow-y-auto p-6">
      <BackgroundDecor />
      {screen === 'start' && (
        <StartScreen
          playerName={playerName}
          onPlayerNameChange={handlePlayerNameChange}
          onStart={handleStart}
          onViewLeaderboard={handleViewLeaderboard}
        />
      )}
      {screen === 'question' && currentWord && (
        <QuestionScreen
          key={currentWord.id}
          word={currentWord}
          questionNumber={currentIndex + 1}
          totalQuestions={gameWords.length}
          onNext={handleAnswer}
          onHome={handleGoHome}
        />
      )}
      {screen === 'result' && (
        <ResultScreen
          results={results}
          submitStatus={submitStatus}
          onRestart={handleStart}
          onHome={handleGoHome}
          onViewLeaderboard={handleViewLeaderboard}
        />
      )}
      {screen === 'leaderboard' && <LeaderboardScreen onHome={handleGoHome} />}
    </main>
  )
}

export default App
