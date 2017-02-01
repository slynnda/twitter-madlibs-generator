import { expect } from 'chai'

import * as ml from './mad-libs'

describe('mad-libs', () => {
    describe('generateMadLib', () => {
        it('should work with normal input', () => {
            const str = 'The quick, brown fox jumps over the lazy dog.'
            const opts = { probabilityBlank: 0.5 }
            expect(ml.generateMadLib(str, opts)).to.not.equal(true)
        })
    })
})