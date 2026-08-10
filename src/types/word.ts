export type PartOfSpeech = 'noun' | 'verb' | 'adjective' | 'adverb'

export type WordItem = {
  id: number
  word: string
  translation: string
  correctTypes: PartOfSpeech[]
}

export type AnswerOutcome = 'correct' | 'wrong' | 'timeout'

export type AnswerResult = {
  word: WordItem
  outcome: AnswerOutcome
}
