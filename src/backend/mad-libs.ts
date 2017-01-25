import { UnfilledMadLib } from '../types'
import { lex, tag } from './nlp'

export function generateMadLib(text:string):any {
    const tokens = lex(text)
    const tagged = tag(tokens)
    return tagged
}