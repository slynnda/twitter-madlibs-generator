import { PartOfSpeech } from 'pos'

export type UnfilledMadLib = (MadLibTextBlock | MadLibUnfilledSpace)[]
export type FilledMadLib = (MadLibTextBlock | MadLibFilledSpace)[]

export type MadLibTextBlock = {
    text: string
}

export type MadLibUnfilledSpace = {
    partOfSpeech: PartOfSpeechInfo
}

export type MadLibFilledSpace = {
    partOfSpeech: PartOfSpeechInfo
    text: string
}

export interface PartOfSpeechInfo {
    pos: PartOfSpeech
    description: string
    example: string
}

export interface PartOfSpeechInfoMap {
    [k:string]:PartOfSpeechInfo
}
