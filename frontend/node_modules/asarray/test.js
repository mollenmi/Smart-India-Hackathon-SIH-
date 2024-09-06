'use strict';

var asarray = require('./');
var test = require('tape');

test('asarray', function(t) {
  // array-like example object
  var o = {length: 3, 0:'a', 1:'b', 2:'c'};

  t.equal(o.length, 3);
  t.equal(o[0], 'a');
  t.equal(o[1], 'b');
  t.equal(o[2], 'c');

  // but it is not really an array
  t.equal(Array.isArray(o), false);
  t.equal('forEach' in o, false);

  // so make it one
  var a = asarray(o);

  // then it has all the same elements
  t.equal(a.length, 3);
  t.equal(a[0], 'a');
  t.equal(a[1], 'b');
  t.equal(a[2], 'c');

  // and you can use all the array methods
  t.equal(Array.isArray(a), true);
  t.equal('forEach' in a, true);
  a.forEach(function(e, i) {
    console.log(i,e);
  });


  t.end();
});
