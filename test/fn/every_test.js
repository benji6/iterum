var expect = require('chai').expect
var Iterum = require('../../src/index.js')
var Range = Iterum.Range

describe('every', function () {
    it('if predicate is true for every value, returns true', function () {
        var value = Range(5, 10, 1)
            .every(function (e) {
                return e >= 5 && e <= 10
            })
        expect(value).to.be.equal(true)
    })

    it('if predicate returns false for some value, returns false', function () {
        var value = Range(5, 10, 1)
            .every(function (e) {
                return e < 10
            })
        expect(value).to.be.equal(false)
    })

    describe('iterating over iterum instance', function () {
        it('do not mutate the behaviour of find', function () {
            function predicate (e) {
                return e < 10
            }
            var iterum = Range(5, 10, 1)
            let result = true
            for (let val of iterum.entries()) {
                if (predicate(val[1])) {
                    result = false
                    break
                }
            }
            expect(iterum.every(predicate)).to.be.deep.equal(result)
        })
    })

    describe('using iterum parameters of callback', function () {
        it('every method does not mutate iterum behaviour', function () {
            var value = Iterum([1, -4, 4, 2, 2, 5, -3, 0, 2, -4, 6])
                .every(function (e, index, iterum) {
                    return [...iterum
                        .slice(0, index)]
                        .reduce(function (a, b) {
                            return a + b
                        }, 0) > 5
                })
            expect(value).to.be.deep.equal(false)
        })
    })

    describe('If it exists value that is an iterum instance,', function () {
        it('this value is interpreted as a sequence of values of this iterum instance', function () {
            var value = Iterum([100, Iterum([]), 100])
                .every(function (e) {
                    return e === 100
                })
            expect(value).to.be.deep.equal(true)
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when the first argument is not a function', function () {
            function foo () {
                Range(5, 10, 1)
                .every(new Number(8))
            }
            expect(foo).to.throw(TypeError,
                /^8 is not a function$/)
        })
    })
})
