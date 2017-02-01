import { Lexer, Tagger, LexedWord, TaggedWord as POSTaggedWord, PartOfSpeech } from 'pos'

export interface TaggedWord {
    pos: PartOfSpeech
    word: string
}

const lexer = new Lexer()
const tagger = new Tagger()

export function lex(text:string):LexedWord[] {
    return lexer.lex(text)
}

export function tag(words:LexedWord[]):TaggedWord[] {
    const tagged = tagger.tag(words)
    return tagged.map((t) => {
        return {
            pos: (t[1] as PartOfSpeech),
            word: t[0]
        }
    })
}
