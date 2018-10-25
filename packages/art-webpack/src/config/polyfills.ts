// Polyfill android 4.2+
if (typeof Map === 'undefined') {
  (window as any).Map = require('es6-map/polyfill');
}

// Polyfill android 4.2+
if (typeof Set === 'undefined') {
  (window as any).Set = require('es6-set/polyfill');
}

if (typeof Promise === 'undefined') {
  require('es6-promise').polyfill();
}

// It will use the native implementation if it's present.
Object.assign = require('object-assign');

// ==== polyfills Array ====
// Array.forEach
// Array.map
// ------------- //
// Array.from
// Array.every
// Array.includes
// Array.reduce
// Array.filter
// Array.find
// Array.indexOf
require('../polyfills');