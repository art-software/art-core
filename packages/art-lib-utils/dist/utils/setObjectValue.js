import { isObject, isArray } from './lang';
function setValue(source = {}, [head, ...tail], value) {
    source = source[head] = tail.length ? source[head] || {} : value;
    if (tail.length) {
        if (isObject) {
            if (isObject(source) && !isArray(source)) {
                setValue(source, tail, value);
            }
            else {
                throw new Error(`path node ['.${head}'] must be plain object {}!`);
            }
        }
    }
}
export const setObjectValue = (source = {}, path, value) => {
    setValue(source, path.split('.'), value);
    return source;
};
