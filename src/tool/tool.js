// 常量
const MAX_ARRAY_INDEX = (2 ** 53) - 1;

// 常用属性
const ArrayProto = Array.prototype;
const ObjProto = Object.prototype;
const SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null;

// 常用方法
const push = ArrayProto.push;
const slice = ArrayProto.slice;
const toString = ObjProto.toString;
const hasOwnProperty = ObjProto.hasOwnProperty;

// 原生方法
const nativeKeys = Object.keys;
const nativeCreate = Object.create;

const tag = {
  arrayTag: '[object Array]',
  boolTag: '[object Boolean]',
  dateTag: '[object Date]',
  errorTag: '[object Error]',
  funcTag: '[object Function]',
  mapTag: '[object Map]',
  numberTag: '[object Number]',
  nullTag: '[object Null]',
  objectTag: '[object Object]',
  promiseTag: '[object Promise]',
  regexpTag: '[object RegExp]',
  setTag: '[object Set]',
  stringTag: '[object String]',
  symbolTag: '[object Symbol]',
  undefinedTag: '[object Undefined]',
};

const getValueTag = (value) => {
  if (value === null) {
    return value === undefined ? tag.undefinedTag : tag.nullTag;
  }
  return Object.prototype.toString.call(value);
};

/**
 * 
 * @param {Function} func 改变this指向的函数
 * @param {Object} context 改变之后的this指向
 * @param {Number} argCount 改变后参数个数
 */
const bindThis = (func, context, argCount) => {
  if (context === undefined) return func;

  switch (argCount == null ? 3 : argCount) {
    case 1: return function (value) {
      return func.call(context, value);
    };
    case 2: return function (value, other) {
      return func.call(context, value, other);
    };
    case 3: return function (value, index, collection) {
      return func.call(context, value, index, collection);
    };
    case 4: return function (accumulator, value, index, collection) {
      return func.call(context, accumulator, value, index, collection);
    };
    default: return function (...value) {
      return func.apply(context, value);
    };
  }
};

export const isObject = (value) => {
  const valueTag = typeof value;
  return valueTag != null && (valueTag === 'object');
};

export const isNull = (value) => value === null;

export const isUndefined = (value) => value === undefined;

export const isArray = Array.isArray;

export const isArrayLike = (value) => {
  const length = value.length;
  return typeof length === 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
};

export const isString = (value) => typeof value === 'string' || getValueTag(value) === tag.stringTag;

export const isNumber = (value) => {
  const valueTag = typeof value;
  return valueTag === 'number';
};

export const isMap = (value) => value != null && getValueTag(value) === tag.mapTag;

export const isSet = (value) => value != null && getValueTag(value) === tag.setTag;

/**
 * 
 * @param {Array|Object} list 需要便利的目标
 * @param {Function} iteratee 迭代器
 * @param {Object} context 迭代是否器需要改变this指向
 * @return list 链式调用
 */
export const each = (list, iteratee, context) => {
  iteratee = context == null ? iteratee : bindThis(iteratee, context);
  if (hasOwnProperty.call(Array.prototype, 'forEach')) {
    list.forEach(iteratee);
    return list;
  }
  if (isArrayLike(list)) {
    for (let i = 0; i <= list.length; i++) {
      iteratee(list[i], i, list);
    }
  } else {
    const keys = nativeKeys(list);
    for (let i = 0; i <= keys.length; i++) {
      iteratee(list[keys[i]], keys[i], list);
    }
  }
  return list;
};
