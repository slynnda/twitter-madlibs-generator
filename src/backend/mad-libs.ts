import { UnfilledMadLib, Map } from '../types'
import { lex, tag, TaggedWord } from './nlp'

const changableTags:Map<PartOfSpeech,string> = {
  'JJ': 'adjective',
  'JJR': 'adjective-comparative',
  'JJS': 'adjective-superlative',
  'NN': 'noun-singular',
  'NNP': 'proper-noun-singular',
  'NNPS': 'proper-noun-plural',
  'NNS': 'noun-plural',
  'RB': 'adverb',
  'RBR': 'adverb-comparative',
  'RBS': 'adverb-superlative',
  'VB': 'verb-base-form',
  'VBD': 'verb-past-tense',
  'VBG': 'verb-gerund',
  'VBN': 'verb-past-participle',
  'VBP': 'verb-present',
  'VBZ': 'verb-present-third-person'
}

interface ChangeableWord extends TaggedWord {
  isChangable: boolean  
}

export function generateMadLib(text:string):any {
    const tokens = lex(text)
    const tagged = tag(tokens)
    return tagged
}

function tagChangable(tagged:TaggedWord[]):ChangableWord[] {
  return tagged.map((taggedWord) => {

  })

}
