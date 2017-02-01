import { Lexer, Tagger, LexedWord, TaggedWord as POSTaggedWord, PartOfSpeech } from 'pos'

import { PartOfSpeechInfo, PartOfSpeechInfoMap } from '../types'

export interface TaggedWord {
    posInfo: PartOfSpeechInfo
    word: string
}

const lexer = new Lexer()
const tagger = new Tagger()

export const partsOfSpeech: PartOfSpeechInfoMap = {
    'CC' : { pos: ('CC' as PartOfSpeech), description: 'Coord Conjuncn', example:  'and,but,or' },
    'CD' : { pos: ('CD' as PartOfSpeech), description: 'Cardinal number', example: 'one,two' },
    'DT' : { pos: ('DT' as PartOfSpeech), description: 'Determiner', example: 'the,some' },
    'EX' : { pos: ('EX' as PartOfSpeech), description: 'Existential there', example: 'there' },
    'FW' : { pos: ('FW' as PartOfSpeech), description: 'Foreign Word', example: 'mon dieu' },
    'IN' : { pos: ('IN' as PartOfSpeech), description: 'Preposition', example: 'of,in,by' },
    'JJ' : { pos: ('JJ' as PartOfSpeech), description: 'Adjective', example: 'big' },
    'JJR' : { pos: ('JJR' as PartOfSpeech), description: 'Adj., comparative', example: 'bigger' },
    'JJS' : { pos: ('JJS' as PartOfSpeech), description: 'Adj., superlative', example: 'biggest' },
    'LS' : { pos: ('LS' as PartOfSpeech), description: 'List item marker', example: '1,One' },
    'MD' : { pos: ('MD' as PartOfSpeech), description: 'Modal', example: 'can,should' },
    'NN' : { pos: ('NN' as PartOfSpeech), description: 'Noun, sing. or mass', example: 'dog' },
    'NNP' : { pos: ('NNP' as PartOfSpeech), description: 'Proper noun, sing.', example: 'Edinburgh' },
    'NNPS' : { pos: ('NNPS' as PartOfSpeech), description: 'Proper noun, plural', example:    'Smiths' },
    'NNS' : { pos: ('NNS' as PartOfSpeech), description: 'Noun, plural', example: 'dogs' },
    'POS' : { pos: ('POS' as PartOfSpeech), description: 'Possessive ending', example: '�s' },
    'PDT' : { pos: ('PDT' as PartOfSpeech), description: 'Predeterminer', example: 'all, both' },
    'PP$' : { pos: ('PP$' as PartOfSpeech), description: 'Possessive pronoun', example:  'my,one�s' },
    'PRP' : { pos: ('PRP' as PartOfSpeech), description: 'Personal pronoun', example: 'I,you,she' },
    'RB' : { pos: ('RB' as PartOfSpeech), description: 'Adverb', example: 'quickly' },
    'RBR' : { pos: ('RBR' as PartOfSpeech), description: 'Adverb, comparative', example: 'faster' },
    'RBS' : { pos: ('RBS' as PartOfSpeech), description: 'Adverb, superlative', example: 'fastest' },
    'RP' : { pos: ('RP' as PartOfSpeech), description: 'Particle', example: 'up,off' },
    'SYM' : { pos: ('SYM' as PartOfSpeech), description: 'Symbol', example: '+,%,&' },
    'TO' : { pos: ('TO' as PartOfSpeech), description: '�to�', example: 'to' },
    'UH' : { pos: ('UH' as PartOfSpeech), description: 'Interjection', example: 'oh, oops' },
    'VB' : { pos: ('VB' as PartOfSpeech), description: 'verb, base form', example: 'eat' },
    'VBD' : { pos: ('VBD' as PartOfSpeech), description: 'verb, past tense', example: 'ate' },
    'VBG' : { pos: ('VBG' as PartOfSpeech), description: 'verb, gerund', example: 'eating' },
    'VBN' : { pos: ('VBN' as PartOfSpeech), description: 'verb, past part', example: 'eaten' },
    'VBP' : { pos: ('VBP' as PartOfSpeech), description: 'Verb, present', example: 'eat' },
    'VBZ' : { pos: ('VBZ' as PartOfSpeech), description: 'Verb, present', example: 'eats' },
    'WDT' : { pos: ('WDT' as PartOfSpeech), description: 'Wh-determiner', example: 'which,that' },
    'WP' : { pos: ('WP' as PartOfSpeech), description: 'Wh pronoun', example: 'who,what' },
    'WP$' : { pos: ('WP$' as PartOfSpeech), description: 'Possessive-Wh', example: 'whose' },
    'WRB' : { pos: ('WRB' as PartOfSpeech), description: 'Wh-adverb', example: 'how,where' },
    ',' : { pos: (',' as PartOfSpeech), description: 'Comma', example: ', example:' },
    '.' : { pos: ('.' as PartOfSpeech), description: 'Sent-final punctuation', example: '. ! ?' },
    ':' : { pos: (':' as PartOfSpeech), description: 'Mid-sent punctuation', example: ': ; �' },
    '$' : { pos: ('$' as PartOfSpeech), description: 'Dollar sign', example: '$' },
    '#' : { pos: ('#' as PartOfSpeech), description: 'Pound sign', example: '#' },
    '"' : { pos: ('"' as PartOfSpeech), description: 'quote', example: '"' },
    '(' : { pos: ('(' as PartOfSpeech), description: 'Left Paren', example: '(' },
    ')' : { pos: (')' as PartOfSpeech), description: 'Right Paren', example: ')' },
}

export function lex(text:string):LexedWord[] {
    return lexer.lex(text)
}

export function tag(words:LexedWord[]):TaggedWord[] {
    const tagged = tagger.tag(words)
    return tagged.map((t) => {
        const pos = t[1]
        const posi = partsOfSpeech[pos]
        if (!posi) throw new Error('Couldn\'t find matching part of speech for '+ pos)
        return {
            posInfo: posi,
            word: t[0]
        }
    })
}
