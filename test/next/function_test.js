var expect = require('chai').expect
var traverse = require('../utils/traverse')
var Iterum = require('../../src/index.js')

describe('Iterum with function', function () {
    describe('first 8 fibonacci numbers generator', function () {
        var iterator
        var values
        beforeEach(function () {
            function fibonacci () {
                var count = 0
                var a = 0
                var b = 1
                return {
                    next: function () {
                        var done = count >= 8
                        var nextValue = a + b
                        a = b
                        b = nextValue
                        ++count
                        return {
                            value: done ? undefined : a,
                            done: done
                        }
                    }
                }
            }
            iterator = Iterum(fibonacci).build()()
            values = []
        })
        it('starts with 1 value', function () {
            expect(iterator.next()).to.be.deep.equal({
                value: 1,
                done: false
            })
        })
        it('always generates constant value', function () {
            traverse(iterator, function (node) {
                values.push(node.value)
            })
            expect(values).to.be.deep.equal([1, 1, 2, 3, 5, 8, 13, 21])
        })
        it('ends with {value: undefined, done: true}', function () {
            var end = traverse(iterator)
            expect(end).to.be.deep.equal({
                value: undefined,
                done: true
            })
        })
    })

    describe('constant iterator', function () {
        var iterator
        var values
        beforeEach(function () {
            function constant () {
                return {
                    next: function () {
                        return {
                            value: 5,
                            done: false
                        }
                    }
                }
            }
            iterator = Iterum(constant).build()()
            values = []
        })
        it('starts with 5 value', function () {
            expect(iterator.next()).to.be.deep.equal({
                value: 5,
                done: false
            })
        })
        it('always generates constant value', function () {
            traverse(iterator, function (node) {
                values.push(node.value)
            }, 7)
            expect(values).to.be.deep.equal([5, 5, 5, 5, 5, 5, 5])
        })
        it('never ends', function () {
            traverse(iterator, 15)
            expect(iterator.next().done).to.be.not.equal(true)
        })
    })

    describe('empty iterator', function () {
        var iterator
        var nodes
        beforeEach(function () {
            iterator = Iterum(function () {
                return {
                    next: function () {
                        return {
                            value: undefined,
                            done: true
                        }
                    }
                }
            }).build()()
            nodes = []
        })
        it('starts with 5 value', function () {
            expect(iterator.next()).to.be.deep.equal({
                value: undefined,
                done: true
            })
        })
        it('always returns {value: undefined, done: true}', function () {
            traverse(iterator, function (node) {
                nodes.push(node)
            }, 3)
            expect(nodes).to.be.deep.equal([{
                value: undefined,
                done: true
            }, {
                value: undefined,
                done: true
            }, {
                value: undefined,
                done: true
            }])
        })
    })

    describe('generator with params', function () {
        var nodes
        var foo
        beforeEach(function () {
            foo = function (a, b) {
                this.prop = a + b
                return {
                    next: function () {
                        return {
                            value: a + b,
                            done: false
                        }
                    }
                }
            }
            nodes = []
        })
        it('always returns {value: 5, done: false}', function () {
            var iterator = Iterum(foo, 2, 3).build()()
            traverse(iterator, function (node) {
                nodes.push(node)
            }, 3)
            expect(nodes).to.be.deep.equal([{
                value: 5,
                done: false
            }, {
                value: 5,
                done: false
            }, {
                value: 5,
                done: false
            }])
        })
        it('works well if it is passed with bind', function () {
            var iterator = Iterum(foo.bind(null, 2, 3)).build()()
            traverse(iterator, function (node) {
                nodes.push(node)
            }, 3)
            expect(nodes).to.be.deep.equal([{
                value: 5,
                done: false
            }, {
                value: 5,
                done: false
            }, {
                value: 5,
                done: false
            }])
        })
        it('context works well if you bind the generator', function () {
            var context = {}
            var iterator = Iterum(foo.bind(context, 2, 3)).build()()
            traverse(iterator, function (node) {
                nodes.push(node)
            }, 3)
            expect(context).to.be.deep.equal({prop : 5})
        })
    })
})
