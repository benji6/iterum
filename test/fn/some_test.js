const {expect} = require('chai')
const Iterum = require('../../src/index.js')
const {range} = Iterum

describe('some', function () {
    it('if predicate is true for some value, returns true', function () {
        const value = range(5, 10, 1)
            .some(function (e) {
                return e % 2 === 0
            })
        expect(value).to.be.equal(true)
    })

    it('if predicate return false for every value, returns false', function () {
        const value = range(5, 10, 1)
            .some(function (e) {
                return e > 20
            })
        expect(value).to.be.equal(false)
    })

    describe('iterating over iterum instance', function () {
        it('does not mutate the behaviour of some', function () {
            function predicate (e) {
                return e % 2 === 0
            }
            const iterum = range(5, 10, 1)
            let result = false
            for (const val of iterum.entries()) {
                if (predicate(val[1])) {
                    result = true
                    break
                }
            }
            expect(iterum.some(predicate)).to.be.deep.equal(result)
        })
    })

    describe('using all parameters of callback', function () {
        it('some method does not mutate iterum instance behaviour', function () {
            const value = Iterum([1, -4, 4, 2, 2, 5, -3, 0, 2, -4, 6])
                .some(function (e, index, iterum) {
                    return [...iterum
                        .slice(0, index)]
                        .reduce(function (a, b) {
                            return a + b
                        }, 0) > 5
                })
            expect(value).to.be.deep.equal(true)
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when the first argument is not a function', function () {
            function foo () {
                range(5, 10, 1).some('bar')
            }
            expect(foo).to.throw(TypeError,
                /^bar is not a function$/)
        })
    })
})
