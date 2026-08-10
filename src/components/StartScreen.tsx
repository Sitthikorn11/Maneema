import { Button } from './Button'
import { StartIllustration } from './illustrations/StartIllustration'
import { NotebookPage } from './NotebookPage'
import { TitleBar } from './TitleBar'

type StartScreenProps = {
  wordCount: number
  onStart: () => void
}

export function StartScreen({ wordCount, onStart }: StartScreenProps) {
  return (
    <NotebookPage>
      <TitleBar className="mb-6">
        <h1 className="text-2xl font-bold sm:text-3xl">Maneema Game Quiz</h1>
      </TitleBar>
      <StartIllustration />
      <p className="mt-6 mb-8 text-center text-lg font-semibold text-ink/70">
        Guess the part of speech for all {wordCount} words — 5 seconds each!
      </p>
      <div className="flex justify-center">
        <Button variant="primary" onClick={onStart}>
          Start Game
        </Button>
      </div>
    </NotebookPage>
  )
}
