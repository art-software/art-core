"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TOSTRING = Object.prototype.toString;
var TYPES = {
  boolean: 'boolean',
  undefined: 'undefined',
  number: 'number',
  string: 'string',
  '[object Function]': 'function',
  '[object RegExp]': 'regexp',
  '[object Array]': 'array',
  '[object Date]': 'date',
  '[object Error]': 'error'
};

exports.type = function (o) {
  return TYPES[_typeof(o)] || TYPES[TOSTRING.call(o)] || (o ? 'object' : 'null');
};

exports.isFunction = function (o) {
  return exports.type(o) === 'function';
};

exports.isNull = function (o) {
  return o === null;
};

exports.isNumber = function (o) {
  return exports.type(o) === 'number' && isFinite(o);
};

exports.isBoolean = function (o) {
  return exports.type(o) === 'boolean';
};

exports.isObject = function (o) {
  var failfn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var t = _typeof(o);

  return o && (t === 'object' || !failfn && (t === 'function' || exports.isFunction(o))) || false;
};

exports.isPlainObject = function (o) {
  return exports.isObject(o, true);
};

exports.isString = function (o) {
  return exports.type(o) === 'string';
};

exports.isUndefined = function (o) {
  return exports.type(o) === 'undefined';
};

exports.isArray = Array.isArray || function (o) {
  return exports.type(o) === 'array';
};

exports.now = Date.now || function () {
  return new Date().getTime();
};

exports.fromJson = function (json) {
  return exports.isString(json) ? JSON.parse(json) : json;
};

exports.toJson = function (obj, pretty) {
  if (exports.isUndefined(obj)) {
    return undefined;
  }

  if (!exports.isNumber(pretty)) {
    pretty = pretty ? 2 : null;
  }

  return JSON.stringify(obj, function (key, value) {
    return value;
  }, pretty);
};

exports.noop = function () {
  console.log('noop');
};

exports.isEmptyObject = function (obj) {
  return Object.keys(obj).length <= 0;
};