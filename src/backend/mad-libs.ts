import { PartOfSpeech } from 'pos'
import { pickBy, includes } from 'lodash'

import { UnfilledMadLib, PartOfSpeechInfoMap, Map } from '../types'
import { lex, tag, TaggedWord, partsOfSpeech } from './nlp'




const changeablePartsOfSpeech:Map<boolean> = {
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

const punctuationPartsOfSpeech:Map<boolean> = {
  'SYM' : true,
  ',' : true,
  '.' : true,
  ':' : true,
  '$' : true,
  '#' : true,
  '"' : true,
  '(' : true,
  ')' : true
}

function isChangeablePOS(pos:PartOfSpeech):boolean {
  return changeablePartsOfSpeech[pos]
}

function isPunctuationPOS(pos:PartOfSpeech):boolean {
  return punctuationPartsOfSpeech[pos]
}

const changeableTags = pickBy<PartOfSpeechInfoMap, PartOfSpeechInfoMap>(partsOfSpeech, (pos) => {
  return isChangeablePOS(pos.pos)
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
    const withBlanks = generateBlanks(withIsChangeables, options.probabilityBlank)
    return joinTextBlocks(withBlanks)
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

function generateBlanks(changeables:ChangeableWord[], probabilityBlank:number):UnfilledMadLib {
  return changeables.map((c) => {
    const makeMeBlank = c.isChangable && Math.random() < probabilityBlank
    if (makeMeBlank) {
      return {
        posInfo: c.posInfo,
        originalWord: c.word,
        type: 'unfilled' as 'unfilled'
      }
    } else {
      return {
        text: c.word,
        type: 'text' as 'text'
      }
    }
  })
}

// function joinTextBlocks(madLib:UnfilledMadLib):UnfilledMadLib {
//   const toReturn = []
//   let currentTextPart = null
//   madLib.forEach((part) => {
//     if (part.type === 'unfilled') {
//       if (!!currentTextPart) {
//         toReturn.push(currentTextPart)
//         currentTextPart = null
//       }
//       toReturn.push(part)
//     }

//     else if (part.type === 'text') {
//       if (!currentTextPart) currentTextPart

//     }

//     else if (isPunctuationPOS(part.posInfo.pos)) {

//     }
//   })
// }

function joinTextBlocks(madLib:UnfilledMadLib):UnfilledMadLib {
  const toReturn = []
  let currentTextSegment = null
  for (let i = 0, j = madLib.length; i < j; i++) {
    currentTextSegment = madLib[i]
    if (currentTextSegment.type === 'text') {
      if (isPunctuationPOS(currentTextSegment.posInfo.pos)) {
        // TODO: Punctuation has to be joined into a text segment
        // in a different way than non-punctuation because we don't
        // join punctuation into sentences with spaces.
      } else {
        // TODO: Handle all non-punctuation text cases.
      }
    } else {

    }
  }

}
