import { classNames } from '../src/utils/classnames';

/**
 * 返回class name
 * 参数可以是string，number，object（只一层），array(可嵌套多层)
 * 不可是boolean null undefined，但可以是Boolean的包装对象
 */
describe('params are string or number', () => {
    test('', () => {
        expect(classNames(1,2,3,'a')).toBe('1 2 3 a');
    });
});
describe('params contains array or object', () => {
    test('object has one nesting', () => {
        expect(classNames(1, [2, 3], 'a', {b: 'sss'})).toBe('1 2 3 a b');
    });
    test('array has more than one nesting', () => {
        expect(classNames(1, [2, 3], [[4,5]], 'a', [[6, [7,8]]])).toBe('1 2 3 4 5 a 6 7 8');
    });
    test('object has more than one nesting', () => {
        expect(classNames(1, [2, 3], [[4,5]], 'a', {b: 'sss', c: {d: 'www'}})).toBe('1 2 3 4 5 a b c');
    });
});
describe('params contains boolean or null or undefined', () => {
    test('need an object', () => {
        expect(classNames('a', [2, 3], Number(1))).toBe('a 2 3 1');
    });
    test('boolean or null or undefined', () => {
        expect(classNames(1, [2, 3], true)).toBe('1 2 3');
        expect(classNames(1, [2, 3], null)).toBe('1 2 3');
        expect(classNames(1, [2, 3], undefined)).toBe('1 2 3');
    });
});