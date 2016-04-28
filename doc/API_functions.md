# Functions

## compose (...generators)

A generator is a function that returns an iterator. Then, given a list of generators as parameters, `compose` returns a new generator that is the composition of its.

### Examples:
``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range
var compose = require('iterum/src/fn/compose')

var gen = compose(
    function () {
        return new Iterum(Range(1, 3))
    },
    function () {
        return new Iterum(Range(5, 1, -2))
    }
)

var iterator = gen()
var state
var values = []
while (!(state = iterator.next()).done) {
    values.push(state.value)
}
console.log(values) // [5, 3, 1, 5, 3, 1, 5, 3, 1]
```

You can create a parametrizable generator defining the first generator with parameters:
``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range

var gen = compose(
    function (n) {
        return new Iterum(Range(1, n))
    },
    function () {
        return new Iterum(Range(5, 1, -2))
    }
)

var iterator = gen(5);
var state
var values = []
while (!(state = iterator.next()).done) {
    values.push(state.value)
}
console.log(values) // [5, 3, 1, 5, 3, 1, 5, 3, 1, 5, 3, 1, 5, 3, 1]
```

You can pass parameters to the next generator using extra parameter callback:
``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range
var compose = require('iterum/src/fn/compose')

var gen = compose(
    function (n, _) {
        _(n)
        return new Iterum(Range(1, n))
    },
    function (n) {
        return new Iterum(Range(1, n));
    }
)

var iterator2 = gen(2);
var state
var values = []
while (!(state = iterator2.next()).done) {
    values.push(state.value)
}
console.log(values) // [1, 2, 1, 2]

var iterator3 = gen(3);
values = []
while (!(state = iterator3.next()).done) {
    values.push(state.value)
}
console.log(values) // [1, 2, 3, 1, 2, 3, 1, 2, 3]
```

When extra parameter callback is self passed as parameter, next generator callback receives the value equivalent to previous iterator#next().value:
``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range
var Value = Iterum.Value
var compose = require('iterum/src/fn/compose')

var generator = compose(
    function (n, _) {
        _(_, n)
        return RangeGenerator(0, n)
    },
    function (i, n, _) {
        _(i, _, n)
        return RangeGenerator(0, n)
    },
    function (i, j, n, _) {
        _(i, j, _)
        return RangeGenerator(0, n)
    },
    function (i, j, k) {
        return ValueGenerator([i, j, k])
    }
)

var iterator = generator(2);
var state
var values = []
while (!(state = iterator.next()).done) {
    values.push(state.value)
}
console.log(values) /* [
    [ 0, 0, 0 ],  [ 0, 0, 1 ],  [ 0, 0, 2 ],
    [ 0, 1, 0 ],  [ 0, 1, 1 ],  [ 0, 1, 2 ],
    [ 0, 2, 0 ],  [ 0, 2, 1 ],  [ 0, 2, 2 ],
    [ 1, 0, 0 ],  [ 1, 0, 1 ],  [ 1, 0, 2 ],
    [ 1, 1, 0 ],  [ 1, 1, 1 ],  [ 1, 1, 2 ],
    [ 1, 2, 0 ],  [ 1, 2, 1 ],  [ 1, 2, 2 ],
    [ 2, 0, 0 ],  [ 2, 0, 1 ],  [ 2, 0, 2 ],
    [ 2, 1, 0 ],  [ 2, 1, 1 ],  [ 2, 1, 2 ],
    [ 2, 2, 0 ],  [ 2, 2, 1 ],  [ 2, 2, 2 ]
]*/
```