var expect = require('chai').expect
var traverse = require('../utils/traverse')
var Iterum = require('../../src/index.js')
var Range = Iterum.Range
var Empty = Iterum.Empty

describe('concat', function () {
    it('given two no empty generators returns Iterum instance concatenation', function () {
        var values = Iterum(Range(0, 3, 1))
            .concat(Range(4, 16, 4))
            .toArray()
        expect(values).to.be.deep.equal([0, 1, 2, 3, 4, 8, 12, 16])
    })

    it('concatenating empty generator with no empty generator works well', function () {
        var values = Iterum(Empty())
            .concat(Range(4, 16, 4))
            .toArray()
        expect(values).to.be.deep.equal([4, 8, 12, 16])
    })

    it('concatenating no empty generator with empty generator works well', function () {
        var values = Iterum(Range(0, 3, 1))
            .concat(Empty())
            .toArray()
        expect(values).to.be.deep.equal([0, 1, 2, 3])
    })

    it('concatenating empty generator with empty generator works well', function () {
        var values = Iterum(Empty())
            .concat(Empty())
            .toArray()
        expect(values).to.be.deep.equal([])
    })

    describe('calling toArray() in iterum instance', function () {
        it('don\'t affect using generator obtained by .build()()', function () {
            var iterumBuilder = Iterum(Range(8, 3, -1))
                .concat(Range(4, 16, 4))
            var generator = iterumBuilder
                .build()()
            var array = iterumBuilder.toArray()
            var values = []
            traverse(generator, function (node) {
                values.push(node.value)
            })
            expect(values).to.be.deep.equal(array)
        })
    })

    describe('inmutability', function () {
        it('concat method does not mutate object', function () {
            var x = Iterum(Range(8, 3, -1))
            x.concat(Range(4, 16, 4))
            expect(x.toArray()).to.be.deep.equal([8, 7, 6, 5, 4, 3])
        })
    })
})
