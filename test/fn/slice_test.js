var expect = require('chai').expect
var Iterum = require('../../src/index.js')
var Range = Iterum.Range

describe('slice', function () {
    describe('given slice with `start` and `end` parameters inside of range', function () {
        it('generator that returns an iterator slice', function () {
            var values = Iterum(Range(0, 3, 1))
                .slice(1, 3)
                .toArray()
            expect(values).to.be.deep.equal([1, 2])
        })
    })

    describe('given slice with `start` and `end` parameters outside of range', function () {
        it('generator that returns an iterator slice', function () {
            var values = Iterum(Range(0, 3, 1))
                .slice(-1, 100)
                .toArray()
            expect(values).to.be.deep.equal([0, 1, 2, 3])
        })
    })

    describe('given slice without `start` and `end` parameters outside of range', function () {
        it('generator that returns an iterator the same iterator', function () {
            var values = Iterum(Range(0, 3, 1))
                .slice()
                .toArray()
            expect(values).to.be.deep.equal([0, 1, 2, 3])
        })
    })

    describe('given slice without `end` parameter', function () {
        it('generator that returns an iterator that is cut only by `start` parameter', function () {
            var values = Iterum(Range(0, 3, 1))
                .slice(2)
                .toArray()
            expect(values).to.be.deep.equal([2, 3])
        })
    })
})
