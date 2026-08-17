import { Button } from './Button'
import { StartIllustration } from './illustrations/StartIllustration'
import { NotebookPage } from './NotebookPage'
import { TitleBar } from './TitleBar'

type StartScreenProps = {
  playerName: string
  onPlayerNameChange: (name: string) => void
  onStart: () => void
  onViewLeaderboard: () => void
}

export function StartScreen({ playerName, onPlayerNameChange, onStart, onViewLeaderboard }: StartScreenProps) {
  const canStart = playerName.trim().length > 0

  return (
    <NotebookPage>
      <TitleBar className="mb-6">
        <h1 className="text-2xl font-bold sm:text-3xl">Match Game</h1>
      </TitleBar>
      <StartIllustration />
      <p className="mt-6 mb-4 text-center text-lg font-semibold text-ink/70">
        Match the vocabulary words with part of speech
      </p>
      <div className="mx-auto mb-8 max-w-xs">
        <label htmlFor="player-name" className="mb-1 block text-center text-sm font-semibold text-ink/70">
          Your name
        </label>
        <input
          id="player-name"
          type="text"
          value={playerName}
          onChange={(e) => onPlayerNameChange(e.target.value)}
          maxLength={30}
          placeholder="Enter your name"
          className="border-ink bg-paper/40 placeholder:text-ink/40 focus:ring-brand w-full rounded-xl border-2 px-4 py-2 text-center text-lg font-semibold outline-none focus:ring-2"
        />
      </div>
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
        <Button variant="primary" onClick={onStart} disabled={!canStart} className="w-full sm:w-auto">
          Start Game
        </Button>
        <Button variant="secondary" onClick={onViewLeaderboard} className="w-full sm:w-auto">
          🏆 Leaderboard
        </Button>
      </div>
    </NotebookPage>
  )
}
