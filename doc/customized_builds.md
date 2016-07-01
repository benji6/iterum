# Customized builds (just import what you need!)

Sometimes you might need to use this library in a front-end project and, maybe, you might not need to use all of constructors or methods that provide this library. This is not a problem because this is a modular project and by the aid of [browserify](https://www.npmjs.com/package/browserify) and iterumBuilder function you can build just the constructors and methods that you need.

For example, if you only need `List` constructor and `map` and `filter` methods. You can create your customized instance of Iterum, thus:

``` javascript
// customize-iterum.js

var iterumBuilder = require('iterum/src/iterum-builder.js')
var List = require('iterum/src/constructors/list.js')
var map = require('iterum/src/fn/map.js')
var filter = require('iterum/src/fn/filter.js')

module.exports = iterumBuilder({
    constructors: {
        List: List
    },
    methods: {
        map: map,
        filter: filter
    }
})
```

See [index.js project file](https://github.com/xgbuils/iterum/blob/master/src/index.js)  to know how to create your customize Iterum instance.
