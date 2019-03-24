/**
 * Checks whether a value is empty.
 * 'empty' including:
 * [], {}, non-iterable object, falsy values
 */
export const isEmpty = (value: any): boolean => {
  if (Array.isArray(value)) {
    return value.length === 0;
  } else if (typeof value === 'object') {
    if (value) {
      for (const _ in value) {
        return false;
      }
    }
    return true;
  } else {
    return !value;
  }
};