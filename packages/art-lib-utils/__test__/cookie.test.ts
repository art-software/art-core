import storageCookie from '../src/utils/storage/cookie';

Object.defineProperty(window.document, 'cookie', {
    writable: true,
    value: 'student=false; nike=xiaoxiao; age=12; colleage=123%2C123',
});

console.log(storageCookie.get('my_name'));

describe('get cookies', () => {
    test('the key is existed and it will return an correct string',() => {
        expect(storageCookie.get('nike')).toBe('xiaoxiao');
    });
    test('the value includes unusual enicode like , ;',() => {
        // cookie的值字符串可以用encodeURIComponent()来保证它不包含任何逗号、分号或空格(cookie值中禁止使用这些值).
        expect(storageCookie.get('colleage')).toBe('123,123');
        expect(storageCookie.get('colleage')).not.toBe('123%2C123');
    });
    test('the key is not existed and it will return an empth string',() => {
        expect(storageCookie.get('token')).toBe('');
    });
    test('the param is an object and it will return an empth string',() => {
        // reg: /(^| )[object Object]=([^;]*)(;|$)/
        expect(storageCookie.get({a:12})).toBe('');
    });
    test('the param is a boolean and it will return an empth string',() => {
        // reg: /(^| )false=([^;]*)(;|$)/
        expect(storageCookie.get(false)).toBe('');
    });
    test('the param is an array and it will return an empth string',() => {
        // reg: /(^| )1,2,3=([^;]*)(;|$)/
        expect(storageCookie.get([1,2,3])).toBe('');
    });
});
describe('set cookies', () => {
   
});