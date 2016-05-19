function generatorMethodFactory (validator, iterumStateCreator, defaultArgs, next, transform) {
    return function () {
        var Iterum = validator.Iterum
        var iterum = this
        var args = defaultArgs.apply(null, arguments)
        return Iterum(function () {
            var existTransform = typeof transform === 'function'
            var iterumState = iterumStateCreator(iterum)
            return {
                next: next.bind(null, iterumState, existTransform ? transform(args) : args)
            }
        })
    }
}

module.exports = generatorMethodFactory
