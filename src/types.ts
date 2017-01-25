export type PartOfSpeech = 'Noun' | 'Verb' | 'Adjective' | 'Adverb'

export type UnfilledMadLib = (MadLibTextBlock | MadLibUnfilledSpace)[]
export type FilledMadLib = (MadLibTextBlock | MadLibFilledSpace)[]

export type MadLibTextBlock = {
    text: string
}

export type MadLibUnfilledSpace = {
    partOfSpeech: PartOfSpeech
}

export type MadLibFilledSpace = {
    partOfSpeech: PartOfSpeech
    text: string
}

export interface Map<K,V> {
    [key:K]:V
}
