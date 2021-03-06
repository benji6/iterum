const {expect} = require('chai')
const Iterum = require('../../src/index.js')

describe('take', function () {
    it('take 2 values', function () {
        const iterum = Iterum([7, 100, 4, 7, 2])
            .take(3)
        expect([...iterum]).to.be.deep.equal([7, 100, 4])
    })

    it('take 1 value by default', function () {
        const iterum = Iterum([2, 0, 3, 6, 1, 2])
            .take()
        expect([...iterum]).to.be.deep.equal([2])
    })

    it('take more values than iterable provide', function () {
        const iterum = Iterum([2, 0, 3, 6, 1, 2])
            .take(10)
        expect([...iterum]).to.be.deep.equal([2, 0, 3, 6, 1, 2])
    })

    it('take 0 values', function () {
        const iterum = Iterum([2, 0, 3, 6, 1, 2])
            .take(0)
        expect([...iterum]).to.be.deep.equal([])
    })

    it('take negative values is  the same as take 0 values', function () {
        const iterum = Iterum([2, 0, 3, 6, 1, 2])
            .take(-10)
        expect([...iterum]).to.be.deep.equal([])
    })

    describe('converting iterum instance to array', function () {
        it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
            const iterum = Iterum([7, 100, 4, 7, 2])
                .take(2)
            const iterator = iterum[Symbol.iterator]()
            expect([...iterator]).to.be.deep.equal([...iterum])
        })
    })

    describe('inmutability', function () {
        it('take method does not mutate object', function () {
            const a = [1, 5, 3, 2]
            const x = Iterum(a)
            x.take(4)
            expect([...x]).to.be.deep.equal(a)
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when the first argument is not a function', function () {
            const a = [2, 4, 6, 8]
            function foo () {
                Iterum(a).take(null)
            }
            expect(foo).to.throw(TypeError,
                /^null is not a number or undefined$/)
        })
    })

    describe('static method', function () {
        it('normal behaviour', function () {
            const takeIterable = Iterum.take([5, 7, 10], 2)
            expect([...takeIterable]).to.be.deep.equal([5, 7])
        })

        it('replaces first parameter by empty iterable when is not an iterable', function () {
            const takeIterable = Iterum.take(true, 5)
            expect([...takeIterable]).to.be.deep.equal([])
        })
    })
})
