export type LeaderboardEntry = {
  id: number
  player_name: string
  score: number
  total: number
  created_at: string
  client_id: string | null
}

export type SubmitStatus = 'idle' | 'submitting' | 'done' | 'error'
