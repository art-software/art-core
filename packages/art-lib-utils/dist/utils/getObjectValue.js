import { isUndefined } from './lang';
function getValue(source, [head, ...tail]) {
    source = source[head];
    return tail.length && source ? getValue(source, tail) : source;
}
export const getObjectValue = (source = {}, path, defaultValue) => {
    const result = getValue(source, path.split('.'));
    return isUndefined(result) ? defaultValue : result;
};
