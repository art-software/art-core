import merge from '../src/utils/merge';

/**
 * merge object, compare to the extends function of jquery 
 * 1、一个参数
 * 2、两个参数
 * 3、三个参数（浅合并，深合并）
 * 4、合并会改变target本身，如果不想改变，可把target设置成{}
 * 4、也可以合并数组(TODO 数组和对象合并呢？？？没有意义是不是不用考虑)
 */

describe('pass only one param', () => {
  test('it will return {}',() => {
    const empty = {};
    expect(merge(true)).toEqual(empty);
    expect(merge(false)).toEqual(empty);
  });
});

describe('pass two params', () => {
  test('it will return the target',() => {
    let target = {country: 'china'};
    expect(merge(true, target)).toBe(target);
    expect(merge(false, target)).toBe(target);
    expect(merge(false, {country: 'china'})).toEqual(target);
  });
});

describe('pass three or more params and the deep param is false', () => {
  test('it will not change the target',() => {
    let obj = {
      country: 'china',
      people: 200,
      age: 30
    };
    expect(merge(false, {}, obj, {
      country: 'English',
      people: 200
    })).toEqual({
      country: 'English',
      people: 200,
      age: 30
    });
    expect(obj).toEqual({
      country: 'china',
      people: 200,
      age: 30
    });
  });
  test('it will change the target',() => {
    let deepObj = {
      country: 'china',
      people: 200,
      set: {
        people: 200,
        age: 30
      }
    };
    expect(merge(false, deepObj, {
      country: 'English',
      set: {
        money: 999,
        age: 30
      }
    })).toEqual({
      country: 'English',
      people: 200,
      set: {
        money: 999,
        age: 30
      }
    });
    expect(deepObj).not.toEqual({
      country: 'china',
      people: 200,
      set: {
        people: 200,
        age: 30
      }
    });
  });
});

describe('pass three or more params and the deep param is true', () => {
  test('deep merge',() => {
    let deepObj = {
      country: 'china',
      set: {
        people: 200,
        age: 30
      }
    }
    expect(merge(true, deepObj, {
      country: 'English',
      people: 200,
      set: {
        age: 40,
        money: 99
      }
    })).toEqual({
      country: 'English',
      people: 200,
      set: {
        people: 200,
        age: 40,
        money: 99
      }
    });
  });
});

describe('it also can merge array', () => {
  test('shadow merge',() => {
    let targetArr = [{
      name: 'aaa'
    }, {
      name: 'bbb'
    }, {
      name: 'ccc', 
      sex: 1
    }];
    expect(merge(false, targetArr, [{
      age: 'aaa'
    }, {
      age: 'bbb'
    }, {
      age: 'ccc'
    }])).toEqual([{
      age: 'aaa'
    }, {
      age: 'bbb'
    }, {
      age: 'ccc'
    }]);
  });
  test('deep merge',() => {
    let targetArr = [{
      name: 'aaa'
    }, {
      name: 'bbb'
    }, {
      name: 'ccc',
      sex: 1
    }];
    expect(merge(true, targetArr, [{
      age: 'aaa'
    }, {
      age: 'bbb'
    }, {
      age: 'ccc'
    }])).toEqual([{
      age: 'aaa', 
      name: 'aaa'
    }, {
      age: 'bbb', 
      name: 'bbb'
    }, {
      age: 'ccc', 
      name: 'ccc', 
      sex: 1
    }]);
  });
  test('deep merge',() => {
    let targetArr = {
      name: 'ccc',
      sex: 1
    };
    expect(merge(true, targetArr, [{
      age: 'aaa'
    }, {
      age: 'bbb'
    }, {
      age: 'ccc'
    }])).toEqual({
      0: { age: 'aaa' },
      1: { age: 'bbb' },
      2: { age: 'ccc' },
      name: 'ccc',
      sex: 1
    });
  });
});
