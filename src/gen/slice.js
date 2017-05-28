const IterArray = require('iterarray')

module.exports = function slice (iterable, start = 0, end = Infinity) {
    return this(IterArray(iterable).slice(start, end))
}
