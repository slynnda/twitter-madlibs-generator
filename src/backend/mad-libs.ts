import { PartOfSpeech } from 'pos'
import { pickBy, includes } from 'lodash'

import { UnfilledMadLib, PartOfSpeechInfoMap } from '../types'
import { lex, tag, TaggedWord, partsOfSpeech } from './nlp'



const changeablePartsOfSpeech:{[k:string]:boolean} = {
  'JJ': true,
  'JJR': true,
  'JJS': true,
  'NN': true,
  'NNP': true,
  'NNPS': true,
  'NNS': true,
  'RB': true,
  'RBR': true,
  'RBS': true,
  'VB': true,
  'VBD': true,
  'VBG': true,
  'VBN': true,
  'VBP': true,
  'VBZ': true
}

const changeableTags = pickBy<PartOfSpeechInfoMap, PartOfSpeechInfoMap>(partsOfSpeech, (pos) => {
  return changeablePartsOfSpeech[pos.pos]
})

interface ChangeableWord extends TaggedWord {
  isChangable: boolean
}

interface MadLibOptions {
  probabilityBlank: number  // between 0 and 1, percent of changeable words left blank.
}

export function generateMadLib(text:string, options:MadLibOptions):UnfilledMadLib {
    const tokens = lex(text)
    const tagged = tag(tokens)
    const withIsChangeables = tagChangable(tagged)
    const withBlanks =
    console.log('withIsChangeables', withIsChangeables)
    return (tagged as any)
}

function tagChangable(tagged:TaggedWord[]):ChangeableWord[] {
  return tagged.map((taggedWord) => {
    const changeable = changeableTags[taggedWord.posInfo.pos]
    return {
      ...taggedWord,
      isChangable: !!changeable,
    }
  })
}

// function generateBlanks(changeables:ChangeableWord[], probabilityBlank:number):UnfilledMadLib {
//   return changeables.map((c) => {
//     const makeMeBlank = c.isChangable && Math.random() < probabilityBlank
//     if (makeMeBlank) return {
//       partOfSpeech:
//     }
//   })
// }
