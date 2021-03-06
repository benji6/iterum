const {expect} = require('chai')
const Iterum = require('../../src/index.js')

describe('dropWhile', function () {
    it('drop iterable values while value is greater than 5', function () {
        const iterum = Iterum([7, 100, 4, 7, 2])
            .dropWhile(e => e > 5)
        expect([...iterum]).to.be.deep.equal([4, 7, 2])
    })

    it('drop iterable values while sum of first elements is not greater than 10', function () {
        const iterum = Iterum([2, 0, 3, 6, 1, 2])
            .dropWhile(function (e, index, it) {
                return it.slice(0, index + 1)
                    .reduce((a, b) => a + b) <= 10
            })
        expect([...iterum]).to.be.deep.equal([6, 1, 2])
    })

    it('dropping to end of iterable because condition always match', function () {
        const iterum = Iterum([2, 0, 3, 6, 1, 2])
            .dropWhile(e => e < 7)
        expect([...iterum]).to.be.deep.equal([])
    })

    it('using context parameter', function () {
        const context = []
        const iterum = Iterum([2, 5, 3, 7])
            .dropWhile(function (e) {
                const result = e !== 3
                if (result) {
                    this.push(e)
                }
                return result
            }, context)
        for (const value of iterum) {} // eslint-disable-line no-unused-vars
        expect(context).to.be.deep.equal([2, 5])
    })

    describe('converting iterum instance to array', function () {
        it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
            const iterum = Iterum([7, 100, 4, 7, 2])
                .dropWhile(e => e > 5)
            const iterator = iterum[Symbol.iterator]()
            expect([...iterator]).to.be.deep.equal([...iterum])
        })
    })

    describe('inmutability', function () {
        it('dropWhile method does not mutate object', function () {
            const a = [1, 2, 0, -6, 3, 7, 4, 5, 1]
            const iterable = Iterum(a)
            iterable.dropWhile((_, i) => i < 2)
            expect([...iterable]).to.be.deep.equal([...a])
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when the first argument is not a function', function () {
            function foo () {
                Iterum([3]).dropWhile(false)
            }
            expect(foo).to.throw(TypeError,
                /^false is not a function$/)
        })
    })

    describe('static method', function () {
        it('normal behaviour', function () {
            const dropWhileIterable = Iterum.dropWhile([5, 7, 10], e => e < 6)
            expect([...dropWhileIterable]).to.be.deep.equal([7, 10])
        })

        it('replaces first parameter by empty iterable when is not an iterable', function () {
            const dropWhileIterable = Iterum.dropWhile(/a+/, e => e > 5)
            expect([...dropWhileIterable]).to.be.deep.equal([])
        })
    })
})
