"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var lang_1 = require("./lang");

var merge = function merge() {
  var deep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options, name, src, copy, copyIsArray, clone;
  var length = arguments.length <= 2 ? 0 : arguments.length - 2;

  for (var i = 0; i < length; ++i) {
    options = i + 2 < 2 || arguments.length <= i + 2 ? undefined : arguments[i + 2];

    if (options != null) {
      for (name in options) {
        src = target[name];
        copy = options[name];

        if (target !== copy) {
          if (deep && copy && ((copyIsArray = lang_1.isArray(copy)) || lang_1.isPlainObject(copy))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && lang_1.isArray(src) ? src : [];
            } else {
              clone = src && lang_1.isPlainObject(src) ? src : {};
            }

            target[name] = merge(deep, clone, copy);
          } else if (typeof copy !== 'undefined') {
            target[name] = copy;
          }
        }
      }
    }
  }

  return target;
};

exports.default = merge;