var expect = require('chai').expect
var Iterum = require('../../src/index.js')

describe('entries', function () {
    describe('passing a Map instance', function () {
        it('Iterum#entries iterates over pairs with numeric index and map values', function () {
            const map = new Map()
                .set('one', 1)
                .set('two', 2)
                .set('three', 3)
            expect([...Iterum(map).entries()]).to.be.deep.equal([...map].map((e, i) => [i, e]))
        })
    })

    describe('passing a Set instance', function () {
        it('Iterum#entries iterates over pairs with numeric index and set values', function () {
            const set = new Set()
                .add('one')
                .add('two')
                .add('three')
            expect([...Iterum(set).entries()]).to.be.deep.equal([...set].map((e, i) => [i, e]))
        })
    })

    describe('passing an Array instance', function () {
        it('Iterum#entries iterates over pairs with numeric index and array values', function () {
            const array = ['one', 'two', 'three']
            expect([...Iterum(array).entries()]).to.be.deep.equal([...array].map((e, i) => [i, e]))
        })
    })

    describe('passing an TypedArray instance', function () {
        it('Iterum#entries iterates over pairs with numeric index and typed array values', function () {
            const uint8Arr = new Uint8Array([1, 2, 3])
            expect([...Iterum(uint8Arr).entries()]).to.be.deep.equal([...uint8Arr].map((e, i) => [i, e]))
        })
    })

    describe('passing an String instance (that does not have entries method)', function () {
        it('Iterum#entries iterates over pairs with numeric index and string characters', function () {
            const string = 'one, two & three'
            expect([...Iterum(string).entries()]).to.be.deep.equal([...string].map((e, i) => [i, e]))
        })
    })
})
