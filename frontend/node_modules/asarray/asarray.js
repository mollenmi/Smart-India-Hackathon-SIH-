'use strict';

module.exports = function(o) {
  var length = o.length;
  var a = Array(length);

  for (var i = 0; i < length; i += 1) {
    a[i] = o[i];
  }

  return a;
}
