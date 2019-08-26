"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ensureSlash = function ensureSlash(rawPath, needsSlash) {
  rawPath = rawPath || '';
  var hasSlash = rawPath.endsWith('/');

  if (hasSlash && !needsSlash) {
    return rawPath.substr(0, rawPath.length - 1);
  } else if (!hasSlash && needsSlash) {
    return "".concat(rawPath, "/");
  } else {
    return rawPath;
  }
};

exports.default = ensureSlash;