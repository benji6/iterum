var expect = require('chai').expect
var traverse = require('../utils/traverse.js')
var Iterum = require('../../src/index.js')
var Value = Iterum.Value
var List = Iterum.List
var Repeat = Iterum.Repeat

describe('Iterum.Value', function () {
    describe('given any value passed to constructor, then this value is given at first time and property `done` is false', function () {
        it('if value is 7 it is given 7', function () {
            var iterator = Iterum(Value(7)).build()()
            expect(iterator.next()).to.be.deep.equal({
                value: 7,
                done: false
            })
        })
        it('if value is an object it is given the same object', function () {
            var obj = {foo: 'bar', 1: []}
            var iterator = Iterum(Value(obj)).build()()
            expect(iterator.next()).to.be.deep.equal({
                value: obj,
                done: false
            })
        })
        it('if value is an string it is given the same string', function () {
            var iterator = Iterum(Value('velociraptor')).build()()
            expect(iterator.next()).to.be.deep.equal({
                value: 'velociraptor',
                done: false
            })
        })
    })

    describe('After call `next` for first time, then `next` ...', function () {
        it('always returns {value: undefined, done: true}', function () {
            var iterator = Iterum(Value(7)).build()()
            iterator.next()
            expect(iterator.next()).to.be.deep.equal({
                value: undefined,
                done: true
            })
        })
        it('always returns {value: undefined, done: true}', function () {
            var obj = {foo: 'bar', 1: []}
            var iterator = Iterum(Value(obj)).build()()
            traverse(iterator, 5)
            expect(iterator.next()).to.be.deep.equal({
                value: undefined,
                done: true
            })
        })
        it('always returns {value: undefined, done: true}', function () {
            var iterator = Iterum(Value('velociraptor')).build()()
            traverse(iterator, 2)
            expect(iterator.next()).to.be.deep.equal({
                value: undefined,
                done: true
            })
        })
    })

    describe('passing iterum instance as value,', function () {
        describe('this value is converted in a sequence of values that represent the iterum instance', function () {
            it('given a iterum List', function () {
                var values = Iterum(Value(Iterum(List([1, 4, 5]))))
                    .toArray()
                expect(values).to.be.deep.equal([1, 4, 5])
            })

            it('given a iterum Repeat sequance', function () {
                var values = Iterum(Value(Iterum(Repeat(42, 3))))
                    .toArray()
                expect(values).to.be.deep.equal([42, 42, 42])
            })
        })
    })

    describe('calling toArray() in iterum instance', function () {
        it('don\'t affect using iterator obtained by .build()()', function () {
            var iterumBuilder = Iterum(Value(5))
            var iterator = iterumBuilder.build()()
            var array = iterumBuilder.toArray()
            var values = []
            traverse(iterator, function (node) {
                values.push(node.value)
            })
            expect(values).to.be.deep.equal(array)
        })
    })
})
