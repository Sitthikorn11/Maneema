import type { CardColor } from '../components/Card'
import type { PartOfSpeech } from '../types/word'

export const POS_OPTIONS: { type: PartOfSpeech; label: string; color: CardColor }[] = [
  { type: 'noun', label: 'Noun', color: 'noun' },
  { type: 'verb', label: 'Verb', color: 'verb' },
  { type: 'adjective', label: 'Adjective', color: 'adjective' },
  { type: 'adverb', label: 'Adverb', color: 'adverb' },
]

export const POS_LABELS: Record<PartOfSpeech, string> = {
  noun: 'Noun',
  verb: 'Verb',
  adjective: 'Adjective',
  adverb: 'Adverb',
}
