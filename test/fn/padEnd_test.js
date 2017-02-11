const {expect} = require('chai')
const Iterum = require('../../src/index.js')
const {range} = Iterum

describe('padEnd', function () {
    it('padEnd with length 0 returns iterable that iterate over the same values', function () {
        const iterable = ['a', 'b', 'c']
        const value = 'foo'
        const paddedIterable = Iterum(iterable).padEnd(0, value)
        expect([...paddedIterable]).to.be.deep.equal([...iterable])
    })

    it('padEnd with length greater than number of iterable values, it pads the last values until length', function () {
        const iterable = 'abc'
        const value = 'foo'
        const expectedIterable = ['a', 'b', 'c', value, value]
        const paddedIterable = Iterum(iterable).padEnd(5, value)
        expect([...paddedIterable]).to.be.deep.equal([...expectedIterable])
    })

    it('padEnd with the same length as number of iterable values, it does not pads anything', function () {
        const iterable = 'abc'
        const value = 'foo'
        const expectedIterable = ['a', 'b', 'c']
        const paddedIterable = Iterum(iterable).padEnd(3, value)
        expect([...paddedIterable]).to.be.deep.equal([...expectedIterable])
    })

    it('padEnd with length lower than number of iterable values, it does not pads anything', function () {
        const iterable = 'abc'
        const value = 'foo'
        const expectedIterable = ['a', 'b', 'c']
        const paddedIterable = Iterum(iterable).padEnd(1, value)
        expect([...paddedIterable]).to.be.deep.equal([...expectedIterable])
    })

    it('padEnd pads with undefined by default', function () {
        const iterable = 'abc'
        const expectedIterable = ['a', 'b', 'c', undefined, undefined, undefined, undefined]
        const paddedIterable = Iterum(iterable).padEnd(7)
        expect([...paddedIterable]).to.be.deep.equal([...expectedIterable])
    })

    describe('inmutability', function () {
        it('padEnd method does not mutate object', function () {
            const array = [3, 6, 2, 4, 8, 1]
            const expected = array.map(e => e)
            const iterable = Iterum(array)
            iterable.padEnd(100, Infinity)
            expect([...iterable]).to.be.deep.equal(expected)
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when the first argument is not a number or undefined', function () {
            function foo () {
                range(2, 9, 2).padEnd(true)
            }
            expect(foo).to.throw(TypeError,
                /^true is not a number or undefined$/)
        })
    })
})
