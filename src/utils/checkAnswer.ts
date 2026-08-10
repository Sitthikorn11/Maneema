import type { PartOfSpeech } from '../types/word'

export function isAnswerCorrect(selected: PartOfSpeech[], correctTypes: PartOfSpeech[]): boolean {
  if (selected.length !== correctTypes.length) return false
  const correctSet = new Set(correctTypes)
  return selected.every((type) => correctSet.has(type))
}
