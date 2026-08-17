import type { LeaderboardEntry } from '../types/leaderboard'
import { supabase } from './supabaseClient'

export async function submitScore(playerName: string, score: number, total: number, clientId: string): Promise<void> {
  if (!supabase) throw new Error('Leaderboard is not configured')
  const { error } = await supabase.from('scores').insert({ player_name: playerName, score, total, client_id: clientId })
  if (error) throw error
}

export async function fetchTopScores(): Promise<LeaderboardEntry[]> {
  if (!supabase) throw new Error('Leaderboard is not configured')
  const { data, error } = await supabase
    .from('scores')
    .select('*')
    .order('score', { ascending: false })
    .order('created_at', { ascending: true })

  if (error) throw error
  return data
}

export function subscribeToNewScores(onNewScore: () => void): () => void {
  if (!supabase) return () => {}
  const client = supabase

  const channel = client
    .channel('scores-inserts')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'scores' }, onNewScore)
    .subscribe()

  return () => {
    client.removeChannel(channel)
  }
}
