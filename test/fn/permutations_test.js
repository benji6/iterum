const {expect} = require('chai')
const Iterum = require('../../src/index.js')

describe('.permutations', function () {
    context('empty iterable', function () {
        it('returns an iterable that iterates over the same values', function () {
            const a = []
            const iterable = Iterum(a).permutations()
            expect([...iterable]).to.be.deep.equal([
                []
            ])
        })
    })
    context('iterable with 1 value', function () {
        it('returns an iterable that iterates over the same values', function () {
            const a = [4]
            const iterable = Iterum(a).permutations()
            expect([...iterable]).to.be.deep.equal([
                [4]
            ])
        })
    })
    context('iterable with 2 values', function () {
        it('returns an iterable with the permutations of iterable object', function () {
            const a = [5, 9]
            const iterable = Iterum(a).permutations()
            expect([...iterable]).to.be.deep.equal([
                [5, 9],
                [9, 5]
            ])
        })
    })
    context('iterable with 3 values', function () {
        it('returns an iterable with the permutations of iterable object', function () {
            const a = [3, 2, 1]
            const iterable = Iterum(a).permutations()
            expect([...iterable]).to.be.deep.equal([
                [3, 2, 1],
                [2, 3, 1],
                [3, 1, 2],
                [1, 3, 2],
                [2, 1, 3],
                [1, 2, 3]
            ])
        })
    })
    context('iterable with 6 values', function () {
        it('returns an iterable with the permutations of iterable object (testing firsts 241 items)', function () {
            const a = [6, 5, 4, 3, 2, 1]
            const iterable = Iterum(a).permutations()
                .slice(0, 241)
            expect([...iterable]).to.be.deep.equal([
                [6, 5, 4, 3, 2, 1],
                [5, 6, 4, 3, 2, 1],
                [6, 4, 5, 3, 2, 1],
                [4, 6, 5, 3, 2, 1],
                [5, 4, 6, 3, 2, 1],
                [4, 5, 6, 3, 2, 1],
                [6, 5, 3, 4, 2, 1],
                [5, 6, 3, 4, 2, 1],
                [6, 3, 5, 4, 2, 1],
                [3, 6, 5, 4, 2, 1],
                [5, 3, 6, 4, 2, 1],
                [3, 5, 6, 4, 2, 1],
                [6, 4, 3, 5, 2, 1],
                [4, 6, 3, 5, 2, 1],
                [6, 3, 4, 5, 2, 1],
                [3, 6, 4, 5, 2, 1],
                [4, 3, 6, 5, 2, 1],
                [3, 4, 6, 5, 2, 1],
                [5, 4, 3, 6, 2, 1],
                [4, 5, 3, 6, 2, 1],
                [5, 3, 4, 6, 2, 1],
                [3, 5, 4, 6, 2, 1],
                [4, 3, 5, 6, 2, 1],
                [3, 4, 5, 6, 2, 1],
                [6, 5, 4, 2, 3, 1],
                [5, 6, 4, 2, 3, 1],
                [6, 4, 5, 2, 3, 1],
                [4, 6, 5, 2, 3, 1],
                [5, 4, 6, 2, 3, 1],
                [4, 5, 6, 2, 3, 1],
                [6, 5, 2, 4, 3, 1],
                [5, 6, 2, 4, 3, 1],
                [6, 2, 5, 4, 3, 1],
                [2, 6, 5, 4, 3, 1],
                [5, 2, 6, 4, 3, 1],
                [2, 5, 6, 4, 3, 1],
                [6, 4, 2, 5, 3, 1],
                [4, 6, 2, 5, 3, 1],
                [6, 2, 4, 5, 3, 1],
                [2, 6, 4, 5, 3, 1],
                [4, 2, 6, 5, 3, 1],
                [2, 4, 6, 5, 3, 1],
                [5, 4, 2, 6, 3, 1],
                [4, 5, 2, 6, 3, 1],
                [5, 2, 4, 6, 3, 1],
                [2, 5, 4, 6, 3, 1],
                [4, 2, 5, 6, 3, 1],
                [2, 4, 5, 6, 3, 1],
                [6, 5, 3, 2, 4, 1],
                [5, 6, 3, 2, 4, 1],
                [6, 3, 5, 2, 4, 1],
                [3, 6, 5, 2, 4, 1],
                [5, 3, 6, 2, 4, 1],
                [3, 5, 6, 2, 4, 1],
                [6, 5, 2, 3, 4, 1],
                [5, 6, 2, 3, 4, 1],
                [6, 2, 5, 3, 4, 1],
                [2, 6, 5, 3, 4, 1],
                [5, 2, 6, 3, 4, 1],
                [2, 5, 6, 3, 4, 1],
                [6, 3, 2, 5, 4, 1],
                [3, 6, 2, 5, 4, 1],
                [6, 2, 3, 5, 4, 1],
                [2, 6, 3, 5, 4, 1],
                [3, 2, 6, 5, 4, 1],
                [2, 3, 6, 5, 4, 1],
                [5, 3, 2, 6, 4, 1],
                [3, 5, 2, 6, 4, 1],
                [5, 2, 3, 6, 4, 1],
                [2, 5, 3, 6, 4, 1],
                [3, 2, 5, 6, 4, 1],
                [2, 3, 5, 6, 4, 1],
                [6, 4, 3, 2, 5, 1],
                [4, 6, 3, 2, 5, 1],
                [6, 3, 4, 2, 5, 1],
                [3, 6, 4, 2, 5, 1],
                [4, 3, 6, 2, 5, 1],
                [3, 4, 6, 2, 5, 1],
                [6, 4, 2, 3, 5, 1],
                [4, 6, 2, 3, 5, 1],
                [6, 2, 4, 3, 5, 1],
                [2, 6, 4, 3, 5, 1],
                [4, 2, 6, 3, 5, 1],
                [2, 4, 6, 3, 5, 1],
                [6, 3, 2, 4, 5, 1],
                [3, 6, 2, 4, 5, 1],
                [6, 2, 3, 4, 5, 1],
                [2, 6, 3, 4, 5, 1],
                [3, 2, 6, 4, 5, 1],
                [2, 3, 6, 4, 5, 1],
                [4, 3, 2, 6, 5, 1],
                [3, 4, 2, 6, 5, 1],
                [4, 2, 3, 6, 5, 1],
                [2, 4, 3, 6, 5, 1],
                [3, 2, 4, 6, 5, 1],
                [2, 3, 4, 6, 5, 1],
                [5, 4, 3, 2, 6, 1],
                [4, 5, 3, 2, 6, 1],
                [5, 3, 4, 2, 6, 1],
                [3, 5, 4, 2, 6, 1],
                [4, 3, 5, 2, 6, 1],
                [3, 4, 5, 2, 6, 1],
                [5, 4, 2, 3, 6, 1],
                [4, 5, 2, 3, 6, 1],
                [5, 2, 4, 3, 6, 1],
                [2, 5, 4, 3, 6, 1],
                [4, 2, 5, 3, 6, 1],
                [2, 4, 5, 3, 6, 1],
                [5, 3, 2, 4, 6, 1],
                [3, 5, 2, 4, 6, 1],
                [5, 2, 3, 4, 6, 1],
                [2, 5, 3, 4, 6, 1],
                [3, 2, 5, 4, 6, 1],
                [2, 3, 5, 4, 6, 1],
                [4, 3, 2, 5, 6, 1],
                [3, 4, 2, 5, 6, 1],
                [4, 2, 3, 5, 6, 1],
                [2, 4, 3, 5, 6, 1],
                [3, 2, 4, 5, 6, 1],
                [2, 3, 4, 5, 6, 1],
                [6, 5, 4, 3, 1, 2],
                [5, 6, 4, 3, 1, 2],
                [6, 4, 5, 3, 1, 2],
                [4, 6, 5, 3, 1, 2],
                [5, 4, 6, 3, 1, 2],
                [4, 5, 6, 3, 1, 2],
                [6, 5, 3, 4, 1, 2],
                [5, 6, 3, 4, 1, 2],
                [6, 3, 5, 4, 1, 2],
                [3, 6, 5, 4, 1, 2],
                [5, 3, 6, 4, 1, 2],
                [3, 5, 6, 4, 1, 2],
                [6, 4, 3, 5, 1, 2],
                [4, 6, 3, 5, 1, 2],
                [6, 3, 4, 5, 1, 2],
                [3, 6, 4, 5, 1, 2],
                [4, 3, 6, 5, 1, 2],
                [3, 4, 6, 5, 1, 2],
                [5, 4, 3, 6, 1, 2],
                [4, 5, 3, 6, 1, 2],
                [5, 3, 4, 6, 1, 2],
                [3, 5, 4, 6, 1, 2],
                [4, 3, 5, 6, 1, 2],
                [3, 4, 5, 6, 1, 2],
                [6, 5, 4, 1, 3, 2],
                [5, 6, 4, 1, 3, 2],
                [6, 4, 5, 1, 3, 2],
                [4, 6, 5, 1, 3, 2],
                [5, 4, 6, 1, 3, 2],
                [4, 5, 6, 1, 3, 2],
                [6, 5, 1, 4, 3, 2],
                [5, 6, 1, 4, 3, 2],
                [6, 1, 5, 4, 3, 2],
                [1, 6, 5, 4, 3, 2],
                [5, 1, 6, 4, 3, 2],
                [1, 5, 6, 4, 3, 2],
                [6, 4, 1, 5, 3, 2],
                [4, 6, 1, 5, 3, 2],
                [6, 1, 4, 5, 3, 2],
                [1, 6, 4, 5, 3, 2],
                [4, 1, 6, 5, 3, 2],
                [1, 4, 6, 5, 3, 2],
                [5, 4, 1, 6, 3, 2],
                [4, 5, 1, 6, 3, 2],
                [5, 1, 4, 6, 3, 2],
                [1, 5, 4, 6, 3, 2],
                [4, 1, 5, 6, 3, 2],
                [1, 4, 5, 6, 3, 2],
                [6, 5, 3, 1, 4, 2],
                [5, 6, 3, 1, 4, 2],
                [6, 3, 5, 1, 4, 2],
                [3, 6, 5, 1, 4, 2],
                [5, 3, 6, 1, 4, 2],
                [3, 5, 6, 1, 4, 2],
                [6, 5, 1, 3, 4, 2],
                [5, 6, 1, 3, 4, 2],
                [6, 1, 5, 3, 4, 2],
                [1, 6, 5, 3, 4, 2],
                [5, 1, 6, 3, 4, 2],
                [1, 5, 6, 3, 4, 2],
                [6, 3, 1, 5, 4, 2],
                [3, 6, 1, 5, 4, 2],
                [6, 1, 3, 5, 4, 2],
                [1, 6, 3, 5, 4, 2],
                [3, 1, 6, 5, 4, 2],
                [1, 3, 6, 5, 4, 2],
                [5, 3, 1, 6, 4, 2],
                [3, 5, 1, 6, 4, 2],
                [5, 1, 3, 6, 4, 2],
                [1, 5, 3, 6, 4, 2],
                [3, 1, 5, 6, 4, 2],
                [1, 3, 5, 6, 4, 2],
                [6, 4, 3, 1, 5, 2],
                [4, 6, 3, 1, 5, 2],
                [6, 3, 4, 1, 5, 2],
                [3, 6, 4, 1, 5, 2],
                [4, 3, 6, 1, 5, 2],
                [3, 4, 6, 1, 5, 2],
                [6, 4, 1, 3, 5, 2],
                [4, 6, 1, 3, 5, 2],
                [6, 1, 4, 3, 5, 2],
                [1, 6, 4, 3, 5, 2],
                [4, 1, 6, 3, 5, 2],
                [1, 4, 6, 3, 5, 2],
                [6, 3, 1, 4, 5, 2],
                [3, 6, 1, 4, 5, 2],
                [6, 1, 3, 4, 5, 2],
                [1, 6, 3, 4, 5, 2],
                [3, 1, 6, 4, 5, 2],
                [1, 3, 6, 4, 5, 2],
                [4, 3, 1, 6, 5, 2],
                [3, 4, 1, 6, 5, 2],
                [4, 1, 3, 6, 5, 2],
                [1, 4, 3, 6, 5, 2],
                [3, 1, 4, 6, 5, 2],
                [1, 3, 4, 6, 5, 2],
                [5, 4, 3, 1, 6, 2],
                [4, 5, 3, 1, 6, 2],
                [5, 3, 4, 1, 6, 2],
                [3, 5, 4, 1, 6, 2],
                [4, 3, 5, 1, 6, 2],
                [3, 4, 5, 1, 6, 2],
                [5, 4, 1, 3, 6, 2],
                [4, 5, 1, 3, 6, 2],
                [5, 1, 4, 3, 6, 2],
                [1, 5, 4, 3, 6, 2],
                [4, 1, 5, 3, 6, 2],
                [1, 4, 5, 3, 6, 2],
                [5, 3, 1, 4, 6, 2],
                [3, 5, 1, 4, 6, 2],
                [5, 1, 3, 4, 6, 2],
                [1, 5, 3, 4, 6, 2],
                [3, 1, 5, 4, 6, 2],
                [1, 3, 5, 4, 6, 2],
                [4, 3, 1, 5, 6, 2],
                [3, 4, 1, 5, 6, 2],
                [4, 1, 3, 5, 6, 2],
                [1, 4, 3, 5, 6, 2],
                [3, 1, 4, 5, 6, 2],
                [1, 3, 4, 5, 6, 2],
                [6, 5, 4, 2, 1, 3]
            ])
        })
    })

    describe('inmutability', function () {
        it('map method does not mutate object', function () {
            const a = new Set([1, 6, 3])
            const x = Iterum(a)
            x.permutations()
            expect([...x]).to.be.deep.equal([...a])
        })
    })

    describe('converting iterum instance to array', function () {
        it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
            const a = [8, 7, 6]
            const iterable = Iterum(a)
                .permutations()
            const iterator = iterable[Symbol.iterator]()
            expect([...iterator]).to.be.deep.equal([...iterable])
        })
    })

    describe('static method', function () {
        it('normal behaviour', function () {
            const iterable = Iterum.permutations('ab', e => e * 2)
            expect([...iterable]).to.be.deep.equal([
                ['a', 'b'],
                ['b', 'a']
            ])
        })

        it('replaces first parameter by empty iterable when is not an iterable', function () {
            const iterable = Iterum.permutations(null)
            expect([...iterable]).to.be.deep.equal([[]])
        })
    })
})
