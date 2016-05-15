var generatorMethodFactory = require('../core/generator-method-factory.js')

function slice (Iterum) {
    return generatorMethodFactory(
        Iterum,
        function defaultArgs (start, end) {
            return [
                start || 0,
                end === undefined ? Infinity : end
            ]
        },
        function next (iterumState, args) {
            var index
            var result
            var iterator = iterumState.iterator
            for (index = iterumState.index; index < args[0]; ++index) {
                iterator.next()
            }
            if (index < args[1]) {
                result = iterator.next()
                ++index
            }
            iterumState.index = index
            return result || {
                value: undefined,
                done: true
            }
        }
    )
}

module.exports = slice
