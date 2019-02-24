import { isUndefined } from './lang';

function getValue(source: object, [head, ...tail]: string[]) {
  source = source[head];
  return tail.length && source ? getValue(source, tail) : source;
}

export const getObjectValue = (source: object = {}, path: string, defaultValue?: any): any => {
  const result = getValue(source, path.split('.'));
  return isUndefined(result) ? defaultValue : result;
};