var expect = require('chai').expect
var Iterum = require('../../src/index.js')
var Cartesian = Iterum.Cartesian
var Range = Iterum.Range

describe('Iterum.Cartesian', function () {
    describe('given 2 lists, it makes cartesian product of these lists', function () {
        it('2 no empty lists', function () {
            var values = [...Cartesian([1, 2], [3, 4])]
            expect(values).to.be.deep.equal([
                [1, 3],
                [1, 4],
                [2, 3],
                [2, 4]
            ])
        })

        it('first list is empty', function () {
            var values = [...Cartesian([], [1, 2, 3, 4])]
            expect(values).to.be.deep.equal([])
        })

        it('second list is empty', function () {
            var values = [...Cartesian([1, 2, 3, 4], [])]
            expect(values).to.be.deep.equal([])
        })

        it('2 lista are empty', function () {
            var values = [...Cartesian([], [])]
            expect(values).to.be.deep.equal([])
        })

        it('first list has one element', function () {
            var values = [...Cartesian([0], [1, 2, 3, 4])]
            expect(values).to.be.deep.equal([
                [0, 1],
                [0, 2],
                [0, 3],
                [0, 4]
            ])
        })
    })

    describe('one list', function () {
        it('no empty list', function () {
            var values = [...Cartesian([1, 2, 3, 4])]
            expect(values).to.be.deep.equal([
                [1], [2], [3], [4]
            ])
        })

        it('empty list', function () {
            var values = [...Cartesian([])]
            expect(values).to.be.deep.equal([])
        })
    })

    describe('more than 2 lists', function () {
        it('3 no empty lists with the same length', function () {
            var values = [...Cartesian([1, 2], [3, 4], [5, 6])]
            expect(values).to.be.deep.equal([
                [1, 3, 5],
                [1, 3, 6],
                [1, 4, 5],
                [1, 4, 6],
                [2, 3, 5],
                [2, 3, 6],
                [2, 4, 5],
                [2, 4, 6]
            ])
        })

        it('3 no empty lists with different length', function () {
            var values = [...Cartesian([1, 2], [3], [4, 5, 6])]
            expect(values).to.be.deep.equal([
                [1, 3, 4],
                [1, 3, 5],
                [1, 3, 6],
                [2, 3, 4],
                [2, 3, 5],
                [2, 3, 6]
            ])
        })

        it('there is an empty list', function () {
            var values = [...Cartesian([1, 2, 3], [3, 4, 5, 3, 2, 4], [], [4, 5, 6])]
            expect(values).to.be.deep.equal([])
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when it is not passed any argument', function () {
            function foo () {
                Cartesian()
            }
            expect(foo).to.throw(TypeError,
                /^undefined is not an array$/)
        })

        it('throws an exception when it is passed no array in 1st argument', function () {
            function foo () {
                Cartesian(23)
            }
            expect(foo).to.throw(TypeError,
                /^23 is not an array$/)
        })

        it('second to Infinity arguments are optional but they must be Arrays', function () {
            function foo () {
                Cartesian([23], [], [1, 3], 'foo', [1])
            }
            expect(foo).to.throw(TypeError,
                /^foo is not an array$/)
        })
    })

    describe('If value is a iterum instance', function () {
        describe('this value is interpreted as a sequence of values of this iterum instance', function () {
            it('using Range and iterum instance values inside Cartesian params', function () {
                var values = [...Cartesian([Range(1, 2)], [Iterum([3]), 4])]
                expect(values).to.be.deep.equal([[1, 3], [1, 4], [2, 3], [2, 4]])
            })

            it('using Cartesian instance and call repeat then', function () {
                var values = [...Cartesian([2], [3]).repeat(2)]
                expect(values).to.be.deep.equal([[2, 3], [2, 3]])
            })
        })
    })

    describe('converting iterum instance to array', function () {
        it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
            var cartesianIterable = Cartesian([1, 3], [6, 10])
            var iterator = cartesianIterable[Symbol.iterator]()
            expect([...iterator]).to.be.deep.equal([...cartesianIterable])
        })
    })

    describe('If Cartesian instance is passed as param of Iterum', function () {
        it('creates a clone of Cartesian instance', function () {
            var PARAMS = [1, 5]
            var a = Cartesian(PARAMS)
            var b = Iterum(a)
            expect(a).to.be.not.equal(b)
            expect([...a]).to.be.deep.equal([...b])
        })
    })
})
