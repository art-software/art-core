import { isArray, isString, isFunction } from './lang';

const omit = (target, rule?) => {
  // if we don't have a valid rule, just accept the value
  let acceptVal = !isFunction(rule);
  let val;
  const copy = {};

  // in the case that we have been passed a falsey value, just return that
  if (!target) { return target; }

  if (isArray(target)) { return target.map(omit); }

  for (const key in target) {
    if (target.hasOwnProperty(key)) {

      // if we only have a key check, then do a very simple test
      if (rule.length === 1) {
        acceptVal = !rule(key);
      } else {
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
export default function (rule: string[] | string, target?: any) {
  const ruleFn = isString(rule)
    ? omitWhenEqual(rule)
    : isArray(rule) ? omitWhenIn(rule) : undefined;

  return target ? omit(target, ruleFn) : (t) => omit(t, ruleFn);
}