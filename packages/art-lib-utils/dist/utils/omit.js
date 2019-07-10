"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lang_1 = require("./lang");
const omit = (target, rule) => {
    // if we don't have a valid rule, just accept the value
    let acceptVal = !lang_1.isFunction(rule);
    let val;
    const copy = {};
    // in the case that we have been passed a falsey value, just return that
    if (!target) {
        return target;
    }
    if (lang_1.isArray(target)) {
        return target.map(omit);
    }
    for (const key in target) {
        if (target.hasOwnProperty(key)) {
            // if we only have a key check, then do a very simple test
            if (rule.length === 1) {
                acceptVal = !rule(key);
            }
            else {
                val = target[key];
                acceptVal = !rule(key, val = target[key], target);
            }
            if (acceptVal) {
                copy[key] = val || target[key];
            }
        }
    }
    return copy;
};
const omitWhenEqual = (value) => (key) => key === value;
const omitWhenIn = (target) => (key) => target.indexOf(key) >= 0;
/**
 * Remove values from an object (or an array of objects) based on key, value or
 * an evaluator function.
 * @param rule
 * @param target
 */
function default_1(rule, target) {
    const ruleFn = lang_1.isString(rule)
        ? omitWhenEqual(rule)
        : lang_1.isArray(rule) ? omitWhenIn(rule) : undefined;
    return target ? omit(target, ruleFn) : (t) => omit(t, ruleFn);
}
exports.default = default_1;
