// Polyfill android 4.2+
if (typeof Map === 'undefined') {
  try {
    (window as any).Map = require('es6-map/polyfill');
  } catch (err) {
    console.log(err);
  }
}

// Polyfill android 4.2+
if (typeof Set === 'undefined') {
  try {
    (window as any).Set = require('es6-set/polyfill');
  } catch (err) {
    console.log(err);
  }
}

if (typeof Promise === 'undefined') {
  try {
    require('es6-promise').polyfill();
  } catch (err) {
    console.log(err);
  }
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