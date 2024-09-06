# asarray

Convert array-like objects to arrays

[![Build Status](https://travis-ci.org/deathcap/asarray.png)](https://travis-ci.org/deathcap/asarray)

Have an array-like object, with a `length` property and integer properties `0` to `length - 1`,
but you want to use real array methods on it? Now you can:

    var asarray = require('asarray');

    var arr = asarray(obj);

and then `Array.isArray(arr)` is true, native methods like `arr.forEach()` (if available
on your platform) can be used, and so on. Effectively, `asarray` converts from an *implicit
interface* to a real array (reification?).

An example use case is iterating over a `FileList` from the [W3C File API](http://www.w3.org/TR/FileAPI/#dfn-filelist)
or other array-like DOM elements using `forEach` or other useful array methods. Since `FileList`
is not an array these methods cannot normally be used directly.

Performance note: this module uses `new Array(length)` then sets each index
(initializing the array with `[]` then adding each element with `.push()` would be
20-70% [slower](http://jsperf.com/asarray-index-push)). Also note, a new array is created
and copied; for large array-like objects this module may not be the best solution.

(Note this module should not to be confused with [toarray](https://www.npmjs.org/package/toarray),
which although also very useful, has a completely different purpose.)

## License

MIT

