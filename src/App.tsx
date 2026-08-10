import { useState } from 'react'
import { BackgroundDecor } from './components/BackgroundDecor'
import { QuestionScreen } from './components/QuestionScreen'
import { ResultScreen } from './components/ResultScreen'
import { StartScreen } from './components/StartScreen'
import { words } from './data/words'
import type { AnswerOutcome, AnswerResult, WordItem } from './types/word'
import { shuffle } from './utils/shuffle'

type Screen = 'start' | 'question' | 'result'

function App() {
  const [screen, setScreen] = useState<Screen>('start')
  const [gameWords, setGameWords] = useState<WordItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [results, setResults] = useState<AnswerResult[]>([])

  function handleStart() {
    setGameWords(shuffle(words))
    setCurrentIndex(0)
    setResults([])
    setScreen('question')
  }

  function handleGoHome() {
    setScreen('start')
  }

  function handleAnswer(outcome: AnswerOutcome) {
    const word = gameWords[currentIndex]
    setResults((prev) => [...prev, { word, outcome }])

    if (currentIndex + 1 < gameWords.length) {
      setCurrentIndex((i) => i + 1)
    } else {
      setScreen('result')
    }
  }

  const currentWord = gameWords[currentIndex]

  return (
    <main className="flex min-h-svh items-center justify-center overflow-y-auto p-6">
      <BackgroundDecor />
      {screen === 'start' && <StartScreen onStart={handleStart} />}
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
      {screen === 'result' && <ResultScreen results={results} onRestart={handleStart} onHome={handleGoHome} />}
    </main>
  )
}

export default App
