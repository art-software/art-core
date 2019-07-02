import { isEmpty } from '../src/utils/isEmpty';

describe('array', () => {
	test('empty array', () => {
		expect(isEmpty([])).not.toBeFalsy();
	});
	test('not empty array', () => {
		expect(isEmpty([1, '2'])).toBeFalsy();
	});
});

describe('object', () => {
	test('empty object', () => {
		let Person = {};
		expect(isEmpty(Person)).not.toBeFalsy();
	});
	test('not empty object', () => {
		let Person = {
			name: 'lily'
		};
		expect(isEmpty(Person)).toBeFalsy();
	});
});

describe('map', () => {
	test('empty map', () => {
		let map = new Map;
		expect(isEmpty(map)).not.toBeFalsy();
	});
	test('and empty map', () => {
		let mapNew = new Map;
		mapNew.set('name', '123');
		expect(isEmpty(mapNew)).not.toBeFalsy();
	});
});

describe('generate', () => {
	function* generate(a?, b?) {
		yield a;
		yield b;
	}
	test('not empty generate', () => {
		expect(isEmpty(generate)).toBeFalsy();
	});
	test('empty generate', () => {
		expect(isEmpty(generate())).not.toBeFalsy();
	});
	test('and empty generate', () => {
		expect(isEmpty(generate(1,2))).not.toBeFalsy();
	});
});

describe('basic type', () => {
	test('string empty', () => {
		expect(isEmpty('')).not.toBeFalsy();
	});
	test('number empty', () => {
		expect(isEmpty(0)).not.toBeFalsy();
	});
	test('boolean empty', () => {
		expect(isEmpty(false)).not.toBeFalsy();
	});
	test('string', () => {
		expect(isEmpty('123')).toBeFalsy();
	});
	test('number', () => {
		expect(isEmpty(10)).toBeFalsy();
	});
	test('boolean', () => {
		expect(isEmpty(true)).toBeFalsy();
	});
	test('null', () => {
		expect(isEmpty(null)).not.toBeFalsy();
	});
	test('undefined', () => {
		expect(isEmpty(undefined)).not.toBeFalsy();
	});
});