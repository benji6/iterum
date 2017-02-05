const {expect} = require('chai')
const Iterum = require('../../src/index.js')
const {range} = Iterum

describe('slice', function () {
    describe('given slice with `start` and `end` parameters inside of range', function () {
        it('generator that returns an iterator slice', function () {
            const values = [...range(0, 3, 1)
                .slice(1, 3)]
            expect(values).to.be.deep.equal([1, 2])
        })
    })

    describe('given slice with `start` and `end` parameters outside of range', function () {
        it('generator that returns an iterator slice', function () {
            const values = [...range(0, 3, 1)
                .slice(-1, 100)]
            expect(values).to.be.deep.equal([0, 1, 2, 3])
        })
    })

    describe('given slice without `start` and `end` parameters outside of range', function () {
        it('generator that returns an iterator the same iterator', function () {
            const values = [...range(0, 3, 1)
                .slice()]
            expect(values).to.be.deep.equal([0, 1, 2, 3])
        })
    })

    describe('given slice without `end` parameter', function () {
        it('generator that returns an iterator that is cut only by `start` parameter', function () {
            const values = [...range(0, 3, 1)
                .slice(2)]
            expect(values).to.be.deep.equal([2, 3])
        })
    })

    describe('If it exists value that is an iterum instance,', function () {
        it('this value is interpreted as a sequence of values of this iterum instance', function () {
            const values = [...Iterum([range(5, 2, -1), 8]).slice(1, 2)]
            expect(values).to.be.deep.equal([4])
        })
    })

    describe('converting iterum instance to array', function () {
        it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
            const sliceIterable = range(8, 3, -1).slice(2, 4)
            const iterator = sliceIterable[Symbol.iterator]()
            expect([...iterator]).to.be.deep.equal([...sliceIterable])
        })
    })

    describe('inmutability', function () {
        it('slice method does not mutate object', function () {
            const x = range(8, 3, -1)
            x.slice(1, 4)
            expect([...x]).to.be.deep.equal([8, 7, 6, 5, 4, 3])
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when the first argument is not a Number or undefined', function () {
            function foo () {
                range(5, 10, 1)
                .slice(true)
            }
            expect(foo).to.throw(TypeError,
                /^true is not a number or undefined$/)
        })

        it('throws an exception when the second argument is not a Number or undefined', function () {
            function foo () {
                range(5, 10, 1)
                .slice(2, /^\d+/)
            }
            expect(foo).to.throw(TypeError,
                '/^\\d+/ is not a number or undefined')
        })
    })
})
