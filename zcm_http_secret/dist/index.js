(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('http'), require('https'), require('url'), require('stream'), require('assert'), require('tty'), require('util'), require('os'), require('zlib'), require('crypto'), require('qs')) :
	typeof define === 'function' && define.amd ? define(['http', 'https', 'url', 'stream', 'assert', 'tty', 'util', 'os', 'zlib', 'crypto', 'qs'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.secret = factory(global.http, global.https, global.url, global.stream, global.assert, global.tty, global.util, global.os, global.zlib, global.crypto$1, global.qs));
})(this, (function (http, https, url, stream, assert, tty, util, os, zlib, crypto$1, qs) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var http__default = /*#__PURE__*/_interopDefaultLegacy(http);
	var https__default = /*#__PURE__*/_interopDefaultLegacy(https);
	var url__default = /*#__PURE__*/_interopDefaultLegacy(url);
	var stream__default = /*#__PURE__*/_interopDefaultLegacy(stream);
	var assert__default = /*#__PURE__*/_interopDefaultLegacy(assert);
	var tty__default = /*#__PURE__*/_interopDefaultLegacy(tty);
	var util__default = /*#__PURE__*/_interopDefaultLegacy(util);
	var os__default = /*#__PURE__*/_interopDefaultLegacy(os);
	var zlib__default = /*#__PURE__*/_interopDefaultLegacy(zlib);
	var crypto__default = /*#__PURE__*/_interopDefaultLegacy(crypto$1);

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global_1 =
	  // eslint-disable-next-line es/no-global-this -- safe
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var call$2 = Function.prototype.call;

	var functionCall = call$2.bind ? call$2.bind(call$2) : function () {
	  return call$2.apply(call$2, arguments);
	};

	var $propertyIsEnumerable$1 = {}.propertyIsEnumerable;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable$1.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	var f$8 = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$2(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable$1;

	var objectPropertyIsEnumerable = {
		f: f$8
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var FunctionPrototype$2 = Function.prototype;
	var bind$4 = FunctionPrototype$2.bind;
	var call$1 = FunctionPrototype$2.call;
	var uncurryThis = bind$4 && bind$4.bind(call$1, call$1);

	var functionUncurryThis = bind$4 ? function (fn) {
	  return fn && uncurryThis(fn);
	} : function (fn) {
	  return fn && function () {
	    return call$1.apply(fn, arguments);
	  };
	};

	var toString$2 = functionUncurryThis({}.toString);
	var stringSlice$6 = functionUncurryThis(''.slice);

	var classofRaw = function (it) {
	  return stringSlice$6(toString$2(it), 8, -1);
	};

	var Object$4 = global_1.Object;
	var split = functionUncurryThis(''.split);

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !Object$4('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split(it, '') : Object$4(it);
	} : Object$4;

	var TypeError$g = global_1.TypeError;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible = function (it) {
	  if (it == undefined) throw TypeError$g("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings



	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	// `IsCallable` abstract operation
	// https://tc39.es/ecma262/#sec-iscallable
	var isCallable = function (argument) {
	  return typeof argument == 'function';
	};

	var isObject$1 = function (it) {
	  return typeof it == 'object' ? it !== null : isCallable(it);
	};

	var aFunction = function (argument) {
	  return isCallable(argument) ? argument : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(global_1[namespace]) : global_1[namespace] && global_1[namespace][method];
	};

	var objectIsPrototypeOf = functionUncurryThis({}.isPrototypeOf);

	var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

	var process$4 = global_1.process;
	var Deno = global_1.Deno;
	var versions = process$4 && process$4.versions || Deno && Deno.version;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
	  // but their correct versions are not interesting for us
	  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
	}

	// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
	// so check `userAgent` even if `.v8` exists, but 0
	if (!version && engineUserAgent) {
	  match = engineUserAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = engineUserAgent.match(/Chrome\/(\d+)/);
	    if (match) version = +match[1];
	  }
	}

	var engineV8Version = version;

	/* eslint-disable es/no-symbol -- required for testing */



	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
	  var symbol = Symbol();
	  // Chrome 38 Symbol has incorrect toString conversion
	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
	  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    !Symbol.sham && engineV8Version && engineV8Version < 41;
	});

	/* eslint-disable es/no-symbol -- required for testing */


	var useSymbolAsUid = nativeSymbol
	  && !Symbol.sham
	  && typeof Symbol.iterator == 'symbol';

	var Object$3 = global_1.Object;

	var isSymbol = useSymbolAsUid ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  var $Symbol = getBuiltIn('Symbol');
	  return isCallable($Symbol) && objectIsPrototypeOf($Symbol.prototype, Object$3(it));
	};

	var String$5 = global_1.String;

	var tryToString = function (argument) {
	  try {
	    return String$5(argument);
	  } catch (error) {
	    return 'Object';
	  }
	};

	var TypeError$f = global_1.TypeError;

	// `Assert: IsCallable(argument) is true`
	var aCallable = function (argument) {
	  if (isCallable(argument)) return argument;
	  throw TypeError$f(tryToString(argument) + ' is not a function');
	};

	// `GetMethod` abstract operation
	// https://tc39.es/ecma262/#sec-getmethod
	var getMethod = function (V, P) {
	  var func = V[P];
	  return func == null ? undefined : aCallable(func);
	};

	var TypeError$e = global_1.TypeError;

	// `OrdinaryToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
	var ordinaryToPrimitive = function (input, pref) {
	  var fn, val;
	  if (pref === 'string' && isCallable(fn = input.toString) && !isObject$1(val = functionCall(fn, input))) return val;
	  if (isCallable(fn = input.valueOf) && !isObject$1(val = functionCall(fn, input))) return val;
	  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject$1(val = functionCall(fn, input))) return val;
	  throw TypeError$e("Can't convert object to primitive value");
	};

	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$4 = Object.defineProperty;

	var setGlobal = function (key, value) {
	  try {
	    defineProperty$4(global_1, key, { value: value, configurable: true, writable: true });
	  } catch (error) {
	    global_1[key] = value;
	  } return value;
	};

	var SHARED = '__core-js_shared__';
	var store$1 = global_1[SHARED] || setGlobal(SHARED, {});

	var sharedStore = store$1;

	var shared = createCommonjsModule(function (module) {
	(module.exports = function (key, value) {
	  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.20.2',
	  mode: 'global',
	  copyright: '© 2022 Denis Pushkarev (zloirock.ru)'
	});
	});

	var Object$2 = global_1.Object;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject = function (argument) {
	  return Object$2(requireObjectCoercible(argument));
	};

	var hasOwnProperty = functionUncurryThis({}.hasOwnProperty);

	// `HasOwnProperty` abstract operation
	// https://tc39.es/ecma262/#sec-hasownproperty
	var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty(toObject(it), key);
	};

	var id = 0;
	var postfix = Math.random();
	var toString$1 = functionUncurryThis(1.0.toString);

	var uid = function (key) {
	  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$1(++id + postfix, 36);
	};

	var WellKnownSymbolsStore$1 = shared('wks');
	var Symbol$2 = global_1.Symbol;
	var symbolFor = Symbol$2 && Symbol$2['for'];
	var createWellKnownSymbol = useSymbolAsUid ? Symbol$2 : Symbol$2 && Symbol$2.withoutSetter || uid;

	var wellKnownSymbol = function (name) {
	  if (!hasOwnProperty_1(WellKnownSymbolsStore$1, name) || !(nativeSymbol || typeof WellKnownSymbolsStore$1[name] == 'string')) {
	    var description = 'Symbol.' + name;
	    if (nativeSymbol && hasOwnProperty_1(Symbol$2, name)) {
	      WellKnownSymbolsStore$1[name] = Symbol$2[name];
	    } else if (useSymbolAsUid && symbolFor) {
	      WellKnownSymbolsStore$1[name] = symbolFor(description);
	    } else {
	      WellKnownSymbolsStore$1[name] = createWellKnownSymbol(description);
	    }
	  } return WellKnownSymbolsStore$1[name];
	};

	var TypeError$d = global_1.TypeError;
	var TO_PRIMITIVE$1 = wellKnownSymbol('toPrimitive');

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	var toPrimitive = function (input, pref) {
	  if (!isObject$1(input) || isSymbol(input)) return input;
	  var exoticToPrim = getMethod(input, TO_PRIMITIVE$1);
	  var result;
	  if (exoticToPrim) {
	    if (pref === undefined) pref = 'default';
	    result = functionCall(exoticToPrim, input, pref);
	    if (!isObject$1(result) || isSymbol(result)) return result;
	    throw TypeError$d("Can't convert object to primitive value");
	  }
	  if (pref === undefined) pref = 'number';
	  return ordinaryToPrimitive(input, pref);
	};

	// `ToPropertyKey` abstract operation
	// https://tc39.es/ecma262/#sec-topropertykey
	var toPropertyKey = function (argument) {
	  var key = toPrimitive(argument, 'string');
	  return isSymbol(key) ? key : key + '';
	};

	var document$3 = global_1.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS$1 = isObject$1(document$3) && isObject$1(document$3.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS$1 ? document$3.createElement(it) : {};
	};

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine = !descriptors && !fails(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	var f$7 = descriptors ? $getOwnPropertyDescriptor$2 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPropertyKey(P);
	  if (ie8DomDefine) try {
	    return $getOwnPropertyDescriptor$2(O, P);
	  } catch (error) { /* empty */ }
	  if (hasOwnProperty_1(O, P)) return createPropertyDescriptor(!functionCall(objectPropertyIsEnumerable.f, O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor = {
		f: f$7
	};

	// V8 ~ Chrome 36-
	// https://bugs.chromium.org/p/v8/issues/detail?id=3334
	var v8PrototypeDefineBug = descriptors && fails(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
	    value: 42,
	    writable: false
	  }).prototype != 42;
	});

	var String$4 = global_1.String;
	var TypeError$c = global_1.TypeError;

	// `Assert: Type(argument) is Object`
	var anObject = function (argument) {
	  if (isObject$1(argument)) return argument;
	  throw TypeError$c(String$4(argument) + ' is not an object');
	};

	var TypeError$b = global_1.TypeError;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var $defineProperty$1 = Object.defineProperty;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
	var ENUMERABLE = 'enumerable';
	var CONFIGURABLE$1 = 'configurable';
	var WRITABLE = 'writable';

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	var f$6 = descriptors ? v8PrototypeDefineBug ? function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPropertyKey(P);
	  anObject(Attributes);
	  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
	    var current = $getOwnPropertyDescriptor$1(O, P);
	    if (current && current[WRITABLE]) {
	      O[P] = Attributes.value;
	      Attributes = {
	        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
	        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
	        writable: false
	      };
	    }
	  } return $defineProperty$1(O, P, Attributes);
	} : $defineProperty$1 : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPropertyKey(P);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return $defineProperty$1(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError$b('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var objectDefineProperty = {
		f: f$6
	};

	var createNonEnumerableProperty = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var functionToString = functionUncurryThis(Function.toString);

	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
	if (!isCallable(sharedStore.inspectSource)) {
	  sharedStore.inspectSource = function (it) {
	    return functionToString(it);
	  };
	}

	var inspectSource = sharedStore.inspectSource;

	var WeakMap$1 = global_1.WeakMap;

	var nativeWeakMap = isCallable(WeakMap$1) && /native code/.test(inspectSource(WeakMap$1));

	var keys$1 = shared('keys');

	var sharedKey = function (key) {
	  return keys$1[key] || (keys$1[key] = uid(key));
	};

	var hiddenKeys$1 = {};

	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var TypeError$a = global_1.TypeError;
	var WeakMap = global_1.WeakMap;
	var set$1, get, has;

	var enforce = function (it) {
	  return has(it) ? get(it) : set$1(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject$1(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError$a('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (nativeWeakMap || sharedStore.state) {
	  var store = sharedStore.state || (sharedStore.state = new WeakMap());
	  var wmget = functionUncurryThis(store.get);
	  var wmhas = functionUncurryThis(store.has);
	  var wmset = functionUncurryThis(store.set);
	  set$1 = function (it, metadata) {
	    if (wmhas(store, it)) throw new TypeError$a(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    wmset(store, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget(store, it) || {};
	  };
	  has = function (it) {
	    return wmhas(store, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys$1[STATE] = true;
	  set$1 = function (it, metadata) {
	    if (hasOwnProperty_1(it, STATE)) throw new TypeError$a(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    createNonEnumerableProperty(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return hasOwnProperty_1(it, STATE) ? it[STATE] : {};
	  };
	  has = function (it) {
	    return hasOwnProperty_1(it, STATE);
	  };
	}

	var internalState = {
	  set: set$1,
	  get: get,
	  has: has,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var FunctionPrototype$1 = Function.prototype;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getDescriptor = descriptors && Object.getOwnPropertyDescriptor;

	var EXISTS = hasOwnProperty_1(FunctionPrototype$1, 'name');
	// additional protection from minified / mangled / dropped function names
	var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
	var CONFIGURABLE = EXISTS && (!descriptors || (descriptors && getDescriptor(FunctionPrototype$1, 'name').configurable));

	var functionName = {
	  EXISTS: EXISTS,
	  PROPER: PROPER,
	  CONFIGURABLE: CONFIGURABLE
	};

	var redefine = createCommonjsModule(function (module) {
	var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;

	var getInternalState = internalState.get;
	var enforceInternalState = internalState.enforce;
	var TEMPLATE = String(String).split('String');

	(module.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;
	  var name = options && options.name !== undefined ? options.name : key;
	  var state;
	  if (isCallable(value)) {
	    if (String(name).slice(0, 7) === 'Symbol(') {
	      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
	    }
	    if (!hasOwnProperty_1(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
	      createNonEnumerableProperty(value, 'name', name);
	    }
	    state = enforceInternalState(value);
	    if (!state.source) {
	      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
	    }
	  }
	  if (O === global_1) {
	    if (simple) O[key] = value;
	    else setGlobal(key, value);
	    return;
	  } else if (!unsafe) {
	    delete O[key];
	  } else if (!noTargetGet && O[key]) {
	    simple = true;
	  }
	  if (simple) O[key] = value;
	  else createNonEnumerableProperty(O, key, value);
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, 'toString', function toString() {
	  return isCallable(this) && getInternalState(this).source || inspectSource(this);
	});
	});

	var ceil = Math.ceil;
	var floor$1 = Math.floor;

	// `ToIntegerOrInfinity` abstract operation
	// https://tc39.es/ecma262/#sec-tointegerorinfinity
	var toIntegerOrInfinity = function (argument) {
	  var number = +argument;
	  // eslint-disable-next-line no-self-compare -- safe
	  return number !== number || number === 0 ? 0 : (number > 0 ? floor$1 : ceil)(number);
	};

	var max$3 = Math.max;
	var min$3 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex = function (index, length) {
	  var integer = toIntegerOrInfinity(index);
	  return integer < 0 ? max$3(integer + length, 0) : min$3(integer, length);
	};

	var min$2 = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength = function (argument) {
	  return argument > 0 ? min$2(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	// `LengthOfArrayLike` abstract operation
	// https://tc39.es/ecma262/#sec-lengthofarraylike
	var lengthOfArrayLike = function (obj) {
	  return toLength(obj.length);
	};

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$3 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = lengthOfArrayLike(O);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare -- NaN check
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.es/ecma262/#sec-array.prototype.includes
	  includes: createMethod$3(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$3(false)
	};

	var indexOf$1 = arrayIncludes.indexOf;


	var push$4 = functionUncurryThis([].push);

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !hasOwnProperty_1(hiddenKeys$1, key) && hasOwnProperty_1(O, key) && push$4(result, key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (hasOwnProperty_1(O, key = names[i++])) {
	    ~indexOf$1(result, key) || push$4(result, key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var hiddenKeys = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	// eslint-disable-next-line es/no-object-getownpropertynames -- safe
	var f$5 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys);
	};

	var objectGetOwnPropertyNames = {
		f: f$5
	};

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
	var f$4 = Object.getOwnPropertySymbols;

	var objectGetOwnPropertySymbols = {
		f: f$4
	};

	var concat$1 = functionUncurryThis([].concat);

	// all object keys, includes non-enumerable and symbols
	var ownKeys$1 = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames.f(anObject(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  return getOwnPropertySymbols ? concat$1(keys, getOwnPropertySymbols(it)) : keys;
	};

	var copyConstructorProperties = function (target, source, exceptions) {
	  var keys = ownKeys$1(source);
	  var defineProperty = objectDefineProperty.f;
	  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!hasOwnProperty_1(target, key) && !(exceptions && hasOwnProperty_1(exceptions, key))) {
	      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	    }
	  }
	};

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data$1[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : isCallable(detection) ? fails(detection)
	    : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data$1 = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';

	var isForced_1 = isForced;

	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	  options.name        - the .name of the function if it does not match the key
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global_1;
	  } else if (STATIC) {
	    target = global_1[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global_1[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty == typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty(sourceProperty, 'sham', true);
	    }
	    // extend global
	    redefine(target, key, sourceProperty, options);
	  }
	};

	var FunctionPrototype = Function.prototype;
	var apply = FunctionPrototype.apply;
	var bind$3 = FunctionPrototype.bind;
	var call = FunctionPrototype.call;

	// eslint-disable-next-line es/no-reflect -- safe
	var functionApply = typeof Reflect == 'object' && Reflect.apply || (bind$3 ? call.bind(apply) : function () {
	  return call.apply(apply, arguments);
	});

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	// eslint-disable-next-line es/no-array-isarray -- safe
	var isArray$1 = Array.isArray || function isArray(argument) {
	  return classofRaw(argument) == 'Array';
	};

	var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
	var test = {};

	test[TO_STRING_TAG$2] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
	var Object$1 = global_1.Object;

	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof = toStringTagSupport ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = Object$1(it), TO_STRING_TAG$1)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
	};

	var String$3 = global_1.String;

	var toString_1 = function (argument) {
	  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
	  return String$3(argument);
	};

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es/no-object-keys -- safe
	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe
	var f$3 = descriptors && !v8PrototypeDefineBug ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var props = toIndexedObject(Properties);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) objectDefineProperty.f(O, key = keys[index++], props[key]);
	  return O;
	};

	var objectDefineProperties = {
		f: f$3
	};

	var html = getBuiltIn('document', 'documentElement');

	/* global ActiveXObject -- old IE, WSH */








	var GT = '>';
	var LT = '<';
	var PROTOTYPE$1 = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    activeXDocument = new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = typeof document != 'undefined'
	    ? document.domain && activeXDocument
	      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
	      : NullProtoObjectViaIFrame()
	    : NullProtoObjectViaActiveX(activeXDocument); // WSH
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys$1[IE_PROTO] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE$1] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : objectDefineProperties.f(result, Properties);
	};

	var createProperty = function (object, key, value) {
	  var propertyKey = toPropertyKey(key);
	  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
	  else object[propertyKey] = value;
	};

	var Array$3 = global_1.Array;
	var max$2 = Math.max;

	var arraySliceSimple = function (O, start, end) {
	  var length = lengthOfArrayLike(O);
	  var k = toAbsoluteIndex(start, length);
	  var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	  var result = Array$3(max$2(fin - k, 0));
	  for (var n = 0; k < fin; k++, n++) createProperty(result, n, O[k]);
	  result.length = n;
	  return result;
	};

	/* eslint-disable es/no-object-getownpropertynames -- safe */


	var $getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;


	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return $getOwnPropertyNames$1(it);
	  } catch (error) {
	    return arraySliceSimple(windowNames);
	  }
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var f$2 = function getOwnPropertyNames(it) {
	  return windowNames && classofRaw(it) == 'Window'
	    ? getWindowNames(it)
	    : $getOwnPropertyNames$1(toIndexedObject(it));
	};

	var objectGetOwnPropertyNamesExternal = {
		f: f$2
	};

	var arraySlice = functionUncurryThis([].slice);

	var f$1 = wellKnownSymbol;

	var wellKnownSymbolWrapped = {
		f: f$1
	};

	var path = global_1;

	var defineProperty$3 = objectDefineProperty.f;

	var defineWellKnownSymbol = function (NAME) {
	  var Symbol = path.Symbol || (path.Symbol = {});
	  if (!hasOwnProperty_1(Symbol, NAME)) defineProperty$3(Symbol, NAME, {
	    value: wellKnownSymbolWrapped.f(NAME)
	  });
	};

	var defineProperty$2 = objectDefineProperty.f;



	var TO_STRING_TAG = wellKnownSymbol('toStringTag');

	var setToStringTag = function (target, TAG, STATIC) {
	  if (target && !STATIC) target = target.prototype;
	  if (target && !hasOwnProperty_1(target, TO_STRING_TAG)) {
	    defineProperty$2(target, TO_STRING_TAG, { configurable: true, value: TAG });
	  }
	};

	var bind$2 = functionUncurryThis(functionUncurryThis.bind);

	// optional / simple context binding
	var functionBindContext = function (fn, that) {
	  aCallable(fn);
	  return that === undefined ? fn : bind$2 ? bind$2(fn, that) : function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var noop$1 = function () { /* empty */ };
	var empty = [];
	var construct = getBuiltIn('Reflect', 'construct');
	var constructorRegExp = /^\s*(?:class|function)\b/;
	var exec$3 = functionUncurryThis(constructorRegExp.exec);
	var INCORRECT_TO_STRING = !constructorRegExp.exec(noop$1);

	var isConstructorModern = function isConstructor(argument) {
	  if (!isCallable(argument)) return false;
	  try {
	    construct(noop$1, empty, argument);
	    return true;
	  } catch (error) {
	    return false;
	  }
	};

	var isConstructorLegacy = function isConstructor(argument) {
	  if (!isCallable(argument)) return false;
	  switch (classof(argument)) {
	    case 'AsyncFunction':
	    case 'GeneratorFunction':
	    case 'AsyncGeneratorFunction': return false;
	  }
	  try {
	    // we can't check .prototype since constructors produced by .bind haven't it
	    // `Function#toString` throws on some built-it function in some legacy engines
	    // (for example, `DOMQuad` and similar in FF41-)
	    return INCORRECT_TO_STRING || !!exec$3(constructorRegExp, inspectSource(argument));
	  } catch (error) {
	    return true;
	  }
	};

	isConstructorLegacy.sham = true;

	// `IsConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-isconstructor
	var isConstructor = !construct || fails(function () {
	  var called;
	  return isConstructorModern(isConstructorModern.call)
	    || !isConstructorModern(Object)
	    || !isConstructorModern(function () { called = true; })
	    || called;
	}) ? isConstructorLegacy : isConstructorModern;

	var SPECIES$6 = wellKnownSymbol('species');
	var Array$2 = global_1.Array;

	// a part of `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesConstructor = function (originalArray) {
	  var C;
	  if (isArray$1(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (isConstructor(C) && (C === Array$2 || isArray$1(C.prototype))) C = undefined;
	    else if (isObject$1(C)) {
	      C = C[SPECIES$6];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? Array$2 : C;
	};

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate = function (originalArray, length) {
	  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
	};

	var push$3 = functionUncurryThis([].push);

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
	var createMethod$2 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var IS_FILTER_REJECT = TYPE == 7;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = indexedObject(O);
	    var boundFunction = functionBindContext(callbackfn, that);
	    var length = lengthOfArrayLike(self);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push$3(target, value);      // filter
	        } else switch (TYPE) {
	          case 4: return false;             // every
	          case 7: push$3(target, value);      // filterReject
	        }
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.es/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$2(0),
	  // `Array.prototype.map` method
	  // https://tc39.es/ecma262/#sec-array.prototype.map
	  map: createMethod$2(1),
	  // `Array.prototype.filter` method
	  // https://tc39.es/ecma262/#sec-array.prototype.filter
	  filter: createMethod$2(2),
	  // `Array.prototype.some` method
	  // https://tc39.es/ecma262/#sec-array.prototype.some
	  some: createMethod$2(3),
	  // `Array.prototype.every` method
	  // https://tc39.es/ecma262/#sec-array.prototype.every
	  every: createMethod$2(4),
	  // `Array.prototype.find` method
	  // https://tc39.es/ecma262/#sec-array.prototype.find
	  find: createMethod$2(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$2(6),
	  // `Array.prototype.filterReject` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterReject: createMethod$2(7)
	};

	var $forEach$1 = arrayIteration.forEach;

	var HIDDEN = sharedKey('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

	var setInternalState$1 = internalState.set;
	var getInternalState$2 = internalState.getterFor(SYMBOL);

	var ObjectPrototype = Object[PROTOTYPE];
	var $Symbol = global_1.Symbol;
	var SymbolPrototype = $Symbol && $Symbol[PROTOTYPE];
	var TypeError$9 = global_1.TypeError;
	var QObject = global_1.QObject;
	var $stringify = getBuiltIn('JSON', 'stringify');
	var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var nativeDefineProperty = objectDefineProperty.f;
	var nativeGetOwnPropertyNames = objectGetOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable = objectPropertyIsEnumerable.f;
	var push$2 = functionUncurryThis([].push);

	var AllSymbols = shared('symbols');
	var ObjectPrototypeSymbols = shared('op-symbols');
	var StringToSymbolRegistry = shared('string-to-symbol-registry');
	var SymbolToStringRegistry = shared('symbol-to-string-registry');
	var WellKnownSymbolsStore = shared('wks');

	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDescriptor = descriptors && fails(function () {
	  return objectCreate(nativeDefineProperty({}, 'a', {
	    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
	  nativeDefineProperty(O, P, Attributes);
	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
	    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty;

	var wrap$1 = function (tag, description) {
	  var symbol = AllSymbols[tag] = objectCreate(SymbolPrototype);
	  setInternalState$1(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!descriptors) symbol.description = description;
	  return symbol;
	};

	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject(O);
	  var key = toPropertyKey(P);
	  anObject(Attributes);
	  if (hasOwnProperty_1(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!hasOwnProperty_1(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (hasOwnProperty_1(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = objectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
	    } return setSymbolDescriptor(O, key, Attributes);
	  } return nativeDefineProperty(O, key, Attributes);
	};

	var $defineProperties = function defineProperties(O, Properties) {
	  anObject(O);
	  var properties = toIndexedObject(Properties);
	  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
	  $forEach$1(keys, function (key) {
	    if (!descriptors || functionCall($propertyIsEnumerable, properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};

	var $create = function create(O, Properties) {
	  return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
	};

	var $propertyIsEnumerable = function propertyIsEnumerable(V) {
	  var P = toPropertyKey(V);
	  var enumerable = functionCall(nativePropertyIsEnumerable, this, P);
	  if (this === ObjectPrototype && hasOwnProperty_1(AllSymbols, P) && !hasOwnProperty_1(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !hasOwnProperty_1(this, P) || !hasOwnProperty_1(AllSymbols, P) || hasOwnProperty_1(this, HIDDEN) && this[HIDDEN][P]
	    ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject(O);
	  var key = toPropertyKey(P);
	  if (it === ObjectPrototype && hasOwnProperty_1(AllSymbols, key) && !hasOwnProperty_1(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);
	  if (descriptor && hasOwnProperty_1(AllSymbols, key) && !(hasOwnProperty_1(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }
	  return descriptor;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
	  var result = [];
	  $forEach$1(names, function (key) {
	    if (!hasOwnProperty_1(AllSymbols, key) && !hasOwnProperty_1(hiddenKeys$1, key)) push$2(result, key);
	  });
	  return result;
	};

	var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
	  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
	  var result = [];
	  $forEach$1(names, function (key) {
	    if (hasOwnProperty_1(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwnProperty_1(ObjectPrototype, key))) {
	      push$2(result, AllSymbols[key]);
	    }
	  });
	  return result;
	};

	// `Symbol` constructor
	// https://tc39.es/ecma262/#sec-symbol-constructor
	if (!nativeSymbol) {
	  $Symbol = function Symbol() {
	    if (objectIsPrototypeOf(SymbolPrototype, this)) throw TypeError$9('Symbol is not a constructor');
	    var description = !arguments.length || arguments[0] === undefined ? undefined : toString_1(arguments[0]);
	    var tag = uid(description);
	    var setter = function (value) {
	      if (this === ObjectPrototype) functionCall(setter, ObjectPrototypeSymbols, value);
	      if (hasOwnProperty_1(this, HIDDEN) && hasOwnProperty_1(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
	    };
	    if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
	    return wrap$1(tag, description);
	  };

	  SymbolPrototype = $Symbol[PROTOTYPE];

	  redefine(SymbolPrototype, 'toString', function toString() {
	    return getInternalState$2(this).tag;
	  });

	  redefine($Symbol, 'withoutSetter', function (description) {
	    return wrap$1(uid(description), description);
	  });

	  objectPropertyIsEnumerable.f = $propertyIsEnumerable;
	  objectDefineProperty.f = $defineProperty;
	  objectDefineProperties.f = $defineProperties;
	  objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
	  objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

	  wellKnownSymbolWrapped.f = function (name) {
	    return wrap$1(wellKnownSymbol(name), name);
	  };

	  if (descriptors) {
	    // https://github.com/tc39/proposal-Symbol-description
	    nativeDefineProperty(SymbolPrototype, 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState$2(this).description;
	      }
	    });
	    {
	      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
	    }
	  }
	}

	_export({ global: true, wrap: true, forced: !nativeSymbol, sham: !nativeSymbol }, {
	  Symbol: $Symbol
	});

	$forEach$1(objectKeys(WellKnownSymbolsStore), function (name) {
	  defineWellKnownSymbol(name);
	});

	_export({ target: SYMBOL, stat: true, forced: !nativeSymbol }, {
	  // `Symbol.for` method
	  // https://tc39.es/ecma262/#sec-symbol.for
	  'for': function (key) {
	    var string = toString_1(key);
	    if (hasOwnProperty_1(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = $Symbol(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry[symbol] = string;
	    return symbol;
	  },
	  // `Symbol.keyFor` method
	  // https://tc39.es/ecma262/#sec-symbol.keyfor
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError$9(sym + ' is not a symbol');
	    if (hasOwnProperty_1(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  },
	  useSetter: function () { USE_SETTER = true; },
	  useSimple: function () { USE_SETTER = false; }
	});

	_export({ target: 'Object', stat: true, forced: !nativeSymbol, sham: !descriptors }, {
	  // `Object.create` method
	  // https://tc39.es/ecma262/#sec-object.create
	  create: $create,
	  // `Object.defineProperty` method
	  // https://tc39.es/ecma262/#sec-object.defineproperty
	  defineProperty: $defineProperty,
	  // `Object.defineProperties` method
	  // https://tc39.es/ecma262/#sec-object.defineproperties
	  defineProperties: $defineProperties,
	  // `Object.getOwnPropertyDescriptor` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
	});

	_export({ target: 'Object', stat: true, forced: !nativeSymbol }, {
	  // `Object.getOwnPropertyNames` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertynames
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // `Object.getOwnPropertySymbols` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	_export({ target: 'Object', stat: true, forced: fails(function () { objectGetOwnPropertySymbols.f(1); }) }, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return objectGetOwnPropertySymbols.f(toObject(it));
	  }
	});

	// `JSON.stringify` method behavior with symbols
	// https://tc39.es/ecma262/#sec-json.stringify
	if ($stringify) {
	  var FORCED_JSON_STRINGIFY = !nativeSymbol || fails(function () {
	    var symbol = $Symbol();
	    // MS Edge converts symbol values to JSON as {}
	    return $stringify([symbol]) != '[null]'
	      // WebKit converts symbol values to JSON as null
	      || $stringify({ a: symbol }) != '{}'
	      // V8 throws on boxed symbols
	      || $stringify(Object(symbol)) != '{}';
	  });

	  _export({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
	    // eslint-disable-next-line no-unused-vars -- required for `.length`
	    stringify: function stringify(it, replacer, space) {
	      var args = arraySlice(arguments);
	      var $replacer = replacer;
	      if (!isObject$1(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	      if (!isArray$1(replacer)) replacer = function (key, value) {
	        if (isCallable($replacer)) value = functionCall($replacer, this, key, value);
	        if (!isSymbol(value)) return value;
	      };
	      args[1] = replacer;
	      return functionApply($stringify, null, args);
	    }
	  });
	}

	// `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
	if (!SymbolPrototype[TO_PRIMITIVE]) {
	  var valueOf = SymbolPrototype.valueOf;
	  // eslint-disable-next-line no-unused-vars -- required for .length
	  redefine(SymbolPrototype, TO_PRIMITIVE, function (hint) {
	    // TODO: improve hint logic
	    return functionCall(valueOf, this);
	  });
	}
	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag($Symbol, SYMBOL);

	hiddenKeys$1[HIDDEN] = true;

	var SPECIES$5 = wellKnownSymbol('species');

	var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return engineV8Version >= 51 || !fails(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$5] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var $filter = arrayIteration.filter;


	var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('filter');

	// `Array.prototype.filter` method
	// https://tc39.es/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;


	var FAILS_ON_PRIMITIVES$1 = fails(function () { nativeGetOwnPropertyDescriptor(1); });
	var FORCED$3 = !descriptors || FAILS_ON_PRIMITIVES$1;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	_export({ target: 'Object', stat: true, forced: FORCED$3, sham: !descriptors }, {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
	    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
	  }
	});

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`


	var classList = documentCreateElement('span').classList;
	var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;

	var domTokenListPrototype = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;

	var arrayMethodIsStrict = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	var $forEach = arrayIteration.forEach;


	var STRICT_METHOD = arrayMethodIsStrict('forEach');

	// `Array.prototype.forEach` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	var arrayForEach = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	// eslint-disable-next-line es/no-array-prototype-foreach -- safe
	} : [].forEach;

	var handlePrototype = function (CollectionPrototype) {
	  // some Chrome versions have non-configurable methods on DOMTokenList
	  if (CollectionPrototype && CollectionPrototype.forEach !== arrayForEach) try {
	    createNonEnumerableProperty(CollectionPrototype, 'forEach', arrayForEach);
	  } catch (error) {
	    CollectionPrototype.forEach = arrayForEach;
	  }
	};

	for (var COLLECTION_NAME in domIterables) {
	  if (domIterables[COLLECTION_NAME]) {
	    handlePrototype(global_1[COLLECTION_NAME] && global_1[COLLECTION_NAME].prototype);
	  }
	}

	handlePrototype(domTokenListPrototype);

	// `Object.getOwnPropertyDescriptors` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
	_export({ target: 'Object', stat: true, sham: !descriptors }, {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = toIndexedObject(object);
	    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	    var keys = ownKeys$1(O);
	    var result = {};
	    var index = 0;
	    var key, descriptor;
	    while (keys.length > index) {
	      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
	      if (descriptor !== undefined) createProperty(result, key, descriptor);
	    }
	    return result;
	  }
	});

	var defineProperties = objectDefineProperties.f;

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe
	_export({ target: 'Object', stat: true, forced: Object.defineProperties !== defineProperties, sham: !descriptors }, {
	  defineProperties: defineProperties
	});

	var defineProperty$1 = objectDefineProperty.f;

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	_export({ target: 'Object', stat: true, forced: Object.defineProperty !== defineProperty$1, sham: !descriptors }, {
	  defineProperty: defineProperty$1
	});

	function _objectWithoutPropertiesLoose(source, excluded) {
	  if (source == null) return {};
	  var target = {};
	  var sourceKeys = Object.keys(source);
	  var key, i;

	  for (i = 0; i < sourceKeys.length; i++) {
	    key = sourceKeys[i];
	    if (excluded.indexOf(key) >= 0) continue;
	    target[key] = source[key];
	  }

	  return target;
	}

	function _objectWithoutProperties(source, excluded) {
	  if (source == null) return {};
	  var target = _objectWithoutPropertiesLoose(source, excluded);
	  var key, i;

	  if (Object.getOwnPropertySymbols) {
	    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

	    for (i = 0; i < sourceSymbolKeys.length; i++) {
	      key = sourceSymbolKeys[i];
	      if (excluded.indexOf(key) >= 0) continue;
	      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
	      target[key] = source[key];
	    }
	  }

	  return target;
	}

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	var FAILS_ON_PRIMITIVES = fails(function () { objectKeys(1); });

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
	  keys: function keys(it) {
	    return objectKeys(toObject(it));
	  }
	});

	// `Object.prototype.toString` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	var objectToString = toStringTagSupport ? {}.toString : function toString() {
	  return '[object ' + classof(this) + ']';
	};

	// `Object.prototype.toString` method
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	if (!toStringTagSupport) {
	  redefine(Object.prototype, 'toString', objectToString, { unsafe: true });
	}

	// `RegExp.prototype.flags` getter implementation
	// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
	var regexpFlags = function () {
	  var that = anObject(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.dotAll) result += 's';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var PROPER_FUNCTION_NAME = functionName.PROPER;







	var TO_STRING = 'toString';
	var RegExpPrototype$2 = RegExp.prototype;
	var n$ToString = RegExpPrototype$2[TO_STRING];
	var getFlags$1 = functionUncurryThis(regexpFlags);

	var NOT_GENERIC = fails(function () { return n$ToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
	// FF44- RegExp#toString has a wrong name
	var INCORRECT_NAME = PROPER_FUNCTION_NAME && n$ToString.name != TO_STRING;

	// `RegExp.prototype.toString` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
	if (NOT_GENERIC || INCORRECT_NAME) {
	  redefine(RegExp.prototype, TO_STRING, function toString() {
	    var R = anObject(this);
	    var p = toString_1(R.source);
	    var rf = R.flags;
	    var f = toString_1(rf === undefined && objectIsPrototypeOf(RegExpPrototype$2, R) && !('flags' in RegExpPrototype$2) ? getFlags$1(R) : rf);
	    return '/' + p + '/' + f;
	  }, { unsafe: true });
	}

	var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';
	var TypeError$8 = global_1.TypeError;

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject$1(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray$1(O);
	};

	var FORCED$2 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

	// `Array.prototype.concat` method
	// https://tc39.es/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	_export({ target: 'Array', proto: true, forced: FORCED$2 }, {
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  concat: function concat(arg) {
	    var O = toObject(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = lengthOfArrayLike(E);
	        if (n + len > MAX_SAFE_INTEGER) throw TypeError$8(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
	      } else {
	        if (n >= MAX_SAFE_INTEGER) throw TypeError$8(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        createProperty(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	var nativePromiseConstructor = global_1.Promise;

	var redefineAll = function (target, src, options) {
	  for (var key in src) redefine(target, key, src[key], options);
	  return target;
	};

	var String$2 = global_1.String;
	var TypeError$7 = global_1.TypeError;

	var aPossiblePrototype = function (argument) {
	  if (typeof argument == 'object' || isCallable(argument)) return argument;
	  throw TypeError$7("Can't set " + String$2(argument) + ' as a prototype');
	};

	/* eslint-disable no-proto -- safe */




	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	// eslint-disable-next-line es/no-object-setprototypeof -- safe
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	    setter = functionUncurryThis(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
	    setter(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var SPECIES$4 = wellKnownSymbol('species');

	var setSpecies = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
	  var defineProperty = objectDefineProperty.f;

	  if (descriptors && Constructor && !Constructor[SPECIES$4]) {
	    defineProperty(Constructor, SPECIES$4, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};

	var TypeError$6 = global_1.TypeError;

	var anInstance = function (it, Prototype) {
	  if (objectIsPrototypeOf(Prototype, it)) return it;
	  throw TypeError$6('Incorrect invocation');
	};

	var iterators = {};

	var ITERATOR$3 = wellKnownSymbol('iterator');
	var ArrayPrototype = Array.prototype;

	// check on default Array iterator
	var isArrayIteratorMethod = function (it) {
	  return it !== undefined && (iterators.Array === it || ArrayPrototype[ITERATOR$3] === it);
	};

	var ITERATOR$2 = wellKnownSymbol('iterator');

	var getIteratorMethod = function (it) {
	  if (it != undefined) return getMethod(it, ITERATOR$2)
	    || getMethod(it, '@@iterator')
	    || iterators[classof(it)];
	};

	var TypeError$5 = global_1.TypeError;

	var getIterator = function (argument, usingIterator) {
	  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
	  if (aCallable(iteratorMethod)) return anObject(functionCall(iteratorMethod, argument));
	  throw TypeError$5(tryToString(argument) + ' is not iterable');
	};

	var iteratorClose = function (iterator, kind, value) {
	  var innerResult, innerError;
	  anObject(iterator);
	  try {
	    innerResult = getMethod(iterator, 'return');
	    if (!innerResult) {
	      if (kind === 'throw') throw value;
	      return value;
	    }
	    innerResult = functionCall(innerResult, iterator);
	  } catch (error) {
	    innerError = true;
	    innerResult = error;
	  }
	  if (kind === 'throw') throw value;
	  if (innerError) throw innerResult;
	  anObject(innerResult);
	  return value;
	};

	var TypeError$4 = global_1.TypeError;

	var Result = function (stopped, result) {
	  this.stopped = stopped;
	  this.result = result;
	};

	var ResultPrototype = Result.prototype;

	var iterate = function (iterable, unboundFunction, options) {
	  var that = options && options.that;
	  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
	  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
	  var INTERRUPTED = !!(options && options.INTERRUPTED);
	  var fn = functionBindContext(unboundFunction, that);
	  var iterator, iterFn, index, length, result, next, step;

	  var stop = function (condition) {
	    if (iterator) iteratorClose(iterator, 'normal', condition);
	    return new Result(true, condition);
	  };

	  var callFn = function (value) {
	    if (AS_ENTRIES) {
	      anObject(value);
	      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
	    } return INTERRUPTED ? fn(value, stop) : fn(value);
	  };

	  if (IS_ITERATOR) {
	    iterator = iterable;
	  } else {
	    iterFn = getIteratorMethod(iterable);
	    if (!iterFn) throw TypeError$4(tryToString(iterable) + ' is not iterable');
	    // optimisation for array iterators
	    if (isArrayIteratorMethod(iterFn)) {
	      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
	        result = callFn(iterable[index]);
	        if (result && objectIsPrototypeOf(ResultPrototype, result)) return result;
	      } return new Result(false);
	    }
	    iterator = getIterator(iterable, iterFn);
	  }

	  next = iterator.next;
	  while (!(step = functionCall(next, iterator)).done) {
	    try {
	      result = callFn(step.value);
	    } catch (error) {
	      iteratorClose(iterator, 'throw', error);
	    }
	    if (typeof result == 'object' && result && objectIsPrototypeOf(ResultPrototype, result)) return result;
	  } return new Result(false);
	};

	var ITERATOR$1 = wellKnownSymbol('iterator');
	var SAFE_CLOSING = false;

	try {
	  var called = 0;
	  var iteratorWithReturn = {
	    next: function () {
	      return { done: !!called++ };
	    },
	    'return': function () {
	      SAFE_CLOSING = true;
	    }
	  };
	  iteratorWithReturn[ITERATOR$1] = function () {
	    return this;
	  };
	  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
	  Array.from(iteratorWithReturn, function () { throw 2; });
	} catch (error) { /* empty */ }

	var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
	  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  var ITERATION_SUPPORT = false;
	  try {
	    var object = {};
	    object[ITERATOR$1] = function () {
	      return {
	        next: function () {
	          return { done: ITERATION_SUPPORT = true };
	        }
	      };
	    };
	    exec(object);
	  } catch (error) { /* empty */ }
	  return ITERATION_SUPPORT;
	};

	var TypeError$3 = global_1.TypeError;

	// `Assert: IsConstructor(argument) is true`
	var aConstructor = function (argument) {
	  if (isConstructor(argument)) return argument;
	  throw TypeError$3(tryToString(argument) + ' is not a constructor');
	};

	var SPECIES$3 = wellKnownSymbol('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-speciesconstructor
	var speciesConstructor = function (O, defaultConstructor) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES$3]) == undefined ? defaultConstructor : aConstructor(S);
	};

	var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(engineUserAgent);

	var engineIsNode = classofRaw(global_1.process) == 'process';

	var set = global_1.setImmediate;
	var clear = global_1.clearImmediate;
	var process$3 = global_1.process;
	var Dispatch = global_1.Dispatch;
	var Function$1 = global_1.Function;
	var MessageChannel = global_1.MessageChannel;
	var String$1 = global_1.String;
	var counter = 0;
	var queue$1 = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var location, defer, channel, port;

	try {
	  // Deno throws a ReferenceError on `location` access without `--location` flag
	  location = global_1.location;
	} catch (error) { /* empty */ }

	var run = function (id) {
	  if (hasOwnProperty_1(queue$1, id)) {
	    var fn = queue$1[id];
	    delete queue$1[id];
	    fn();
	  }
	};

	var runner = function (id) {
	  return function () {
	    run(id);
	  };
	};

	var listener = function (event) {
	  run(event.data);
	};

	var post = function (id) {
	  // old engines have not location.origin
	  global_1.postMessage(String$1(id), location.protocol + '//' + location.host);
	};

	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!set || !clear) {
	  set = function setImmediate(fn) {
	    var args = arraySlice(arguments, 1);
	    queue$1[++counter] = function () {
	      functionApply(isCallable(fn) ? fn : Function$1(fn), undefined, args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clear = function clearImmediate(id) {
	    delete queue$1[id];
	  };
	  // Node.js 0.8-
	  if (engineIsNode) {
	    defer = function (id) {
	      process$3.nextTick(runner(id));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(runner(id));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  // except iOS - https://github.com/zloirock/core-js/issues/624
	  } else if (MessageChannel && !engineIsIos) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = functionBindContext(port.postMessage, port);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (
	    global_1.addEventListener &&
	    isCallable(global_1.postMessage) &&
	    !global_1.importScripts &&
	    location && location.protocol !== 'file:' &&
	    !fails(post)
	  ) {
	    defer = post;
	    global_1.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in documentCreateElement('script')) {
	    defer = function (id) {
	      html.appendChild(documentCreateElement('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(runner(id), 0);
	    };
	  }
	}

	var task$1 = {
	  set: set,
	  clear: clear
	};

	var engineIsIosPebble = /ipad|iphone|ipod/i.test(engineUserAgent) && global_1.Pebble !== undefined;

	var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(engineUserAgent);

	var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	var macrotask = task$1.set;





	var MutationObserver = global_1.MutationObserver || global_1.WebKitMutationObserver;
	var document$2 = global_1.document;
	var process$2 = global_1.process;
	var Promise$1 = global_1.Promise;
	// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
	var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global_1, 'queueMicrotask');
	var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

	var flush, head, last, notify$1, toggle, node$1, promise, then;

	// modern engines have queueMicrotask method
	if (!queueMicrotask) {
	  flush = function () {
	    var parent, fn;
	    if (engineIsNode && (parent = process$2.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (error) {
	        if (head) notify$1();
	        else last = undefined;
	        throw error;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
	  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
	  if (!engineIsIos && !engineIsNode && !engineIsWebosWebkit && MutationObserver && document$2) {
	    toggle = true;
	    node$1 = document$2.createTextNode('');
	    new MutationObserver(flush).observe(node$1, { characterData: true });
	    notify$1 = function () {
	      node$1.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (!engineIsIosPebble && Promise$1 && Promise$1.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    promise = Promise$1.resolve(undefined);
	    // workaround of WebKit ~ iOS Safari 10.1 bug
	    promise.constructor = Promise$1;
	    then = functionBindContext(promise.then, promise);
	    notify$1 = function () {
	      then(flush);
	    };
	  // Node.js without promises
	  } else if (engineIsNode) {
	    notify$1 = function () {
	      process$2.nextTick(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    // strange IE + webpack dev server bug - use .bind(global)
	    macrotask = functionBindContext(macrotask, global_1);
	    notify$1 = function () {
	      macrotask(flush);
	    };
	  }
	}

	var microtask = queueMicrotask || function (fn) {
	  var task = { fn: fn, next: undefined };
	  if (last) last.next = task;
	  if (!head) {
	    head = task;
	    notify$1();
	  } last = task;
	};

	var PromiseCapability = function (C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aCallable(resolve);
	  this.reject = aCallable(reject);
	};

	// `NewPromiseCapability` abstract operation
	// https://tc39.es/ecma262/#sec-newpromisecapability
	var f = function (C) {
	  return new PromiseCapability(C);
	};

	var newPromiseCapability$1 = {
		f: f
	};

	var promiseResolve = function (C, x) {
	  anObject(C);
	  if (isObject$1(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability$1.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var hostReportErrors = function (a, b) {
	  var console = global_1.console;
	  if (console && console.error) {
	    arguments.length == 1 ? console.error(a) : console.error(a, b);
	  }
	};

	var perform = function (exec) {
	  try {
	    return { error: false, value: exec() };
	  } catch (error) {
	    return { error: true, value: error };
	  }
	};

	var Queue = function () {
	  this.head = null;
	  this.tail = null;
	};

	Queue.prototype = {
	  add: function (item) {
	    var entry = { item: item, next: null };
	    if (this.head) this.tail.next = entry;
	    else this.head = entry;
	    this.tail = entry;
	  },
	  get: function () {
	    var entry = this.head;
	    if (entry) {
	      this.head = entry.next;
	      if (this.tail === entry) this.tail = null;
	      return entry.item;
	    }
	  }
	};

	var queue = Queue;

	var engineIsBrowser = typeof window == 'object';

	var task = task$1.set;













	var SPECIES$2 = wellKnownSymbol('species');
	var PROMISE = 'Promise';

	var getInternalState$1 = internalState.getterFor(PROMISE);
	var setInternalState = internalState.set;
	var getInternalPromiseState = internalState.getterFor(PROMISE);
	var NativePromisePrototype = nativePromiseConstructor && nativePromiseConstructor.prototype;
	var PromiseConstructor = nativePromiseConstructor;
	var PromisePrototype = NativePromisePrototype;
	var TypeError$2 = global_1.TypeError;
	var document$1 = global_1.document;
	var process$1 = global_1.process;
	var newPromiseCapability = newPromiseCapability$1.f;
	var newGenericPromiseCapability = newPromiseCapability;

	var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global_1.dispatchEvent);
	var NATIVE_REJECTION_EVENT = isCallable(global_1.PromiseRejectionEvent);
	var UNHANDLED_REJECTION = 'unhandledrejection';
	var REJECTION_HANDLED = 'rejectionhandled';
	var PENDING = 0;
	var FULFILLED = 1;
	var REJECTED = 2;
	var HANDLED = 1;
	var UNHANDLED = 2;
	var SUBCLASSING = false;

	var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

	var FORCED$1 = isForced_1(PROMISE, function () {
	  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(PromiseConstructor);
	  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(PromiseConstructor);
	  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	  // We can't detect it synchronously, so just check versions
	  if (!GLOBAL_CORE_JS_PROMISE && engineV8Version === 66) return true;
	  // We can't use @@species feature detection in V8 since it causes
	  // deoptimization and performance degradation
	  // https://github.com/zloirock/core-js/issues/679
	  if (engineV8Version >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false;
	  // Detect correctness of subclassing with @@species support
	  var promise = new PromiseConstructor(function (resolve) { resolve(1); });
	  var FakePromise = function (exec) {
	    exec(function () { /* empty */ }, function () { /* empty */ });
	  };
	  var constructor = promise.constructor = {};
	  constructor[SPECIES$2] = FakePromise;
	  SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
	  if (!SUBCLASSING) return true;
	  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	  return !GLOBAL_CORE_JS_PROMISE && engineIsBrowser && !NATIVE_REJECTION_EVENT;
	});

	var INCORRECT_ITERATION = FORCED$1 || !checkCorrectnessOfIteration(function (iterable) {
	  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
	});

	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject$1(it) && isCallable(then = it.then) ? then : false;
	};

	var callReaction = function (reaction, state) {
	  var value = state.value;
	  var ok = state.state == FULFILLED;
	  var handler = ok ? reaction.ok : reaction.fail;
	  var resolve = reaction.resolve;
	  var reject = reaction.reject;
	  var domain = reaction.domain;
	  var result, then, exited;
	  try {
	    if (handler) {
	      if (!ok) {
	        if (state.rejection === UNHANDLED) onHandleUnhandled(state);
	        state.rejection = HANDLED;
	      }
	      if (handler === true) result = value;
	      else {
	        if (domain) domain.enter();
	        result = handler(value); // can throw
	        if (domain) {
	          domain.exit();
	          exited = true;
	        }
	      }
	      if (result === reaction.promise) {
	        reject(TypeError$2('Promise-chain cycle'));
	      } else if (then = isThenable(result)) {
	        functionCall(then, result, resolve, reject);
	      } else resolve(result);
	    } else reject(value);
	  } catch (error) {
	    if (domain && !exited) domain.exit();
	    reject(error);
	  }
	};

	var notify = function (state, isReject) {
	  if (state.notified) return;
	  state.notified = true;
	  microtask(function () {
	    var reactions = state.reactions;
	    var reaction;
	    while (reaction = reactions.get()) {
	      callReaction(reaction, state);
	    }
	    state.notified = false;
	    if (isReject && !state.rejection) onUnhandled(state);
	  });
	};

	var dispatchEvent = function (name, promise, reason) {
	  var event, handler;
	  if (DISPATCH_EVENT) {
	    event = document$1.createEvent('Event');
	    event.promise = promise;
	    event.reason = reason;
	    event.initEvent(name, false, true);
	    global_1.dispatchEvent(event);
	  } else event = { promise: promise, reason: reason };
	  if (!NATIVE_REJECTION_EVENT && (handler = global_1['on' + name])) handler(event);
	  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
	};

	var onUnhandled = function (state) {
	  functionCall(task, global_1, function () {
	    var promise = state.facade;
	    var value = state.value;
	    var IS_UNHANDLED = isUnhandled(state);
	    var result;
	    if (IS_UNHANDLED) {
	      result = perform(function () {
	        if (engineIsNode) {
	          process$1.emit('unhandledRejection', value, promise);
	        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      state.rejection = engineIsNode || isUnhandled(state) ? UNHANDLED : HANDLED;
	      if (result.error) throw result.value;
	    }
	  });
	};

	var isUnhandled = function (state) {
	  return state.rejection !== HANDLED && !state.parent;
	};

	var onHandleUnhandled = function (state) {
	  functionCall(task, global_1, function () {
	    var promise = state.facade;
	    if (engineIsNode) {
	      process$1.emit('rejectionHandled', promise);
	    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
	  });
	};

	var bind$1 = function (fn, state, unwrap) {
	  return function (value) {
	    fn(state, value, unwrap);
	  };
	};

	var internalReject = function (state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  state.value = value;
	  state.state = REJECTED;
	  notify(state, true);
	};

	var internalResolve = function (state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  try {
	    if (state.facade === value) throw TypeError$2("Promise can't be resolved itself");
	    var then = isThenable(value);
	    if (then) {
	      microtask(function () {
	        var wrapper = { done: false };
	        try {
	          functionCall(then, value,
	            bind$1(internalResolve, wrapper, state),
	            bind$1(internalReject, wrapper, state)
	          );
	        } catch (error) {
	          internalReject(wrapper, error, state);
	        }
	      });
	    } else {
	      state.value = value;
	      state.state = FULFILLED;
	      notify(state, false);
	    }
	  } catch (error) {
	    internalReject({ done: false }, error, state);
	  }
	};

	// constructor polyfill
	if (FORCED$1) {
	  // 25.4.3.1 Promise(executor)
	  PromiseConstructor = function Promise(executor) {
	    anInstance(this, PromisePrototype);
	    aCallable(executor);
	    functionCall(Internal, this);
	    var state = getInternalState$1(this);
	    try {
	      executor(bind$1(internalResolve, state), bind$1(internalReject, state));
	    } catch (error) {
	      internalReject(state, error);
	    }
	  };
	  PromisePrototype = PromiseConstructor.prototype;
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  Internal = function Promise(executor) {
	    setInternalState(this, {
	      type: PROMISE,
	      done: false,
	      notified: false,
	      parent: false,
	      reactions: new queue(),
	      rejection: false,
	      state: PENDING,
	      value: undefined
	    });
	  };
	  Internal.prototype = redefineAll(PromisePrototype, {
	    // `Promise.prototype.then` method
	    // https://tc39.es/ecma262/#sec-promise.prototype.then
	    // eslint-disable-next-line unicorn/no-thenable -- safe
	    then: function then(onFulfilled, onRejected) {
	      var state = getInternalPromiseState(this);
	      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
	      state.parent = true;
	      reaction.ok = isCallable(onFulfilled) ? onFulfilled : true;
	      reaction.fail = isCallable(onRejected) && onRejected;
	      reaction.domain = engineIsNode ? process$1.domain : undefined;
	      if (state.state == PENDING) state.reactions.add(reaction);
	      else microtask(function () {
	        callReaction(reaction, state);
	      });
	      return reaction.promise;
	    },
	    // `Promise.prototype.catch` method
	    // https://tc39.es/ecma262/#sec-promise.prototype.catch
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    var state = getInternalState$1(promise);
	    this.promise = promise;
	    this.resolve = bind$1(internalResolve, state);
	    this.reject = bind$1(internalReject, state);
	  };
	  newPromiseCapability$1.f = newPromiseCapability = function (C) {
	    return C === PromiseConstructor || C === PromiseWrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };

	  if (isCallable(nativePromiseConstructor) && NativePromisePrototype !== Object.prototype) {
	    nativeThen = NativePromisePrototype.then;

	    if (!SUBCLASSING) {
	      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
	      redefine(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
	        var that = this;
	        return new PromiseConstructor(function (resolve, reject) {
	          functionCall(nativeThen, that, resolve, reject);
	        }).then(onFulfilled, onRejected);
	      // https://github.com/zloirock/core-js/issues/640
	      }, { unsafe: true });

	      // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
	      redefine(NativePromisePrototype, 'catch', PromisePrototype['catch'], { unsafe: true });
	    }

	    // make `.constructor === Promise` work for native promise-based APIs
	    try {
	      delete NativePromisePrototype.constructor;
	    } catch (error) { /* empty */ }

	    // make `instanceof Promise` work for native promise-based APIs
	    if (objectSetPrototypeOf) {
	      objectSetPrototypeOf(NativePromisePrototype, PromisePrototype);
	    }
	  }
	}

	_export({ global: true, wrap: true, forced: FORCED$1 }, {
	  Promise: PromiseConstructor
	});

	setToStringTag(PromiseConstructor, PROMISE, false);
	setSpecies(PROMISE);

	PromiseWrapper = getBuiltIn(PROMISE);

	// statics
	_export({ target: PROMISE, stat: true, forced: FORCED$1 }, {
	  // `Promise.reject` method
	  // https://tc39.es/ecma262/#sec-promise.reject
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this);
	    functionCall(capability.reject, undefined, r);
	    return capability.promise;
	  }
	});

	_export({ target: PROMISE, stat: true, forced: FORCED$1 }, {
	  // `Promise.resolve` method
	  // https://tc39.es/ecma262/#sec-promise.resolve
	  resolve: function resolve(x) {
	    return promiseResolve(this, x);
	  }
	});

	_export({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
	  // `Promise.all` method
	  // https://tc39.es/ecma262/#sec-promise.all
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aCallable(C.resolve);
	      var values = [];
	      var counter = 0;
	      var remaining = 1;
	      iterate(iterable, function (promise) {
	        var index = counter++;
	        var alreadyCalled = false;
	        remaining++;
	        functionCall($promiseResolve, C, promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  },
	  // `Promise.race` method
	  // https://tc39.es/ecma262/#sec-promise.race
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aCallable(C.resolve);
	      iterate(iterable, function (promise) {
	        functionCall($promiseResolve, C, promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	var bind = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};

	// utils is a library of generic helper functions non-specific to axios

	var toString = Object.prototype.toString;

	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}

	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}

	/**
	 * Determine if a value is a Buffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Buffer, otherwise false
	 */
	function isBuffer(val) {
	  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
	    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
	}

	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}

	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return (typeof FormData !== 'undefined') && (val instanceof FormData);
	}

	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}

	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}

	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}

	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}

	/**
	 * Determine if a value is a plain Object
	 *
	 * @param {Object} val The value to test
	 * @return {boolean} True if value is a plain Object, otherwise false
	 */
	function isPlainObject(val) {
	  if (toString.call(val) !== '[object Object]') {
	    return false;
	  }

	  var prototype = Object.getPrototypeOf(val);
	  return prototype === null || prototype === Object.prototype;
	}

	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}

	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}

	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}

	/**
	 * Determine if a value is a Function
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	function isFunction(val) {
	  return toString.call(val) === '[object Function]';
	}

	/**
	 * Determine if a value is a Stream
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	function isStream(val) {
	  return isObject(val) && isFunction(val.pipe);
	}

	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	function isURLSearchParams(val) {
	  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	}

	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim$1(str) {
	  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
	}

	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  navigator.product -> 'ReactNative'
	 * nativescript
	 *  navigator.product -> 'NativeScript' or 'NS'
	 */
	function isStandardBrowserEnv() {
	  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
	                                           navigator.product === 'NativeScript' ||
	                                           navigator.product === 'NS')) {
	    return false;
	  }
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined'
	  );
	}

	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }

	  // Force an array if not already something iterable
	  if (typeof obj !== 'object') {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }

	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}

	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (isPlainObject(result[key]) && isPlainObject(val)) {
	      result[key] = merge(result[key], val);
	    } else if (isPlainObject(val)) {
	      result[key] = merge({}, val);
	    } else if (isArray(val)) {
	      result[key] = val.slice();
	    } else {
	      result[key] = val;
	    }
	  }

	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}

	/**
	 * Extends object a by mutably adding to it the properties of object b.
	 *
	 * @param {Object} a The object to be extended
	 * @param {Object} b The object to copy properties from
	 * @param {Object} thisArg The object to bind function to
	 * @return {Object} The resulting value of object a
	 */
	function extend(a, b, thisArg) {
	  forEach(b, function assignValue(val, key) {
	    if (thisArg && typeof val === 'function') {
	      a[key] = bind(val, thisArg);
	    } else {
	      a[key] = val;
	    }
	  });
	  return a;
	}

	/**
	 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
	 *
	 * @param {string} content with BOM
	 * @return {string} content value without BOM
	 */
	function stripBOM(content) {
	  if (content.charCodeAt(0) === 0xFEFF) {
	    content = content.slice(1);
	  }
	  return content;
	}

	var utils = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isBuffer: isBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isPlainObject: isPlainObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  extend: extend,
	  trim: trim$1,
	  stripBOM: stripBOM
	};

	function encode$1(val) {
	  return encodeURIComponent(val).
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}

	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	var buildURL = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }

	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else if (utils.isURLSearchParams(params)) {
	    serializedParams = params.toString();
	  } else {
	    var parts = [];

	    utils.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }

	      if (utils.isArray(val)) {
	        key = key + '[]';
	      } else {
	        val = [val];
	      }

	      utils.forEach(val, function parseValue(v) {
	        if (utils.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode$1(key) + '=' + encode$1(v));
	      });
	    });

	    serializedParams = parts.join('&');
	  }

	  if (serializedParams) {
	    var hashmarkIndex = url.indexOf('#');
	    if (hashmarkIndex !== -1) {
	      url = url.slice(0, hashmarkIndex);
	    }

	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }

	  return url;
	};

	function InterceptorManager() {
	  this.handlers = [];
	}

	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected,
	    synchronous: options ? options.synchronous : false,
	    runWhen: options ? options.runWhen : null
	  });
	  return this.handlers.length - 1;
	};

	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};

	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};

	var InterceptorManager_1 = InterceptorManager;

	var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
	  utils.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};

	/**
	 * Update an Error with the specified config, error code, and response.
	 *
	 * @param {Error} error The error to update.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The error.
	 */
	var enhanceError = function enhanceError(error, config, code, request, response) {
	  error.config = config;
	  if (code) {
	    error.code = code;
	  }

	  error.request = request;
	  error.response = response;
	  error.isAxiosError = true;

	  error.toJSON = function toJSON() {
	    return {
	      // Standard
	      message: this.message,
	      name: this.name,
	      // Microsoft
	      description: this.description,
	      number: this.number,
	      // Mozilla
	      fileName: this.fileName,
	      lineNumber: this.lineNumber,
	      columnNumber: this.columnNumber,
	      stack: this.stack,
	      // Axios
	      config: this.config,
	      code: this.code,
	      status: this.response && this.response.status ? this.response.status : null
	    };
	  };
	  return error;
	};

	/**
	 * Create an Error with the specified message, config, error code, request and response.
	 *
	 * @param {string} message The error message.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The created error.
	 */
	var createError = function createError(message, config, code, request, response) {
	  var error = new Error(message);
	  return enhanceError(error, config, code, request, response);
	};

	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 */
	var settle = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;
	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(createError(
	      'Request failed with status code ' + response.status,
	      response.config,
	      null,
	      response.request,
	      response
	    ));
	  }
	};

	var cookies = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs support document.cookie
	    (function standardBrowserEnv() {
	      return {
	        write: function write(name, value, expires, path, domain, secure) {
	          var cookie = [];
	          cookie.push(name + '=' + encodeURIComponent(value));

	          if (utils.isNumber(expires)) {
	            cookie.push('expires=' + new Date(expires).toGMTString());
	          }

	          if (utils.isString(path)) {
	            cookie.push('path=' + path);
	          }

	          if (utils.isString(domain)) {
	            cookie.push('domain=' + domain);
	          }

	          if (secure === true) {
	            cookie.push('secure');
	          }

	          document.cookie = cookie.join('; ');
	        },

	        read: function read(name) {
	          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	          return (match ? decodeURIComponent(match[3]) : null);
	        },

	        remove: function remove(name) {
	          this.write(name, '', Date.now() - 86400000);
	        }
	      };
	    })() :

	  // Non standard browser env (web workers, react-native) lack needed support.
	    (function nonStandardBrowserEnv() {
	      return {
	        write: function write() {},
	        read: function read() { return null; },
	        remove: function remove() {}
	      };
	    })()
	);

	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	var isAbsoluteURL = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};

	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	var combineURLs = function combineURLs(baseURL, relativeURL) {
	  return relativeURL
	    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
	    : baseURL;
	};

	/**
	 * Creates a new URL by combining the baseURL with the requestedURL,
	 * only when the requestedURL is not already an absolute URL.
	 * If the requestURL is absolute, this function returns the requestedURL untouched.
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} requestedURL Absolute or relative URL to combine
	 * @returns {string} The combined full path
	 */
	var buildFullPath = function buildFullPath(baseURL, requestedURL) {
	  if (baseURL && !isAbsoluteURL(requestedURL)) {
	    return combineURLs(baseURL, requestedURL);
	  }
	  return requestedURL;
	};

	// Headers whose duplicates are ignored by node
	// c.f. https://nodejs.org/api/http.html#http_message_headers
	var ignoreDuplicateOf = [
	  'age', 'authorization', 'content-length', 'content-type', 'etag',
	  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
	  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
	  'referer', 'retry-after', 'user-agent'
	];

	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	var parseHeaders = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;

	  if (!headers) { return parsed; }

	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));

	    if (key) {
	      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
	        return;
	      }
	      if (key === 'set-cookie') {
	        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
	      } else {
	        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	      }
	    }
	  });

	  return parsed;
	};

	var isURLSameOrigin = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	    (function standardBrowserEnv() {
	      var msie = /(msie|trident)/i.test(navigator.userAgent);
	      var urlParsingNode = document.createElement('a');
	      var originURL;

	      /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	      function resolveURL(url) {
	        var href = url;

	        if (msie) {
	        // IE needs attribute set twice to normalize properties
	          urlParsingNode.setAttribute('href', href);
	          href = urlParsingNode.href;
	        }

	        urlParsingNode.setAttribute('href', href);

	        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	        return {
	          href: urlParsingNode.href,
	          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	          host: urlParsingNode.host,
	          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	          hostname: urlParsingNode.hostname,
	          port: urlParsingNode.port,
	          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	            urlParsingNode.pathname :
	            '/' + urlParsingNode.pathname
	        };
	      }

	      originURL = resolveURL(window.location.href);

	      /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	      return function isURLSameOrigin(requestURL) {
	        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	        return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	      };
	    })() :

	  // Non standard browser envs (web workers, react-native) lack needed support.
	    (function nonStandardBrowserEnv() {
	      return function isURLSameOrigin() {
	        return true;
	      };
	    })()
	);

	/**
	 * A `Cancel` is an object that is thrown when an operation is canceled.
	 *
	 * @class
	 * @param {string=} message The message.
	 */
	function Cancel(message) {
	  this.message = message;
	}

	Cancel.prototype.toString = function toString() {
	  return 'Cancel' + (this.message ? ': ' + this.message : '');
	};

	Cancel.prototype.__CANCEL__ = true;

	var Cancel_1 = Cancel;

	var defaults$1 = defaults_1;

	var xhr = function xhrAdapter(config) {
	  return new Promise(function dispatchXhrRequest(resolve, reject) {
	    var requestData = config.data;
	    var requestHeaders = config.headers;
	    var responseType = config.responseType;
	    var onCanceled;
	    function done() {
	      if (config.cancelToken) {
	        config.cancelToken.unsubscribe(onCanceled);
	      }

	      if (config.signal) {
	        config.signal.removeEventListener('abort', onCanceled);
	      }
	    }

	    if (utils.isFormData(requestData)) {
	      delete requestHeaders['Content-Type']; // Let the browser set it
	    }

	    var request = new XMLHttpRequest();

	    // HTTP basic authentication
	    if (config.auth) {
	      var username = config.auth.username || '';
	      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
	      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	    }

	    var fullPath = buildFullPath(config.baseURL, config.url);
	    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

	    // Set the request timeout in MS
	    request.timeout = config.timeout;

	    function onloadend() {
	      if (!request) {
	        return;
	      }
	      // Prepare the response
	      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
	        request.responseText : request.response;
	      var response = {
	        data: responseData,
	        status: request.status,
	        statusText: request.statusText,
	        headers: responseHeaders,
	        config: config,
	        request: request
	      };

	      settle(function _resolve(value) {
	        resolve(value);
	        done();
	      }, function _reject(err) {
	        reject(err);
	        done();
	      }, response);

	      // Clean up request
	      request = null;
	    }

	    if ('onloadend' in request) {
	      // Use onloadend if available
	      request.onloadend = onloadend;
	    } else {
	      // Listen for ready state to emulate onloadend
	      request.onreadystatechange = function handleLoad() {
	        if (!request || request.readyState !== 4) {
	          return;
	        }

	        // The request errored out and we didn't get a response, this will be
	        // handled by onerror instead
	        // With one exception: request that using file: protocol, most browsers
	        // will return status as 0 even though it's a successful request
	        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
	          return;
	        }
	        // readystate handler is calling before onerror or ontimeout handlers,
	        // so we should call onloadend on the next 'tick'
	        setTimeout(onloadend);
	      };
	    }

	    // Handle browser request cancellation (as opposed to a manual cancellation)
	    request.onabort = function handleAbort() {
	      if (!request) {
	        return;
	      }

	      reject(createError('Request aborted', config, 'ECONNABORTED', request));

	      // Clean up request
	      request = null;
	    };

	    // Handle low level network errors
	    request.onerror = function handleError() {
	      // Real errors are hidden from us by the browser
	      // onerror should only fire if it's a network error
	      reject(createError('Network Error', config, null, request));

	      // Clean up request
	      request = null;
	    };

	    // Handle timeout
	    request.ontimeout = function handleTimeout() {
	      var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
	      var transitional = config.transitional || defaults$1.transitional;
	      if (config.timeoutErrorMessage) {
	        timeoutErrorMessage = config.timeoutErrorMessage;
	      }
	      reject(createError(
	        timeoutErrorMessage,
	        config,
	        transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
	        request));

	      // Clean up request
	      request = null;
	    };

	    // Add xsrf header
	    // This is only done if running in a standard browser environment.
	    // Specifically not if we're in a web worker, or react-native.
	    if (utils.isStandardBrowserEnv()) {
	      // Add xsrf header
	      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
	        cookies.read(config.xsrfCookieName) :
	        undefined;

	      if (xsrfValue) {
	        requestHeaders[config.xsrfHeaderName] = xsrfValue;
	      }
	    }

	    // Add headers to the request
	    if ('setRequestHeader' in request) {
	      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	          // Remove Content-Type if data is undefined
	          delete requestHeaders[key];
	        } else {
	          // Otherwise add header to the request
	          request.setRequestHeader(key, val);
	        }
	      });
	    }

	    // Add withCredentials to request if needed
	    if (!utils.isUndefined(config.withCredentials)) {
	      request.withCredentials = !!config.withCredentials;
	    }

	    // Add responseType to request if needed
	    if (responseType && responseType !== 'json') {
	      request.responseType = config.responseType;
	    }

	    // Handle progress if needed
	    if (typeof config.onDownloadProgress === 'function') {
	      request.addEventListener('progress', config.onDownloadProgress);
	    }

	    // Not all browsers support upload events
	    if (typeof config.onUploadProgress === 'function' && request.upload) {
	      request.upload.addEventListener('progress', config.onUploadProgress);
	    }

	    if (config.cancelToken || config.signal) {
	      // Handle cancellation
	      // eslint-disable-next-line func-names
	      onCanceled = function(cancel) {
	        if (!request) {
	          return;
	        }
	        reject(!cancel || (cancel && cancel.type) ? new Cancel_1('canceled') : cancel);
	        request.abort();
	        request = null;
	      };

	      config.cancelToken && config.cancelToken.subscribe(onCanceled);
	      if (config.signal) {
	        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
	      }
	    }

	    if (!requestData) {
	      requestData = null;
	    }

	    // Send the request
	    request.send(requestData);
	  });
	};

	/**
	 * Helpers.
	 */

	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var w = d * 7;
	var y = d * 365.25;

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} [options]
	 * @throws {Error} throw an error if val is not a non-empty string or a number
	 * @return {String|Number}
	 * @api public
	 */

	var ms = function(val, options) {
	  options = options || {};
	  var type = typeof val;
	  if (type === 'string' && val.length > 0) {
	    return parse(val);
	  } else if (type === 'number' && isFinite(val)) {
	    return options.long ? fmtLong(val) : fmtShort(val);
	  }
	  throw new Error(
	    'val is not a non-empty string or a valid number. val=' +
	      JSON.stringify(val)
	  );
	};

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  str = String(str);
	  if (str.length > 100) {
	    return;
	  }
	  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
	    str
	  );
	  if (!match) {
	    return;
	  }
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'weeks':
	    case 'week':
	    case 'w':
	      return n * w;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	    default:
	      return undefined;
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtShort(ms) {
	  var msAbs = Math.abs(ms);
	  if (msAbs >= d) {
	    return Math.round(ms / d) + 'd';
	  }
	  if (msAbs >= h) {
	    return Math.round(ms / h) + 'h';
	  }
	  if (msAbs >= m) {
	    return Math.round(ms / m) + 'm';
	  }
	  if (msAbs >= s) {
	    return Math.round(ms / s) + 's';
	  }
	  return ms + 'ms';
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtLong(ms) {
	  var msAbs = Math.abs(ms);
	  if (msAbs >= d) {
	    return plural(ms, msAbs, d, 'day');
	  }
	  if (msAbs >= h) {
	    return plural(ms, msAbs, h, 'hour');
	  }
	  if (msAbs >= m) {
	    return plural(ms, msAbs, m, 'minute');
	  }
	  if (msAbs >= s) {
	    return plural(ms, msAbs, s, 'second');
	  }
	  return ms + ' ms';
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, msAbs, n, name) {
	  var isPlural = msAbs >= n * 1.5;
	  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
	}

	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 */

	function setup(env) {
		createDebug.debug = createDebug;
		createDebug.default = createDebug;
		createDebug.coerce = coerce;
		createDebug.disable = disable;
		createDebug.enable = enable;
		createDebug.enabled = enabled;
		createDebug.humanize = ms;
		createDebug.destroy = destroy;

		Object.keys(env).forEach(key => {
			createDebug[key] = env[key];
		});

		/**
		* The currently active debug mode names, and names to skip.
		*/

		createDebug.names = [];
		createDebug.skips = [];

		/**
		* Map of special "%n" handling functions, for the debug "format" argument.
		*
		* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
		*/
		createDebug.formatters = {};

		/**
		* Selects a color for a debug namespace
		* @param {String} namespace The namespace string for the debug instance to be colored
		* @return {Number|String} An ANSI color code for the given namespace
		* @api private
		*/
		function selectColor(namespace) {
			let hash = 0;

			for (let i = 0; i < namespace.length; i++) {
				hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
				hash |= 0; // Convert to 32bit integer
			}

			return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
		}
		createDebug.selectColor = selectColor;

		/**
		* Create a debugger with the given `namespace`.
		*
		* @param {String} namespace
		* @return {Function}
		* @api public
		*/
		function createDebug(namespace) {
			let prevTime;
			let enableOverride = null;
			let namespacesCache;
			let enabledCache;

			function debug(...args) {
				// Disabled?
				if (!debug.enabled) {
					return;
				}

				const self = debug;

				// Set `diff` timestamp
				const curr = Number(new Date());
				const ms = curr - (prevTime || curr);
				self.diff = ms;
				self.prev = prevTime;
				self.curr = curr;
				prevTime = curr;

				args[0] = createDebug.coerce(args[0]);

				if (typeof args[0] !== 'string') {
					// Anything else let's inspect with %O
					args.unshift('%O');
				}

				// Apply any `formatters` transformations
				let index = 0;
				args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
					// If we encounter an escaped % then don't increase the array index
					if (match === '%%') {
						return '%';
					}
					index++;
					const formatter = createDebug.formatters[format];
					if (typeof formatter === 'function') {
						const val = args[index];
						match = formatter.call(self, val);

						// Now we need to remove `args[index]` since it's inlined in the `format`
						args.splice(index, 1);
						index--;
					}
					return match;
				});

				// Apply env-specific formatting (colors, etc.)
				createDebug.formatArgs.call(self, args);

				const logFn = self.log || createDebug.log;
				logFn.apply(self, args);
			}

			debug.namespace = namespace;
			debug.useColors = createDebug.useColors();
			debug.color = createDebug.selectColor(namespace);
			debug.extend = extend;
			debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

			Object.defineProperty(debug, 'enabled', {
				enumerable: true,
				configurable: false,
				get: () => {
					if (enableOverride !== null) {
						return enableOverride;
					}
					if (namespacesCache !== createDebug.namespaces) {
						namespacesCache = createDebug.namespaces;
						enabledCache = createDebug.enabled(namespace);
					}

					return enabledCache;
				},
				set: v => {
					enableOverride = v;
				}
			});

			// Env-specific initialization logic for debug instances
			if (typeof createDebug.init === 'function') {
				createDebug.init(debug);
			}

			return debug;
		}

		function extend(namespace, delimiter) {
			const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
			newDebug.log = this.log;
			return newDebug;
		}

		/**
		* Enables a debug mode by namespaces. This can include modes
		* separated by a colon and wildcards.
		*
		* @param {String} namespaces
		* @api public
		*/
		function enable(namespaces) {
			createDebug.save(namespaces);
			createDebug.namespaces = namespaces;

			createDebug.names = [];
			createDebug.skips = [];

			let i;
			const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
			const len = split.length;

			for (i = 0; i < len; i++) {
				if (!split[i]) {
					// ignore empty strings
					continue;
				}

				namespaces = split[i].replace(/\*/g, '.*?');

				if (namespaces[0] === '-') {
					createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
				} else {
					createDebug.names.push(new RegExp('^' + namespaces + '$'));
				}
			}
		}

		/**
		* Disable debug output.
		*
		* @return {String} namespaces
		* @api public
		*/
		function disable() {
			const namespaces = [
				...createDebug.names.map(toNamespace),
				...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
			].join(',');
			createDebug.enable('');
			return namespaces;
		}

		/**
		* Returns true if the given mode name is enabled, false otherwise.
		*
		* @param {String} name
		* @return {Boolean}
		* @api public
		*/
		function enabled(name) {
			if (name[name.length - 1] === '*') {
				return true;
			}

			let i;
			let len;

			for (i = 0, len = createDebug.skips.length; i < len; i++) {
				if (createDebug.skips[i].test(name)) {
					return false;
				}
			}

			for (i = 0, len = createDebug.names.length; i < len; i++) {
				if (createDebug.names[i].test(name)) {
					return true;
				}
			}

			return false;
		}

		/**
		* Convert regexp to namespace
		*
		* @param {RegExp} regxep
		* @return {String} namespace
		* @api private
		*/
		function toNamespace(regexp) {
			return regexp.toString()
				.substring(2, regexp.toString().length - 2)
				.replace(/\.\*\?$/, '*');
		}

		/**
		* Coerce `val`.
		*
		* @param {Mixed} val
		* @return {Mixed}
		* @api private
		*/
		function coerce(val) {
			if (val instanceof Error) {
				return val.stack || val.message;
			}
			return val;
		}

		/**
		* XXX DO NOT USE. This is a temporary stub function.
		* XXX It WILL be removed in the next major release.
		*/
		function destroy() {
			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
		}

		createDebug.enable(createDebug.load());

		return createDebug;
	}

	var common = setup;

	var browser = createCommonjsModule(function (module, exports) {
	/* eslint-env browser */

	/**
	 * This is the web browser implementation of `debug()`.
	 */

	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = localstorage();
	exports.destroy = (() => {
		let warned = false;

		return () => {
			if (!warned) {
				warned = true;
				console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
			}
		};
	})();

	/**
	 * Colors.
	 */

	exports.colors = [
		'#0000CC',
		'#0000FF',
		'#0033CC',
		'#0033FF',
		'#0066CC',
		'#0066FF',
		'#0099CC',
		'#0099FF',
		'#00CC00',
		'#00CC33',
		'#00CC66',
		'#00CC99',
		'#00CCCC',
		'#00CCFF',
		'#3300CC',
		'#3300FF',
		'#3333CC',
		'#3333FF',
		'#3366CC',
		'#3366FF',
		'#3399CC',
		'#3399FF',
		'#33CC00',
		'#33CC33',
		'#33CC66',
		'#33CC99',
		'#33CCCC',
		'#33CCFF',
		'#6600CC',
		'#6600FF',
		'#6633CC',
		'#6633FF',
		'#66CC00',
		'#66CC33',
		'#9900CC',
		'#9900FF',
		'#9933CC',
		'#9933FF',
		'#99CC00',
		'#99CC33',
		'#CC0000',
		'#CC0033',
		'#CC0066',
		'#CC0099',
		'#CC00CC',
		'#CC00FF',
		'#CC3300',
		'#CC3333',
		'#CC3366',
		'#CC3399',
		'#CC33CC',
		'#CC33FF',
		'#CC6600',
		'#CC6633',
		'#CC9900',
		'#CC9933',
		'#CCCC00',
		'#CCCC33',
		'#FF0000',
		'#FF0033',
		'#FF0066',
		'#FF0099',
		'#FF00CC',
		'#FF00FF',
		'#FF3300',
		'#FF3333',
		'#FF3366',
		'#FF3399',
		'#FF33CC',
		'#FF33FF',
		'#FF6600',
		'#FF6633',
		'#FF9900',
		'#FF9933',
		'#FFCC00',
		'#FFCC33'
	];

	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */

	// eslint-disable-next-line complexity
	function useColors() {
		// NB: In an Electron preload script, document will be defined but not fully
		// initialized. Since we know we're in Chrome, we'll just detect this case
		// explicitly
		if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
			return true;
		}

		// Internet Explorer and Edge do not support colors.
		if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
			return false;
		}

		// Is webkit? http://stackoverflow.com/a/16459606/376773
		// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
		return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
			// Is firebug? http://stackoverflow.com/a/398120/376773
			(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
			// Is firefox >= v31?
			// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
			(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
			// Double check webkit in userAgent just in case we are in a worker
			(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
	}

	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */

	function formatArgs(args) {
		args[0] = (this.useColors ? '%c' : '') +
			this.namespace +
			(this.useColors ? ' %c' : ' ') +
			args[0] +
			(this.useColors ? '%c ' : ' ') +
			'+' + module.exports.humanize(this.diff);

		if (!this.useColors) {
			return;
		}

		const c = 'color: ' + this.color;
		args.splice(1, 0, c, 'color: inherit');

		// The final "%c" is somewhat tricky, because there could be other
		// arguments passed either before or after the %c, so we need to
		// figure out the correct index to insert the CSS into
		let index = 0;
		let lastC = 0;
		args[0].replace(/%[a-zA-Z%]/g, match => {
			if (match === '%%') {
				return;
			}
			index++;
			if (match === '%c') {
				// We only are interested in the *last* %c
				// (the user may have provided their own)
				lastC = index;
			}
		});

		args.splice(lastC, 0, c);
	}

	/**
	 * Invokes `console.debug()` when available.
	 * No-op when `console.debug` is not a "function".
	 * If `console.debug` is not available, falls back
	 * to `console.log`.
	 *
	 * @api public
	 */
	exports.log = console.debug || console.log || (() => {});

	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */
	function save(namespaces) {
		try {
			if (namespaces) {
				exports.storage.setItem('debug', namespaces);
			} else {
				exports.storage.removeItem('debug');
			}
		} catch (error) {
			// Swallow
			// XXX (@Qix-) should we be logging these?
		}
	}

	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */
	function load() {
		let r;
		try {
			r = exports.storage.getItem('debug');
		} catch (error) {
			// Swallow
			// XXX (@Qix-) should we be logging these?
		}

		// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
		if (!r && typeof process !== 'undefined' && 'env' in process) {
			r = process.env.DEBUG;
		}

		return r;
	}

	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */

	function localstorage() {
		try {
			// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
			// The Browser also has localStorage in the global context.
			return localStorage;
		} catch (error) {
			// Swallow
			// XXX (@Qix-) should we be logging these?
		}
	}

	module.exports = common(exports);

	const {formatters} = module.exports;

	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */

	formatters.j = function (v) {
		try {
			return JSON.stringify(v);
		} catch (error) {
			return '[UnexpectedJSONParseError]: ' + error.message;
		}
	};
	});
	browser.formatArgs;
	browser.save;
	browser.load;
	browser.useColors;
	browser.storage;
	browser.destroy;
	browser.colors;
	browser.log;

	var hasFlag = (flag, argv = process.argv) => {
		const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
		const position = argv.indexOf(prefix + flag);
		const terminatorPosition = argv.indexOf('--');
		return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
	};

	const {env} = process;

	let forceColor;
	if (hasFlag('no-color') ||
		hasFlag('no-colors') ||
		hasFlag('color=false') ||
		hasFlag('color=never')) {
		forceColor = 0;
	} else if (hasFlag('color') ||
		hasFlag('colors') ||
		hasFlag('color=true') ||
		hasFlag('color=always')) {
		forceColor = 1;
	}

	if ('FORCE_COLOR' in env) {
		if (env.FORCE_COLOR === 'true') {
			forceColor = 1;
		} else if (env.FORCE_COLOR === 'false') {
			forceColor = 0;
		} else {
			forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
		}
	}

	function translateLevel(level) {
		if (level === 0) {
			return false;
		}

		return {
			level,
			hasBasic: true,
			has256: level >= 2,
			has16m: level >= 3
		};
	}

	function supportsColor(haveStream, streamIsTTY) {
		if (forceColor === 0) {
			return 0;
		}

		if (hasFlag('color=16m') ||
			hasFlag('color=full') ||
			hasFlag('color=truecolor')) {
			return 3;
		}

		if (hasFlag('color=256')) {
			return 2;
		}

		if (haveStream && !streamIsTTY && forceColor === undefined) {
			return 0;
		}

		const min = forceColor || 0;

		if (env.TERM === 'dumb') {
			return min;
		}

		if (process.platform === 'win32') {
			// Windows 10 build 10586 is the first Windows release that supports 256 colors.
			// Windows 10 build 14931 is the first release that supports 16m/TrueColor.
			const osRelease = os__default["default"].release().split('.');
			if (
				Number(osRelease[0]) >= 10 &&
				Number(osRelease[2]) >= 10586
			) {
				return Number(osRelease[2]) >= 14931 ? 3 : 2;
			}

			return 1;
		}

		if ('CI' in env) {
			if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI', 'GITHUB_ACTIONS', 'BUILDKITE'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
				return 1;
			}

			return min;
		}

		if ('TEAMCITY_VERSION' in env) {
			return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
		}

		if (env.COLORTERM === 'truecolor') {
			return 3;
		}

		if ('TERM_PROGRAM' in env) {
			const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

			switch (env.TERM_PROGRAM) {
				case 'iTerm.app':
					return version >= 3 ? 3 : 2;
				case 'Apple_Terminal':
					return 2;
				// No default
			}
		}

		if (/-256(color)?$/i.test(env.TERM)) {
			return 2;
		}

		if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
			return 1;
		}

		if ('COLORTERM' in env) {
			return 1;
		}

		return min;
	}

	function getSupportLevel(stream) {
		const level = supportsColor(stream, stream && stream.isTTY);
		return translateLevel(level);
	}

	var supportsColor_1 = {
		supportsColor: getSupportLevel,
		stdout: translateLevel(supportsColor(true, tty__default["default"].isatty(1))),
		stderr: translateLevel(supportsColor(true, tty__default["default"].isatty(2)))
	};
	supportsColor_1.supportsColor;
	supportsColor_1.stdout;
	supportsColor_1.stderr;

	var node = createCommonjsModule(function (module, exports) {
	/**
	 * Module dependencies.
	 */




	/**
	 * This is the Node.js implementation of `debug()`.
	 */

	exports.init = init;
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.destroy = util__default["default"].deprecate(
		() => {},
		'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
	);

	/**
	 * Colors.
	 */

	exports.colors = [6, 2, 3, 4, 5, 1];

	try {
		// Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
		// eslint-disable-next-line import/no-extraneous-dependencies
		const supportsColor = supportsColor_1;

		if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
			exports.colors = [
				20,
				21,
				26,
				27,
				32,
				33,
				38,
				39,
				40,
				41,
				42,
				43,
				44,
				45,
				56,
				57,
				62,
				63,
				68,
				69,
				74,
				75,
				76,
				77,
				78,
				79,
				80,
				81,
				92,
				93,
				98,
				99,
				112,
				113,
				128,
				129,
				134,
				135,
				148,
				149,
				160,
				161,
				162,
				163,
				164,
				165,
				166,
				167,
				168,
				169,
				170,
				171,
				172,
				173,
				178,
				179,
				184,
				185,
				196,
				197,
				198,
				199,
				200,
				201,
				202,
				203,
				204,
				205,
				206,
				207,
				208,
				209,
				214,
				215,
				220,
				221
			];
		}
	} catch (error) {
		// Swallow - we only care if `supports-color` is available; it doesn't have to be.
	}

	/**
	 * Build up the default `inspectOpts` object from the environment variables.
	 *
	 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
	 */

	exports.inspectOpts = Object.keys(process.env).filter(key => {
		return /^debug_/i.test(key);
	}).reduce((obj, key) => {
		// Camel-case
		const prop = key
			.substring(6)
			.toLowerCase()
			.replace(/_([a-z])/g, (_, k) => {
				return k.toUpperCase();
			});

		// Coerce string value into JS value
		let val = process.env[key];
		if (/^(yes|on|true|enabled)$/i.test(val)) {
			val = true;
		} else if (/^(no|off|false|disabled)$/i.test(val)) {
			val = false;
		} else if (val === 'null') {
			val = null;
		} else {
			val = Number(val);
		}

		obj[prop] = val;
		return obj;
	}, {});

	/**
	 * Is stdout a TTY? Colored output is enabled when `true`.
	 */

	function useColors() {
		return 'colors' in exports.inspectOpts ?
			Boolean(exports.inspectOpts.colors) :
			tty__default["default"].isatty(process.stderr.fd);
	}

	/**
	 * Adds ANSI color escape codes if enabled.
	 *
	 * @api public
	 */

	function formatArgs(args) {
		const {namespace: name, useColors} = this;

		if (useColors) {
			const c = this.color;
			const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
			const prefix = `  ${colorCode};1m${name} \u001B[0m`;

			args[0] = prefix + args[0].split('\n').join('\n' + prefix);
			args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
		} else {
			args[0] = getDate() + name + ' ' + args[0];
		}
	}

	function getDate() {
		if (exports.inspectOpts.hideDate) {
			return '';
		}
		return new Date().toISOString() + ' ';
	}

	/**
	 * Invokes `util.format()` with the specified arguments and writes to stderr.
	 */

	function log(...args) {
		return process.stderr.write(util__default["default"].format(...args) + '\n');
	}

	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */
	function save(namespaces) {
		if (namespaces) {
			process.env.DEBUG = namespaces;
		} else {
			// If you set a process.env field to null or undefined, it gets cast to the
			// string 'null' or 'undefined'. Just delete instead.
			delete process.env.DEBUG;
		}
	}

	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */

	function load() {
		return process.env.DEBUG;
	}

	/**
	 * Init logic for `debug` instances.
	 *
	 * Create a new `inspectOpts` object in case `useColors` is set
	 * differently for a particular `debug` instance.
	 */

	function init(debug) {
		debug.inspectOpts = {};

		const keys = Object.keys(exports.inspectOpts);
		for (let i = 0; i < keys.length; i++) {
			debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
		}
	}

	module.exports = common(exports);

	const {formatters} = module.exports;

	/**
	 * Map %o to `util.inspect()`, all on a single line.
	 */

	formatters.o = function (v) {
		this.inspectOpts.colors = this.useColors;
		return util__default["default"].inspect(v, this.inspectOpts)
			.split('\n')
			.map(str => str.trim())
			.join(' ');
	};

	/**
	 * Map %O to `util.inspect()`, allowing multiple lines if needed.
	 */

	formatters.O = function (v) {
		this.inspectOpts.colors = this.useColors;
		return util__default["default"].inspect(v, this.inspectOpts);
	};
	});
	node.init;
	node.log;
	node.formatArgs;
	node.save;
	node.load;
	node.useColors;
	node.destroy;
	node.colors;
	node.inspectOpts;

	var src = createCommonjsModule(function (module) {
	/**
	 * Detect Electron renderer / nwjs process, which is node, but we should
	 * treat as a browser.
	 */

	if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
		module.exports = browser;
	} else {
		module.exports = node;
	}
	});

	var debug;

	var debug_1 = function () {
	  if (!debug) {
	    try {
	      /* eslint global-require: off */
	      debug = src("follow-redirects");
	    }
	    catch (error) { /* */ }
	    if (typeof debug !== "function") {
	      debug = function () { /* */ };
	    }
	  }
	  debug.apply(null, arguments);
	};

	var URL = url__default["default"].URL;


	var Writable = stream__default["default"].Writable;



	// Create handlers that pass events from native requests
	var events = ["abort", "aborted", "connect", "error", "socket", "timeout"];
	var eventHandlers = Object.create(null);
	events.forEach(function (event) {
	  eventHandlers[event] = function (arg1, arg2, arg3) {
	    this._redirectable.emit(event, arg1, arg2, arg3);
	  };
	});

	// Error types with codes
	var RedirectionError = createErrorType(
	  "ERR_FR_REDIRECTION_FAILURE",
	  "Redirected request failed"
	);
	var TooManyRedirectsError = createErrorType(
	  "ERR_FR_TOO_MANY_REDIRECTS",
	  "Maximum number of redirects exceeded"
	);
	var MaxBodyLengthExceededError = createErrorType(
	  "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
	  "Request body larger than maxBodyLength limit"
	);
	var WriteAfterEndError = createErrorType(
	  "ERR_STREAM_WRITE_AFTER_END",
	  "write after end"
	);

	// An HTTP(S) request that can be redirected
	function RedirectableRequest(options, responseCallback) {
	  // Initialize the request
	  Writable.call(this);
	  this._sanitizeOptions(options);
	  this._options = options;
	  this._ended = false;
	  this._ending = false;
	  this._redirectCount = 0;
	  this._redirects = [];
	  this._requestBodyLength = 0;
	  this._requestBodyBuffers = [];

	  // Attach a callback if passed
	  if (responseCallback) {
	    this.on("response", responseCallback);
	  }

	  // React to responses of native requests
	  var self = this;
	  this._onNativeResponse = function (response) {
	    self._processResponse(response);
	  };

	  // Perform the first request
	  this._performRequest();
	}
	RedirectableRequest.prototype = Object.create(Writable.prototype);

	RedirectableRequest.prototype.abort = function () {
	  abortRequest(this._currentRequest);
	  this.emit("abort");
	};

	// Writes buffered data to the current native request
	RedirectableRequest.prototype.write = function (data, encoding, callback) {
	  // Writing is not allowed if end has been called
	  if (this._ending) {
	    throw new WriteAfterEndError();
	  }

	  // Validate input and shift parameters if necessary
	  if (!(typeof data === "string" || typeof data === "object" && ("length" in data))) {
	    throw new TypeError("data should be a string, Buffer or Uint8Array");
	  }
	  if (typeof encoding === "function") {
	    callback = encoding;
	    encoding = null;
	  }

	  // Ignore empty buffers, since writing them doesn't invoke the callback
	  // https://github.com/nodejs/node/issues/22066
	  if (data.length === 0) {
	    if (callback) {
	      callback();
	    }
	    return;
	  }
	  // Only write when we don't exceed the maximum body length
	  if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
	    this._requestBodyLength += data.length;
	    this._requestBodyBuffers.push({ data: data, encoding: encoding });
	    this._currentRequest.write(data, encoding, callback);
	  }
	  // Error when we exceed the maximum body length
	  else {
	    this.emit("error", new MaxBodyLengthExceededError());
	    this.abort();
	  }
	};

	// Ends the current native request
	RedirectableRequest.prototype.end = function (data, encoding, callback) {
	  // Shift parameters if necessary
	  if (typeof data === "function") {
	    callback = data;
	    data = encoding = null;
	  }
	  else if (typeof encoding === "function") {
	    callback = encoding;
	    encoding = null;
	  }

	  // Write data if needed and end
	  if (!data) {
	    this._ended = this._ending = true;
	    this._currentRequest.end(null, null, callback);
	  }
	  else {
	    var self = this;
	    var currentRequest = this._currentRequest;
	    this.write(data, encoding, function () {
	      self._ended = true;
	      currentRequest.end(null, null, callback);
	    });
	    this._ending = true;
	  }
	};

	// Sets a header value on the current native request
	RedirectableRequest.prototype.setHeader = function (name, value) {
	  this._options.headers[name] = value;
	  this._currentRequest.setHeader(name, value);
	};

	// Clears a header value on the current native request
	RedirectableRequest.prototype.removeHeader = function (name) {
	  delete this._options.headers[name];
	  this._currentRequest.removeHeader(name);
	};

	// Global timeout for all underlying requests
	RedirectableRequest.prototype.setTimeout = function (msecs, callback) {
	  var self = this;

	  // Destroys the socket on timeout
	  function destroyOnTimeout(socket) {
	    socket.setTimeout(msecs);
	    socket.removeListener("timeout", socket.destroy);
	    socket.addListener("timeout", socket.destroy);
	  }

	  // Sets up a timer to trigger a timeout event
	  function startTimer(socket) {
	    if (self._timeout) {
	      clearTimeout(self._timeout);
	    }
	    self._timeout = setTimeout(function () {
	      self.emit("timeout");
	      clearTimer();
	    }, msecs);
	    destroyOnTimeout(socket);
	  }

	  // Stops a timeout from triggering
	  function clearTimer() {
	    // Clear the timeout
	    if (self._timeout) {
	      clearTimeout(self._timeout);
	      self._timeout = null;
	    }

	    // Clean up all attached listeners
	    self.removeListener("abort", clearTimer);
	    self.removeListener("error", clearTimer);
	    self.removeListener("response", clearTimer);
	    if (callback) {
	      self.removeListener("timeout", callback);
	    }
	    if (!self.socket) {
	      self._currentRequest.removeListener("socket", startTimer);
	    }
	  }

	  // Attach callback if passed
	  if (callback) {
	    this.on("timeout", callback);
	  }

	  // Start the timer if or when the socket is opened
	  if (this.socket) {
	    startTimer(this.socket);
	  }
	  else {
	    this._currentRequest.once("socket", startTimer);
	  }

	  // Clean up on events
	  this.on("socket", destroyOnTimeout);
	  this.on("abort", clearTimer);
	  this.on("error", clearTimer);
	  this.on("response", clearTimer);

	  return this;
	};

	// Proxy all other public ClientRequest methods
	[
	  "flushHeaders", "getHeader",
	  "setNoDelay", "setSocketKeepAlive",
	].forEach(function (method) {
	  RedirectableRequest.prototype[method] = function (a, b) {
	    return this._currentRequest[method](a, b);
	  };
	});

	// Proxy all public ClientRequest properties
	["aborted", "connection", "socket"].forEach(function (property) {
	  Object.defineProperty(RedirectableRequest.prototype, property, {
	    get: function () { return this._currentRequest[property]; },
	  });
	});

	RedirectableRequest.prototype._sanitizeOptions = function (options) {
	  // Ensure headers are always present
	  if (!options.headers) {
	    options.headers = {};
	  }

	  // Since http.request treats host as an alias of hostname,
	  // but the url module interprets host as hostname plus port,
	  // eliminate the host property to avoid confusion.
	  if (options.host) {
	    // Use hostname if set, because it has precedence
	    if (!options.hostname) {
	      options.hostname = options.host;
	    }
	    delete options.host;
	  }

	  // Complete the URL object when necessary
	  if (!options.pathname && options.path) {
	    var searchPos = options.path.indexOf("?");
	    if (searchPos < 0) {
	      options.pathname = options.path;
	    }
	    else {
	      options.pathname = options.path.substring(0, searchPos);
	      options.search = options.path.substring(searchPos);
	    }
	  }
	};


	// Executes the next native request (initial or redirect)
	RedirectableRequest.prototype._performRequest = function () {
	  // Load the native protocol
	  var protocol = this._options.protocol;
	  var nativeProtocol = this._options.nativeProtocols[protocol];
	  if (!nativeProtocol) {
	    this.emit("error", new TypeError("Unsupported protocol " + protocol));
	    return;
	  }

	  // If specified, use the agent corresponding to the protocol
	  // (HTTP and HTTPS use different types of agents)
	  if (this._options.agents) {
	    var scheme = protocol.substr(0, protocol.length - 1);
	    this._options.agent = this._options.agents[scheme];
	  }

	  // Create the native request
	  var request = this._currentRequest =
	        nativeProtocol.request(this._options, this._onNativeResponse);
	  this._currentUrl = url__default["default"].format(this._options);

	  // Set up event handlers
	  request._redirectable = this;
	  for (var e = 0; e < events.length; e++) {
	    request.on(events[e], eventHandlers[events[e]]);
	  }

	  // End a redirected request
	  // (The first request must be ended explicitly with RedirectableRequest#end)
	  if (this._isRedirect) {
	    // Write the request entity and end.
	    var i = 0;
	    var self = this;
	    var buffers = this._requestBodyBuffers;
	    (function writeNext(error) {
	      // Only write if this request has not been redirected yet
	      /* istanbul ignore else */
	      if (request === self._currentRequest) {
	        // Report any write errors
	        /* istanbul ignore if */
	        if (error) {
	          self.emit("error", error);
	        }
	        // Write the next buffer if there are still left
	        else if (i < buffers.length) {
	          var buffer = buffers[i++];
	          /* istanbul ignore else */
	          if (!request.finished) {
	            request.write(buffer.data, buffer.encoding, writeNext);
	          }
	        }
	        // End the request if `end` has been called on us
	        else if (self._ended) {
	          request.end();
	        }
	      }
	    }());
	  }
	};

	// Processes a response from the current native request
	RedirectableRequest.prototype._processResponse = function (response) {
	  // Store the redirected response
	  var statusCode = response.statusCode;
	  if (this._options.trackRedirects) {
	    this._redirects.push({
	      url: this._currentUrl,
	      headers: response.headers,
	      statusCode: statusCode,
	    });
	  }

	  // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
	  // that further action needs to be taken by the user agent in order to
	  // fulfill the request. If a Location header field is provided,
	  // the user agent MAY automatically redirect its request to the URI
	  // referenced by the Location field value,
	  // even if the specific status code is not understood.
	  var location = response.headers.location;
	  if (location && this._options.followRedirects !== false &&
	      statusCode >= 300 && statusCode < 400) {
	    // Abort the current request
	    abortRequest(this._currentRequest);
	    // Discard the remainder of the response to avoid waiting for data
	    response.destroy();

	    // RFC7231§6.4: A client SHOULD detect and intervene
	    // in cyclical redirections (i.e., "infinite" redirection loops).
	    if (++this._redirectCount > this._options.maxRedirects) {
	      this.emit("error", new TooManyRedirectsError());
	      return;
	    }

	    // RFC7231§6.4: Automatic redirection needs to done with
	    // care for methods not known to be safe, […]
	    // RFC7231§6.4.2–3: For historical reasons, a user agent MAY change
	    // the request method from POST to GET for the subsequent request.
	    if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" ||
	        // RFC7231§6.4.4: The 303 (See Other) status code indicates that
	        // the server is redirecting the user agent to a different resource […]
	        // A user agent can perform a retrieval request targeting that URI
	        // (a GET or HEAD request if using HTTP) […]
	        (statusCode === 303) && !/^(?:GET|HEAD)$/.test(this._options.method)) {
	      this._options.method = "GET";
	      // Drop a possible entity and headers related to it
	      this._requestBodyBuffers = [];
	      removeMatchingHeaders(/^content-/i, this._options.headers);
	    }

	    // Drop the Host header, as the redirect might lead to a different host
	    var currentHostHeader = removeMatchingHeaders(/^host$/i, this._options.headers);

	    // If the redirect is relative, carry over the host of the last request
	    var currentUrlParts = url__default["default"].parse(this._currentUrl);
	    var currentHost = currentHostHeader || currentUrlParts.host;
	    var currentUrl = /^\w+:/.test(location) ? this._currentUrl :
	      url__default["default"].format(Object.assign(currentUrlParts, { host: currentHost }));

	    // Determine the URL of the redirection
	    var redirectUrl;
	    try {
	      redirectUrl = url__default["default"].resolve(currentUrl, location);
	    }
	    catch (cause) {
	      this.emit("error", new RedirectionError(cause));
	      return;
	    }

	    // Create the redirected request
	    debug_1("redirecting to", redirectUrl);
	    this._isRedirect = true;
	    var redirectUrlParts = url__default["default"].parse(redirectUrl);
	    Object.assign(this._options, redirectUrlParts);

	    // Drop the Authorization header if redirecting to another domain
	    if (!(redirectUrlParts.host === currentHost || isSubdomainOf(redirectUrlParts.host, currentHost))) {
	      removeMatchingHeaders(/^authorization$/i, this._options.headers);
	    }

	    // Evaluate the beforeRedirect callback
	    if (typeof this._options.beforeRedirect === "function") {
	      var responseDetails = { headers: response.headers };
	      try {
	        this._options.beforeRedirect.call(null, this._options, responseDetails);
	      }
	      catch (err) {
	        this.emit("error", err);
	        return;
	      }
	      this._sanitizeOptions(this._options);
	    }

	    // Perform the redirected request
	    try {
	      this._performRequest();
	    }
	    catch (cause) {
	      this.emit("error", new RedirectionError(cause));
	    }
	  }
	  else {
	    // The response is not a redirect; return it as-is
	    response.responseUrl = this._currentUrl;
	    response.redirects = this._redirects;
	    this.emit("response", response);

	    // Clean up
	    this._requestBodyBuffers = [];
	  }
	};

	// Wraps the key/value object of protocols with redirect functionality
	function wrap(protocols) {
	  // Default settings
	  var exports = {
	    maxRedirects: 21,
	    maxBodyLength: 10 * 1024 * 1024,
	  };

	  // Wrap each protocol
	  var nativeProtocols = {};
	  Object.keys(protocols).forEach(function (scheme) {
	    var protocol = scheme + ":";
	    var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
	    var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);

	    // Executes a request, following redirects
	    function request(input, options, callback) {
	      // Parse parameters
	      if (typeof input === "string") {
	        var urlStr = input;
	        try {
	          input = urlToOptions(new URL(urlStr));
	        }
	        catch (err) {
	          /* istanbul ignore next */
	          input = url__default["default"].parse(urlStr);
	        }
	      }
	      else if (URL && (input instanceof URL)) {
	        input = urlToOptions(input);
	      }
	      else {
	        callback = options;
	        options = input;
	        input = { protocol: protocol };
	      }
	      if (typeof options === "function") {
	        callback = options;
	        options = null;
	      }

	      // Set defaults
	      options = Object.assign({
	        maxRedirects: exports.maxRedirects,
	        maxBodyLength: exports.maxBodyLength,
	      }, input, options);
	      options.nativeProtocols = nativeProtocols;

	      assert__default["default"].equal(options.protocol, protocol, "protocol mismatch");
	      debug_1("options", options);
	      return new RedirectableRequest(options, callback);
	    }

	    // Executes a GET request, following redirects
	    function get(input, options, callback) {
	      var wrappedRequest = wrappedProtocol.request(input, options, callback);
	      wrappedRequest.end();
	      return wrappedRequest;
	    }

	    // Expose the properties on the wrapped protocol
	    Object.defineProperties(wrappedProtocol, {
	      request: { value: request, configurable: true, enumerable: true, writable: true },
	      get: { value: get, configurable: true, enumerable: true, writable: true },
	    });
	  });
	  return exports;
	}

	/* istanbul ignore next */
	function noop() { /* empty */ }

	// from https://github.com/nodejs/node/blob/master/lib/internal/url.js
	function urlToOptions(urlObject) {
	  var options = {
	    protocol: urlObject.protocol,
	    hostname: urlObject.hostname.startsWith("[") ?
	      /* istanbul ignore next */
	      urlObject.hostname.slice(1, -1) :
	      urlObject.hostname,
	    hash: urlObject.hash,
	    search: urlObject.search,
	    pathname: urlObject.pathname,
	    path: urlObject.pathname + urlObject.search,
	    href: urlObject.href,
	  };
	  if (urlObject.port !== "") {
	    options.port = Number(urlObject.port);
	  }
	  return options;
	}

	function removeMatchingHeaders(regex, headers) {
	  var lastValue;
	  for (var header in headers) {
	    if (regex.test(header)) {
	      lastValue = headers[header];
	      delete headers[header];
	    }
	  }
	  return (lastValue === null || typeof lastValue === "undefined") ?
	    undefined : String(lastValue).trim();
	}

	function createErrorType(code, defaultMessage) {
	  function CustomError(cause) {
	    Error.captureStackTrace(this, this.constructor);
	    if (!cause) {
	      this.message = defaultMessage;
	    }
	    else {
	      this.message = defaultMessage + ": " + cause.message;
	      this.cause = cause;
	    }
	  }
	  CustomError.prototype = new Error();
	  CustomError.prototype.constructor = CustomError;
	  CustomError.prototype.name = "Error [" + code + "]";
	  CustomError.prototype.code = code;
	  return CustomError;
	}

	function abortRequest(request) {
	  for (var e = 0; e < events.length; e++) {
	    request.removeListener(events[e], eventHandlers[events[e]]);
	  }
	  request.on("error", noop);
	  request.abort();
	}

	function isSubdomainOf(subdomain, domain) {
	  const dot = subdomain.length - domain.length - 1;
	  return dot > 0 && subdomain[dot] === "." && subdomain.endsWith(domain);
	}

	// Exports
	var followRedirects = wrap({ http: http__default["default"], https: https__default["default"] });
	var wrap_1 = wrap;
	followRedirects.wrap = wrap_1;

	var data = {
	  "version": "0.24.0"
	};

	var httpFollow = followRedirects.http;
	var httpsFollow = followRedirects.https;


	var VERSION$1 = data.version;





	var isHttps = /https:?/;

	/**
	 *
	 * @param {http.ClientRequestArgs} options
	 * @param {AxiosProxyConfig} proxy
	 * @param {string} location
	 */
	function setProxy(options, proxy, location) {
	  options.hostname = proxy.host;
	  options.host = proxy.host;
	  options.port = proxy.port;
	  options.path = location;

	  // Basic proxy authorization
	  if (proxy.auth) {
	    var base64 = Buffer.from(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
	    options.headers['Proxy-Authorization'] = 'Basic ' + base64;
	  }

	  // If a proxy is used, any redirects must also pass through the proxy
	  options.beforeRedirect = function beforeRedirect(redirection) {
	    redirection.headers.host = redirection.host;
	    setProxy(redirection, proxy, redirection.href);
	  };
	}

	/*eslint consistent-return:0*/
	var http_1 = function httpAdapter(config) {
	  return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
	    var onCanceled;
	    function done() {
	      if (config.cancelToken) {
	        config.cancelToken.unsubscribe(onCanceled);
	      }

	      if (config.signal) {
	        config.signal.removeEventListener('abort', onCanceled);
	      }
	    }
	    var resolve = function resolve(value) {
	      done();
	      resolvePromise(value);
	    };
	    var reject = function reject(value) {
	      done();
	      rejectPromise(value);
	    };
	    var data = config.data;
	    var headers = config.headers;
	    var headerNames = {};

	    Object.keys(headers).forEach(function storeLowerName(name) {
	      headerNames[name.toLowerCase()] = name;
	    });

	    // Set User-Agent (required by some servers)
	    // See https://github.com/axios/axios/issues/69
	    if ('user-agent' in headerNames) {
	      // User-Agent is specified; handle case where no UA header is desired
	      if (!headers[headerNames['user-agent']]) {
	        delete headers[headerNames['user-agent']];
	      }
	      // Otherwise, use specified value
	    } else {
	      // Only set header if it hasn't been set in config
	      headers['User-Agent'] = 'axios/' + VERSION$1;
	    }

	    if (data && !utils.isStream(data)) {
	      if (Buffer.isBuffer(data)) ; else if (utils.isArrayBuffer(data)) {
	        data = Buffer.from(new Uint8Array(data));
	      } else if (utils.isString(data)) {
	        data = Buffer.from(data, 'utf-8');
	      } else {
	        return reject(createError(
	          'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
	          config
	        ));
	      }

	      // Add Content-Length header if data exists
	      if (!headerNames['content-length']) {
	        headers['Content-Length'] = data.length;
	      }
	    }

	    // HTTP basic authentication
	    var auth = undefined;
	    if (config.auth) {
	      var username = config.auth.username || '';
	      var password = config.auth.password || '';
	      auth = username + ':' + password;
	    }

	    // Parse url
	    var fullPath = buildFullPath(config.baseURL, config.url);
	    var parsed = url__default["default"].parse(fullPath);
	    var protocol = parsed.protocol || 'http:';

	    if (!auth && parsed.auth) {
	      var urlAuth = parsed.auth.split(':');
	      var urlUsername = urlAuth[0] || '';
	      var urlPassword = urlAuth[1] || '';
	      auth = urlUsername + ':' + urlPassword;
	    }

	    if (auth && headerNames.authorization) {
	      delete headers[headerNames.authorization];
	    }

	    var isHttpsRequest = isHttps.test(protocol);
	    var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;

	    var options = {
	      path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
	      method: config.method.toUpperCase(),
	      headers: headers,
	      agent: agent,
	      agents: { http: config.httpAgent, https: config.httpsAgent },
	      auth: auth
	    };

	    if (config.socketPath) {
	      options.socketPath = config.socketPath;
	    } else {
	      options.hostname = parsed.hostname;
	      options.port = parsed.port;
	    }

	    var proxy = config.proxy;
	    if (!proxy && proxy !== false) {
	      var proxyEnv = protocol.slice(0, -1) + '_proxy';
	      var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
	      if (proxyUrl) {
	        var parsedProxyUrl = url__default["default"].parse(proxyUrl);
	        var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
	        var shouldProxy = true;

	        if (noProxyEnv) {
	          var noProxy = noProxyEnv.split(',').map(function trim(s) {
	            return s.trim();
	          });

	          shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
	            if (!proxyElement) {
	              return false;
	            }
	            if (proxyElement === '*') {
	              return true;
	            }
	            if (proxyElement[0] === '.' &&
	                parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
	              return true;
	            }

	            return parsed.hostname === proxyElement;
	          });
	        }

	        if (shouldProxy) {
	          proxy = {
	            host: parsedProxyUrl.hostname,
	            port: parsedProxyUrl.port,
	            protocol: parsedProxyUrl.protocol
	          };

	          if (parsedProxyUrl.auth) {
	            var proxyUrlAuth = parsedProxyUrl.auth.split(':');
	            proxy.auth = {
	              username: proxyUrlAuth[0],
	              password: proxyUrlAuth[1]
	            };
	          }
	        }
	      }
	    }

	    if (proxy) {
	      options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
	      setProxy(options, proxy, protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path);
	    }

	    var transport;
	    var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
	    if (config.transport) {
	      transport = config.transport;
	    } else if (config.maxRedirects === 0) {
	      transport = isHttpsProxy ? https__default["default"] : http__default["default"];
	    } else {
	      if (config.maxRedirects) {
	        options.maxRedirects = config.maxRedirects;
	      }
	      transport = isHttpsProxy ? httpsFollow : httpFollow;
	    }

	    if (config.maxBodyLength > -1) {
	      options.maxBodyLength = config.maxBodyLength;
	    }

	    if (config.insecureHTTPParser) {
	      options.insecureHTTPParser = config.insecureHTTPParser;
	    }

	    // Create the request
	    var req = transport.request(options, function handleResponse(res) {
	      if (req.aborted) return;

	      // uncompress the response body transparently if required
	      var stream = res;

	      // return the last request in case of redirects
	      var lastRequest = res.req || req;


	      // if no content, is HEAD request or decompress disabled we should not decompress
	      if (res.statusCode !== 204 && lastRequest.method !== 'HEAD' && config.decompress !== false) {
	        switch (res.headers['content-encoding']) {
	        /*eslint default-case:0*/
	        case 'gzip':
	        case 'compress':
	        case 'deflate':
	        // add the unzipper to the body stream processing pipeline
	          stream = stream.pipe(zlib__default["default"].createUnzip());

	          // remove the content-encoding in order to not confuse downstream operations
	          delete res.headers['content-encoding'];
	          break;
	        }
	      }

	      var response = {
	        status: res.statusCode,
	        statusText: res.statusMessage,
	        headers: res.headers,
	        config: config,
	        request: lastRequest
	      };

	      if (config.responseType === 'stream') {
	        response.data = stream;
	        settle(resolve, reject, response);
	      } else {
	        var responseBuffer = [];
	        var totalResponseBytes = 0;
	        stream.on('data', function handleStreamData(chunk) {
	          responseBuffer.push(chunk);
	          totalResponseBytes += chunk.length;

	          // make sure the content length is not over the maxContentLength if specified
	          if (config.maxContentLength > -1 && totalResponseBytes > config.maxContentLength) {
	            stream.destroy();
	            reject(createError('maxContentLength size of ' + config.maxContentLength + ' exceeded',
	              config, null, lastRequest));
	          }
	        });

	        stream.on('error', function handleStreamError(err) {
	          if (req.aborted) return;
	          reject(enhanceError(err, config, null, lastRequest));
	        });

	        stream.on('end', function handleStreamEnd() {
	          var responseData = Buffer.concat(responseBuffer);
	          if (config.responseType !== 'arraybuffer') {
	            responseData = responseData.toString(config.responseEncoding);
	            if (!config.responseEncoding || config.responseEncoding === 'utf8') {
	              responseData = utils.stripBOM(responseData);
	            }
	          }

	          response.data = responseData;
	          settle(resolve, reject, response);
	        });
	      }
	    });

	    // Handle errors
	    req.on('error', function handleRequestError(err) {
	      if (req.aborted && err.code !== 'ERR_FR_TOO_MANY_REDIRECTS') return;
	      reject(enhanceError(err, config, null, req));
	    });

	    // Handle request timeout
	    if (config.timeout) {
	      // This is forcing a int timeout to avoid problems if the `req` interface doesn't handle other types.
	      var timeout = parseInt(config.timeout, 10);

	      if (isNaN(timeout)) {
	        reject(createError(
	          'error trying to parse `config.timeout` to int',
	          config,
	          'ERR_PARSE_TIMEOUT',
	          req
	        ));

	        return;
	      }

	      // Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.
	      // And timer callback will be fired, and abort() will be invoked before connection, then get "socket hang up" and code ECONNRESET.
	      // At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.
	      // And then these socket which be hang up will devoring CPU little by little.
	      // ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.
	      req.setTimeout(timeout, function handleRequestTimeout() {
	        req.abort();
	        var transitional = config.transitional || defaults$1.transitional;
	        reject(createError(
	          'timeout of ' + timeout + 'ms exceeded',
	          config,
	          transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
	          req
	        ));
	      });
	    }

	    if (config.cancelToken || config.signal) {
	      // Handle cancellation
	      // eslint-disable-next-line func-names
	      onCanceled = function(cancel) {
	        if (req.aborted) return;

	        req.abort();
	        reject(!cancel || (cancel && cancel.type) ? new Cancel_1('canceled') : cancel);
	      };

	      config.cancelToken && config.cancelToken.subscribe(onCanceled);
	      if (config.signal) {
	        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
	      }
	    }


	    // Send the request
	    if (utils.isStream(data)) {
	      data.on('error', function handleStreamError(err) {
	        reject(enhanceError(err, config, null, req));
	      }).pipe(req);
	    } else {
	      req.end(data);
	    }
	  });
	};

	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};

	function setContentTypeIfUnset(headers, value) {
	  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}

	function getDefaultAdapter() {
	  var adapter;
	  if (typeof XMLHttpRequest !== 'undefined') {
	    // For browsers use XHR adapter
	    adapter = xhr;
	  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
	    // For node use HTTP adapter
	    adapter = http_1;
	  }
	  return adapter;
	}

	function stringifySafely(rawValue, parser, encoder) {
	  if (utils.isString(rawValue)) {
	    try {
	      (parser || JSON.parse)(rawValue);
	      return utils.trim(rawValue);
	    } catch (e) {
	      if (e.name !== 'SyntaxError') {
	        throw e;
	      }
	    }
	  }

	  return (encoder || JSON.stringify)(rawValue);
	}

	var defaults = {

	  transitional: {
	    silentJSONParsing: true,
	    forcedJSONParsing: true,
	    clarifyTimeoutError: false
	  },

	  adapter: getDefaultAdapter(),

	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName(headers, 'Accept');
	    normalizeHeaderName(headers, 'Content-Type');

	    if (utils.isFormData(data) ||
	      utils.isArrayBuffer(data) ||
	      utils.isBuffer(data) ||
	      utils.isStream(data) ||
	      utils.isFile(data) ||
	      utils.isBlob(data)
	    ) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isURLSearchParams(data)) {
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }
	    if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
	      setContentTypeIfUnset(headers, 'application/json');
	      return stringifySafely(data);
	    }
	    return data;
	  }],

	  transformResponse: [function transformResponse(data) {
	    var transitional = this.transitional || defaults.transitional;
	    var silentJSONParsing = transitional && transitional.silentJSONParsing;
	    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
	    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

	    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
	      try {
	        return JSON.parse(data);
	      } catch (e) {
	        if (strictJSONParsing) {
	          if (e.name === 'SyntaxError') {
	            throw enhanceError(e, this, 'E_JSON_PARSE');
	          }
	          throw e;
	        }
	      }
	    }

	    return data;
	  }],

	  /**
	   * A timeout in milliseconds to abort a request. If set to 0 (default) a
	   * timeout is not created.
	   */
	  timeout: 0,

	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',

	  maxContentLength: -1,
	  maxBodyLength: -1,

	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  },

	  headers: {
	    common: {
	      'Accept': 'application/json, text/plain, */*'
	    }
	  }
	};

	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  defaults.headers[method] = {};
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
	});

	var defaults_1 = defaults;

	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	var transformData = function transformData(data, headers, fns) {
	  var context = this || defaults$1;
	  /*eslint no-param-reassign:0*/
	  utils.forEach(fns, function transform(fn) {
	    data = fn.call(context, data, headers);
	  });

	  return data;
	};

	var isCancel = function isCancel(value) {
	  return !!(value && value.__CANCEL__);
	};

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	function throwIfCancellationRequested(config) {
	  if (config.cancelToken) {
	    config.cancelToken.throwIfRequested();
	  }

	  if (config.signal && config.signal.aborted) {
	    throw new Cancel_1('canceled');
	  }
	}

	/**
	 * Dispatch a request to the server using the configured adapter.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	var dispatchRequest = function dispatchRequest(config) {
	  throwIfCancellationRequested(config);

	  // Ensure headers exist
	  config.headers = config.headers || {};

	  // Transform request data
	  config.data = transformData.call(
	    config,
	    config.data,
	    config.headers,
	    config.transformRequest
	  );

	  // Flatten headers
	  config.headers = utils.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers
	  );

	  utils.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );

	  var adapter = config.adapter || defaults$1.adapter;

	  return adapter(config).then(function onAdapterResolution(response) {
	    throwIfCancellationRequested(config);

	    // Transform response data
	    response.data = transformData.call(
	      config,
	      response.data,
	      response.headers,
	      config.transformResponse
	    );

	    return response;
	  }, function onAdapterRejection(reason) {
	    if (!isCancel(reason)) {
	      throwIfCancellationRequested(config);

	      // Transform response data
	      if (reason && reason.response) {
	        reason.response.data = transformData.call(
	          config,
	          reason.response.data,
	          reason.response.headers,
	          config.transformResponse
	        );
	      }
	    }

	    return Promise.reject(reason);
	  });
	};

	/**
	 * Config-specific merge-function which creates a new config-object
	 * by merging two configuration objects together.
	 *
	 * @param {Object} config1
	 * @param {Object} config2
	 * @returns {Object} New object resulting from merging config2 to config1
	 */
	var mergeConfig = function mergeConfig(config1, config2) {
	  // eslint-disable-next-line no-param-reassign
	  config2 = config2 || {};
	  var config = {};

	  function getMergedValue(target, source) {
	    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
	      return utils.merge(target, source);
	    } else if (utils.isPlainObject(source)) {
	      return utils.merge({}, source);
	    } else if (utils.isArray(source)) {
	      return source.slice();
	    }
	    return source;
	  }

	  // eslint-disable-next-line consistent-return
	  function mergeDeepProperties(prop) {
	    if (!utils.isUndefined(config2[prop])) {
	      return getMergedValue(config1[prop], config2[prop]);
	    } else if (!utils.isUndefined(config1[prop])) {
	      return getMergedValue(undefined, config1[prop]);
	    }
	  }

	  // eslint-disable-next-line consistent-return
	  function valueFromConfig2(prop) {
	    if (!utils.isUndefined(config2[prop])) {
	      return getMergedValue(undefined, config2[prop]);
	    }
	  }

	  // eslint-disable-next-line consistent-return
	  function defaultToConfig2(prop) {
	    if (!utils.isUndefined(config2[prop])) {
	      return getMergedValue(undefined, config2[prop]);
	    } else if (!utils.isUndefined(config1[prop])) {
	      return getMergedValue(undefined, config1[prop]);
	    }
	  }

	  // eslint-disable-next-line consistent-return
	  function mergeDirectKeys(prop) {
	    if (prop in config2) {
	      return getMergedValue(config1[prop], config2[prop]);
	    } else if (prop in config1) {
	      return getMergedValue(undefined, config1[prop]);
	    }
	  }

	  var mergeMap = {
	    'url': valueFromConfig2,
	    'method': valueFromConfig2,
	    'data': valueFromConfig2,
	    'baseURL': defaultToConfig2,
	    'transformRequest': defaultToConfig2,
	    'transformResponse': defaultToConfig2,
	    'paramsSerializer': defaultToConfig2,
	    'timeout': defaultToConfig2,
	    'timeoutMessage': defaultToConfig2,
	    'withCredentials': defaultToConfig2,
	    'adapter': defaultToConfig2,
	    'responseType': defaultToConfig2,
	    'xsrfCookieName': defaultToConfig2,
	    'xsrfHeaderName': defaultToConfig2,
	    'onUploadProgress': defaultToConfig2,
	    'onDownloadProgress': defaultToConfig2,
	    'decompress': defaultToConfig2,
	    'maxContentLength': defaultToConfig2,
	    'maxBodyLength': defaultToConfig2,
	    'transport': defaultToConfig2,
	    'httpAgent': defaultToConfig2,
	    'httpsAgent': defaultToConfig2,
	    'cancelToken': defaultToConfig2,
	    'socketPath': defaultToConfig2,
	    'responseEncoding': defaultToConfig2,
	    'validateStatus': mergeDirectKeys
	  };

	  utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
	    var merge = mergeMap[prop] || mergeDeepProperties;
	    var configValue = merge(prop);
	    (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
	  });

	  return config;
	};

	var VERSION = data.version;

	var validators$1 = {};

	// eslint-disable-next-line func-names
	['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
	  validators$1[type] = function validator(thing) {
	    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
	  };
	});

	var deprecatedWarnings = {};

	/**
	 * Transitional option validator
	 * @param {function|boolean?} validator - set to false if the transitional option has been removed
	 * @param {string?} version - deprecated version / removed since version
	 * @param {string?} message - some message with additional info
	 * @returns {function}
	 */
	validators$1.transitional = function transitional(validator, version, message) {
	  function formatMessage(opt, desc) {
	    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
	  }

	  // eslint-disable-next-line func-names
	  return function(value, opt, opts) {
	    if (validator === false) {
	      throw new Error(formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')));
	    }

	    if (version && !deprecatedWarnings[opt]) {
	      deprecatedWarnings[opt] = true;
	      // eslint-disable-next-line no-console
	      console.warn(
	        formatMessage(
	          opt,
	          ' has been deprecated since v' + version + ' and will be removed in the near future'
	        )
	      );
	    }

	    return validator ? validator(value, opt, opts) : true;
	  };
	};

	/**
	 * Assert object's properties type
	 * @param {object} options
	 * @param {object} schema
	 * @param {boolean?} allowUnknown
	 */

	function assertOptions(options, schema, allowUnknown) {
	  if (typeof options !== 'object') {
	    throw new TypeError('options must be an object');
	  }
	  var keys = Object.keys(options);
	  var i = keys.length;
	  while (i-- > 0) {
	    var opt = keys[i];
	    var validator = schema[opt];
	    if (validator) {
	      var value = options[opt];
	      var result = value === undefined || validator(value, opt, options);
	      if (result !== true) {
	        throw new TypeError('option ' + opt + ' must be ' + result);
	      }
	      continue;
	    }
	    if (allowUnknown !== true) {
	      throw Error('Unknown option ' + opt);
	    }
	  }
	}

	var validator = {
	  assertOptions: assertOptions,
	  validators: validators$1
	};

	var validators = validator.validators;
	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} instanceConfig The default config for the instance
	 */
	function Axios(instanceConfig) {
	  this.defaults = instanceConfig;
	  this.interceptors = {
	    request: new InterceptorManager_1(),
	    response: new InterceptorManager_1()
	  };
	}

	/**
	 * Dispatch a request
	 *
	 * @param {Object} config The config specific for this request (merged with this.defaults)
	 */
	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = arguments[1] || {};
	    config.url = arguments[0];
	  } else {
	    config = config || {};
	  }

	  config = mergeConfig(this.defaults, config);

	  // Set config.method
	  if (config.method) {
	    config.method = config.method.toLowerCase();
	  } else if (this.defaults.method) {
	    config.method = this.defaults.method.toLowerCase();
	  } else {
	    config.method = 'get';
	  }

	  var transitional = config.transitional;

	  if (transitional !== undefined) {
	    validator.assertOptions(transitional, {
	      silentJSONParsing: validators.transitional(validators.boolean),
	      forcedJSONParsing: validators.transitional(validators.boolean),
	      clarifyTimeoutError: validators.transitional(validators.boolean)
	    }, false);
	  }

	  // filter out skipped interceptors
	  var requestInterceptorChain = [];
	  var synchronousRequestInterceptors = true;
	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
	      return;
	    }

	    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

	    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });

	  var responseInterceptorChain = [];
	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
	  });

	  var promise;

	  if (!synchronousRequestInterceptors) {
	    var chain = [dispatchRequest, undefined];

	    Array.prototype.unshift.apply(chain, requestInterceptorChain);
	    chain = chain.concat(responseInterceptorChain);

	    promise = Promise.resolve(config);
	    while (chain.length) {
	      promise = promise.then(chain.shift(), chain.shift());
	    }

	    return promise;
	  }


	  var newConfig = config;
	  while (requestInterceptorChain.length) {
	    var onFulfilled = requestInterceptorChain.shift();
	    var onRejected = requestInterceptorChain.shift();
	    try {
	      newConfig = onFulfilled(newConfig);
	    } catch (error) {
	      onRejected(error);
	      break;
	    }
	  }

	  try {
	    promise = dispatchRequest(newConfig);
	  } catch (error) {
	    return Promise.reject(error);
	  }

	  while (responseInterceptorChain.length) {
	    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
	  }

	  return promise;
	};

	Axios.prototype.getUri = function getUri(config) {
	  config = mergeConfig(this.defaults, config);
	  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
	};

	// Provide aliases for supported request methods
	utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, config) {
	    return this.request(mergeConfig(config || {}, {
	      method: method,
	      url: url,
	      data: (config || {}).data
	    }));
	  };
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, data, config) {
	    return this.request(mergeConfig(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	});

	var Axios_1 = Axios;

	/**
	 * A `CancelToken` is an object that can be used to request cancellation of an operation.
	 *
	 * @class
	 * @param {Function} executor The executor function.
	 */
	function CancelToken(executor) {
	  if (typeof executor !== 'function') {
	    throw new TypeError('executor must be a function.');
	  }

	  var resolvePromise;

	  this.promise = new Promise(function promiseExecutor(resolve) {
	    resolvePromise = resolve;
	  });

	  var token = this;

	  // eslint-disable-next-line func-names
	  this.promise.then(function(cancel) {
	    if (!token._listeners) return;

	    var i;
	    var l = token._listeners.length;

	    for (i = 0; i < l; i++) {
	      token._listeners[i](cancel);
	    }
	    token._listeners = null;
	  });

	  // eslint-disable-next-line func-names
	  this.promise.then = function(onfulfilled) {
	    var _resolve;
	    // eslint-disable-next-line func-names
	    var promise = new Promise(function(resolve) {
	      token.subscribe(resolve);
	      _resolve = resolve;
	    }).then(onfulfilled);

	    promise.cancel = function reject() {
	      token.unsubscribe(_resolve);
	    };

	    return promise;
	  };

	  executor(function cancel(message) {
	    if (token.reason) {
	      // Cancellation has already been requested
	      return;
	    }

	    token.reason = new Cancel_1(message);
	    resolvePromise(token.reason);
	  });
	}

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	CancelToken.prototype.throwIfRequested = function throwIfRequested() {
	  if (this.reason) {
	    throw this.reason;
	  }
	};

	/**
	 * Subscribe to the cancel signal
	 */

	CancelToken.prototype.subscribe = function subscribe(listener) {
	  if (this.reason) {
	    listener(this.reason);
	    return;
	  }

	  if (this._listeners) {
	    this._listeners.push(listener);
	  } else {
	    this._listeners = [listener];
	  }
	};

	/**
	 * Unsubscribe from the cancel signal
	 */

	CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
	  if (!this._listeners) {
	    return;
	  }
	  var index = this._listeners.indexOf(listener);
	  if (index !== -1) {
	    this._listeners.splice(index, 1);
	  }
	};

	/**
	 * Returns an object that contains a new `CancelToken` and a function that, when called,
	 * cancels the `CancelToken`.
	 */
	CancelToken.source = function source() {
	  var cancel;
	  var token = new CancelToken(function executor(c) {
	    cancel = c;
	  });
	  return {
	    token: token,
	    cancel: cancel
	  };
	};

	var CancelToken_1 = CancelToken;

	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	var spread = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};

	/**
	 * Determines whether the payload is an error thrown by Axios
	 *
	 * @param {*} payload The value to test
	 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
	 */
	var isAxiosError = function isAxiosError(payload) {
	  return (typeof payload === 'object') && (payload.isAxiosError === true);
	};

	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 * @return {Axios} A new instance of Axios
	 */
	function createInstance(defaultConfig) {
	  var context = new Axios_1(defaultConfig);
	  var instance = bind(Axios_1.prototype.request, context);

	  // Copy axios.prototype to instance
	  utils.extend(instance, Axios_1.prototype, context);

	  // Copy context to instance
	  utils.extend(instance, context);

	  // Factory for creating new instances
	  instance.create = function create(instanceConfig) {
	    return createInstance(mergeConfig(defaultConfig, instanceConfig));
	  };

	  return instance;
	}

	// Create the default instance to be exported
	var axios$1 = createInstance(defaults$1);

	// Expose Axios class to allow class inheritance
	axios$1.Axios = Axios_1;

	// Expose Cancel & CancelToken
	axios$1.Cancel = Cancel_1;
	axios$1.CancelToken = CancelToken_1;
	axios$1.isCancel = isCancel;
	axios$1.VERSION = data.version;

	// Expose all/spread
	axios$1.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios$1.spread = spread;

	// Expose isAxiosError
	axios$1.isAxiosError = isAxiosError;

	var axios_1 = axios$1;

	// Allow use of default import syntax in TypeScript
	var default_1 = axios$1;
	axios_1.default = default_1;

	var axios = axios_1;

	var core = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		{
			// CommonJS
			module.exports = factory();
		}
	}(commonjsGlobal, function () {

		/*globals window, global, require*/

		/**
		 * CryptoJS core components.
		 */
		var CryptoJS = CryptoJS || (function (Math, undefined$1) {

		    var crypto;

		    // Native crypto from window (Browser)
		    if (typeof window !== 'undefined' && window.crypto) {
		        crypto = window.crypto;
		    }

		    // Native crypto in web worker (Browser)
		    if (typeof self !== 'undefined' && self.crypto) {
		        crypto = self.crypto;
		    }

		    // Native crypto from worker
		    if (typeof globalThis !== 'undefined' && globalThis.crypto) {
		        crypto = globalThis.crypto;
		    }

		    // Native (experimental IE 11) crypto from window (Browser)
		    if (!crypto && typeof window !== 'undefined' && window.msCrypto) {
		        crypto = window.msCrypto;
		    }

		    // Native crypto from global (NodeJS)
		    if (!crypto && typeof commonjsGlobal !== 'undefined' && commonjsGlobal.crypto) {
		        crypto = commonjsGlobal.crypto;
		    }

		    // Native crypto import via require (NodeJS)
		    if (!crypto && typeof commonjsRequire === 'function') {
		        try {
		            crypto = crypto__default["default"];
		        } catch (err) {}
		    }

		    /*
		     * Cryptographically secure pseudorandom number generator
		     *
		     * As Math.random() is cryptographically not safe to use
		     */
		    var cryptoSecureRandomInt = function () {
		        if (crypto) {
		            // Use getRandomValues method (Browser)
		            if (typeof crypto.getRandomValues === 'function') {
		                try {
		                    return crypto.getRandomValues(new Uint32Array(1))[0];
		                } catch (err) {}
		            }

		            // Use randomBytes method (NodeJS)
		            if (typeof crypto.randomBytes === 'function') {
		                try {
		                    return crypto.randomBytes(4).readInt32LE();
		                } catch (err) {}
		            }
		        }

		        throw new Error('Native crypto module could not be used to get secure random number.');
		    };

		    /*
		     * Local polyfill of Object.create

		     */
		    var create = Object.create || (function () {
		        function F() {}

		        return function (obj) {
		            var subtype;

		            F.prototype = obj;

		            subtype = new F();

		            F.prototype = null;

		            return subtype;
		        };
		    }());

		    /**
		     * CryptoJS namespace.
		     */
		    var C = {};

		    /**
		     * Library namespace.
		     */
		    var C_lib = C.lib = {};

		    /**
		     * Base object for prototypal inheritance.
		     */
		    var Base = C_lib.Base = (function () {


		        return {
		            /**
		             * Creates a new object that inherits from this object.
		             *
		             * @param {Object} overrides Properties to copy into the new object.
		             *
		             * @return {Object} The new object.
		             *
		             * @static
		             *
		             * @example
		             *
		             *     var MyType = CryptoJS.lib.Base.extend({
		             *         field: 'value',
		             *
		             *         method: function () {
		             *         }
		             *     });
		             */
		            extend: function (overrides) {
		                // Spawn
		                var subtype = create(this);

		                // Augment
		                if (overrides) {
		                    subtype.mixIn(overrides);
		                }

		                // Create default initializer
		                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
		                    subtype.init = function () {
		                        subtype.$super.init.apply(this, arguments);
		                    };
		                }

		                // Initializer's prototype is the subtype object
		                subtype.init.prototype = subtype;

		                // Reference supertype
		                subtype.$super = this;

		                return subtype;
		            },

		            /**
		             * Extends this object and runs the init method.
		             * Arguments to create() will be passed to init().
		             *
		             * @return {Object} The new object.
		             *
		             * @static
		             *
		             * @example
		             *
		             *     var instance = MyType.create();
		             */
		            create: function () {
		                var instance = this.extend();
		                instance.init.apply(instance, arguments);

		                return instance;
		            },

		            /**
		             * Initializes a newly created object.
		             * Override this method to add some logic when your objects are created.
		             *
		             * @example
		             *
		             *     var MyType = CryptoJS.lib.Base.extend({
		             *         init: function () {
		             *             // ...
		             *         }
		             *     });
		             */
		            init: function () {
		            },

		            /**
		             * Copies properties into this object.
		             *
		             * @param {Object} properties The properties to mix in.
		             *
		             * @example
		             *
		             *     MyType.mixIn({
		             *         field: 'value'
		             *     });
		             */
		            mixIn: function (properties) {
		                for (var propertyName in properties) {
		                    if (properties.hasOwnProperty(propertyName)) {
		                        this[propertyName] = properties[propertyName];
		                    }
		                }

		                // IE won't copy toString using the loop above
		                if (properties.hasOwnProperty('toString')) {
		                    this.toString = properties.toString;
		                }
		            },

		            /**
		             * Creates a copy of this object.
		             *
		             * @return {Object} The clone.
		             *
		             * @example
		             *
		             *     var clone = instance.clone();
		             */
		            clone: function () {
		                return this.init.prototype.extend(this);
		            }
		        };
		    }());

		    /**
		     * An array of 32-bit words.
		     *
		     * @property {Array} words The array of 32-bit words.
		     * @property {number} sigBytes The number of significant bytes in this word array.
		     */
		    var WordArray = C_lib.WordArray = Base.extend({
		        /**
		         * Initializes a newly created word array.
		         *
		         * @param {Array} words (Optional) An array of 32-bit words.
		         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.lib.WordArray.create();
		         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
		         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
		         */
		        init: function (words, sigBytes) {
		            words = this.words = words || [];

		            if (sigBytes != undefined$1) {
		                this.sigBytes = sigBytes;
		            } else {
		                this.sigBytes = words.length * 4;
		            }
		        },

		        /**
		         * Converts this word array to a string.
		         *
		         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
		         *
		         * @return {string} The stringified word array.
		         *
		         * @example
		         *
		         *     var string = wordArray + '';
		         *     var string = wordArray.toString();
		         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
		         */
		        toString: function (encoder) {
		            return (encoder || Hex).stringify(this);
		        },

		        /**
		         * Concatenates a word array to this word array.
		         *
		         * @param {WordArray} wordArray The word array to append.
		         *
		         * @return {WordArray} This word array.
		         *
		         * @example
		         *
		         *     wordArray1.concat(wordArray2);
		         */
		        concat: function (wordArray) {
		            // Shortcuts
		            var thisWords = this.words;
		            var thatWords = wordArray.words;
		            var thisSigBytes = this.sigBytes;
		            var thatSigBytes = wordArray.sigBytes;

		            // Clamp excess bits
		            this.clamp();

		            // Concat
		            if (thisSigBytes % 4) {
		                // Copy one byte at a time
		                for (var i = 0; i < thatSigBytes; i++) {
		                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
		                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
		                }
		            } else {
		                // Copy one word at a time
		                for (var j = 0; j < thatSigBytes; j += 4) {
		                    thisWords[(thisSigBytes + j) >>> 2] = thatWords[j >>> 2];
		                }
		            }
		            this.sigBytes += thatSigBytes;

		            // Chainable
		            return this;
		        },

		        /**
		         * Removes insignificant bits.
		         *
		         * @example
		         *
		         *     wordArray.clamp();
		         */
		        clamp: function () {
		            // Shortcuts
		            var words = this.words;
		            var sigBytes = this.sigBytes;

		            // Clamp
		            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
		            words.length = Math.ceil(sigBytes / 4);
		        },

		        /**
		         * Creates a copy of this word array.
		         *
		         * @return {WordArray} The clone.
		         *
		         * @example
		         *
		         *     var clone = wordArray.clone();
		         */
		        clone: function () {
		            var clone = Base.clone.call(this);
		            clone.words = this.words.slice(0);

		            return clone;
		        },

		        /**
		         * Creates a word array filled with random bytes.
		         *
		         * @param {number} nBytes The number of random bytes to generate.
		         *
		         * @return {WordArray} The random word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.lib.WordArray.random(16);
		         */
		        random: function (nBytes) {
		            var words = [];

		            for (var i = 0; i < nBytes; i += 4) {
		                words.push(cryptoSecureRandomInt());
		            }

		            return new WordArray.init(words, nBytes);
		        }
		    });

		    /**
		     * Encoder namespace.
		     */
		    var C_enc = C.enc = {};

		    /**
		     * Hex encoding strategy.
		     */
		    var Hex = C_enc.Hex = {
		        /**
		         * Converts a word array to a hex string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The hex string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            // Shortcuts
		            var words = wordArray.words;
		            var sigBytes = wordArray.sigBytes;

		            // Convert
		            var hexChars = [];
		            for (var i = 0; i < sigBytes; i++) {
		                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
		                hexChars.push((bite >>> 4).toString(16));
		                hexChars.push((bite & 0x0f).toString(16));
		            }

		            return hexChars.join('');
		        },

		        /**
		         * Converts a hex string to a word array.
		         *
		         * @param {string} hexStr The hex string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
		         */
		        parse: function (hexStr) {
		            // Shortcut
		            var hexStrLength = hexStr.length;

		            // Convert
		            var words = [];
		            for (var i = 0; i < hexStrLength; i += 2) {
		                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
		            }

		            return new WordArray.init(words, hexStrLength / 2);
		        }
		    };

		    /**
		     * Latin1 encoding strategy.
		     */
		    var Latin1 = C_enc.Latin1 = {
		        /**
		         * Converts a word array to a Latin1 string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The Latin1 string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            // Shortcuts
		            var words = wordArray.words;
		            var sigBytes = wordArray.sigBytes;

		            // Convert
		            var latin1Chars = [];
		            for (var i = 0; i < sigBytes; i++) {
		                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
		                latin1Chars.push(String.fromCharCode(bite));
		            }

		            return latin1Chars.join('');
		        },

		        /**
		         * Converts a Latin1 string to a word array.
		         *
		         * @param {string} latin1Str The Latin1 string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
		         */
		        parse: function (latin1Str) {
		            // Shortcut
		            var latin1StrLength = latin1Str.length;

		            // Convert
		            var words = [];
		            for (var i = 0; i < latin1StrLength; i++) {
		                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
		            }

		            return new WordArray.init(words, latin1StrLength);
		        }
		    };

		    /**
		     * UTF-8 encoding strategy.
		     */
		    var Utf8 = C_enc.Utf8 = {
		        /**
		         * Converts a word array to a UTF-8 string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The UTF-8 string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            try {
		                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
		            } catch (e) {
		                throw new Error('Malformed UTF-8 data');
		            }
		        },

		        /**
		         * Converts a UTF-8 string to a word array.
		         *
		         * @param {string} utf8Str The UTF-8 string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
		         */
		        parse: function (utf8Str) {
		            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
		        }
		    };

		    /**
		     * Abstract buffered block algorithm template.
		     *
		     * The property blockSize must be implemented in a concrete subtype.
		     *
		     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
		     */
		    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
		        /**
		         * Resets this block algorithm's data buffer to its initial state.
		         *
		         * @example
		         *
		         *     bufferedBlockAlgorithm.reset();
		         */
		        reset: function () {
		            // Initial values
		            this._data = new WordArray.init();
		            this._nDataBytes = 0;
		        },

		        /**
		         * Adds new data to this block algorithm's buffer.
		         *
		         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
		         *
		         * @example
		         *
		         *     bufferedBlockAlgorithm._append('data');
		         *     bufferedBlockAlgorithm._append(wordArray);
		         */
		        _append: function (data) {
		            // Convert string to WordArray, else assume WordArray already
		            if (typeof data == 'string') {
		                data = Utf8.parse(data);
		            }

		            // Append
		            this._data.concat(data);
		            this._nDataBytes += data.sigBytes;
		        },

		        /**
		         * Processes available data blocks.
		         *
		         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
		         *
		         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
		         *
		         * @return {WordArray} The processed data.
		         *
		         * @example
		         *
		         *     var processedData = bufferedBlockAlgorithm._process();
		         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
		         */
		        _process: function (doFlush) {
		            var processedWords;

		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;
		            var dataSigBytes = data.sigBytes;
		            var blockSize = this.blockSize;
		            var blockSizeBytes = blockSize * 4;

		            // Count blocks ready
		            var nBlocksReady = dataSigBytes / blockSizeBytes;
		            if (doFlush) {
		                // Round up to include partial blocks
		                nBlocksReady = Math.ceil(nBlocksReady);
		            } else {
		                // Round down to include only full blocks,
		                // less the number of blocks that must remain in the buffer
		                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
		            }

		            // Count words ready
		            var nWordsReady = nBlocksReady * blockSize;

		            // Count bytes ready
		            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

		            // Process blocks
		            if (nWordsReady) {
		                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
		                    // Perform concrete-algorithm logic
		                    this._doProcessBlock(dataWords, offset);
		                }

		                // Remove processed words
		                processedWords = dataWords.splice(0, nWordsReady);
		                data.sigBytes -= nBytesReady;
		            }

		            // Return processed words
		            return new WordArray.init(processedWords, nBytesReady);
		        },

		        /**
		         * Creates a copy of this object.
		         *
		         * @return {Object} The clone.
		         *
		         * @example
		         *
		         *     var clone = bufferedBlockAlgorithm.clone();
		         */
		        clone: function () {
		            var clone = Base.clone.call(this);
		            clone._data = this._data.clone();

		            return clone;
		        },

		        _minBufferSize: 0
		    });

		    /**
		     * Abstract hasher template.
		     *
		     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
		     */
		    C_lib.Hasher = BufferedBlockAlgorithm.extend({
		        /**
		         * Configuration options.
		         */
		        cfg: Base.extend(),

		        /**
		         * Initializes a newly created hasher.
		         *
		         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
		         *
		         * @example
		         *
		         *     var hasher = CryptoJS.algo.SHA256.create();
		         */
		        init: function (cfg) {
		            // Apply config defaults
		            this.cfg = this.cfg.extend(cfg);

		            // Set initial values
		            this.reset();
		        },

		        /**
		         * Resets this hasher to its initial state.
		         *
		         * @example
		         *
		         *     hasher.reset();
		         */
		        reset: function () {
		            // Reset data buffer
		            BufferedBlockAlgorithm.reset.call(this);

		            // Perform concrete-hasher logic
		            this._doReset();
		        },

		        /**
		         * Updates this hasher with a message.
		         *
		         * @param {WordArray|string} messageUpdate The message to append.
		         *
		         * @return {Hasher} This hasher.
		         *
		         * @example
		         *
		         *     hasher.update('message');
		         *     hasher.update(wordArray);
		         */
		        update: function (messageUpdate) {
		            // Append
		            this._append(messageUpdate);

		            // Update the hash
		            this._process();

		            // Chainable
		            return this;
		        },

		        /**
		         * Finalizes the hash computation.
		         * Note that the finalize operation is effectively a destructive, read-once operation.
		         *
		         * @param {WordArray|string} messageUpdate (Optional) A final message update.
		         *
		         * @return {WordArray} The hash.
		         *
		         * @example
		         *
		         *     var hash = hasher.finalize();
		         *     var hash = hasher.finalize('message');
		         *     var hash = hasher.finalize(wordArray);
		         */
		        finalize: function (messageUpdate) {
		            // Final message update
		            if (messageUpdate) {
		                this._append(messageUpdate);
		            }

		            // Perform concrete-hasher logic
		            var hash = this._doFinalize();

		            return hash;
		        },

		        blockSize: 512/32,

		        /**
		         * Creates a shortcut function to a hasher's object interface.
		         *
		         * @param {Hasher} hasher The hasher to create a helper for.
		         *
		         * @return {Function} The shortcut function.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
		         */
		        _createHelper: function (hasher) {
		            return function (message, cfg) {
		                return new hasher.init(cfg).finalize(message);
		            };
		        },

		        /**
		         * Creates a shortcut function to the HMAC's object interface.
		         *
		         * @param {Hasher} hasher The hasher to use in this HMAC helper.
		         *
		         * @return {Function} The shortcut function.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
		         */
		        _createHmacHelper: function (hasher) {
		            return function (message, key) {
		                return new C_algo.HMAC.init(hasher, key).finalize(message);
		            };
		        }
		    });

		    /**
		     * Algorithm namespace.
		     */
		    var C_algo = C.algo = {};

		    return C;
		}(Math));


		return CryptoJS;

	}));
	});

	var x64Core = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		{
			// CommonJS
			module.exports = factory(core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function (undefined$1) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var Base = C_lib.Base;
		    var X32WordArray = C_lib.WordArray;

		    /**
		     * x64 namespace.
		     */
		    var C_x64 = C.x64 = {};

		    /**
		     * A 64-bit word.
		     */
		    C_x64.Word = Base.extend({
		        /**
		         * Initializes a newly created 64-bit word.
		         *
		         * @param {number} high The high 32 bits.
		         * @param {number} low The low 32 bits.
		         *
		         * @example
		         *
		         *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
		         */
		        init: function (high, low) {
		            this.high = high;
		            this.low = low;
		        }

		        /**
		         * Bitwise NOTs this word.
		         *
		         * @return {X64Word} A new x64-Word object after negating.
		         *
		         * @example
		         *
		         *     var negated = x64Word.not();
		         */
		        // not: function () {
		            // var high = ~this.high;
		            // var low = ~this.low;

		            // return X64Word.create(high, low);
		        // },

		        /**
		         * Bitwise ANDs this word with the passed word.
		         *
		         * @param {X64Word} word The x64-Word to AND with this word.
		         *
		         * @return {X64Word} A new x64-Word object after ANDing.
		         *
		         * @example
		         *
		         *     var anded = x64Word.and(anotherX64Word);
		         */
		        // and: function (word) {
		            // var high = this.high & word.high;
		            // var low = this.low & word.low;

		            // return X64Word.create(high, low);
		        // },

		        /**
		         * Bitwise ORs this word with the passed word.
		         *
		         * @param {X64Word} word The x64-Word to OR with this word.
		         *
		         * @return {X64Word} A new x64-Word object after ORing.
		         *
		         * @example
		         *
		         *     var ored = x64Word.or(anotherX64Word);
		         */
		        // or: function (word) {
		            // var high = this.high | word.high;
		            // var low = this.low | word.low;

		            // return X64Word.create(high, low);
		        // },

		        /**
		         * Bitwise XORs this word with the passed word.
		         *
		         * @param {X64Word} word The x64-Word to XOR with this word.
		         *
		         * @return {X64Word} A new x64-Word object after XORing.
		         *
		         * @example
		         *
		         *     var xored = x64Word.xor(anotherX64Word);
		         */
		        // xor: function (word) {
		            // var high = this.high ^ word.high;
		            // var low = this.low ^ word.low;

		            // return X64Word.create(high, low);
		        // },

		        /**
		         * Shifts this word n bits to the left.
		         *
		         * @param {number} n The number of bits to shift.
		         *
		         * @return {X64Word} A new x64-Word object after shifting.
		         *
		         * @example
		         *
		         *     var shifted = x64Word.shiftL(25);
		         */
		        // shiftL: function (n) {
		            // if (n < 32) {
		                // var high = (this.high << n) | (this.low >>> (32 - n));
		                // var low = this.low << n;
		            // } else {
		                // var high = this.low << (n - 32);
		                // var low = 0;
		            // }

		            // return X64Word.create(high, low);
		        // },

		        /**
		         * Shifts this word n bits to the right.
		         *
		         * @param {number} n The number of bits to shift.
		         *
		         * @return {X64Word} A new x64-Word object after shifting.
		         *
		         * @example
		         *
		         *     var shifted = x64Word.shiftR(7);
		         */
		        // shiftR: function (n) {
		            // if (n < 32) {
		                // var low = (this.low >>> n) | (this.high << (32 - n));
		                // var high = this.high >>> n;
		            // } else {
		                // var low = this.high >>> (n - 32);
		                // var high = 0;
		            // }

		            // return X64Word.create(high, low);
		        // },

		        /**
		         * Rotates this word n bits to the left.
		         *
		         * @param {number} n The number of bits to rotate.
		         *
		         * @return {X64Word} A new x64-Word object after rotating.
		         *
		         * @example
		         *
		         *     var rotated = x64Word.rotL(25);
		         */
		        // rotL: function (n) {
		            // return this.shiftL(n).or(this.shiftR(64 - n));
		        // },

		        /**
		         * Rotates this word n bits to the right.
		         *
		         * @param {number} n The number of bits to rotate.
		         *
		         * @return {X64Word} A new x64-Word object after rotating.
		         *
		         * @example
		         *
		         *     var rotated = x64Word.rotR(7);
		         */
		        // rotR: function (n) {
		            // return this.shiftR(n).or(this.shiftL(64 - n));
		        // },

		        /**
		         * Adds this word with the passed word.
		         *
		         * @param {X64Word} word The x64-Word to add with this word.
		         *
		         * @return {X64Word} A new x64-Word object after adding.
		         *
		         * @example
		         *
		         *     var added = x64Word.add(anotherX64Word);
		         */
		        // add: function (word) {
		            // var low = (this.low + word.low) | 0;
		            // var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
		            // var high = (this.high + word.high + carry) | 0;

		            // return X64Word.create(high, low);
		        // }
		    });

		    /**
		     * An array of 64-bit words.
		     *
		     * @property {Array} words The array of CryptoJS.x64.Word objects.
		     * @property {number} sigBytes The number of significant bytes in this word array.
		     */
		    C_x64.WordArray = Base.extend({
		        /**
		         * Initializes a newly created word array.
		         *
		         * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
		         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.x64.WordArray.create();
		         *
		         *     var wordArray = CryptoJS.x64.WordArray.create([
		         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
		         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
		         *     ]);
		         *
		         *     var wordArray = CryptoJS.x64.WordArray.create([
		         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
		         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
		         *     ], 10);
		         */
		        init: function (words, sigBytes) {
		            words = this.words = words || [];

		            if (sigBytes != undefined$1) {
		                this.sigBytes = sigBytes;
		            } else {
		                this.sigBytes = words.length * 8;
		            }
		        },

		        /**
		         * Converts this 64-bit word array to a 32-bit word array.
		         *
		         * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
		         *
		         * @example
		         *
		         *     var x32WordArray = x64WordArray.toX32();
		         */
		        toX32: function () {
		            // Shortcuts
		            var x64Words = this.words;
		            var x64WordsLength = x64Words.length;

		            // Convert
		            var x32Words = [];
		            for (var i = 0; i < x64WordsLength; i++) {
		                var x64Word = x64Words[i];
		                x32Words.push(x64Word.high);
		                x32Words.push(x64Word.low);
		            }

		            return X32WordArray.create(x32Words, this.sigBytes);
		        },

		        /**
		         * Creates a copy of this word array.
		         *
		         * @return {X64WordArray} The clone.
		         *
		         * @example
		         *
		         *     var clone = x64WordArray.clone();
		         */
		        clone: function () {
		            var clone = Base.clone.call(this);

		            // Clone "words" array
		            var words = clone.words = this.words.slice(0);

		            // Clone each X64Word object
		            var wordsLength = words.length;
		            for (var i = 0; i < wordsLength; i++) {
		                words[i] = words[i].clone();
		            }

		            return clone;
		        }
		    });
		}());


		return CryptoJS;

	}));
	});

	var libTypedarrays = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		{
			// CommonJS
			module.exports = factory(core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Check if typed arrays are supported
		    if (typeof ArrayBuffer != 'function') {
		        return;
		    }

		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;

		    // Reference original init
		    var superInit = WordArray.init;

		    // Augment WordArray.init to handle typed arrays
		    var subInit = WordArray.init = function (typedArray) {
		        // Convert buffers to uint8
		        if (typedArray instanceof ArrayBuffer) {
		            typedArray = new Uint8Array(typedArray);
		        }

		        // Convert other array views to uint8
		        if (
		            typedArray instanceof Int8Array ||
		            (typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray) ||
		            typedArray instanceof Int16Array ||
		            typedArray instanceof Uint16Array ||
		            typedArray instanceof Int32Array ||
		            typedArray instanceof Uint32Array ||
		            typedArray instanceof Float32Array ||
		            typedArray instanceof Float64Array
		        ) {
		            typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
		        }

		        // Handle Uint8Array
		        if (typedArray instanceof Uint8Array) {
		            // Shortcut
		            var typedArrayByteLength = typedArray.byteLength;

		            // Extract bytes
		            var words = [];
		            for (var i = 0; i < typedArrayByteLength; i++) {
		                words[i >>> 2] |= typedArray[i] << (24 - (i % 4) * 8);
		            }

		            // Initialize this word array
		            superInit.call(this, words, typedArrayByteLength);
		        } else {
		            // Else call normal init
		            superInit.apply(this, arguments);
		        }
		    };

		    subInit.prototype = WordArray;
		}());


		return CryptoJS.lib.WordArray;

	}));
	});

	var encUtf16 = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		{
			// CommonJS
			module.exports = factory(core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var C_enc = C.enc;

		    /**
		     * UTF-16 BE encoding strategy.
		     */
		    C_enc.Utf16 = C_enc.Utf16BE = {
		        /**
		         * Converts a word array to a UTF-16 BE string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The UTF-16 BE string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var utf16String = CryptoJS.enc.Utf16.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            // Shortcuts
		            var words = wordArray.words;
		            var sigBytes = wordArray.sigBytes;

		            // Convert
		            var utf16Chars = [];
		            for (var i = 0; i < sigBytes; i += 2) {
		                var codePoint = (words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff;
		                utf16Chars.push(String.fromCharCode(codePoint));
		            }

		            return utf16Chars.join('');
		        },

		        /**
		         * Converts a UTF-16 BE string to a word array.
		         *
		         * @param {string} utf16Str The UTF-16 BE string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Utf16.parse(utf16String);
		         */
		        parse: function (utf16Str) {
		            // Shortcut
		            var utf16StrLength = utf16Str.length;

		            // Convert
		            var words = [];
		            for (var i = 0; i < utf16StrLength; i++) {
		                words[i >>> 1] |= utf16Str.charCodeAt(i) << (16 - (i % 2) * 16);
		            }

		            return WordArray.create(words, utf16StrLength * 2);
		        }
		    };

		    /**
		     * UTF-16 LE encoding strategy.
		     */
		    C_enc.Utf16LE = {
		        /**
		         * Converts a word array to a UTF-16 LE string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The UTF-16 LE string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var utf16Str = CryptoJS.enc.Utf16LE.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            // Shortcuts
		            var words = wordArray.words;
		            var sigBytes = wordArray.sigBytes;

		            // Convert
		            var utf16Chars = [];
		            for (var i = 0; i < sigBytes; i += 2) {
		                var codePoint = swapEndian((words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff);
		                utf16Chars.push(String.fromCharCode(codePoint));
		            }

		            return utf16Chars.join('');
		        },

		        /**
		         * Converts a UTF-16 LE string to a word array.
		         *
		         * @param {string} utf16Str The UTF-16 LE string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Utf16LE.parse(utf16Str);
		         */
		        parse: function (utf16Str) {
		            // Shortcut
		            var utf16StrLength = utf16Str.length;

		            // Convert
		            var words = [];
		            for (var i = 0; i < utf16StrLength; i++) {
		                words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << (16 - (i % 2) * 16));
		            }

		            return WordArray.create(words, utf16StrLength * 2);
		        }
		    };

		    function swapEndian(word) {
		        return ((word << 8) & 0xff00ff00) | ((word >>> 8) & 0x00ff00ff);
		    }
		}());


		return CryptoJS.enc.Utf16;

	}));
	});

	var encBase64 = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		{
			// CommonJS
			module.exports = factory(core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var C_enc = C.enc;

		    /**
		     * Base64 encoding strategy.
		     */
		    C_enc.Base64 = {
		        /**
		         * Converts a word array to a Base64 string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The Base64 string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            // Shortcuts
		            var words = wordArray.words;
		            var sigBytes = wordArray.sigBytes;
		            var map = this._map;

		            // Clamp excess bits
		            wordArray.clamp();

		            // Convert
		            var base64Chars = [];
		            for (var i = 0; i < sigBytes; i += 3) {
		                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
		                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
		                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

		                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

		                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
		                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
		                }
		            }

		            // Add padding
		            var paddingChar = map.charAt(64);
		            if (paddingChar) {
		                while (base64Chars.length % 4) {
		                    base64Chars.push(paddingChar);
		                }
		            }

		            return base64Chars.join('');
		        },

		        /**
		         * Converts a Base64 string to a word array.
		         *
		         * @param {string} base64Str The Base64 string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
		         */
		        parse: function (base64Str) {
		            // Shortcuts
		            var base64StrLength = base64Str.length;
		            var map = this._map;
		            var reverseMap = this._reverseMap;

		            if (!reverseMap) {
		                    reverseMap = this._reverseMap = [];
		                    for (var j = 0; j < map.length; j++) {
		                        reverseMap[map.charCodeAt(j)] = j;
		                    }
		            }

		            // Ignore padding
		            var paddingChar = map.charAt(64);
		            if (paddingChar) {
		                var paddingIndex = base64Str.indexOf(paddingChar);
		                if (paddingIndex !== -1) {
		                    base64StrLength = paddingIndex;
		                }
		            }

		            // Convert
		            return parseLoop(base64Str, base64StrLength, reverseMap);

		        },

		        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
		    };

		    function parseLoop(base64Str, base64StrLength, reverseMap) {
		      var words = [];
		      var nBytes = 0;
		      for (var i = 0; i < base64StrLength; i++) {
		          if (i % 4) {
		              var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
		              var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
		              var bitsCombined = bits1 | bits2;
		              words[nBytes >>> 2] |= bitsCombined << (24 - (nBytes % 4) * 8);
		              nBytes++;
		          }
		      }
		      return WordArray.create(words, nBytes);
		    }
		}());


		return CryptoJS.enc.Base64;

	}));
	});

	var encBase64url = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		{
			// CommonJS
			module.exports = factory(core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var C_enc = C.enc;

		    /**
		     * Base64url encoding strategy.
		     */
		    C_enc.Base64url = {
		        /**
		         * Converts a word array to a Base64url string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @param {boolean} urlSafe Whether to use url safe
		         *
		         * @return {string} The Base64url string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var base64String = CryptoJS.enc.Base64url.stringify(wordArray);
		         */
		        stringify: function (wordArray, urlSafe=true) {
		            // Shortcuts
		            var words = wordArray.words;
		            var sigBytes = wordArray.sigBytes;
		            var map = urlSafe ? this._safe_map : this._map;

		            // Clamp excess bits
		            wordArray.clamp();

		            // Convert
		            var base64Chars = [];
		            for (var i = 0; i < sigBytes; i += 3) {
		                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
		                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
		                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

		                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

		                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
		                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
		                }
		            }

		            // Add padding
		            var paddingChar = map.charAt(64);
		            if (paddingChar) {
		                while (base64Chars.length % 4) {
		                    base64Chars.push(paddingChar);
		                }
		            }

		            return base64Chars.join('');
		        },

		        /**
		         * Converts a Base64url string to a word array.
		         *
		         * @param {string} base64Str The Base64url string.
		         *
		         * @param {boolean} urlSafe Whether to use url safe
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Base64url.parse(base64String);
		         */
		        parse: function (base64Str, urlSafe=true) {
		            // Shortcuts
		            var base64StrLength = base64Str.length;
		            var map = urlSafe ? this._safe_map : this._map;
		            var reverseMap = this._reverseMap;

		            if (!reverseMap) {
		                reverseMap = this._reverseMap = [];
		                for (var j = 0; j < map.length; j++) {
		                    reverseMap[map.charCodeAt(j)] = j;
		                }
		            }

		            // Ignore padding
		            var paddingChar = map.charAt(64);
		            if (paddingChar) {
		                var paddingIndex = base64Str.indexOf(paddingChar);
		                if (paddingIndex !== -1) {
		                    base64StrLength = paddingIndex;
		                }
		            }

		            // Convert
		            return parseLoop(base64Str, base64StrLength, reverseMap);

		        },

		        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
		        _safe_map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',
		    };

		    function parseLoop(base64Str, base64StrLength, reverseMap) {
		        var words = [];
		        var nBytes = 0;
		        for (var i = 0; i < base64StrLength; i++) {
		            if (i % 4) {
		                var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
		                var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
		                var bitsCombined = bits1 | bits2;
		                words[nBytes >>> 2] |= bitsCombined << (24 - (nBytes % 4) * 8);
		                nBytes++;
		            }
		        }
		        return WordArray.create(words, nBytes);
		    }
		}());

		return CryptoJS.enc.Base64url;

	}));
	});

	var md5 = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		{
			// CommonJS
			module.exports = factory(core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function (Math) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var Hasher = C_lib.Hasher;
		    var C_algo = C.algo;

		    // Constants table
		    var T = [];

		    // Compute constants
		    (function () {
		        for (var i = 0; i < 64; i++) {
		            T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
		        }
		    }());

		    /**
		     * MD5 hash algorithm.
		     */
		    var MD5 = C_algo.MD5 = Hasher.extend({
		        _doReset: function () {
		            this._hash = new WordArray.init([
		                0x67452301, 0xefcdab89,
		                0x98badcfe, 0x10325476
		            ]);
		        },

		        _doProcessBlock: function (M, offset) {
		            // Swap endian
		            for (var i = 0; i < 16; i++) {
		                // Shortcuts
		                var offset_i = offset + i;
		                var M_offset_i = M[offset_i];

		                M[offset_i] = (
		                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
		                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
		                );
		            }

		            // Shortcuts
		            var H = this._hash.words;

		            var M_offset_0  = M[offset + 0];
		            var M_offset_1  = M[offset + 1];
		            var M_offset_2  = M[offset + 2];
		            var M_offset_3  = M[offset + 3];
		            var M_offset_4  = M[offset + 4];
		            var M_offset_5  = M[offset + 5];
		            var M_offset_6  = M[offset + 6];
		            var M_offset_7  = M[offset + 7];
		            var M_offset_8  = M[offset + 8];
		            var M_offset_9  = M[offset + 9];
		            var M_offset_10 = M[offset + 10];
		            var M_offset_11 = M[offset + 11];
		            var M_offset_12 = M[offset + 12];
		            var M_offset_13 = M[offset + 13];
		            var M_offset_14 = M[offset + 14];
		            var M_offset_15 = M[offset + 15];

		            // Working varialbes
		            var a = H[0];
		            var b = H[1];
		            var c = H[2];
		            var d = H[3];

		            // Computation
		            a = FF(a, b, c, d, M_offset_0,  7,  T[0]);
		            d = FF(d, a, b, c, M_offset_1,  12, T[1]);
		            c = FF(c, d, a, b, M_offset_2,  17, T[2]);
		            b = FF(b, c, d, a, M_offset_3,  22, T[3]);
		            a = FF(a, b, c, d, M_offset_4,  7,  T[4]);
		            d = FF(d, a, b, c, M_offset_5,  12, T[5]);
		            c = FF(c, d, a, b, M_offset_6,  17, T[6]);
		            b = FF(b, c, d, a, M_offset_7,  22, T[7]);
		            a = FF(a, b, c, d, M_offset_8,  7,  T[8]);
		            d = FF(d, a, b, c, M_offset_9,  12, T[9]);
		            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
		            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
		            a = FF(a, b, c, d, M_offset_12, 7,  T[12]);
		            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
		            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
		            b = FF(b, c, d, a, M_offset_15, 22, T[15]);

		            a = GG(a, b, c, d, M_offset_1,  5,  T[16]);
		            d = GG(d, a, b, c, M_offset_6,  9,  T[17]);
		            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
		            b = GG(b, c, d, a, M_offset_0,  20, T[19]);
		            a = GG(a, b, c, d, M_offset_5,  5,  T[20]);
		            d = GG(d, a, b, c, M_offset_10, 9,  T[21]);
		            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
		            b = GG(b, c, d, a, M_offset_4,  20, T[23]);
		            a = GG(a, b, c, d, M_offset_9,  5,  T[24]);
		            d = GG(d, a, b, c, M_offset_14, 9,  T[25]);
		            c = GG(c, d, a, b, M_offset_3,  14, T[26]);
		            b = GG(b, c, d, a, M_offset_8,  20, T[27]);
		            a = GG(a, b, c, d, M_offset_13, 5,  T[28]);
		            d = GG(d, a, b, c, M_offset_2,  9,  T[29]);
		            c = GG(c, d, a, b, M_offset_7,  14, T[30]);
		            b = GG(b, c, d, a, M_offset_12, 20, T[31]);

		            a = HH(a, b, c, d, M_offset_5,  4,  T[32]);
		            d = HH(d, a, b, c, M_offset_8,  11, T[33]);
		            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
		            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
		            a = HH(a, b, c, d, M_offset_1,  4,  T[36]);
		            d = HH(d, a, b, c, M_offset_4,  11, T[37]);
		            c = HH(c, d, a, b, M_offset_7,  16, T[38]);
		            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
		            a = HH(a, b, c, d, M_offset_13, 4,  T[40]);
		            d = HH(d, a, b, c, M_offset_0,  11, T[41]);
		            c = HH(c, d, a, b, M_offset_3,  16, T[42]);
		            b = HH(b, c, d, a, M_offset_6,  23, T[43]);
		            a = HH(a, b, c, d, M_offset_9,  4,  T[44]);
		            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
		            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
		            b = HH(b, c, d, a, M_offset_2,  23, T[47]);

		            a = II(a, b, c, d, M_offset_0,  6,  T[48]);
		            d = II(d, a, b, c, M_offset_7,  10, T[49]);
		            c = II(c, d, a, b, M_offset_14, 15, T[50]);
		            b = II(b, c, d, a, M_offset_5,  21, T[51]);
		            a = II(a, b, c, d, M_offset_12, 6,  T[52]);
		            d = II(d, a, b, c, M_offset_3,  10, T[53]);
		            c = II(c, d, a, b, M_offset_10, 15, T[54]);
		            b = II(b, c, d, a, M_offset_1,  21, T[55]);
		            a = II(a, b, c, d, M_offset_8,  6,  T[56]);
		            d = II(d, a, b, c, M_offset_15, 10, T[57]);
		            c = II(c, d, a, b, M_offset_6,  15, T[58]);
		            b = II(b, c, d, a, M_offset_13, 21, T[59]);
		            a = II(a, b, c, d, M_offset_4,  6,  T[60]);
		            d = II(d, a, b, c, M_offset_11, 10, T[61]);
		            c = II(c, d, a, b, M_offset_2,  15, T[62]);
		            b = II(b, c, d, a, M_offset_9,  21, T[63]);

		            // Intermediate hash value
		            H[0] = (H[0] + a) | 0;
		            H[1] = (H[1] + b) | 0;
		            H[2] = (H[2] + c) | 0;
		            H[3] = (H[3] + d) | 0;
		        },

		        _doFinalize: function () {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;

		            var nBitsTotal = this._nDataBytes * 8;
		            var nBitsLeft = data.sigBytes * 8;

		            // Add padding
		            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);

		            var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
		            var nBitsTotalL = nBitsTotal;
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (
		                (((nBitsTotalH << 8)  | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
		                (((nBitsTotalH << 24) | (nBitsTotalH >>> 8))  & 0xff00ff00)
		            );
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
		                (((nBitsTotalL << 8)  | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
		                (((nBitsTotalL << 24) | (nBitsTotalL >>> 8))  & 0xff00ff00)
		            );

		            data.sigBytes = (dataWords.length + 1) * 4;

		            // Hash final blocks
		            this._process();

		            // Shortcuts
		            var hash = this._hash;
		            var H = hash.words;

		            // Swap endian
		            for (var i = 0; i < 4; i++) {
		                // Shortcut
		                var H_i = H[i];

		                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
		                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
		            }

		            // Return final computed hash
		            return hash;
		        },

		        clone: function () {
		            var clone = Hasher.clone.call(this);
		            clone._hash = this._hash.clone();

		            return clone;
		        }
		    });

		    function FF(a, b, c, d, x, s, t) {
		        var n = a + ((b & c) | (~b & d)) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }

		    function GG(a, b, c, d, x, s, t) {
		        var n = a + ((b & d) | (c & ~d)) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }

		    function HH(a, b, c, d, x, s, t) {
		        var n = a + (b ^ c ^ d) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }

		    function II(a, b, c, d, x, s, t) {
		        var n = a + (c ^ (b | ~d)) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }

		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.MD5('message');
		     *     var hash = CryptoJS.MD5(wordArray);
		     */
		    C.MD5 = Hasher._createHelper(MD5);

		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacMD5(message, key);
		     */
		    C.HmacMD5 = Hasher._createHmacHelper(MD5);
		}(Math));


		return CryptoJS.MD5;

	}));
	});

	var sha1 = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		{
			// CommonJS
			module.exports = factory(core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var Hasher = C_lib.Hasher;
		    var C_algo = C.algo;

		    // Reusable object
		    var W = [];

		    /**
		     * SHA-1 hash algorithm.
		     */
		    var SHA1 = C_algo.SHA1 = Hasher.extend({
		        _doReset: function () {
		            this._hash = new WordArray.init([
		                0x67452301, 0xefcdab89,
		                0x98badcfe, 0x10325476,
		                0xc3d2e1f0
		            ]);
		        },

		        _doProcessBlock: function (M, offset) {
		            // Shortcut
		            var H = this._hash.words;

		            // Working variables
		            var a = H[0];
		            var b = H[1];
		            var c = H[2];
		            var d = H[3];
		            var e = H[4];

		            // Computation
		            for (var i = 0; i < 80; i++) {
		                if (i < 16) {
		                    W[i] = M[offset + i] | 0;
		                } else {
		                    var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
		                    W[i] = (n << 1) | (n >>> 31);
		                }

		                var t = ((a << 5) | (a >>> 27)) + e + W[i];
		                if (i < 20) {
		                    t += ((b & c) | (~b & d)) + 0x5a827999;
		                } else if (i < 40) {
		                    t += (b ^ c ^ d) + 0x6ed9eba1;
		                } else if (i < 60) {
		                    t += ((b & c) | (b & d) | (c & d)) - 0x70e44324;
		                } else /* if (i < 80) */ {
		                    t += (b ^ c ^ d) - 0x359d3e2a;
		                }

		                e = d;
		                d = c;
		                c = (b << 30) | (b >>> 2);
		                b = a;
		                a = t;
		            }

		            // Intermediate hash value
		            H[0] = (H[0] + a) | 0;
		            H[1] = (H[1] + b) | 0;
		            H[2] = (H[2] + c) | 0;
		            H[3] = (H[3] + d) | 0;
		            H[4] = (H[4] + e) | 0;
		        },

		        _doFinalize: function () {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;

		            var nBitsTotal = this._nDataBytes * 8;
		            var nBitsLeft = data.sigBytes * 8;

		            // Add padding
		            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
		            data.sigBytes = dataWords.length * 4;

		            // Hash final blocks
		            this._process();

		            // Return final computed hash
		            return this._hash;
		        },

		        clone: function () {
		            var clone = Hasher.clone.call(this);
		            clone._hash = this._hash.clone();

		            return clone;
		        }
		    });

		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.SHA1('message');
		     *     var hash = CryptoJS.SHA1(wordArray);
		     */
		    C.SHA1 = Hasher._createHelper(SHA1);

		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacSHA1(message, key);
		     */
		    C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
		}());


		return CryptoJS.SHA1;

	}));
	});

	var sha256 = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		{
			// CommonJS
			module.exports = factory(core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function (Math) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var Hasher = C_lib.Hasher;
		    var C_algo = C.algo;

		    // Initialization and round constants tables
		    var H = [];
		    var K = [];

		    // Compute constants
		    (function () {
		        function isPrime(n) {
		            var sqrtN = Math.sqrt(n);
		            for (var factor = 2; factor <= sqrtN; factor++) {
		                if (!(n % factor)) {
		                    return false;
		                }
		            }

		            return true;
		        }

		        function getFractionalBits(n) {
		            return ((n - (n | 0)) * 0x100000000) | 0;
		        }

		        var n = 2;
		        var nPrime = 0;
		        while (nPrime < 64) {
		            if (isPrime(n)) {
		                if (nPrime < 8) {
		                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
		                }
		                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

		                nPrime++;
		            }

		            n++;
		        }
		    }());

		    // Reusable object
		    var W = [];

		    /**
		     * SHA-256 hash algorithm.
		     */
		    var SHA256 = C_algo.SHA256 = Hasher.extend({
		        _doReset: function () {
		            this._hash = new WordArray.init(H.slice(0));
		        },

		        _doProcessBlock: function (M, offset) {
		            // Shortcut
		            var H = this._hash.words;

		            // Working variables
		            var a = H[0];
		            var b = H[1];
		            var c = H[2];
		            var d = H[3];
		            var e = H[4];
		            var f = H[5];
		            var g = H[6];
		            var h = H[7];

		            // Computation
		            for (var i = 0; i < 64; i++) {
		                if (i < 16) {
		                    W[i] = M[offset + i] | 0;
		                } else {
		                    var gamma0x = W[i - 15];
		                    var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
		                                  ((gamma0x << 14) | (gamma0x >>> 18)) ^
		                                   (gamma0x >>> 3);

		                    var gamma1x = W[i - 2];
		                    var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
		                                  ((gamma1x << 13) | (gamma1x >>> 19)) ^
		                                   (gamma1x >>> 10);

		                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
		                }

		                var ch  = (e & f) ^ (~e & g);
		                var maj = (a & b) ^ (a & c) ^ (b & c);

		                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
		                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));

		                var t1 = h + sigma1 + ch + K[i] + W[i];
		                var t2 = sigma0 + maj;

		                h = g;
		                g = f;
		                f = e;
		                e = (d + t1) | 0;
		                d = c;
		                c = b;
		                b = a;
		                a = (t1 + t2) | 0;
		            }

		            // Intermediate hash value
		            H[0] = (H[0] + a) | 0;
		            H[1] = (H[1] + b) | 0;
		            H[2] = (H[2] + c) | 0;
		            H[3] = (H[3] + d) | 0;
		            H[4] = (H[4] + e) | 0;
		            H[5] = (H[5] + f) | 0;
		            H[6] = (H[6] + g) | 0;
		            H[7] = (H[7] + h) | 0;
		        },

		        _doFinalize: function () {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;

		            var nBitsTotal = this._nDataBytes * 8;
		            var nBitsLeft = data.sigBytes * 8;

		            // Add padding
		            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
		            data.sigBytes = dataWords.length * 4;

		            // Hash final blocks
		            this._process();

		            // Return final computed hash
		            return this._hash;
		        },

		        clone: function () {
		            var clone = Hasher.clone.call(this);
		            clone._hash = this._hash.clone();

		            return clone;
		        }
		    });

		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.SHA256('message');
		     *     var hash = CryptoJS.SHA256(wordArray);
		     */
		    C.SHA256 = Hasher._createHelper(SHA256);

		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacSHA256(message, key);
		     */
		    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
		}(Math));


		return CryptoJS.SHA256;

	}));
	});

	var sha224 = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = factory(core, sha256);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var C_algo = C.algo;
		    var SHA256 = C_algo.SHA256;

		    /**
		     * SHA-224 hash algorithm.
		     */
		    var SHA224 = C_algo.SHA224 = SHA256.extend({
		        _doReset: function () {
		            this._hash = new WordArray.init([
		                0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
		                0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
		            ]);
		        },

		        _doFinalize: function () {
		            var hash = SHA256._doFinalize.call(this);

		            hash.sigBytes -= 4;

		            return hash;
		        }
		    });

		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.SHA224('message');
		     *     var hash = CryptoJS.SHA224(wordArray);
		     */
		    C.SHA224 = SHA256._createHelper(SHA224);

		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacSHA224(message, key);
		     */
		    C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
		}());


		return CryptoJS.SHA224;

	}));
	});

	var sha512 = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = factory(core, x64Core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var Hasher = C_lib.Hasher;
		    var C_x64 = C.x64;
		    var X64Word = C_x64.Word;
		    var X64WordArray = C_x64.WordArray;
		    var C_algo = C.algo;

		    function X64Word_create() {
		        return X64Word.create.apply(X64Word, arguments);
		    }

		    // Constants
		    var K = [
		        X64Word_create(0x428a2f98, 0xd728ae22), X64Word_create(0x71374491, 0x23ef65cd),
		        X64Word_create(0xb5c0fbcf, 0xec4d3b2f), X64Word_create(0xe9b5dba5, 0x8189dbbc),
		        X64Word_create(0x3956c25b, 0xf348b538), X64Word_create(0x59f111f1, 0xb605d019),
		        X64Word_create(0x923f82a4, 0xaf194f9b), X64Word_create(0xab1c5ed5, 0xda6d8118),
		        X64Word_create(0xd807aa98, 0xa3030242), X64Word_create(0x12835b01, 0x45706fbe),
		        X64Word_create(0x243185be, 0x4ee4b28c), X64Word_create(0x550c7dc3, 0xd5ffb4e2),
		        X64Word_create(0x72be5d74, 0xf27b896f), X64Word_create(0x80deb1fe, 0x3b1696b1),
		        X64Word_create(0x9bdc06a7, 0x25c71235), X64Word_create(0xc19bf174, 0xcf692694),
		        X64Word_create(0xe49b69c1, 0x9ef14ad2), X64Word_create(0xefbe4786, 0x384f25e3),
		        X64Word_create(0x0fc19dc6, 0x8b8cd5b5), X64Word_create(0x240ca1cc, 0x77ac9c65),
		        X64Word_create(0x2de92c6f, 0x592b0275), X64Word_create(0x4a7484aa, 0x6ea6e483),
		        X64Word_create(0x5cb0a9dc, 0xbd41fbd4), X64Word_create(0x76f988da, 0x831153b5),
		        X64Word_create(0x983e5152, 0xee66dfab), X64Word_create(0xa831c66d, 0x2db43210),
		        X64Word_create(0xb00327c8, 0x98fb213f), X64Word_create(0xbf597fc7, 0xbeef0ee4),
		        X64Word_create(0xc6e00bf3, 0x3da88fc2), X64Word_create(0xd5a79147, 0x930aa725),
		        X64Word_create(0x06ca6351, 0xe003826f), X64Word_create(0x14292967, 0x0a0e6e70),
		        X64Word_create(0x27b70a85, 0x46d22ffc), X64Word_create(0x2e1b2138, 0x5c26c926),
		        X64Word_create(0x4d2c6dfc, 0x5ac42aed), X64Word_create(0x53380d13, 0x9d95b3df),
		        X64Word_create(0x650a7354, 0x8baf63de), X64Word_create(0x766a0abb, 0x3c77b2a8),
		        X64Word_create(0x81c2c92e, 0x47edaee6), X64Word_create(0x92722c85, 0x1482353b),
		        X64Word_create(0xa2bfe8a1, 0x4cf10364), X64Word_create(0xa81a664b, 0xbc423001),
		        X64Word_create(0xc24b8b70, 0xd0f89791), X64Word_create(0xc76c51a3, 0x0654be30),
		        X64Word_create(0xd192e819, 0xd6ef5218), X64Word_create(0xd6990624, 0x5565a910),
		        X64Word_create(0xf40e3585, 0x5771202a), X64Word_create(0x106aa070, 0x32bbd1b8),
		        X64Word_create(0x19a4c116, 0xb8d2d0c8), X64Word_create(0x1e376c08, 0x5141ab53),
		        X64Word_create(0x2748774c, 0xdf8eeb99), X64Word_create(0x34b0bcb5, 0xe19b48a8),
		        X64Word_create(0x391c0cb3, 0xc5c95a63), X64Word_create(0x4ed8aa4a, 0xe3418acb),
		        X64Word_create(0x5b9cca4f, 0x7763e373), X64Word_create(0x682e6ff3, 0xd6b2b8a3),
		        X64Word_create(0x748f82ee, 0x5defb2fc), X64Word_create(0x78a5636f, 0x43172f60),
		        X64Word_create(0x84c87814, 0xa1f0ab72), X64Word_create(0x8cc70208, 0x1a6439ec),
		        X64Word_create(0x90befffa, 0x23631e28), X64Word_create(0xa4506ceb, 0xde82bde9),
		        X64Word_create(0xbef9a3f7, 0xb2c67915), X64Word_create(0xc67178f2, 0xe372532b),
		        X64Word_create(0xca273ece, 0xea26619c), X64Word_create(0xd186b8c7, 0x21c0c207),
		        X64Word_create(0xeada7dd6, 0xcde0eb1e), X64Word_create(0xf57d4f7f, 0xee6ed178),
		        X64Word_create(0x06f067aa, 0x72176fba), X64Word_create(0x0a637dc5, 0xa2c898a6),
		        X64Word_create(0x113f9804, 0xbef90dae), X64Word_create(0x1b710b35, 0x131c471b),
		        X64Word_create(0x28db77f5, 0x23047d84), X64Word_create(0x32caab7b, 0x40c72493),
		        X64Word_create(0x3c9ebe0a, 0x15c9bebc), X64Word_create(0x431d67c4, 0x9c100d4c),
		        X64Word_create(0x4cc5d4be, 0xcb3e42b6), X64Word_create(0x597f299c, 0xfc657e2a),
		        X64Word_create(0x5fcb6fab, 0x3ad6faec), X64Word_create(0x6c44198c, 0x4a475817)
		    ];

		    // Reusable objects
		    var W = [];
		    (function () {
		        for (var i = 0; i < 80; i++) {
		            W[i] = X64Word_create();
		        }
		    }());

		    /**
		     * SHA-512 hash algorithm.
		     */
		    var SHA512 = C_algo.SHA512 = Hasher.extend({
		        _doReset: function () {
		            this._hash = new X64WordArray.init([
		                new X64Word.init(0x6a09e667, 0xf3bcc908), new X64Word.init(0xbb67ae85, 0x84caa73b),
		                new X64Word.init(0x3c6ef372, 0xfe94f82b), new X64Word.init(0xa54ff53a, 0x5f1d36f1),
		                new X64Word.init(0x510e527f, 0xade682d1), new X64Word.init(0x9b05688c, 0x2b3e6c1f),
		                new X64Word.init(0x1f83d9ab, 0xfb41bd6b), new X64Word.init(0x5be0cd19, 0x137e2179)
		            ]);
		        },

		        _doProcessBlock: function (M, offset) {
		            // Shortcuts
		            var H = this._hash.words;

		            var H0 = H[0];
		            var H1 = H[1];
		            var H2 = H[2];
		            var H3 = H[3];
		            var H4 = H[4];
		            var H5 = H[5];
		            var H6 = H[6];
		            var H7 = H[7];

		            var H0h = H0.high;
		            var H0l = H0.low;
		            var H1h = H1.high;
		            var H1l = H1.low;
		            var H2h = H2.high;
		            var H2l = H2.low;
		            var H3h = H3.high;
		            var H3l = H3.low;
		            var H4h = H4.high;
		            var H4l = H4.low;
		            var H5h = H5.high;
		            var H5l = H5.low;
		            var H6h = H6.high;
		            var H6l = H6.low;
		            var H7h = H7.high;
		            var H7l = H7.low;

		            // Working variables
		            var ah = H0h;
		            var al = H0l;
		            var bh = H1h;
		            var bl = H1l;
		            var ch = H2h;
		            var cl = H2l;
		            var dh = H3h;
		            var dl = H3l;
		            var eh = H4h;
		            var el = H4l;
		            var fh = H5h;
		            var fl = H5l;
		            var gh = H6h;
		            var gl = H6l;
		            var hh = H7h;
		            var hl = H7l;

		            // Rounds
		            for (var i = 0; i < 80; i++) {
		                var Wil;
		                var Wih;

		                // Shortcut
		                var Wi = W[i];

		                // Extend message
		                if (i < 16) {
		                    Wih = Wi.high = M[offset + i * 2]     | 0;
		                    Wil = Wi.low  = M[offset + i * 2 + 1] | 0;
		                } else {
		                    // Gamma0
		                    var gamma0x  = W[i - 15];
		                    var gamma0xh = gamma0x.high;
		                    var gamma0xl = gamma0x.low;
		                    var gamma0h  = ((gamma0xh >>> 1) | (gamma0xl << 31)) ^ ((gamma0xh >>> 8) | (gamma0xl << 24)) ^ (gamma0xh >>> 7);
		                    var gamma0l  = ((gamma0xl >>> 1) | (gamma0xh << 31)) ^ ((gamma0xl >>> 8) | (gamma0xh << 24)) ^ ((gamma0xl >>> 7) | (gamma0xh << 25));

		                    // Gamma1
		                    var gamma1x  = W[i - 2];
		                    var gamma1xh = gamma1x.high;
		                    var gamma1xl = gamma1x.low;
		                    var gamma1h  = ((gamma1xh >>> 19) | (gamma1xl << 13)) ^ ((gamma1xh << 3) | (gamma1xl >>> 29)) ^ (gamma1xh >>> 6);
		                    var gamma1l  = ((gamma1xl >>> 19) | (gamma1xh << 13)) ^ ((gamma1xl << 3) | (gamma1xh >>> 29)) ^ ((gamma1xl >>> 6) | (gamma1xh << 26));

		                    // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
		                    var Wi7  = W[i - 7];
		                    var Wi7h = Wi7.high;
		                    var Wi7l = Wi7.low;

		                    var Wi16  = W[i - 16];
		                    var Wi16h = Wi16.high;
		                    var Wi16l = Wi16.low;

		                    Wil = gamma0l + Wi7l;
		                    Wih = gamma0h + Wi7h + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0);
		                    Wil = Wil + gamma1l;
		                    Wih = Wih + gamma1h + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0);
		                    Wil = Wil + Wi16l;
		                    Wih = Wih + Wi16h + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0);

		                    Wi.high = Wih;
		                    Wi.low  = Wil;
		                }

		                var chh  = (eh & fh) ^ (~eh & gh);
		                var chl  = (el & fl) ^ (~el & gl);
		                var majh = (ah & bh) ^ (ah & ch) ^ (bh & ch);
		                var majl = (al & bl) ^ (al & cl) ^ (bl & cl);

		                var sigma0h = ((ah >>> 28) | (al << 4))  ^ ((ah << 30)  | (al >>> 2)) ^ ((ah << 25) | (al >>> 7));
		                var sigma0l = ((al >>> 28) | (ah << 4))  ^ ((al << 30)  | (ah >>> 2)) ^ ((al << 25) | (ah >>> 7));
		                var sigma1h = ((eh >>> 14) | (el << 18)) ^ ((eh >>> 18) | (el << 14)) ^ ((eh << 23) | (el >>> 9));
		                var sigma1l = ((el >>> 14) | (eh << 18)) ^ ((el >>> 18) | (eh << 14)) ^ ((el << 23) | (eh >>> 9));

		                // t1 = h + sigma1 + ch + K[i] + W[i]
		                var Ki  = K[i];
		                var Kih = Ki.high;
		                var Kil = Ki.low;

		                var t1l = hl + sigma1l;
		                var t1h = hh + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0);
		                var t1l = t1l + chl;
		                var t1h = t1h + chh + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0);
		                var t1l = t1l + Kil;
		                var t1h = t1h + Kih + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0);
		                var t1l = t1l + Wil;
		                var t1h = t1h + Wih + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0);

		                // t2 = sigma0 + maj
		                var t2l = sigma0l + majl;
		                var t2h = sigma0h + majh + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0);

		                // Update working variables
		                hh = gh;
		                hl = gl;
		                gh = fh;
		                gl = fl;
		                fh = eh;
		                fl = el;
		                el = (dl + t1l) | 0;
		                eh = (dh + t1h + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0;
		                dh = ch;
		                dl = cl;
		                ch = bh;
		                cl = bl;
		                bh = ah;
		                bl = al;
		                al = (t1l + t2l) | 0;
		                ah = (t1h + t2h + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0;
		            }

		            // Intermediate hash value
		            H0l = H0.low  = (H0l + al);
		            H0.high = (H0h + ah + ((H0l >>> 0) < (al >>> 0) ? 1 : 0));
		            H1l = H1.low  = (H1l + bl);
		            H1.high = (H1h + bh + ((H1l >>> 0) < (bl >>> 0) ? 1 : 0));
		            H2l = H2.low  = (H2l + cl);
		            H2.high = (H2h + ch + ((H2l >>> 0) < (cl >>> 0) ? 1 : 0));
		            H3l = H3.low  = (H3l + dl);
		            H3.high = (H3h + dh + ((H3l >>> 0) < (dl >>> 0) ? 1 : 0));
		            H4l = H4.low  = (H4l + el);
		            H4.high = (H4h + eh + ((H4l >>> 0) < (el >>> 0) ? 1 : 0));
		            H5l = H5.low  = (H5l + fl);
		            H5.high = (H5h + fh + ((H5l >>> 0) < (fl >>> 0) ? 1 : 0));
		            H6l = H6.low  = (H6l + gl);
		            H6.high = (H6h + gh + ((H6l >>> 0) < (gl >>> 0) ? 1 : 0));
		            H7l = H7.low  = (H7l + hl);
		            H7.high = (H7h + hh + ((H7l >>> 0) < (hl >>> 0) ? 1 : 0));
		        },

		        _doFinalize: function () {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;

		            var nBitsTotal = this._nDataBytes * 8;
		            var nBitsLeft = data.sigBytes * 8;

		            // Add padding
		            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
		            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 30] = Math.floor(nBitsTotal / 0x100000000);
		            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 31] = nBitsTotal;
		            data.sigBytes = dataWords.length * 4;

		            // Hash final blocks
		            this._process();

		            // Convert hash to 32-bit word array before returning
		            var hash = this._hash.toX32();

		            // Return final computed hash
		            return hash;
		        },

		        clone: function () {
		            var clone = Hasher.clone.call(this);
		            clone._hash = this._hash.clone();

		            return clone;
		        },

		        blockSize: 1024/32
		    });

		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.SHA512('message');
		     *     var hash = CryptoJS.SHA512(wordArray);
		     */
		    C.SHA512 = Hasher._createHelper(SHA512);

		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacSHA512(message, key);
		     */
		    C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
		}());


		return CryptoJS.SHA512;

	}));
	});

	var sha384 = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = factory(core, x64Core, sha512);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_x64 = C.x64;
		    var X64Word = C_x64.Word;
		    var X64WordArray = C_x64.WordArray;
		    var C_algo = C.algo;
		    var SHA512 = C_algo.SHA512;

		    /**
		     * SHA-384 hash algorithm.
		     */
		    var SHA384 = C_algo.SHA384 = SHA512.extend({
		        _doReset: function () {
		            this._hash = new X64WordArray.init([
		                new X64Word.init(0xcbbb9d5d, 0xc1059ed8), new X64Word.init(0x629a292a, 0x367cd507),
		                new X64Word.init(0x9159015a, 0x3070dd17), new X64Word.init(0x152fecd8, 0xf70e5939),
		                new X64Word.init(0x67332667, 0xffc00b31), new X64Word.init(0x8eb44a87, 0x68581511),
		                new X64Word.init(0xdb0c2e0d, 0x64f98fa7), new X64Word.init(0x47b5481d, 0xbefa4fa4)
		            ]);
		        },

		        _doFinalize: function () {
		            var hash = SHA512._doFinalize.call(this);

		            hash.sigBytes -= 16;

		            return hash;
		        }
		    });

		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.SHA384('message');
		     *     var hash = CryptoJS.SHA384(wordArray);
		     */
		    C.SHA384 = SHA512._createHelper(SHA384);

		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacSHA384(message, key);
		     */
		    C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
		}());


		return CryptoJS.SHA384;

	}));
	});

	var sha3 = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = factory(core, x64Core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function (Math) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var Hasher = C_lib.Hasher;
		    var C_x64 = C.x64;
		    var X64Word = C_x64.Word;
		    var C_algo = C.algo;

		    // Constants tables
		    var RHO_OFFSETS = [];
		    var PI_INDEXES  = [];
		    var ROUND_CONSTANTS = [];

		    // Compute Constants
		    (function () {
		        // Compute rho offset constants
		        var x = 1, y = 0;
		        for (var t = 0; t < 24; t++) {
		            RHO_OFFSETS[x + 5 * y] = ((t + 1) * (t + 2) / 2) % 64;

		            var newX = y % 5;
		            var newY = (2 * x + 3 * y) % 5;
		            x = newX;
		            y = newY;
		        }

		        // Compute pi index constants
		        for (var x = 0; x < 5; x++) {
		            for (var y = 0; y < 5; y++) {
		                PI_INDEXES[x + 5 * y] = y + ((2 * x + 3 * y) % 5) * 5;
		            }
		        }

		        // Compute round constants
		        var LFSR = 0x01;
		        for (var i = 0; i < 24; i++) {
		            var roundConstantMsw = 0;
		            var roundConstantLsw = 0;

		            for (var j = 0; j < 7; j++) {
		                if (LFSR & 0x01) {
		                    var bitPosition = (1 << j) - 1;
		                    if (bitPosition < 32) {
		                        roundConstantLsw ^= 1 << bitPosition;
		                    } else /* if (bitPosition >= 32) */ {
		                        roundConstantMsw ^= 1 << (bitPosition - 32);
		                    }
		                }

		                // Compute next LFSR
		                if (LFSR & 0x80) {
		                    // Primitive polynomial over GF(2): x^8 + x^6 + x^5 + x^4 + 1
		                    LFSR = (LFSR << 1) ^ 0x71;
		                } else {
		                    LFSR <<= 1;
		                }
		            }

		            ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);
		        }
		    }());

		    // Reusable objects for temporary values
		    var T = [];
		    (function () {
		        for (var i = 0; i < 25; i++) {
		            T[i] = X64Word.create();
		        }
		    }());

		    /**
		     * SHA-3 hash algorithm.
		     */
		    var SHA3 = C_algo.SHA3 = Hasher.extend({
		        /**
		         * Configuration options.
		         *
		         * @property {number} outputLength
		         *   The desired number of bits in the output hash.
		         *   Only values permitted are: 224, 256, 384, 512.
		         *   Default: 512
		         */
		        cfg: Hasher.cfg.extend({
		            outputLength: 512
		        }),

		        _doReset: function () {
		            var state = this._state = [];
		            for (var i = 0; i < 25; i++) {
		                state[i] = new X64Word.init();
		            }

		            this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
		        },

		        _doProcessBlock: function (M, offset) {
		            // Shortcuts
		            var state = this._state;
		            var nBlockSizeLanes = this.blockSize / 2;

		            // Absorb
		            for (var i = 0; i < nBlockSizeLanes; i++) {
		                // Shortcuts
		                var M2i  = M[offset + 2 * i];
		                var M2i1 = M[offset + 2 * i + 1];

		                // Swap endian
		                M2i = (
		                    (((M2i << 8)  | (M2i >>> 24)) & 0x00ff00ff) |
		                    (((M2i << 24) | (M2i >>> 8))  & 0xff00ff00)
		                );
		                M2i1 = (
		                    (((M2i1 << 8)  | (M2i1 >>> 24)) & 0x00ff00ff) |
		                    (((M2i1 << 24) | (M2i1 >>> 8))  & 0xff00ff00)
		                );

		                // Absorb message into state
		                var lane = state[i];
		                lane.high ^= M2i1;
		                lane.low  ^= M2i;
		            }

		            // Rounds
		            for (var round = 0; round < 24; round++) {
		                // Theta
		                for (var x = 0; x < 5; x++) {
		                    // Mix column lanes
		                    var tMsw = 0, tLsw = 0;
		                    for (var y = 0; y < 5; y++) {
		                        var lane = state[x + 5 * y];
		                        tMsw ^= lane.high;
		                        tLsw ^= lane.low;
		                    }

		                    // Temporary values
		                    var Tx = T[x];
		                    Tx.high = tMsw;
		                    Tx.low  = tLsw;
		                }
		                for (var x = 0; x < 5; x++) {
		                    // Shortcuts
		                    var Tx4 = T[(x + 4) % 5];
		                    var Tx1 = T[(x + 1) % 5];
		                    var Tx1Msw = Tx1.high;
		                    var Tx1Lsw = Tx1.low;

		                    // Mix surrounding columns
		                    var tMsw = Tx4.high ^ ((Tx1Msw << 1) | (Tx1Lsw >>> 31));
		                    var tLsw = Tx4.low  ^ ((Tx1Lsw << 1) | (Tx1Msw >>> 31));
		                    for (var y = 0; y < 5; y++) {
		                        var lane = state[x + 5 * y];
		                        lane.high ^= tMsw;
		                        lane.low  ^= tLsw;
		                    }
		                }

		                // Rho Pi
		                for (var laneIndex = 1; laneIndex < 25; laneIndex++) {
		                    var tMsw;
		                    var tLsw;

		                    // Shortcuts
		                    var lane = state[laneIndex];
		                    var laneMsw = lane.high;
		                    var laneLsw = lane.low;
		                    var rhoOffset = RHO_OFFSETS[laneIndex];

		                    // Rotate lanes
		                    if (rhoOffset < 32) {
		                        tMsw = (laneMsw << rhoOffset) | (laneLsw >>> (32 - rhoOffset));
		                        tLsw = (laneLsw << rhoOffset) | (laneMsw >>> (32 - rhoOffset));
		                    } else /* if (rhoOffset >= 32) */ {
		                        tMsw = (laneLsw << (rhoOffset - 32)) | (laneMsw >>> (64 - rhoOffset));
		                        tLsw = (laneMsw << (rhoOffset - 32)) | (laneLsw >>> (64 - rhoOffset));
		                    }

		                    // Transpose lanes
		                    var TPiLane = T[PI_INDEXES[laneIndex]];
		                    TPiLane.high = tMsw;
		                    TPiLane.low  = tLsw;
		                }

		                // Rho pi at x = y = 0
		                var T0 = T[0];
		                var state0 = state[0];
		                T0.high = state0.high;
		                T0.low  = state0.low;

		                // Chi
		                for (var x = 0; x < 5; x++) {
		                    for (var y = 0; y < 5; y++) {
		                        // Shortcuts
		                        var laneIndex = x + 5 * y;
		                        var lane = state[laneIndex];
		                        var TLane = T[laneIndex];
		                        var Tx1Lane = T[((x + 1) % 5) + 5 * y];
		                        var Tx2Lane = T[((x + 2) % 5) + 5 * y];

		                        // Mix rows
		                        lane.high = TLane.high ^ (~Tx1Lane.high & Tx2Lane.high);
		                        lane.low  = TLane.low  ^ (~Tx1Lane.low  & Tx2Lane.low);
		                    }
		                }

		                // Iota
		                var lane = state[0];
		                var roundConstant = ROUND_CONSTANTS[round];
		                lane.high ^= roundConstant.high;
		                lane.low  ^= roundConstant.low;
		            }
		        },

		        _doFinalize: function () {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;
		            this._nDataBytes * 8;
		            var nBitsLeft = data.sigBytes * 8;
		            var blockSizeBits = this.blockSize * 32;

		            // Add padding
		            dataWords[nBitsLeft >>> 5] |= 0x1 << (24 - nBitsLeft % 32);
		            dataWords[((Math.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits) >>> 5) - 1] |= 0x80;
		            data.sigBytes = dataWords.length * 4;

		            // Hash final blocks
		            this._process();

		            // Shortcuts
		            var state = this._state;
		            var outputLengthBytes = this.cfg.outputLength / 8;
		            var outputLengthLanes = outputLengthBytes / 8;

		            // Squeeze
		            var hashWords = [];
		            for (var i = 0; i < outputLengthLanes; i++) {
		                // Shortcuts
		                var lane = state[i];
		                var laneMsw = lane.high;
		                var laneLsw = lane.low;

		                // Swap endian
		                laneMsw = (
		                    (((laneMsw << 8)  | (laneMsw >>> 24)) & 0x00ff00ff) |
		                    (((laneMsw << 24) | (laneMsw >>> 8))  & 0xff00ff00)
		                );
		                laneLsw = (
		                    (((laneLsw << 8)  | (laneLsw >>> 24)) & 0x00ff00ff) |
		                    (((laneLsw << 24) | (laneLsw >>> 8))  & 0xff00ff00)
		                );

		                // Squeeze state to retrieve hash
		                hashWords.push(laneLsw);
		                hashWords.push(laneMsw);
		            }

		            // Return final computed hash
		            return new WordArray.init(hashWords, outputLengthBytes);
		        },

		        clone: function () {
		            var clone = Hasher.clone.call(this);

		            var state = clone._state = this._state.slice(0);
		            for (var i = 0; i < 25; i++) {
		                state[i] = state[i].clone();
		            }

		            return clone;
		        }
		    });

		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.SHA3('message');
		     *     var hash = CryptoJS.SHA3(wordArray);
		     */
		    C.SHA3 = Hasher._createHelper(SHA3);

		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacSHA3(message, key);
		     */
		    C.HmacSHA3 = Hasher._createHmacHelper(SHA3);
		}(Math));


		return CryptoJS.SHA3;

	}));
	});

	var ripemd160 = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		{
			// CommonJS
			module.exports = factory(core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		/** @preserve
		(c) 2012 by Cédric Mesnil. All rights reserved.

		Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

		    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
		    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

		THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
		*/

		(function (Math) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var Hasher = C_lib.Hasher;
		    var C_algo = C.algo;

		    // Constants table
		    var _zl = WordArray.create([
		        0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15,
		        7,  4, 13,  1, 10,  6, 15,  3, 12,  0,  9,  5,  2, 14, 11,  8,
		        3, 10, 14,  4,  9, 15,  8,  1,  2,  7,  0,  6, 13, 11,  5, 12,
		        1,  9, 11, 10,  0,  8, 12,  4, 13,  3,  7, 15, 14,  5,  6,  2,
		        4,  0,  5,  9,  7, 12,  2, 10, 14,  1,  3,  8, 11,  6, 15, 13]);
		    var _zr = WordArray.create([
		        5, 14,  7,  0,  9,  2, 11,  4, 13,  6, 15,  8,  1, 10,  3, 12,
		        6, 11,  3,  7,  0, 13,  5, 10, 14, 15,  8, 12,  4,  9,  1,  2,
		        15,  5,  1,  3,  7, 14,  6,  9, 11,  8, 12,  2, 10,  0,  4, 13,
		        8,  6,  4,  1,  3, 11, 15,  0,  5, 12,  2, 13,  9,  7, 10, 14,
		        12, 15, 10,  4,  1,  5,  8,  7,  6,  2, 13, 14,  0,  3,  9, 11]);
		    var _sl = WordArray.create([
		         11, 14, 15, 12,  5,  8,  7,  9, 11, 13, 14, 15,  6,  7,  9,  8,
		        7, 6,   8, 13, 11,  9,  7, 15,  7, 12, 15,  9, 11,  7, 13, 12,
		        11, 13,  6,  7, 14,  9, 13, 15, 14,  8, 13,  6,  5, 12,  7,  5,
		          11, 12, 14, 15, 14, 15,  9,  8,  9, 14,  5,  6,  8,  6,  5, 12,
		        9, 15,  5, 11,  6,  8, 13, 12,  5, 12, 13, 14, 11,  8,  5,  6 ]);
		    var _sr = WordArray.create([
		        8,  9,  9, 11, 13, 15, 15,  5,  7,  7,  8, 11, 14, 14, 12,  6,
		        9, 13, 15,  7, 12,  8,  9, 11,  7,  7, 12,  7,  6, 15, 13, 11,
		        9,  7, 15, 11,  8,  6,  6, 14, 12, 13,  5, 14, 13, 13,  7,  5,
		        15,  5,  8, 11, 14, 14,  6, 14,  6,  9, 12,  9, 12,  5, 15,  8,
		        8,  5, 12,  9, 12,  5, 14,  6,  8, 13,  6,  5, 15, 13, 11, 11 ]);

		    var _hl =  WordArray.create([ 0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E]);
		    var _hr =  WordArray.create([ 0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000]);

		    /**
		     * RIPEMD160 hash algorithm.
		     */
		    var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
		        _doReset: function () {
		            this._hash  = WordArray.create([0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0]);
		        },

		        _doProcessBlock: function (M, offset) {

		            // Swap endian
		            for (var i = 0; i < 16; i++) {
		                // Shortcuts
		                var offset_i = offset + i;
		                var M_offset_i = M[offset_i];

		                // Swap
		                M[offset_i] = (
		                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
		                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
		                );
		            }
		            // Shortcut
		            var H  = this._hash.words;
		            var hl = _hl.words;
		            var hr = _hr.words;
		            var zl = _zl.words;
		            var zr = _zr.words;
		            var sl = _sl.words;
		            var sr = _sr.words;

		            // Working variables
		            var al, bl, cl, dl, el;
		            var ar, br, cr, dr, er;

		            ar = al = H[0];
		            br = bl = H[1];
		            cr = cl = H[2];
		            dr = dl = H[3];
		            er = el = H[4];
		            // Computation
		            var t;
		            for (var i = 0; i < 80; i += 1) {
		                t = (al +  M[offset+zl[i]])|0;
		                if (i<16){
			            t +=  f1(bl,cl,dl) + hl[0];
		                } else if (i<32) {
			            t +=  f2(bl,cl,dl) + hl[1];
		                } else if (i<48) {
			            t +=  f3(bl,cl,dl) + hl[2];
		                } else if (i<64) {
			            t +=  f4(bl,cl,dl) + hl[3];
		                } else {// if (i<80) {
			            t +=  f5(bl,cl,dl) + hl[4];
		                }
		                t = t|0;
		                t =  rotl(t,sl[i]);
		                t = (t+el)|0;
		                al = el;
		                el = dl;
		                dl = rotl(cl, 10);
		                cl = bl;
		                bl = t;

		                t = (ar + M[offset+zr[i]])|0;
		                if (i<16){
			            t +=  f5(br,cr,dr) + hr[0];
		                } else if (i<32) {
			            t +=  f4(br,cr,dr) + hr[1];
		                } else if (i<48) {
			            t +=  f3(br,cr,dr) + hr[2];
		                } else if (i<64) {
			            t +=  f2(br,cr,dr) + hr[3];
		                } else {// if (i<80) {
			            t +=  f1(br,cr,dr) + hr[4];
		                }
		                t = t|0;
		                t =  rotl(t,sr[i]) ;
		                t = (t+er)|0;
		                ar = er;
		                er = dr;
		                dr = rotl(cr, 10);
		                cr = br;
		                br = t;
		            }
		            // Intermediate hash value
		            t    = (H[1] + cl + dr)|0;
		            H[1] = (H[2] + dl + er)|0;
		            H[2] = (H[3] + el + ar)|0;
		            H[3] = (H[4] + al + br)|0;
		            H[4] = (H[0] + bl + cr)|0;
		            H[0] =  t;
		        },

		        _doFinalize: function () {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;

		            var nBitsTotal = this._nDataBytes * 8;
		            var nBitsLeft = data.sigBytes * 8;

		            // Add padding
		            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
		                (((nBitsTotal << 8)  | (nBitsTotal >>> 24)) & 0x00ff00ff) |
		                (((nBitsTotal << 24) | (nBitsTotal >>> 8))  & 0xff00ff00)
		            );
		            data.sigBytes = (dataWords.length + 1) * 4;

		            // Hash final blocks
		            this._process();

		            // Shortcuts
		            var hash = this._hash;
		            var H = hash.words;

		            // Swap endian
		            for (var i = 0; i < 5; i++) {
		                // Shortcut
		                var H_i = H[i];

		                // Swap
		                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
		                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
		            }

		            // Return final computed hash
		            return hash;
		        },

		        clone: function () {
		            var clone = Hasher.clone.call(this);
		            clone._hash = this._hash.clone();

		            return clone;
		        }
		    });


		    function f1(x, y, z) {
		        return ((x) ^ (y) ^ (z));

		    }

		    function f2(x, y, z) {
		        return (((x)&(y)) | ((~x)&(z)));
		    }

		    function f3(x, y, z) {
		        return (((x) | (~(y))) ^ (z));
		    }

		    function f4(x, y, z) {
		        return (((x) & (z)) | ((y)&(~(z))));
		    }

		    function f5(x, y, z) {
		        return ((x) ^ ((y) |(~(z))));

		    }

		    function rotl(x,n) {
		        return (x<<n) | (x>>>(32-n));
		    }


		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.RIPEMD160('message');
		     *     var hash = CryptoJS.RIPEMD160(wordArray);
		     */
		    C.RIPEMD160 = Hasher._createHelper(RIPEMD160);

		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacRIPEMD160(message, key);
		     */
		    C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
		}());


		return CryptoJS.RIPEMD160;

	}));
	});

	var hmac = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		{
			// CommonJS
			module.exports = factory(core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var Base = C_lib.Base;
		    var C_enc = C.enc;
		    var Utf8 = C_enc.Utf8;
		    var C_algo = C.algo;

		    /**
		     * HMAC algorithm.
		     */
		    C_algo.HMAC = Base.extend({
		        /**
		         * Initializes a newly created HMAC.
		         *
		         * @param {Hasher} hasher The hash algorithm to use.
		         * @param {WordArray|string} key The secret key.
		         *
		         * @example
		         *
		         *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
		         */
		        init: function (hasher, key) {
		            // Init hasher
		            hasher = this._hasher = new hasher.init();

		            // Convert string to WordArray, else assume WordArray already
		            if (typeof key == 'string') {
		                key = Utf8.parse(key);
		            }

		            // Shortcuts
		            var hasherBlockSize = hasher.blockSize;
		            var hasherBlockSizeBytes = hasherBlockSize * 4;

		            // Allow arbitrary length keys
		            if (key.sigBytes > hasherBlockSizeBytes) {
		                key = hasher.finalize(key);
		            }

		            // Clamp excess bits
		            key.clamp();

		            // Clone key for inner and outer pads
		            var oKey = this._oKey = key.clone();
		            var iKey = this._iKey = key.clone();

		            // Shortcuts
		            var oKeyWords = oKey.words;
		            var iKeyWords = iKey.words;

		            // XOR keys with pad constants
		            for (var i = 0; i < hasherBlockSize; i++) {
		                oKeyWords[i] ^= 0x5c5c5c5c;
		                iKeyWords[i] ^= 0x36363636;
		            }
		            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

		            // Set initial values
		            this.reset();
		        },

		        /**
		         * Resets this HMAC to its initial state.
		         *
		         * @example
		         *
		         *     hmacHasher.reset();
		         */
		        reset: function () {
		            // Shortcut
		            var hasher = this._hasher;

		            // Reset
		            hasher.reset();
		            hasher.update(this._iKey);
		        },

		        /**
		         * Updates this HMAC with a message.
		         *
		         * @param {WordArray|string} messageUpdate The message to append.
		         *
		         * @return {HMAC} This HMAC instance.
		         *
		         * @example
		         *
		         *     hmacHasher.update('message');
		         *     hmacHasher.update(wordArray);
		         */
		        update: function (messageUpdate) {
		            this._hasher.update(messageUpdate);

		            // Chainable
		            return this;
		        },

		        /**
		         * Finalizes the HMAC computation.
		         * Note that the finalize operation is effectively a destructive, read-once operation.
		         *
		         * @param {WordArray|string} messageUpdate (Optional) A final message update.
		         *
		         * @return {WordArray} The HMAC.
		         *
		         * @example
		         *
		         *     var hmac = hmacHasher.finalize();
		         *     var hmac = hmacHasher.finalize('message');
		         *     var hmac = hmacHasher.finalize(wordArray);
		         */
		        finalize: function (messageUpdate) {
		            // Shortcut
		            var hasher = this._hasher;

		            // Compute HMAC
		            var innerHash = hasher.finalize(messageUpdate);
		            hasher.reset();
		            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));

		            return hmac;
		        }
		    });
		}());


	}));
	});

	var pbkdf2 = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = factory(core, sha1, hmac);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var Base = C_lib.Base;
		    var WordArray = C_lib.WordArray;
		    var C_algo = C.algo;
		    var SHA1 = C_algo.SHA1;
		    var HMAC = C_algo.HMAC;

		    /**
		     * Password-Based Key Derivation Function 2 algorithm.
		     */
		    var PBKDF2 = C_algo.PBKDF2 = Base.extend({
		        /**
		         * Configuration options.
		         *
		         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
		         * @property {Hasher} hasher The hasher to use. Default: SHA1
		         * @property {number} iterations The number of iterations to perform. Default: 1
		         */
		        cfg: Base.extend({
		            keySize: 128/32,
		            hasher: SHA1,
		            iterations: 1
		        }),

		        /**
		         * Initializes a newly created key derivation function.
		         *
		         * @param {Object} cfg (Optional) The configuration options to use for the derivation.
		         *
		         * @example
		         *
		         *     var kdf = CryptoJS.algo.PBKDF2.create();
		         *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8 });
		         *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8, iterations: 1000 });
		         */
		        init: function (cfg) {
		            this.cfg = this.cfg.extend(cfg);
		        },

		        /**
		         * Computes the Password-Based Key Derivation Function 2.
		         *
		         * @param {WordArray|string} password The password.
		         * @param {WordArray|string} salt A salt.
		         *
		         * @return {WordArray} The derived key.
		         *
		         * @example
		         *
		         *     var key = kdf.compute(password, salt);
		         */
		        compute: function (password, salt) {
		            // Shortcut
		            var cfg = this.cfg;

		            // Init HMAC
		            var hmac = HMAC.create(cfg.hasher, password);

		            // Initial values
		            var derivedKey = WordArray.create();
		            var blockIndex = WordArray.create([0x00000001]);

		            // Shortcuts
		            var derivedKeyWords = derivedKey.words;
		            var blockIndexWords = blockIndex.words;
		            var keySize = cfg.keySize;
		            var iterations = cfg.iterations;

		            // Generate key
		            while (derivedKeyWords.length < keySize) {
		                var block = hmac.update(salt).finalize(blockIndex);
		                hmac.reset();

		                // Shortcuts
		                var blockWords = block.words;
		                var blockWordsLength = blockWords.length;

		                // Iterations
		                var intermediate = block;
		                for (var i = 1; i < iterations; i++) {
		                    intermediate = hmac.finalize(intermediate);
		                    hmac.reset();

		                    // Shortcut
		                    var intermediateWords = intermediate.words;

		                    // XOR intermediate with block
		                    for (var j = 0; j < blockWordsLength; j++) {
		                        blockWords[j] ^= intermediateWords[j];
		                    }
		                }

		                derivedKey.concat(block);
		                blockIndexWords[0]++;
		            }
		            derivedKey.sigBytes = keySize * 4;

		            return derivedKey;
		        }
		    });

		    /**
		     * Computes the Password-Based Key Derivation Function 2.
		     *
		     * @param {WordArray|string} password The password.
		     * @param {WordArray|string} salt A salt.
		     * @param {Object} cfg (Optional) The configuration options to use for this computation.
		     *
		     * @return {WordArray} The derived key.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var key = CryptoJS.PBKDF2(password, salt);
		     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8 });
		     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8, iterations: 1000 });
		     */
		    C.PBKDF2 = function (password, salt, cfg) {
		        return PBKDF2.create(cfg).compute(password, salt);
		    };
		}());


		return CryptoJS.PBKDF2;

	}));
	});

	var evpkdf = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = factory(core, sha1, hmac);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var Base = C_lib.Base;
		    var WordArray = C_lib.WordArray;
		    var C_algo = C.algo;
		    var MD5 = C_algo.MD5;

		    /**
		     * This key derivation function is meant to conform with EVP_BytesToKey.
		     * www.openssl.org/docs/crypto/EVP_BytesToKey.html
		     */
		    var EvpKDF = C_algo.EvpKDF = Base.extend({
		        /**
		         * Configuration options.
		         *
		         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
		         * @property {Hasher} hasher The hash algorithm to use. Default: MD5
		         * @property {number} iterations The number of iterations to perform. Default: 1
		         */
		        cfg: Base.extend({
		            keySize: 128/32,
		            hasher: MD5,
		            iterations: 1
		        }),

		        /**
		         * Initializes a newly created key derivation function.
		         *
		         * @param {Object} cfg (Optional) The configuration options to use for the derivation.
		         *
		         * @example
		         *
		         *     var kdf = CryptoJS.algo.EvpKDF.create();
		         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
		         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
		         */
		        init: function (cfg) {
		            this.cfg = this.cfg.extend(cfg);
		        },

		        /**
		         * Derives a key from a password.
		         *
		         * @param {WordArray|string} password The password.
		         * @param {WordArray|string} salt A salt.
		         *
		         * @return {WordArray} The derived key.
		         *
		         * @example
		         *
		         *     var key = kdf.compute(password, salt);
		         */
		        compute: function (password, salt) {
		            var block;

		            // Shortcut
		            var cfg = this.cfg;

		            // Init hasher
		            var hasher = cfg.hasher.create();

		            // Initial values
		            var derivedKey = WordArray.create();

		            // Shortcuts
		            var derivedKeyWords = derivedKey.words;
		            var keySize = cfg.keySize;
		            var iterations = cfg.iterations;

		            // Generate key
		            while (derivedKeyWords.length < keySize) {
		                if (block) {
		                    hasher.update(block);
		                }
		                block = hasher.update(password).finalize(salt);
		                hasher.reset();

		                // Iterations
		                for (var i = 1; i < iterations; i++) {
		                    block = hasher.finalize(block);
		                    hasher.reset();
		                }

		                derivedKey.concat(block);
		            }
		            derivedKey.sigBytes = keySize * 4;

		            return derivedKey;
		        }
		    });

		    /**
		     * Derives a key from a password.
		     *
		     * @param {WordArray|string} password The password.
		     * @param {WordArray|string} salt A salt.
		     * @param {Object} cfg (Optional) The configuration options to use for this computation.
		     *
		     * @return {WordArray} The derived key.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var key = CryptoJS.EvpKDF(password, salt);
		     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8 });
		     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8, iterations: 1000 });
		     */
		    C.EvpKDF = function (password, salt, cfg) {
		        return EvpKDF.create(cfg).compute(password, salt);
		    };
		}());


		return CryptoJS.EvpKDF;

	}));
	});

	var cipherCore = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = factory(core, evpkdf);
		}
	}(commonjsGlobal, function (CryptoJS) {

		/**
		 * Cipher core components.
		 */
		CryptoJS.lib.Cipher || (function (undefined$1) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var Base = C_lib.Base;
		    var WordArray = C_lib.WordArray;
		    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
		    var C_enc = C.enc;
		    C_enc.Utf8;
		    var Base64 = C_enc.Base64;
		    var C_algo = C.algo;
		    var EvpKDF = C_algo.EvpKDF;

		    /**
		     * Abstract base cipher template.
		     *
		     * @property {number} keySize This cipher's key size. Default: 4 (128 bits)
		     * @property {number} ivSize This cipher's IV size. Default: 4 (128 bits)
		     * @property {number} _ENC_XFORM_MODE A constant representing encryption mode.
		     * @property {number} _DEC_XFORM_MODE A constant representing decryption mode.
		     */
		    var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
		        /**
		         * Configuration options.
		         *
		         * @property {WordArray} iv The IV to use for this operation.
		         */
		        cfg: Base.extend(),

		        /**
		         * Creates this cipher in encryption mode.
		         *
		         * @param {WordArray} key The key.
		         * @param {Object} cfg (Optional) The configuration options to use for this operation.
		         *
		         * @return {Cipher} A cipher instance.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
		         */
		        createEncryptor: function (key, cfg) {
		            return this.create(this._ENC_XFORM_MODE, key, cfg);
		        },

		        /**
		         * Creates this cipher in decryption mode.
		         *
		         * @param {WordArray} key The key.
		         * @param {Object} cfg (Optional) The configuration options to use for this operation.
		         *
		         * @return {Cipher} A cipher instance.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
		         */
		        createDecryptor: function (key, cfg) {
		            return this.create(this._DEC_XFORM_MODE, key, cfg);
		        },

		        /**
		         * Initializes a newly created cipher.
		         *
		         * @param {number} xformMode Either the encryption or decryption transormation mode constant.
		         * @param {WordArray} key The key.
		         * @param {Object} cfg (Optional) The configuration options to use for this operation.
		         *
		         * @example
		         *
		         *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
		         */
		        init: function (xformMode, key, cfg) {
		            // Apply config defaults
		            this.cfg = this.cfg.extend(cfg);

		            // Store transform mode and key
		            this._xformMode = xformMode;
		            this._key = key;

		            // Set initial values
		            this.reset();
		        },

		        /**
		         * Resets this cipher to its initial state.
		         *
		         * @example
		         *
		         *     cipher.reset();
		         */
		        reset: function () {
		            // Reset data buffer
		            BufferedBlockAlgorithm.reset.call(this);

		            // Perform concrete-cipher logic
		            this._doReset();
		        },

		        /**
		         * Adds data to be encrypted or decrypted.
		         *
		         * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
		         *
		         * @return {WordArray} The data after processing.
		         *
		         * @example
		         *
		         *     var encrypted = cipher.process('data');
		         *     var encrypted = cipher.process(wordArray);
		         */
		        process: function (dataUpdate) {
		            // Append
		            this._append(dataUpdate);

		            // Process available blocks
		            return this._process();
		        },

		        /**
		         * Finalizes the encryption or decryption process.
		         * Note that the finalize operation is effectively a destructive, read-once operation.
		         *
		         * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
		         *
		         * @return {WordArray} The data after final processing.
		         *
		         * @example
		         *
		         *     var encrypted = cipher.finalize();
		         *     var encrypted = cipher.finalize('data');
		         *     var encrypted = cipher.finalize(wordArray);
		         */
		        finalize: function (dataUpdate) {
		            // Final data update
		            if (dataUpdate) {
		                this._append(dataUpdate);
		            }

		            // Perform concrete-cipher logic
		            var finalProcessedData = this._doFinalize();

		            return finalProcessedData;
		        },

		        keySize: 128/32,

		        ivSize: 128/32,

		        _ENC_XFORM_MODE: 1,

		        _DEC_XFORM_MODE: 2,

		        /**
		         * Creates shortcut functions to a cipher's object interface.
		         *
		         * @param {Cipher} cipher The cipher to create a helper for.
		         *
		         * @return {Object} An object with encrypt and decrypt shortcut functions.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
		         */
		        _createHelper: (function () {
		            function selectCipherStrategy(key) {
		                if (typeof key == 'string') {
		                    return PasswordBasedCipher;
		                } else {
		                    return SerializableCipher;
		                }
		            }

		            return function (cipher) {
		                return {
		                    encrypt: function (message, key, cfg) {
		                        return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
		                    },

		                    decrypt: function (ciphertext, key, cfg) {
		                        return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
		                    }
		                };
		            };
		        }())
		    });

		    /**
		     * Abstract base stream cipher template.
		     *
		     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 1 (32 bits)
		     */
		    C_lib.StreamCipher = Cipher.extend({
		        _doFinalize: function () {
		            // Process partial blocks
		            var finalProcessedBlocks = this._process(!!'flush');

		            return finalProcessedBlocks;
		        },

		        blockSize: 1
		    });

		    /**
		     * Mode namespace.
		     */
		    var C_mode = C.mode = {};

		    /**
		     * Abstract base block cipher mode template.
		     */
		    var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
		        /**
		         * Creates this mode for encryption.
		         *
		         * @param {Cipher} cipher A block cipher instance.
		         * @param {Array} iv The IV words.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
		         */
		        createEncryptor: function (cipher, iv) {
		            return this.Encryptor.create(cipher, iv);
		        },

		        /**
		         * Creates this mode for decryption.
		         *
		         * @param {Cipher} cipher A block cipher instance.
		         * @param {Array} iv The IV words.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
		         */
		        createDecryptor: function (cipher, iv) {
		            return this.Decryptor.create(cipher, iv);
		        },

		        /**
		         * Initializes a newly created mode.
		         *
		         * @param {Cipher} cipher A block cipher instance.
		         * @param {Array} iv The IV words.
		         *
		         * @example
		         *
		         *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
		         */
		        init: function (cipher, iv) {
		            this._cipher = cipher;
		            this._iv = iv;
		        }
		    });

		    /**
		     * Cipher Block Chaining mode.
		     */
		    var CBC = C_mode.CBC = (function () {
		        /**
		         * Abstract base CBC mode.
		         */
		        var CBC = BlockCipherMode.extend();

		        /**
		         * CBC encryptor.
		         */
		        CBC.Encryptor = CBC.extend({
		            /**
		             * Processes the data block at offset.
		             *
		             * @param {Array} words The data words to operate on.
		             * @param {number} offset The offset where the block starts.
		             *
		             * @example
		             *
		             *     mode.processBlock(data.words, offset);
		             */
		            processBlock: function (words, offset) {
		                // Shortcuts
		                var cipher = this._cipher;
		                var blockSize = cipher.blockSize;

		                // XOR and encrypt
		                xorBlock.call(this, words, offset, blockSize);
		                cipher.encryptBlock(words, offset);

		                // Remember this block to use with next block
		                this._prevBlock = words.slice(offset, offset + blockSize);
		            }
		        });

		        /**
		         * CBC decryptor.
		         */
		        CBC.Decryptor = CBC.extend({
		            /**
		             * Processes the data block at offset.
		             *
		             * @param {Array} words The data words to operate on.
		             * @param {number} offset The offset where the block starts.
		             *
		             * @example
		             *
		             *     mode.processBlock(data.words, offset);
		             */
		            processBlock: function (words, offset) {
		                // Shortcuts
		                var cipher = this._cipher;
		                var blockSize = cipher.blockSize;

		                // Remember this block to use with next block
		                var thisBlock = words.slice(offset, offset + blockSize);

		                // Decrypt and XOR
		                cipher.decryptBlock(words, offset);
		                xorBlock.call(this, words, offset, blockSize);

		                // This block becomes the previous block
		                this._prevBlock = thisBlock;
		            }
		        });

		        function xorBlock(words, offset, blockSize) {
		            var block;

		            // Shortcut
		            var iv = this._iv;

		            // Choose mixing block
		            if (iv) {
		                block = iv;

		                // Remove IV for subsequent blocks
		                this._iv = undefined$1;
		            } else {
		                block = this._prevBlock;
		            }

		            // XOR blocks
		            for (var i = 0; i < blockSize; i++) {
		                words[offset + i] ^= block[i];
		            }
		        }

		        return CBC;
		    }());

		    /**
		     * Padding namespace.
		     */
		    var C_pad = C.pad = {};

		    /**
		     * PKCS #5/7 padding strategy.
		     */
		    var Pkcs7 = C_pad.Pkcs7 = {
		        /**
		         * Pads data using the algorithm defined in PKCS #5/7.
		         *
		         * @param {WordArray} data The data to pad.
		         * @param {number} blockSize The multiple that the data should be padded to.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
		         */
		        pad: function (data, blockSize) {
		            // Shortcut
		            var blockSizeBytes = blockSize * 4;

		            // Count padding bytes
		            var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

		            // Create padding word
		            var paddingWord = (nPaddingBytes << 24) | (nPaddingBytes << 16) | (nPaddingBytes << 8) | nPaddingBytes;

		            // Create padding
		            var paddingWords = [];
		            for (var i = 0; i < nPaddingBytes; i += 4) {
		                paddingWords.push(paddingWord);
		            }
		            var padding = WordArray.create(paddingWords, nPaddingBytes);

		            // Add padding
		            data.concat(padding);
		        },

		        /**
		         * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
		         *
		         * @param {WordArray} data The data to unpad.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     CryptoJS.pad.Pkcs7.unpad(wordArray);
		         */
		        unpad: function (data) {
		            // Get number of padding bytes from last byte
		            var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

		            // Remove padding
		            data.sigBytes -= nPaddingBytes;
		        }
		    };

		    /**
		     * Abstract base block cipher template.
		     *
		     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 4 (128 bits)
		     */
		    C_lib.BlockCipher = Cipher.extend({
		        /**
		         * Configuration options.
		         *
		         * @property {Mode} mode The block mode to use. Default: CBC
		         * @property {Padding} padding The padding strategy to use. Default: Pkcs7
		         */
		        cfg: Cipher.cfg.extend({
		            mode: CBC,
		            padding: Pkcs7
		        }),

		        reset: function () {
		            var modeCreator;

		            // Reset cipher
		            Cipher.reset.call(this);

		            // Shortcuts
		            var cfg = this.cfg;
		            var iv = cfg.iv;
		            var mode = cfg.mode;

		            // Reset block mode
		            if (this._xformMode == this._ENC_XFORM_MODE) {
		                modeCreator = mode.createEncryptor;
		            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
		                modeCreator = mode.createDecryptor;
		                // Keep at least one block in the buffer for unpadding
		                this._minBufferSize = 1;
		            }

		            if (this._mode && this._mode.__creator == modeCreator) {
		                this._mode.init(this, iv && iv.words);
		            } else {
		                this._mode = modeCreator.call(mode, this, iv && iv.words);
		                this._mode.__creator = modeCreator;
		            }
		        },

		        _doProcessBlock: function (words, offset) {
		            this._mode.processBlock(words, offset);
		        },

		        _doFinalize: function () {
		            var finalProcessedBlocks;

		            // Shortcut
		            var padding = this.cfg.padding;

		            // Finalize
		            if (this._xformMode == this._ENC_XFORM_MODE) {
		                // Pad data
		                padding.pad(this._data, this.blockSize);

		                // Process final blocks
		                finalProcessedBlocks = this._process(!!'flush');
		            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
		                // Process final blocks
		                finalProcessedBlocks = this._process(!!'flush');

		                // Unpad data
		                padding.unpad(finalProcessedBlocks);
		            }

		            return finalProcessedBlocks;
		        },

		        blockSize: 128/32
		    });

		    /**
		     * A collection of cipher parameters.
		     *
		     * @property {WordArray} ciphertext The raw ciphertext.
		     * @property {WordArray} key The key to this ciphertext.
		     * @property {WordArray} iv The IV used in the ciphering operation.
		     * @property {WordArray} salt The salt used with a key derivation function.
		     * @property {Cipher} algorithm The cipher algorithm.
		     * @property {Mode} mode The block mode used in the ciphering operation.
		     * @property {Padding} padding The padding scheme used in the ciphering operation.
		     * @property {number} blockSize The block size of the cipher.
		     * @property {Format} formatter The default formatting strategy to convert this cipher params object to a string.
		     */
		    var CipherParams = C_lib.CipherParams = Base.extend({
		        /**
		         * Initializes a newly created cipher params object.
		         *
		         * @param {Object} cipherParams An object with any of the possible cipher parameters.
		         *
		         * @example
		         *
		         *     var cipherParams = CryptoJS.lib.CipherParams.create({
		         *         ciphertext: ciphertextWordArray,
		         *         key: keyWordArray,
		         *         iv: ivWordArray,
		         *         salt: saltWordArray,
		         *         algorithm: CryptoJS.algo.AES,
		         *         mode: CryptoJS.mode.CBC,
		         *         padding: CryptoJS.pad.PKCS7,
		         *         blockSize: 4,
		         *         formatter: CryptoJS.format.OpenSSL
		         *     });
		         */
		        init: function (cipherParams) {
		            this.mixIn(cipherParams);
		        },

		        /**
		         * Converts this cipher params object to a string.
		         *
		         * @param {Format} formatter (Optional) The formatting strategy to use.
		         *
		         * @return {string} The stringified cipher params.
		         *
		         * @throws Error If neither the formatter nor the default formatter is set.
		         *
		         * @example
		         *
		         *     var string = cipherParams + '';
		         *     var string = cipherParams.toString();
		         *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
		         */
		        toString: function (formatter) {
		            return (formatter || this.formatter).stringify(this);
		        }
		    });

		    /**
		     * Format namespace.
		     */
		    var C_format = C.format = {};

		    /**
		     * OpenSSL formatting strategy.
		     */
		    var OpenSSLFormatter = C_format.OpenSSL = {
		        /**
		         * Converts a cipher params object to an OpenSSL-compatible string.
		         *
		         * @param {CipherParams} cipherParams The cipher params object.
		         *
		         * @return {string} The OpenSSL-compatible string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
		         */
		        stringify: function (cipherParams) {
		            var wordArray;

		            // Shortcuts
		            var ciphertext = cipherParams.ciphertext;
		            var salt = cipherParams.salt;

		            // Format
		            if (salt) {
		                wordArray = WordArray.create([0x53616c74, 0x65645f5f]).concat(salt).concat(ciphertext);
		            } else {
		                wordArray = ciphertext;
		            }

		            return wordArray.toString(Base64);
		        },

		        /**
		         * Converts an OpenSSL-compatible string to a cipher params object.
		         *
		         * @param {string} openSSLStr The OpenSSL-compatible string.
		         *
		         * @return {CipherParams} The cipher params object.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
		         */
		        parse: function (openSSLStr) {
		            var salt;

		            // Parse base64
		            var ciphertext = Base64.parse(openSSLStr);

		            // Shortcut
		            var ciphertextWords = ciphertext.words;

		            // Test for salt
		            if (ciphertextWords[0] == 0x53616c74 && ciphertextWords[1] == 0x65645f5f) {
		                // Extract salt
		                salt = WordArray.create(ciphertextWords.slice(2, 4));

		                // Remove salt from ciphertext
		                ciphertextWords.splice(0, 4);
		                ciphertext.sigBytes -= 16;
		            }

		            return CipherParams.create({ ciphertext: ciphertext, salt: salt });
		        }
		    };

		    /**
		     * A cipher wrapper that returns ciphertext as a serializable cipher params object.
		     */
		    var SerializableCipher = C_lib.SerializableCipher = Base.extend({
		        /**
		         * Configuration options.
		         *
		         * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
		         */
		        cfg: Base.extend({
		            format: OpenSSLFormatter
		        }),

		        /**
		         * Encrypts a message.
		         *
		         * @param {Cipher} cipher The cipher algorithm to use.
		         * @param {WordArray|string} message The message to encrypt.
		         * @param {WordArray} key The key.
		         * @param {Object} cfg (Optional) The configuration options to use for this operation.
		         *
		         * @return {CipherParams} A cipher params object.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
		         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
		         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
		         */
		        encrypt: function (cipher, message, key, cfg) {
		            // Apply config defaults
		            cfg = this.cfg.extend(cfg);

		            // Encrypt
		            var encryptor = cipher.createEncryptor(key, cfg);
		            var ciphertext = encryptor.finalize(message);

		            // Shortcut
		            var cipherCfg = encryptor.cfg;

		            // Create and return serializable cipher params
		            return CipherParams.create({
		                ciphertext: ciphertext,
		                key: key,
		                iv: cipherCfg.iv,
		                algorithm: cipher,
		                mode: cipherCfg.mode,
		                padding: cipherCfg.padding,
		                blockSize: cipher.blockSize,
		                formatter: cfg.format
		            });
		        },

		        /**
		         * Decrypts serialized ciphertext.
		         *
		         * @param {Cipher} cipher The cipher algorithm to use.
		         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
		         * @param {WordArray} key The key.
		         * @param {Object} cfg (Optional) The configuration options to use for this operation.
		         *
		         * @return {WordArray} The plaintext.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
		         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
		         */
		        decrypt: function (cipher, ciphertext, key, cfg) {
		            // Apply config defaults
		            cfg = this.cfg.extend(cfg);

		            // Convert string to CipherParams
		            ciphertext = this._parse(ciphertext, cfg.format);

		            // Decrypt
		            var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);

		            return plaintext;
		        },

		        /**
		         * Converts serialized ciphertext to CipherParams,
		         * else assumed CipherParams already and returns ciphertext unchanged.
		         *
		         * @param {CipherParams|string} ciphertext The ciphertext.
		         * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
		         *
		         * @return {CipherParams} The unserialized ciphertext.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
		         */
		        _parse: function (ciphertext, format) {
		            if (typeof ciphertext == 'string') {
		                return format.parse(ciphertext, this);
		            } else {
		                return ciphertext;
		            }
		        }
		    });

		    /**
		     * Key derivation function namespace.
		     */
		    var C_kdf = C.kdf = {};

		    /**
		     * OpenSSL key derivation function.
		     */
		    var OpenSSLKdf = C_kdf.OpenSSL = {
		        /**
		         * Derives a key and IV from a password.
		         *
		         * @param {string} password The password to derive from.
		         * @param {number} keySize The size in words of the key to generate.
		         * @param {number} ivSize The size in words of the IV to generate.
		         * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
		         *
		         * @return {CipherParams} A cipher params object with the key, IV, and salt.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
		         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
		         */
		        execute: function (password, keySize, ivSize, salt) {
		            // Generate random salt
		            if (!salt) {
		                salt = WordArray.random(64/8);
		            }

		            // Derive key and IV
		            var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);

		            // Separate key and IV
		            var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
		            key.sigBytes = keySize * 4;

		            // Return params
		            return CipherParams.create({ key: key, iv: iv, salt: salt });
		        }
		    };

		    /**
		     * A serializable cipher wrapper that derives the key from a password,
		     * and returns ciphertext as a serializable cipher params object.
		     */
		    var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
		        /**
		         * Configuration options.
		         *
		         * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
		         */
		        cfg: SerializableCipher.cfg.extend({
		            kdf: OpenSSLKdf
		        }),

		        /**
		         * Encrypts a message using a password.
		         *
		         * @param {Cipher} cipher The cipher algorithm to use.
		         * @param {WordArray|string} message The message to encrypt.
		         * @param {string} password The password.
		         * @param {Object} cfg (Optional) The configuration options to use for this operation.
		         *
		         * @return {CipherParams} A cipher params object.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
		         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
		         */
		        encrypt: function (cipher, message, password, cfg) {
		            // Apply config defaults
		            cfg = this.cfg.extend(cfg);

		            // Derive key and other params
		            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);

		            // Add IV to config
		            cfg.iv = derivedParams.iv;

		            // Encrypt
		            var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);

		            // Mix in derived params
		            ciphertext.mixIn(derivedParams);

		            return ciphertext;
		        },

		        /**
		         * Decrypts serialized ciphertext using a password.
		         *
		         * @param {Cipher} cipher The cipher algorithm to use.
		         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
		         * @param {string} password The password.
		         * @param {Object} cfg (Optional) The configuration options to use for this operation.
		         *
		         * @return {WordArray} The plaintext.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
		         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
		         */
		        decrypt: function (cipher, ciphertext, password, cfg) {
		            // Apply config defaults
		            cfg = this.cfg.extend(cfg);

		            // Convert string to CipherParams
		            ciphertext = this._parse(ciphertext, cfg.format);

		            // Derive key and other params
		            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);

		            // Add IV to config
		            cfg.iv = derivedParams.iv;

		            // Decrypt
		            var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);

		            return plaintext;
		        }
		    });
		}());


	}));
	});

	var modeCfb = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = factory(core, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		/**
		 * Cipher Feedback block mode.
		 */
		CryptoJS.mode.CFB = (function () {
		    var CFB = CryptoJS.lib.BlockCipherMode.extend();

		    CFB.Encryptor = CFB.extend({
		        processBlock: function (words, offset) {
		            // Shortcuts
		            var cipher = this._cipher;
		            var blockSize = cipher.blockSize;

		            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

		            // Remember this block to use with next block
		            this._prevBlock = words.slice(offset, offset + blockSize);
		        }
		    });

		    CFB.Decryptor = CFB.extend({
		        processBlock: function (words, offset) {
		            // Shortcuts
		            var cipher = this._cipher;
		            var blockSize = cipher.blockSize;

		            // Remember this block to use with next block
		            var thisBlock = words.slice(offset, offset + blockSize);

		            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

		            // This block becomes the previous block
		            this._prevBlock = thisBlock;
		        }
		    });

		    function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
		        var keystream;

		        // Shortcut
		        var iv = this._iv;

		        // Generate keystream
		        if (iv) {
		            keystream = iv.slice(0);

		            // Remove IV for subsequent blocks
		            this._iv = undefined;
		        } else {
		            keystream = this._prevBlock;
		        }
		        cipher.encryptBlock(keystream, 0);

		        // Encrypt
		        for (var i = 0; i < blockSize; i++) {
		            words[offset + i] ^= keystream[i];
		        }
		    }

		    return CFB;
		}());


		return CryptoJS.mode.CFB;

	}));
	});

	var modeCtr = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = factory(core, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		/**
		 * Counter block mode.
		 */
		CryptoJS.mode.CTR = (function () {
		    var CTR = CryptoJS.lib.BlockCipherMode.extend();

		    var Encryptor = CTR.Encryptor = CTR.extend({
		        processBlock: function (words, offset) {
		            // Shortcuts
		            var cipher = this._cipher;
		            var blockSize = cipher.blockSize;
		            var iv = this._iv;
		            var counter = this._counter;

		            // Generate keystream
		            if (iv) {
		                counter = this._counter = iv.slice(0);

		                // Remove IV for subsequent blocks
		                this._iv = undefined;
		            }
		            var keystream = counter.slice(0);
		            cipher.encryptBlock(keystream, 0);

		            // Increment counter
		            counter[blockSize - 1] = (counter[blockSize - 1] + 1) | 0;

		            // Encrypt
		            for (var i = 0; i < blockSize; i++) {
		                words[offset + i] ^= keystream[i];
		            }
		        }
		    });

		    CTR.Decryptor = Encryptor;

		    return CTR;
		}());


		return CryptoJS.mode.CTR;

	}));
	});

	var modeCtrGladman = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = factory(core, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		/** @preserve
		 * Counter block mode compatible with  Dr Brian Gladman fileenc.c
		 * derived from CryptoJS.mode.CTR
		 * Jan Hruby jhruby.web@gmail.com
		 */
		CryptoJS.mode.CTRGladman = (function () {
		    var CTRGladman = CryptoJS.lib.BlockCipherMode.extend();

			function incWord(word)
			{
				if (((word >> 24) & 0xff) === 0xff) { //overflow
				var b1 = (word >> 16)&0xff;
				var b2 = (word >> 8)&0xff;
				var b3 = word & 0xff;

				if (b1 === 0xff) // overflow b1
				{
				b1 = 0;
				if (b2 === 0xff)
				{
					b2 = 0;
					if (b3 === 0xff)
					{
						b3 = 0;
					}
					else
					{
						++b3;
					}
				}
				else
				{
					++b2;
				}
				}
				else
				{
				++b1;
				}

				word = 0;
				word += (b1 << 16);
				word += (b2 << 8);
				word += b3;
				}
				else
				{
				word += (0x01 << 24);
				}
				return word;
			}

			function incCounter(counter)
			{
				if ((counter[0] = incWord(counter[0])) === 0)
				{
					// encr_data in fileenc.c from  Dr Brian Gladman's counts only with DWORD j < 8
					counter[1] = incWord(counter[1]);
				}
				return counter;
			}

		    var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
		        processBlock: function (words, offset) {
		            // Shortcuts
		            var cipher = this._cipher;
		            var blockSize = cipher.blockSize;
		            var iv = this._iv;
		            var counter = this._counter;

		            // Generate keystream
		            if (iv) {
		                counter = this._counter = iv.slice(0);

		                // Remove IV for subsequent blocks
		                this._iv = undefined;
		            }

					incCounter(counter);

					var keystream = counter.slice(0);
		            cipher.encryptBlock(keystream, 0);

		            // Encrypt
		            for (var i = 0; i < blockSize; i++) {
		                words[offset + i] ^= keystream[i];
		            }
		        }
		    });

		    CTRGladman.Decryptor = Encryptor;

		    return CTRGladman;
		}());




		return CryptoJS.mode.CTRGladman;

	}));
	});

	var modeOfb = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = factory(core, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		/**
		 * Output Feedback block mode.
		 */
		CryptoJS.mode.OFB = (function () {
		    var OFB = CryptoJS.lib.BlockCipherMode.extend();

		    var Encryptor = OFB.Encryptor = OFB.extend({
		        processBlock: function (words, offset) {
		            // Shortcuts
		            var cipher = this._cipher;
		            var blockSize = cipher.blockSize;
		            var iv = this._iv;
		            var keystream = this._keystream;

		            // Generate keystream
		            if (iv) {
		                keystream = this._keystream = iv.slice(0);

		                // Remove IV for subsequent blocks
		                this._iv = undefined;
		            }
		            cipher.encryptBlock(keystream, 0);

		            // Encrypt
		            for (var i = 0; i < blockSize; i++) {
		                words[offset + i] ^= keystream[i];
		            }
		        }
		    });

		    OFB.Decryptor = Encryptor;

		    return OFB;
		}());


		return CryptoJS.mode.OFB;

	}));
	});

	var modeEcb = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = factory(core, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		/**
		 * Electronic Codebook block mode.
		 */
		CryptoJS.mode.ECB = (function () {
		    var ECB = CryptoJS.lib.BlockCipherMode.extend();

		    ECB.Encryptor = ECB.extend({
		        processBlock: function (words, offset) {
		            this._cipher.encryptBlock(words, offset);
		        }
		    });

		    ECB.Decryptor = ECB.extend({
		        processBlock: function (words, offset) {
		            this._cipher.decryptBlock(words, offset);
		        }
		    });

		    return ECB;
		}());


		return CryptoJS.mode.ECB;

	}));
	});

	var padAnsix923 = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = factory(core, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		/**
		 * ANSI X.923 padding strategy.
		 */
		CryptoJS.pad.AnsiX923 = {
		    pad: function (data, blockSize) {
		        // Shortcuts
		        var dataSigBytes = data.sigBytes;
		        var blockSizeBytes = blockSize * 4;

		        // Count padding bytes
		        var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;

		        // Compute last byte position
		        var lastBytePos = dataSigBytes + nPaddingBytes - 1;

		        // Pad
		        data.clamp();
		        data.words[lastBytePos >>> 2] |= nPaddingBytes << (24 - (lastBytePos % 4) * 8);
		        data.sigBytes += nPaddingBytes;
		    },

		    unpad: function (data) {
		        // Get number of padding bytes from last byte
		        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

		        // Remove padding
		        data.sigBytes -= nPaddingBytes;
		    }
		};


		return CryptoJS.pad.Ansix923;

	}));
	});

	var padIso10126 = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = factory(core, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		/**
		 * ISO 10126 padding strategy.
		 */
		CryptoJS.pad.Iso10126 = {
		    pad: function (data, blockSize) {
		        // Shortcut
		        var blockSizeBytes = blockSize * 4;

		        // Count padding bytes
		        var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

		        // Pad
		        data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes - 1)).
		             concat(CryptoJS.lib.WordArray.create([nPaddingBytes << 24], 1));
		    },

		    unpad: function (data) {
		        // Get number of padding bytes from last byte
		        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

		        // Remove padding
		        data.sigBytes -= nPaddingBytes;
		    }
		};


		return CryptoJS.pad.Iso10126;

	}));
	});

	var padIso97971 = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = factory(core, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		/**
		 * ISO/IEC 9797-1 Padding Method 2.
		 */
		CryptoJS.pad.Iso97971 = {
		    pad: function (data, blockSize) {
		        // Add 0x80 byte
		        data.concat(CryptoJS.lib.WordArray.create([0x80000000], 1));

		        // Zero pad the rest
		        CryptoJS.pad.ZeroPadding.pad(data, blockSize);
		    },

		    unpad: function (data) {
		        // Remove zero padding
		        CryptoJS.pad.ZeroPadding.unpad(data);

		        // Remove one more byte -- the 0x80 byte
		        data.sigBytes--;
		    }
		};


		return CryptoJS.pad.Iso97971;

	}));
	});

	var padZeropadding = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = factory(core, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		/**
		 * Zero padding strategy.
		 */
		CryptoJS.pad.ZeroPadding = {
		    pad: function (data, blockSize) {
		        // Shortcut
		        var blockSizeBytes = blockSize * 4;

		        // Pad
		        data.clamp();
		        data.sigBytes += blockSizeBytes - ((data.sigBytes % blockSizeBytes) || blockSizeBytes);
		    },

		    unpad: function (data) {
		        // Shortcut
		        var dataWords = data.words;

		        // Unpad
		        var i = data.sigBytes - 1;
		        for (var i = data.sigBytes - 1; i >= 0; i--) {
		            if (((dataWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff)) {
		                data.sigBytes = i + 1;
		                break;
		            }
		        }
		    }
		};


		return CryptoJS.pad.ZeroPadding;

	}));
	});

	var padNopadding = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = factory(core, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		/**
		 * A noop padding strategy.
		 */
		CryptoJS.pad.NoPadding = {
		    pad: function () {
		    },

		    unpad: function () {
		    }
		};


		return CryptoJS.pad.NoPadding;

	}));
	});

	var formatHex = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = factory(core, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function (undefined$1) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var CipherParams = C_lib.CipherParams;
		    var C_enc = C.enc;
		    var Hex = C_enc.Hex;
		    var C_format = C.format;

		    C_format.Hex = {
		        /**
		         * Converts the ciphertext of a cipher params object to a hexadecimally encoded string.
		         *
		         * @param {CipherParams} cipherParams The cipher params object.
		         *
		         * @return {string} The hexadecimally encoded string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var hexString = CryptoJS.format.Hex.stringify(cipherParams);
		         */
		        stringify: function (cipherParams) {
		            return cipherParams.ciphertext.toString(Hex);
		        },

		        /**
		         * Converts a hexadecimally encoded ciphertext string to a cipher params object.
		         *
		         * @param {string} input The hexadecimally encoded string.
		         *
		         * @return {CipherParams} The cipher params object.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var cipherParams = CryptoJS.format.Hex.parse(hexString);
		         */
		        parse: function (input) {
		            var ciphertext = Hex.parse(input);
		            return CipherParams.create({ ciphertext: ciphertext });
		        }
		    };
		}());


		return CryptoJS.format.Hex;

	}));
	});

	var aes = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = factory(core, encBase64, md5, evpkdf, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var BlockCipher = C_lib.BlockCipher;
		    var C_algo = C.algo;

		    // Lookup tables
		    var SBOX = [];
		    var INV_SBOX = [];
		    var SUB_MIX_0 = [];
		    var SUB_MIX_1 = [];
		    var SUB_MIX_2 = [];
		    var SUB_MIX_3 = [];
		    var INV_SUB_MIX_0 = [];
		    var INV_SUB_MIX_1 = [];
		    var INV_SUB_MIX_2 = [];
		    var INV_SUB_MIX_3 = [];

		    // Compute lookup tables
		    (function () {
		        // Compute double table
		        var d = [];
		        for (var i = 0; i < 256; i++) {
		            if (i < 128) {
		                d[i] = i << 1;
		            } else {
		                d[i] = (i << 1) ^ 0x11b;
		            }
		        }

		        // Walk GF(2^8)
		        var x = 0;
		        var xi = 0;
		        for (var i = 0; i < 256; i++) {
		            // Compute sbox
		            var sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
		            sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
		            SBOX[x] = sx;
		            INV_SBOX[sx] = x;

		            // Compute multiplication
		            var x2 = d[x];
		            var x4 = d[x2];
		            var x8 = d[x4];

		            // Compute sub bytes, mix columns tables
		            var t = (d[sx] * 0x101) ^ (sx * 0x1010100);
		            SUB_MIX_0[x] = (t << 24) | (t >>> 8);
		            SUB_MIX_1[x] = (t << 16) | (t >>> 16);
		            SUB_MIX_2[x] = (t << 8)  | (t >>> 24);
		            SUB_MIX_3[x] = t;

		            // Compute inv sub bytes, inv mix columns tables
		            var t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
		            INV_SUB_MIX_0[sx] = (t << 24) | (t >>> 8);
		            INV_SUB_MIX_1[sx] = (t << 16) | (t >>> 16);
		            INV_SUB_MIX_2[sx] = (t << 8)  | (t >>> 24);
		            INV_SUB_MIX_3[sx] = t;

		            // Compute next counter
		            if (!x) {
		                x = xi = 1;
		            } else {
		                x = x2 ^ d[d[d[x8 ^ x2]]];
		                xi ^= d[d[xi]];
		            }
		        }
		    }());

		    // Precomputed Rcon lookup
		    var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];

		    /**
		     * AES block cipher algorithm.
		     */
		    var AES = C_algo.AES = BlockCipher.extend({
		        _doReset: function () {
		            var t;

		            // Skip reset of nRounds has been set before and key did not change
		            if (this._nRounds && this._keyPriorReset === this._key) {
		                return;
		            }

		            // Shortcuts
		            var key = this._keyPriorReset = this._key;
		            var keyWords = key.words;
		            var keySize = key.sigBytes / 4;

		            // Compute number of rounds
		            var nRounds = this._nRounds = keySize + 6;

		            // Compute number of key schedule rows
		            var ksRows = (nRounds + 1) * 4;

		            // Compute key schedule
		            var keySchedule = this._keySchedule = [];
		            for (var ksRow = 0; ksRow < ksRows; ksRow++) {
		                if (ksRow < keySize) {
		                    keySchedule[ksRow] = keyWords[ksRow];
		                } else {
		                    t = keySchedule[ksRow - 1];

		                    if (!(ksRow % keySize)) {
		                        // Rot word
		                        t = (t << 8) | (t >>> 24);

		                        // Sub word
		                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];

		                        // Mix Rcon
		                        t ^= RCON[(ksRow / keySize) | 0] << 24;
		                    } else if (keySize > 6 && ksRow % keySize == 4) {
		                        // Sub word
		                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
		                    }

		                    keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
		                }
		            }

		            // Compute inv key schedule
		            var invKeySchedule = this._invKeySchedule = [];
		            for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
		                var ksRow = ksRows - invKsRow;

		                if (invKsRow % 4) {
		                    var t = keySchedule[ksRow];
		                } else {
		                    var t = keySchedule[ksRow - 4];
		                }

		                if (invKsRow < 4 || ksRow <= 4) {
		                    invKeySchedule[invKsRow] = t;
		                } else {
		                    invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[(t >>> 16) & 0xff]] ^
		                                               INV_SUB_MIX_2[SBOX[(t >>> 8) & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]];
		                }
		            }
		        },

		        encryptBlock: function (M, offset) {
		            this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
		        },

		        decryptBlock: function (M, offset) {
		            // Swap 2nd and 4th rows
		            var t = M[offset + 1];
		            M[offset + 1] = M[offset + 3];
		            M[offset + 3] = t;

		            this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);

		            // Inv swap 2nd and 4th rows
		            var t = M[offset + 1];
		            M[offset + 1] = M[offset + 3];
		            M[offset + 3] = t;
		        },

		        _doCryptBlock: function (M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
		            // Shortcut
		            var nRounds = this._nRounds;

		            // Get input, add round key
		            var s0 = M[offset]     ^ keySchedule[0];
		            var s1 = M[offset + 1] ^ keySchedule[1];
		            var s2 = M[offset + 2] ^ keySchedule[2];
		            var s3 = M[offset + 3] ^ keySchedule[3];

		            // Key schedule row counter
		            var ksRow = 4;

		            // Rounds
		            for (var round = 1; round < nRounds; round++) {
		                // Shift rows, sub bytes, mix columns, add round key
		                var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[(s1 >>> 16) & 0xff] ^ SUB_MIX_2[(s2 >>> 8) & 0xff] ^ SUB_MIX_3[s3 & 0xff] ^ keySchedule[ksRow++];
		                var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[(s2 >>> 16) & 0xff] ^ SUB_MIX_2[(s3 >>> 8) & 0xff] ^ SUB_MIX_3[s0 & 0xff] ^ keySchedule[ksRow++];
		                var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[(s3 >>> 16) & 0xff] ^ SUB_MIX_2[(s0 >>> 8) & 0xff] ^ SUB_MIX_3[s1 & 0xff] ^ keySchedule[ksRow++];
		                var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[(s0 >>> 16) & 0xff] ^ SUB_MIX_2[(s1 >>> 8) & 0xff] ^ SUB_MIX_3[s2 & 0xff] ^ keySchedule[ksRow++];

		                // Update state
		                s0 = t0;
		                s1 = t1;
		                s2 = t2;
		                s3 = t3;
		            }

		            // Shift rows, sub bytes, add round key
		            var t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16) | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
		            var t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16) | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
		            var t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16) | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
		            var t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];

		            // Set output
		            M[offset]     = t0;
		            M[offset + 1] = t1;
		            M[offset + 2] = t2;
		            M[offset + 3] = t3;
		        },

		        keySize: 256/32
		    });

		    /**
		     * Shortcut functions to the cipher's object interface.
		     *
		     * @example
		     *
		     *     var ciphertext = CryptoJS.AES.encrypt(message, key, cfg);
		     *     var plaintext  = CryptoJS.AES.decrypt(ciphertext, key, cfg);
		     */
		    C.AES = BlockCipher._createHelper(AES);
		}());


		return CryptoJS.AES;

	}));
	});

	var tripledes = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = factory(core, encBase64, md5, evpkdf, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var BlockCipher = C_lib.BlockCipher;
		    var C_algo = C.algo;

		    // Permuted Choice 1 constants
		    var PC1 = [
		        57, 49, 41, 33, 25, 17, 9,  1,
		        58, 50, 42, 34, 26, 18, 10, 2,
		        59, 51, 43, 35, 27, 19, 11, 3,
		        60, 52, 44, 36, 63, 55, 47, 39,
		        31, 23, 15, 7,  62, 54, 46, 38,
		        30, 22, 14, 6,  61, 53, 45, 37,
		        29, 21, 13, 5,  28, 20, 12, 4
		    ];

		    // Permuted Choice 2 constants
		    var PC2 = [
		        14, 17, 11, 24, 1,  5,
		        3,  28, 15, 6,  21, 10,
		        23, 19, 12, 4,  26, 8,
		        16, 7,  27, 20, 13, 2,
		        41, 52, 31, 37, 47, 55,
		        30, 40, 51, 45, 33, 48,
		        44, 49, 39, 56, 34, 53,
		        46, 42, 50, 36, 29, 32
		    ];

		    // Cumulative bit shift constants
		    var BIT_SHIFTS = [1,  2,  4,  6,  8,  10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];

		    // SBOXes and round permutation constants
		    var SBOX_P = [
		        {
		            0x0: 0x808200,
		            0x10000000: 0x8000,
		            0x20000000: 0x808002,
		            0x30000000: 0x2,
		            0x40000000: 0x200,
		            0x50000000: 0x808202,
		            0x60000000: 0x800202,
		            0x70000000: 0x800000,
		            0x80000000: 0x202,
		            0x90000000: 0x800200,
		            0xa0000000: 0x8200,
		            0xb0000000: 0x808000,
		            0xc0000000: 0x8002,
		            0xd0000000: 0x800002,
		            0xe0000000: 0x0,
		            0xf0000000: 0x8202,
		            0x8000000: 0x0,
		            0x18000000: 0x808202,
		            0x28000000: 0x8202,
		            0x38000000: 0x8000,
		            0x48000000: 0x808200,
		            0x58000000: 0x200,
		            0x68000000: 0x808002,
		            0x78000000: 0x2,
		            0x88000000: 0x800200,
		            0x98000000: 0x8200,
		            0xa8000000: 0x808000,
		            0xb8000000: 0x800202,
		            0xc8000000: 0x800002,
		            0xd8000000: 0x8002,
		            0xe8000000: 0x202,
		            0xf8000000: 0x800000,
		            0x1: 0x8000,
		            0x10000001: 0x2,
		            0x20000001: 0x808200,
		            0x30000001: 0x800000,
		            0x40000001: 0x808002,
		            0x50000001: 0x8200,
		            0x60000001: 0x200,
		            0x70000001: 0x800202,
		            0x80000001: 0x808202,
		            0x90000001: 0x808000,
		            0xa0000001: 0x800002,
		            0xb0000001: 0x8202,
		            0xc0000001: 0x202,
		            0xd0000001: 0x800200,
		            0xe0000001: 0x8002,
		            0xf0000001: 0x0,
		            0x8000001: 0x808202,
		            0x18000001: 0x808000,
		            0x28000001: 0x800000,
		            0x38000001: 0x200,
		            0x48000001: 0x8000,
		            0x58000001: 0x800002,
		            0x68000001: 0x2,
		            0x78000001: 0x8202,
		            0x88000001: 0x8002,
		            0x98000001: 0x800202,
		            0xa8000001: 0x202,
		            0xb8000001: 0x808200,
		            0xc8000001: 0x800200,
		            0xd8000001: 0x0,
		            0xe8000001: 0x8200,
		            0xf8000001: 0x808002
		        },
		        {
		            0x0: 0x40084010,
		            0x1000000: 0x4000,
		            0x2000000: 0x80000,
		            0x3000000: 0x40080010,
		            0x4000000: 0x40000010,
		            0x5000000: 0x40084000,
		            0x6000000: 0x40004000,
		            0x7000000: 0x10,
		            0x8000000: 0x84000,
		            0x9000000: 0x40004010,
		            0xa000000: 0x40000000,
		            0xb000000: 0x84010,
		            0xc000000: 0x80010,
		            0xd000000: 0x0,
		            0xe000000: 0x4010,
		            0xf000000: 0x40080000,
		            0x800000: 0x40004000,
		            0x1800000: 0x84010,
		            0x2800000: 0x10,
		            0x3800000: 0x40004010,
		            0x4800000: 0x40084010,
		            0x5800000: 0x40000000,
		            0x6800000: 0x80000,
		            0x7800000: 0x40080010,
		            0x8800000: 0x80010,
		            0x9800000: 0x0,
		            0xa800000: 0x4000,
		            0xb800000: 0x40080000,
		            0xc800000: 0x40000010,
		            0xd800000: 0x84000,
		            0xe800000: 0x40084000,
		            0xf800000: 0x4010,
		            0x10000000: 0x0,
		            0x11000000: 0x40080010,
		            0x12000000: 0x40004010,
		            0x13000000: 0x40084000,
		            0x14000000: 0x40080000,
		            0x15000000: 0x10,
		            0x16000000: 0x84010,
		            0x17000000: 0x4000,
		            0x18000000: 0x4010,
		            0x19000000: 0x80000,
		            0x1a000000: 0x80010,
		            0x1b000000: 0x40000010,
		            0x1c000000: 0x84000,
		            0x1d000000: 0x40004000,
		            0x1e000000: 0x40000000,
		            0x1f000000: 0x40084010,
		            0x10800000: 0x84010,
		            0x11800000: 0x80000,
		            0x12800000: 0x40080000,
		            0x13800000: 0x4000,
		            0x14800000: 0x40004000,
		            0x15800000: 0x40084010,
		            0x16800000: 0x10,
		            0x17800000: 0x40000000,
		            0x18800000: 0x40084000,
		            0x19800000: 0x40000010,
		            0x1a800000: 0x40004010,
		            0x1b800000: 0x80010,
		            0x1c800000: 0x0,
		            0x1d800000: 0x4010,
		            0x1e800000: 0x40080010,
		            0x1f800000: 0x84000
		        },
		        {
		            0x0: 0x104,
		            0x100000: 0x0,
		            0x200000: 0x4000100,
		            0x300000: 0x10104,
		            0x400000: 0x10004,
		            0x500000: 0x4000004,
		            0x600000: 0x4010104,
		            0x700000: 0x4010000,
		            0x800000: 0x4000000,
		            0x900000: 0x4010100,
		            0xa00000: 0x10100,
		            0xb00000: 0x4010004,
		            0xc00000: 0x4000104,
		            0xd00000: 0x10000,
		            0xe00000: 0x4,
		            0xf00000: 0x100,
		            0x80000: 0x4010100,
		            0x180000: 0x4010004,
		            0x280000: 0x0,
		            0x380000: 0x4000100,
		            0x480000: 0x4000004,
		            0x580000: 0x10000,
		            0x680000: 0x10004,
		            0x780000: 0x104,
		            0x880000: 0x4,
		            0x980000: 0x100,
		            0xa80000: 0x4010000,
		            0xb80000: 0x10104,
		            0xc80000: 0x10100,
		            0xd80000: 0x4000104,
		            0xe80000: 0x4010104,
		            0xf80000: 0x4000000,
		            0x1000000: 0x4010100,
		            0x1100000: 0x10004,
		            0x1200000: 0x10000,
		            0x1300000: 0x4000100,
		            0x1400000: 0x100,
		            0x1500000: 0x4010104,
		            0x1600000: 0x4000004,
		            0x1700000: 0x0,
		            0x1800000: 0x4000104,
		            0x1900000: 0x4000000,
		            0x1a00000: 0x4,
		            0x1b00000: 0x10100,
		            0x1c00000: 0x4010000,
		            0x1d00000: 0x104,
		            0x1e00000: 0x10104,
		            0x1f00000: 0x4010004,
		            0x1080000: 0x4000000,
		            0x1180000: 0x104,
		            0x1280000: 0x4010100,
		            0x1380000: 0x0,
		            0x1480000: 0x10004,
		            0x1580000: 0x4000100,
		            0x1680000: 0x100,
		            0x1780000: 0x4010004,
		            0x1880000: 0x10000,
		            0x1980000: 0x4010104,
		            0x1a80000: 0x10104,
		            0x1b80000: 0x4000004,
		            0x1c80000: 0x4000104,
		            0x1d80000: 0x4010000,
		            0x1e80000: 0x4,
		            0x1f80000: 0x10100
		        },
		        {
		            0x0: 0x80401000,
		            0x10000: 0x80001040,
		            0x20000: 0x401040,
		            0x30000: 0x80400000,
		            0x40000: 0x0,
		            0x50000: 0x401000,
		            0x60000: 0x80000040,
		            0x70000: 0x400040,
		            0x80000: 0x80000000,
		            0x90000: 0x400000,
		            0xa0000: 0x40,
		            0xb0000: 0x80001000,
		            0xc0000: 0x80400040,
		            0xd0000: 0x1040,
		            0xe0000: 0x1000,
		            0xf0000: 0x80401040,
		            0x8000: 0x80001040,
		            0x18000: 0x40,
		            0x28000: 0x80400040,
		            0x38000: 0x80001000,
		            0x48000: 0x401000,
		            0x58000: 0x80401040,
		            0x68000: 0x0,
		            0x78000: 0x80400000,
		            0x88000: 0x1000,
		            0x98000: 0x80401000,
		            0xa8000: 0x400000,
		            0xb8000: 0x1040,
		            0xc8000: 0x80000000,
		            0xd8000: 0x400040,
		            0xe8000: 0x401040,
		            0xf8000: 0x80000040,
		            0x100000: 0x400040,
		            0x110000: 0x401000,
		            0x120000: 0x80000040,
		            0x130000: 0x0,
		            0x140000: 0x1040,
		            0x150000: 0x80400040,
		            0x160000: 0x80401000,
		            0x170000: 0x80001040,
		            0x180000: 0x80401040,
		            0x190000: 0x80000000,
		            0x1a0000: 0x80400000,
		            0x1b0000: 0x401040,
		            0x1c0000: 0x80001000,
		            0x1d0000: 0x400000,
		            0x1e0000: 0x40,
		            0x1f0000: 0x1000,
		            0x108000: 0x80400000,
		            0x118000: 0x80401040,
		            0x128000: 0x0,
		            0x138000: 0x401000,
		            0x148000: 0x400040,
		            0x158000: 0x80000000,
		            0x168000: 0x80001040,
		            0x178000: 0x40,
		            0x188000: 0x80000040,
		            0x198000: 0x1000,
		            0x1a8000: 0x80001000,
		            0x1b8000: 0x80400040,
		            0x1c8000: 0x1040,
		            0x1d8000: 0x80401000,
		            0x1e8000: 0x400000,
		            0x1f8000: 0x401040
		        },
		        {
		            0x0: 0x80,
		            0x1000: 0x1040000,
		            0x2000: 0x40000,
		            0x3000: 0x20000000,
		            0x4000: 0x20040080,
		            0x5000: 0x1000080,
		            0x6000: 0x21000080,
		            0x7000: 0x40080,
		            0x8000: 0x1000000,
		            0x9000: 0x20040000,
		            0xa000: 0x20000080,
		            0xb000: 0x21040080,
		            0xc000: 0x21040000,
		            0xd000: 0x0,
		            0xe000: 0x1040080,
		            0xf000: 0x21000000,
		            0x800: 0x1040080,
		            0x1800: 0x21000080,
		            0x2800: 0x80,
		            0x3800: 0x1040000,
		            0x4800: 0x40000,
		            0x5800: 0x20040080,
		            0x6800: 0x21040000,
		            0x7800: 0x20000000,
		            0x8800: 0x20040000,
		            0x9800: 0x0,
		            0xa800: 0x21040080,
		            0xb800: 0x1000080,
		            0xc800: 0x20000080,
		            0xd800: 0x21000000,
		            0xe800: 0x1000000,
		            0xf800: 0x40080,
		            0x10000: 0x40000,
		            0x11000: 0x80,
		            0x12000: 0x20000000,
		            0x13000: 0x21000080,
		            0x14000: 0x1000080,
		            0x15000: 0x21040000,
		            0x16000: 0x20040080,
		            0x17000: 0x1000000,
		            0x18000: 0x21040080,
		            0x19000: 0x21000000,
		            0x1a000: 0x1040000,
		            0x1b000: 0x20040000,
		            0x1c000: 0x40080,
		            0x1d000: 0x20000080,
		            0x1e000: 0x0,
		            0x1f000: 0x1040080,
		            0x10800: 0x21000080,
		            0x11800: 0x1000000,
		            0x12800: 0x1040000,
		            0x13800: 0x20040080,
		            0x14800: 0x20000000,
		            0x15800: 0x1040080,
		            0x16800: 0x80,
		            0x17800: 0x21040000,
		            0x18800: 0x40080,
		            0x19800: 0x21040080,
		            0x1a800: 0x0,
		            0x1b800: 0x21000000,
		            0x1c800: 0x1000080,
		            0x1d800: 0x40000,
		            0x1e800: 0x20040000,
		            0x1f800: 0x20000080
		        },
		        {
		            0x0: 0x10000008,
		            0x100: 0x2000,
		            0x200: 0x10200000,
		            0x300: 0x10202008,
		            0x400: 0x10002000,
		            0x500: 0x200000,
		            0x600: 0x200008,
		            0x700: 0x10000000,
		            0x800: 0x0,
		            0x900: 0x10002008,
		            0xa00: 0x202000,
		            0xb00: 0x8,
		            0xc00: 0x10200008,
		            0xd00: 0x202008,
		            0xe00: 0x2008,
		            0xf00: 0x10202000,
		            0x80: 0x10200000,
		            0x180: 0x10202008,
		            0x280: 0x8,
		            0x380: 0x200000,
		            0x480: 0x202008,
		            0x580: 0x10000008,
		            0x680: 0x10002000,
		            0x780: 0x2008,
		            0x880: 0x200008,
		            0x980: 0x2000,
		            0xa80: 0x10002008,
		            0xb80: 0x10200008,
		            0xc80: 0x0,
		            0xd80: 0x10202000,
		            0xe80: 0x202000,
		            0xf80: 0x10000000,
		            0x1000: 0x10002000,
		            0x1100: 0x10200008,
		            0x1200: 0x10202008,
		            0x1300: 0x2008,
		            0x1400: 0x200000,
		            0x1500: 0x10000000,
		            0x1600: 0x10000008,
		            0x1700: 0x202000,
		            0x1800: 0x202008,
		            0x1900: 0x0,
		            0x1a00: 0x8,
		            0x1b00: 0x10200000,
		            0x1c00: 0x2000,
		            0x1d00: 0x10002008,
		            0x1e00: 0x10202000,
		            0x1f00: 0x200008,
		            0x1080: 0x8,
		            0x1180: 0x202000,
		            0x1280: 0x200000,
		            0x1380: 0x10000008,
		            0x1480: 0x10002000,
		            0x1580: 0x2008,
		            0x1680: 0x10202008,
		            0x1780: 0x10200000,
		            0x1880: 0x10202000,
		            0x1980: 0x10200008,
		            0x1a80: 0x2000,
		            0x1b80: 0x202008,
		            0x1c80: 0x200008,
		            0x1d80: 0x0,
		            0x1e80: 0x10000000,
		            0x1f80: 0x10002008
		        },
		        {
		            0x0: 0x100000,
		            0x10: 0x2000401,
		            0x20: 0x400,
		            0x30: 0x100401,
		            0x40: 0x2100401,
		            0x50: 0x0,
		            0x60: 0x1,
		            0x70: 0x2100001,
		            0x80: 0x2000400,
		            0x90: 0x100001,
		            0xa0: 0x2000001,
		            0xb0: 0x2100400,
		            0xc0: 0x2100000,
		            0xd0: 0x401,
		            0xe0: 0x100400,
		            0xf0: 0x2000000,
		            0x8: 0x2100001,
		            0x18: 0x0,
		            0x28: 0x2000401,
		            0x38: 0x2100400,
		            0x48: 0x100000,
		            0x58: 0x2000001,
		            0x68: 0x2000000,
		            0x78: 0x401,
		            0x88: 0x100401,
		            0x98: 0x2000400,
		            0xa8: 0x2100000,
		            0xb8: 0x100001,
		            0xc8: 0x400,
		            0xd8: 0x2100401,
		            0xe8: 0x1,
		            0xf8: 0x100400,
		            0x100: 0x2000000,
		            0x110: 0x100000,
		            0x120: 0x2000401,
		            0x130: 0x2100001,
		            0x140: 0x100001,
		            0x150: 0x2000400,
		            0x160: 0x2100400,
		            0x170: 0x100401,
		            0x180: 0x401,
		            0x190: 0x2100401,
		            0x1a0: 0x100400,
		            0x1b0: 0x1,
		            0x1c0: 0x0,
		            0x1d0: 0x2100000,
		            0x1e0: 0x2000001,
		            0x1f0: 0x400,
		            0x108: 0x100400,
		            0x118: 0x2000401,
		            0x128: 0x2100001,
		            0x138: 0x1,
		            0x148: 0x2000000,
		            0x158: 0x100000,
		            0x168: 0x401,
		            0x178: 0x2100400,
		            0x188: 0x2000001,
		            0x198: 0x2100000,
		            0x1a8: 0x0,
		            0x1b8: 0x2100401,
		            0x1c8: 0x100401,
		            0x1d8: 0x400,
		            0x1e8: 0x2000400,
		            0x1f8: 0x100001
		        },
		        {
		            0x0: 0x8000820,
		            0x1: 0x20000,
		            0x2: 0x8000000,
		            0x3: 0x20,
		            0x4: 0x20020,
		            0x5: 0x8020820,
		            0x6: 0x8020800,
		            0x7: 0x800,
		            0x8: 0x8020000,
		            0x9: 0x8000800,
		            0xa: 0x20800,
		            0xb: 0x8020020,
		            0xc: 0x820,
		            0xd: 0x0,
		            0xe: 0x8000020,
		            0xf: 0x20820,
		            0x80000000: 0x800,
		            0x80000001: 0x8020820,
		            0x80000002: 0x8000820,
		            0x80000003: 0x8000000,
		            0x80000004: 0x8020000,
		            0x80000005: 0x20800,
		            0x80000006: 0x20820,
		            0x80000007: 0x20,
		            0x80000008: 0x8000020,
		            0x80000009: 0x820,
		            0x8000000a: 0x20020,
		            0x8000000b: 0x8020800,
		            0x8000000c: 0x0,
		            0x8000000d: 0x8020020,
		            0x8000000e: 0x8000800,
		            0x8000000f: 0x20000,
		            0x10: 0x20820,
		            0x11: 0x8020800,
		            0x12: 0x20,
		            0x13: 0x800,
		            0x14: 0x8000800,
		            0x15: 0x8000020,
		            0x16: 0x8020020,
		            0x17: 0x20000,
		            0x18: 0x0,
		            0x19: 0x20020,
		            0x1a: 0x8020000,
		            0x1b: 0x8000820,
		            0x1c: 0x8020820,
		            0x1d: 0x20800,
		            0x1e: 0x820,
		            0x1f: 0x8000000,
		            0x80000010: 0x20000,
		            0x80000011: 0x800,
		            0x80000012: 0x8020020,
		            0x80000013: 0x20820,
		            0x80000014: 0x20,
		            0x80000015: 0x8020000,
		            0x80000016: 0x8000000,
		            0x80000017: 0x8000820,
		            0x80000018: 0x8020820,
		            0x80000019: 0x8000020,
		            0x8000001a: 0x8000800,
		            0x8000001b: 0x0,
		            0x8000001c: 0x20800,
		            0x8000001d: 0x820,
		            0x8000001e: 0x20020,
		            0x8000001f: 0x8020800
		        }
		    ];

		    // Masks that select the SBOX input
		    var SBOX_MASK = [
		        0xf8000001, 0x1f800000, 0x01f80000, 0x001f8000,
		        0x0001f800, 0x00001f80, 0x000001f8, 0x8000001f
		    ];

		    /**
		     * DES block cipher algorithm.
		     */
		    var DES = C_algo.DES = BlockCipher.extend({
		        _doReset: function () {
		            // Shortcuts
		            var key = this._key;
		            var keyWords = key.words;

		            // Select 56 bits according to PC1
		            var keyBits = [];
		            for (var i = 0; i < 56; i++) {
		                var keyBitPos = PC1[i] - 1;
		                keyBits[i] = (keyWords[keyBitPos >>> 5] >>> (31 - keyBitPos % 32)) & 1;
		            }

		            // Assemble 16 subkeys
		            var subKeys = this._subKeys = [];
		            for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
		                // Create subkey
		                var subKey = subKeys[nSubKey] = [];

		                // Shortcut
		                var bitShift = BIT_SHIFTS[nSubKey];

		                // Select 48 bits according to PC2
		                for (var i = 0; i < 24; i++) {
		                    // Select from the left 28 key bits
		                    subKey[(i / 6) | 0] |= keyBits[((PC2[i] - 1) + bitShift) % 28] << (31 - i % 6);

		                    // Select from the right 28 key bits
		                    subKey[4 + ((i / 6) | 0)] |= keyBits[28 + (((PC2[i + 24] - 1) + bitShift) % 28)] << (31 - i % 6);
		                }

		                // Since each subkey is applied to an expanded 32-bit input,
		                // the subkey can be broken into 8 values scaled to 32-bits,
		                // which allows the key to be used without expansion
		                subKey[0] = (subKey[0] << 1) | (subKey[0] >>> 31);
		                for (var i = 1; i < 7; i++) {
		                    subKey[i] = subKey[i] >>> ((i - 1) * 4 + 3);
		                }
		                subKey[7] = (subKey[7] << 5) | (subKey[7] >>> 27);
		            }

		            // Compute inverse subkeys
		            var invSubKeys = this._invSubKeys = [];
		            for (var i = 0; i < 16; i++) {
		                invSubKeys[i] = subKeys[15 - i];
		            }
		        },

		        encryptBlock: function (M, offset) {
		            this._doCryptBlock(M, offset, this._subKeys);
		        },

		        decryptBlock: function (M, offset) {
		            this._doCryptBlock(M, offset, this._invSubKeys);
		        },

		        _doCryptBlock: function (M, offset, subKeys) {
		            // Get input
		            this._lBlock = M[offset];
		            this._rBlock = M[offset + 1];

		            // Initial permutation
		            exchangeLR.call(this, 4,  0x0f0f0f0f);
		            exchangeLR.call(this, 16, 0x0000ffff);
		            exchangeRL.call(this, 2,  0x33333333);
		            exchangeRL.call(this, 8,  0x00ff00ff);
		            exchangeLR.call(this, 1,  0x55555555);

		            // Rounds
		            for (var round = 0; round < 16; round++) {
		                // Shortcuts
		                var subKey = subKeys[round];
		                var lBlock = this._lBlock;
		                var rBlock = this._rBlock;

		                // Feistel function
		                var f = 0;
		                for (var i = 0; i < 8; i++) {
		                    f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];
		                }
		                this._lBlock = rBlock;
		                this._rBlock = lBlock ^ f;
		            }

		            // Undo swap from last round
		            var t = this._lBlock;
		            this._lBlock = this._rBlock;
		            this._rBlock = t;

		            // Final permutation
		            exchangeLR.call(this, 1,  0x55555555);
		            exchangeRL.call(this, 8,  0x00ff00ff);
		            exchangeRL.call(this, 2,  0x33333333);
		            exchangeLR.call(this, 16, 0x0000ffff);
		            exchangeLR.call(this, 4,  0x0f0f0f0f);

		            // Set output
		            M[offset] = this._lBlock;
		            M[offset + 1] = this._rBlock;
		        },

		        keySize: 64/32,

		        ivSize: 64/32,

		        blockSize: 64/32
		    });

		    // Swap bits across the left and right words
		    function exchangeLR(offset, mask) {
		        var t = ((this._lBlock >>> offset) ^ this._rBlock) & mask;
		        this._rBlock ^= t;
		        this._lBlock ^= t << offset;
		    }

		    function exchangeRL(offset, mask) {
		        var t = ((this._rBlock >>> offset) ^ this._lBlock) & mask;
		        this._lBlock ^= t;
		        this._rBlock ^= t << offset;
		    }

		    /**
		     * Shortcut functions to the cipher's object interface.
		     *
		     * @example
		     *
		     *     var ciphertext = CryptoJS.DES.encrypt(message, key, cfg);
		     *     var plaintext  = CryptoJS.DES.decrypt(ciphertext, key, cfg);
		     */
		    C.DES = BlockCipher._createHelper(DES);

		    /**
		     * Triple-DES block cipher algorithm.
		     */
		    var TripleDES = C_algo.TripleDES = BlockCipher.extend({
		        _doReset: function () {
		            // Shortcuts
		            var key = this._key;
		            var keyWords = key.words;
		            // Make sure the key length is valid (64, 128 or >= 192 bit)
		            if (keyWords.length !== 2 && keyWords.length !== 4 && keyWords.length < 6) {
		                throw new Error('Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.');
		            }

		            // Extend the key according to the keying options defined in 3DES standard
		            var key1 = keyWords.slice(0, 2);
		            var key2 = keyWords.length < 4 ? keyWords.slice(0, 2) : keyWords.slice(2, 4);
		            var key3 = keyWords.length < 6 ? keyWords.slice(0, 2) : keyWords.slice(4, 6);

		            // Create DES instances
		            this._des1 = DES.createEncryptor(WordArray.create(key1));
		            this._des2 = DES.createEncryptor(WordArray.create(key2));
		            this._des3 = DES.createEncryptor(WordArray.create(key3));
		        },

		        encryptBlock: function (M, offset) {
		            this._des1.encryptBlock(M, offset);
		            this._des2.decryptBlock(M, offset);
		            this._des3.encryptBlock(M, offset);
		        },

		        decryptBlock: function (M, offset) {
		            this._des3.decryptBlock(M, offset);
		            this._des2.encryptBlock(M, offset);
		            this._des1.decryptBlock(M, offset);
		        },

		        keySize: 192/32,

		        ivSize: 64/32,

		        blockSize: 64/32
		    });

		    /**
		     * Shortcut functions to the cipher's object interface.
		     *
		     * @example
		     *
		     *     var ciphertext = CryptoJS.TripleDES.encrypt(message, key, cfg);
		     *     var plaintext  = CryptoJS.TripleDES.decrypt(ciphertext, key, cfg);
		     */
		    C.TripleDES = BlockCipher._createHelper(TripleDES);
		}());


		return CryptoJS.TripleDES;

	}));
	});

	var rc4 = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = factory(core, encBase64, md5, evpkdf, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var StreamCipher = C_lib.StreamCipher;
		    var C_algo = C.algo;

		    /**
		     * RC4 stream cipher algorithm.
		     */
		    var RC4 = C_algo.RC4 = StreamCipher.extend({
		        _doReset: function () {
		            // Shortcuts
		            var key = this._key;
		            var keyWords = key.words;
		            var keySigBytes = key.sigBytes;

		            // Init sbox
		            var S = this._S = [];
		            for (var i = 0; i < 256; i++) {
		                S[i] = i;
		            }

		            // Key setup
		            for (var i = 0, j = 0; i < 256; i++) {
		                var keyByteIndex = i % keySigBytes;
		                var keyByte = (keyWords[keyByteIndex >>> 2] >>> (24 - (keyByteIndex % 4) * 8)) & 0xff;

		                j = (j + S[i] + keyByte) % 256;

		                // Swap
		                var t = S[i];
		                S[i] = S[j];
		                S[j] = t;
		            }

		            // Counters
		            this._i = this._j = 0;
		        },

		        _doProcessBlock: function (M, offset) {
		            M[offset] ^= generateKeystreamWord.call(this);
		        },

		        keySize: 256/32,

		        ivSize: 0
		    });

		    function generateKeystreamWord() {
		        // Shortcuts
		        var S = this._S;
		        var i = this._i;
		        var j = this._j;

		        // Generate keystream word
		        var keystreamWord = 0;
		        for (var n = 0; n < 4; n++) {
		            i = (i + 1) % 256;
		            j = (j + S[i]) % 256;

		            // Swap
		            var t = S[i];
		            S[i] = S[j];
		            S[j] = t;

		            keystreamWord |= S[(S[i] + S[j]) % 256] << (24 - n * 8);
		        }

		        // Update counters
		        this._i = i;
		        this._j = j;

		        return keystreamWord;
		    }

		    /**
		     * Shortcut functions to the cipher's object interface.
		     *
		     * @example
		     *
		     *     var ciphertext = CryptoJS.RC4.encrypt(message, key, cfg);
		     *     var plaintext  = CryptoJS.RC4.decrypt(ciphertext, key, cfg);
		     */
		    C.RC4 = StreamCipher._createHelper(RC4);

		    /**
		     * Modified RC4 stream cipher algorithm.
		     */
		    var RC4Drop = C_algo.RC4Drop = RC4.extend({
		        /**
		         * Configuration options.
		         *
		         * @property {number} drop The number of keystream words to drop. Default 192
		         */
		        cfg: RC4.cfg.extend({
		            drop: 192
		        }),

		        _doReset: function () {
		            RC4._doReset.call(this);

		            // Drop
		            for (var i = this.cfg.drop; i > 0; i--) {
		                generateKeystreamWord.call(this);
		            }
		        }
		    });

		    /**
		     * Shortcut functions to the cipher's object interface.
		     *
		     * @example
		     *
		     *     var ciphertext = CryptoJS.RC4Drop.encrypt(message, key, cfg);
		     *     var plaintext  = CryptoJS.RC4Drop.decrypt(ciphertext, key, cfg);
		     */
		    C.RC4Drop = StreamCipher._createHelper(RC4Drop);
		}());


		return CryptoJS.RC4;

	}));
	});

	var rabbit = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = factory(core, encBase64, md5, evpkdf, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var StreamCipher = C_lib.StreamCipher;
		    var C_algo = C.algo;

		    // Reusable objects
		    var S  = [];
		    var C_ = [];
		    var G  = [];

		    /**
		     * Rabbit stream cipher algorithm
		     */
		    var Rabbit = C_algo.Rabbit = StreamCipher.extend({
		        _doReset: function () {
		            // Shortcuts
		            var K = this._key.words;
		            var iv = this.cfg.iv;

		            // Swap endian
		            for (var i = 0; i < 4; i++) {
		                K[i] = (((K[i] << 8)  | (K[i] >>> 24)) & 0x00ff00ff) |
		                       (((K[i] << 24) | (K[i] >>> 8))  & 0xff00ff00);
		            }

		            // Generate initial state values
		            var X = this._X = [
		                K[0], (K[3] << 16) | (K[2] >>> 16),
		                K[1], (K[0] << 16) | (K[3] >>> 16),
		                K[2], (K[1] << 16) | (K[0] >>> 16),
		                K[3], (K[2] << 16) | (K[1] >>> 16)
		            ];

		            // Generate initial counter values
		            var C = this._C = [
		                (K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff),
		                (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff),
		                (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff),
		                (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff)
		            ];

		            // Carry bit
		            this._b = 0;

		            // Iterate the system four times
		            for (var i = 0; i < 4; i++) {
		                nextState.call(this);
		            }

		            // Modify the counters
		            for (var i = 0; i < 8; i++) {
		                C[i] ^= X[(i + 4) & 7];
		            }

		            // IV setup
		            if (iv) {
		                // Shortcuts
		                var IV = iv.words;
		                var IV_0 = IV[0];
		                var IV_1 = IV[1];

		                // Generate four subvectors
		                var i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff) | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);
		                var i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff) | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);
		                var i1 = (i0 >>> 16) | (i2 & 0xffff0000);
		                var i3 = (i2 << 16)  | (i0 & 0x0000ffff);

		                // Modify counter values
		                C[0] ^= i0;
		                C[1] ^= i1;
		                C[2] ^= i2;
		                C[3] ^= i3;
		                C[4] ^= i0;
		                C[5] ^= i1;
		                C[6] ^= i2;
		                C[7] ^= i3;

		                // Iterate the system four times
		                for (var i = 0; i < 4; i++) {
		                    nextState.call(this);
		                }
		            }
		        },

		        _doProcessBlock: function (M, offset) {
		            // Shortcut
		            var X = this._X;

		            // Iterate the system
		            nextState.call(this);

		            // Generate four keystream words
		            S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);
		            S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);
		            S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);
		            S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);

		            for (var i = 0; i < 4; i++) {
		                // Swap endian
		                S[i] = (((S[i] << 8)  | (S[i] >>> 24)) & 0x00ff00ff) |
		                       (((S[i] << 24) | (S[i] >>> 8))  & 0xff00ff00);

		                // Encrypt
		                M[offset + i] ^= S[i];
		            }
		        },

		        blockSize: 128/32,

		        ivSize: 64/32
		    });

		    function nextState() {
		        // Shortcuts
		        var X = this._X;
		        var C = this._C;

		        // Save old counter values
		        for (var i = 0; i < 8; i++) {
		            C_[i] = C[i];
		        }

		        // Calculate new counter values
		        C[0] = (C[0] + 0x4d34d34d + this._b) | 0;
		        C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (C_[0] >>> 0) ? 1 : 0)) | 0;
		        C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (C_[1] >>> 0) ? 1 : 0)) | 0;
		        C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (C_[2] >>> 0) ? 1 : 0)) | 0;
		        C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (C_[3] >>> 0) ? 1 : 0)) | 0;
		        C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (C_[4] >>> 0) ? 1 : 0)) | 0;
		        C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (C_[5] >>> 0) ? 1 : 0)) | 0;
		        C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (C_[6] >>> 0) ? 1 : 0)) | 0;
		        this._b = (C[7] >>> 0) < (C_[7] >>> 0) ? 1 : 0;

		        // Calculate the g-values
		        for (var i = 0; i < 8; i++) {
		            var gx = X[i] + C[i];

		            // Construct high and low argument for squaring
		            var ga = gx & 0xffff;
		            var gb = gx >>> 16;

		            // Calculate high and low result of squaring
		            var gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;
		            var gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);

		            // High XOR low
		            G[i] = gh ^ gl;
		        }

		        // Calculate new state values
		        X[0] = (G[0] + ((G[7] << 16) | (G[7] >>> 16)) + ((G[6] << 16) | (G[6] >>> 16))) | 0;
		        X[1] = (G[1] + ((G[0] << 8)  | (G[0] >>> 24)) + G[7]) | 0;
		        X[2] = (G[2] + ((G[1] << 16) | (G[1] >>> 16)) + ((G[0] << 16) | (G[0] >>> 16))) | 0;
		        X[3] = (G[3] + ((G[2] << 8)  | (G[2] >>> 24)) + G[1]) | 0;
		        X[4] = (G[4] + ((G[3] << 16) | (G[3] >>> 16)) + ((G[2] << 16) | (G[2] >>> 16))) | 0;
		        X[5] = (G[5] + ((G[4] << 8)  | (G[4] >>> 24)) + G[3]) | 0;
		        X[6] = (G[6] + ((G[5] << 16) | (G[5] >>> 16)) + ((G[4] << 16) | (G[4] >>> 16))) | 0;
		        X[7] = (G[7] + ((G[6] << 8)  | (G[6] >>> 24)) + G[5]) | 0;
		    }

		    /**
		     * Shortcut functions to the cipher's object interface.
		     *
		     * @example
		     *
		     *     var ciphertext = CryptoJS.Rabbit.encrypt(message, key, cfg);
		     *     var plaintext  = CryptoJS.Rabbit.decrypt(ciphertext, key, cfg);
		     */
		    C.Rabbit = StreamCipher._createHelper(Rabbit);
		}());


		return CryptoJS.Rabbit;

	}));
	});

	var rabbitLegacy = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = factory(core, encBase64, md5, evpkdf, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var StreamCipher = C_lib.StreamCipher;
		    var C_algo = C.algo;

		    // Reusable objects
		    var S  = [];
		    var C_ = [];
		    var G  = [];

		    /**
		     * Rabbit stream cipher algorithm.
		     *
		     * This is a legacy version that neglected to convert the key to little-endian.
		     * This error doesn't affect the cipher's security,
		     * but it does affect its compatibility with other implementations.
		     */
		    var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
		        _doReset: function () {
		            // Shortcuts
		            var K = this._key.words;
		            var iv = this.cfg.iv;

		            // Generate initial state values
		            var X = this._X = [
		                K[0], (K[3] << 16) | (K[2] >>> 16),
		                K[1], (K[0] << 16) | (K[3] >>> 16),
		                K[2], (K[1] << 16) | (K[0] >>> 16),
		                K[3], (K[2] << 16) | (K[1] >>> 16)
		            ];

		            // Generate initial counter values
		            var C = this._C = [
		                (K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff),
		                (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff),
		                (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff),
		                (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff)
		            ];

		            // Carry bit
		            this._b = 0;

		            // Iterate the system four times
		            for (var i = 0; i < 4; i++) {
		                nextState.call(this);
		            }

		            // Modify the counters
		            for (var i = 0; i < 8; i++) {
		                C[i] ^= X[(i + 4) & 7];
		            }

		            // IV setup
		            if (iv) {
		                // Shortcuts
		                var IV = iv.words;
		                var IV_0 = IV[0];
		                var IV_1 = IV[1];

		                // Generate four subvectors
		                var i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff) | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);
		                var i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff) | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);
		                var i1 = (i0 >>> 16) | (i2 & 0xffff0000);
		                var i3 = (i2 << 16)  | (i0 & 0x0000ffff);

		                // Modify counter values
		                C[0] ^= i0;
		                C[1] ^= i1;
		                C[2] ^= i2;
		                C[3] ^= i3;
		                C[4] ^= i0;
		                C[5] ^= i1;
		                C[6] ^= i2;
		                C[7] ^= i3;

		                // Iterate the system four times
		                for (var i = 0; i < 4; i++) {
		                    nextState.call(this);
		                }
		            }
		        },

		        _doProcessBlock: function (M, offset) {
		            // Shortcut
		            var X = this._X;

		            // Iterate the system
		            nextState.call(this);

		            // Generate four keystream words
		            S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);
		            S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);
		            S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);
		            S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);

		            for (var i = 0; i < 4; i++) {
		                // Swap endian
		                S[i] = (((S[i] << 8)  | (S[i] >>> 24)) & 0x00ff00ff) |
		                       (((S[i] << 24) | (S[i] >>> 8))  & 0xff00ff00);

		                // Encrypt
		                M[offset + i] ^= S[i];
		            }
		        },

		        blockSize: 128/32,

		        ivSize: 64/32
		    });

		    function nextState() {
		        // Shortcuts
		        var X = this._X;
		        var C = this._C;

		        // Save old counter values
		        for (var i = 0; i < 8; i++) {
		            C_[i] = C[i];
		        }

		        // Calculate new counter values
		        C[0] = (C[0] + 0x4d34d34d + this._b) | 0;
		        C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (C_[0] >>> 0) ? 1 : 0)) | 0;
		        C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (C_[1] >>> 0) ? 1 : 0)) | 0;
		        C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (C_[2] >>> 0) ? 1 : 0)) | 0;
		        C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (C_[3] >>> 0) ? 1 : 0)) | 0;
		        C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (C_[4] >>> 0) ? 1 : 0)) | 0;
		        C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (C_[5] >>> 0) ? 1 : 0)) | 0;
		        C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (C_[6] >>> 0) ? 1 : 0)) | 0;
		        this._b = (C[7] >>> 0) < (C_[7] >>> 0) ? 1 : 0;

		        // Calculate the g-values
		        for (var i = 0; i < 8; i++) {
		            var gx = X[i] + C[i];

		            // Construct high and low argument for squaring
		            var ga = gx & 0xffff;
		            var gb = gx >>> 16;

		            // Calculate high and low result of squaring
		            var gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;
		            var gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);

		            // High XOR low
		            G[i] = gh ^ gl;
		        }

		        // Calculate new state values
		        X[0] = (G[0] + ((G[7] << 16) | (G[7] >>> 16)) + ((G[6] << 16) | (G[6] >>> 16))) | 0;
		        X[1] = (G[1] + ((G[0] << 8)  | (G[0] >>> 24)) + G[7]) | 0;
		        X[2] = (G[2] + ((G[1] << 16) | (G[1] >>> 16)) + ((G[0] << 16) | (G[0] >>> 16))) | 0;
		        X[3] = (G[3] + ((G[2] << 8)  | (G[2] >>> 24)) + G[1]) | 0;
		        X[4] = (G[4] + ((G[3] << 16) | (G[3] >>> 16)) + ((G[2] << 16) | (G[2] >>> 16))) | 0;
		        X[5] = (G[5] + ((G[4] << 8)  | (G[4] >>> 24)) + G[3]) | 0;
		        X[6] = (G[6] + ((G[5] << 16) | (G[5] >>> 16)) + ((G[4] << 16) | (G[4] >>> 16))) | 0;
		        X[7] = (G[7] + ((G[6] << 8)  | (G[6] >>> 24)) + G[5]) | 0;
		    }

		    /**
		     * Shortcut functions to the cipher's object interface.
		     *
		     * @example
		     *
		     *     var ciphertext = CryptoJS.RabbitLegacy.encrypt(message, key, cfg);
		     *     var plaintext  = CryptoJS.RabbitLegacy.decrypt(ciphertext, key, cfg);
		     */
		    C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
		}());


		return CryptoJS.RabbitLegacy;

	}));
	});

	var cryptoJs = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = factory(core, x64Core, libTypedarrays, encUtf16, encBase64, encBase64url, md5, sha1, sha256, sha224, sha512, sha384, sha3, ripemd160, hmac, pbkdf2, evpkdf, cipherCore, modeCfb, modeCtr, modeCtrGladman, modeOfb, modeEcb, padAnsix923, padIso10126, padIso97971, padZeropadding, padNopadding, formatHex, aes, tripledes, rc4, rabbit, rabbitLegacy);
		}
	}(commonjsGlobal, function (CryptoJS) {

		return CryptoJS;

	}));
	});

	// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
	var $RegExp$2 = global_1.RegExp;

	var UNSUPPORTED_Y$3 = fails(function () {
	  var re = $RegExp$2('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') != null;
	});

	// UC Browser bug
	// https://github.com/zloirock/core-js/issues/1008
	var MISSED_STICKY$1 = UNSUPPORTED_Y$3 || fails(function () {
	  return !$RegExp$2('a', 'y').sticky;
	});

	var BROKEN_CARET = UNSUPPORTED_Y$3 || fails(function () {
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
	  var re = $RegExp$2('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') != null;
	});

	var regexpStickyHelpers = {
	  BROKEN_CARET: BROKEN_CARET,
	  MISSED_STICKY: MISSED_STICKY$1,
	  UNSUPPORTED_Y: UNSUPPORTED_Y$3
	};

	// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
	var $RegExp$1 = global_1.RegExp;

	var regexpUnsupportedDotAll = fails(function () {
	  var re = $RegExp$1('.', 's');
	  return !(re.dotAll && re.exec('\n') && re.flags === 's');
	});

	// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
	var $RegExp = global_1.RegExp;

	var regexpUnsupportedNcg = fails(function () {
	  var re = $RegExp('(?<a>b)', 'g');
	  return re.exec('b').groups.a !== 'b' ||
	    'b'.replace(re, '$<a>c') !== 'bc';
	});

	/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
	/* eslint-disable regexp/no-useless-quantifier -- testing */







	var getInternalState = internalState.get;



	var nativeReplace = shared('native-string-replace', String.prototype.replace);
	var nativeExec = RegExp.prototype.exec;
	var patchedExec = nativeExec;
	var charAt$4 = functionUncurryThis(''.charAt);
	var indexOf = functionUncurryThis(''.indexOf);
	var replace$3 = functionUncurryThis(''.replace);
	var stringSlice$5 = functionUncurryThis(''.slice);

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  functionCall(nativeExec, re1, 'a');
	  functionCall(nativeExec, re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	})();

	var UNSUPPORTED_Y$2 = regexpStickyHelpers.BROKEN_CARET;

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$2 || regexpUnsupportedDotAll || regexpUnsupportedNcg;

	if (PATCH) {
	  patchedExec = function exec(string) {
	    var re = this;
	    var state = getInternalState(re);
	    var str = toString_1(string);
	    var raw = state.raw;
	    var result, reCopy, lastIndex, match, i, object, group;

	    if (raw) {
	      raw.lastIndex = re.lastIndex;
	      result = functionCall(patchedExec, raw, str);
	      re.lastIndex = raw.lastIndex;
	      return result;
	    }

	    var groups = state.groups;
	    var sticky = UNSUPPORTED_Y$2 && re.sticky;
	    var flags = functionCall(regexpFlags, re);
	    var source = re.source;
	    var charsAdded = 0;
	    var strCopy = str;

	    if (sticky) {
	      flags = replace$3(flags, 'y', '');
	      if (indexOf(flags, 'g') === -1) {
	        flags += 'g';
	      }

	      strCopy = stringSlice$5(str, re.lastIndex);
	      // Support anchored sticky behavior.
	      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$4(str, re.lastIndex - 1) !== '\n')) {
	        source = '(?: ' + source + ')';
	        strCopy = ' ' + strCopy;
	        charsAdded++;
	      }
	      // ^(? + rx + ) is needed, in combination with some str slicing, to
	      // simulate the 'y' flag.
	      reCopy = new RegExp('^(?:' + source + ')', flags);
	    }

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

	    match = functionCall(nativeExec, sticky ? reCopy : re, strCopy);

	    if (sticky) {
	      if (match) {
	        match.input = stringSlice$5(match.input, charsAdded);
	        match[0] = stringSlice$5(match[0], charsAdded);
	        match.index = re.lastIndex;
	        re.lastIndex += match[0].length;
	      } else re.lastIndex = 0;
	    } else if (UPDATES_LAST_INDEX_WRONG && match) {
	      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      functionCall(nativeReplace, match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    if (match && groups) {
	      match.groups = object = objectCreate(null);
	      for (i = 0; i < groups.length; i++) {
	        group = groups[i];
	        object[group[0]] = match[group[1]];
	      }
	    }

	    return match;
	  };
	}

	var regexpExec = patchedExec;

	// `RegExp.prototype.exec` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.exec
	_export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
	  exec: regexpExec
	});

	// TODO: Remove from `core-js@4` since it's moved to entry points








	var SPECIES$1 = wellKnownSymbol('species');
	var RegExpPrototype$1 = RegExp.prototype;

	var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
	  var SYMBOL = wellKnownSymbol(KEY);

	  var DELEGATES_TO_SYMBOL = !fails(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;

	    if (KEY === 'split') {
	      // We can't use real regex here since it causes deoptimization
	      // and serious performance degradation in V8
	      // https://github.com/zloirock/core-js/issues/306
	      re = {};
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES$1] = function () { return re; };
	      re.flags = '';
	      re[SYMBOL] = /./[SYMBOL];
	    }

	    re.exec = function () { execCalled = true; return null; };

	    re[SYMBOL]('');
	    return !execCalled;
	  });

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    FORCED
	  ) {
	    var uncurriedNativeRegExpMethod = functionUncurryThis(/./[SYMBOL]);
	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
	      var uncurriedNativeMethod = functionUncurryThis(nativeMethod);
	      var $exec = regexp.exec;
	      if ($exec === regexpExec || $exec === RegExpPrototype$1.exec) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          // The native String method already delegates to @@method (this
	          // polyfilled function), leasing to infinite recursion.
	          // We avoid it by directly calling the native @@method method.
	          return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
	        }
	        return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
	      }
	      return { done: false };
	    });

	    redefine(String.prototype, KEY, methods[0]);
	    redefine(RegExpPrototype$1, SYMBOL, methods[1]);
	  }

	  if (SHAM) createNonEnumerableProperty(RegExpPrototype$1[SYMBOL], 'sham', true);
	};

	var charAt$3 = functionUncurryThis(''.charAt);
	var charCodeAt = functionUncurryThis(''.charCodeAt);
	var stringSlice$4 = functionUncurryThis(''.slice);

	var createMethod$1 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = toString_1(requireObjectCoercible($this));
	    var position = toIntegerOrInfinity(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = charCodeAt(S, position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING
	          ? charAt$3(S, position)
	          : first
	        : CONVERT_TO_STRING
	          ? stringSlice$4(S, position, position + 2)
	          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$1(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$1(true)
	};

	var charAt$2 = stringMultibyte.charAt;

	// `AdvanceStringIndex` abstract operation
	// https://tc39.es/ecma262/#sec-advancestringindex
	var advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? charAt$2(S, index).length : 1);
	};

	var floor = Math.floor;
	var charAt$1 = functionUncurryThis(''.charAt);
	var replace$2 = functionUncurryThis(''.replace);
	var stringSlice$3 = functionUncurryThis(''.slice);
	var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

	// `GetSubstitution` abstract operation
	// https://tc39.es/ecma262/#sec-getsubstitution
	var getSubstitution = function (matched, str, position, captures, namedCaptures, replacement) {
	  var tailPos = position + matched.length;
	  var m = captures.length;
	  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	  if (namedCaptures !== undefined) {
	    namedCaptures = toObject(namedCaptures);
	    symbols = SUBSTITUTION_SYMBOLS;
	  }
	  return replace$2(replacement, symbols, function (match, ch) {
	    var capture;
	    switch (charAt$1(ch, 0)) {
	      case '$': return '$';
	      case '&': return matched;
	      case '`': return stringSlice$3(str, 0, position);
	      case "'": return stringSlice$3(str, tailPos);
	      case '<':
	        capture = namedCaptures[stringSlice$3(ch, 1, -1)];
	        break;
	      default: // \d\d?
	        var n = +ch;
	        if (n === 0) return match;
	        if (n > m) {
	          var f = floor(n / 10);
	          if (f === 0) return match;
	          if (f <= m) return captures[f - 1] === undefined ? charAt$1(ch, 1) : captures[f - 1] + charAt$1(ch, 1);
	          return match;
	        }
	        capture = captures[n - 1];
	    }
	    return capture === undefined ? '' : capture;
	  });
	};

	var TypeError$1 = global_1.TypeError;

	// `RegExpExec` abstract operation
	// https://tc39.es/ecma262/#sec-regexpexec
	var regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (isCallable(exec)) {
	    var result = functionCall(exec, R, S);
	    if (result !== null) anObject(result);
	    return result;
	  }
	  if (classofRaw(R) === 'RegExp') return functionCall(regexpExec, R, S);
	  throw TypeError$1('RegExp#exec called on incompatible receiver');
	};

	var REPLACE = wellKnownSymbol('replace');
	var max$1 = Math.max;
	var min$1 = Math.min;
	var concat = functionUncurryThis([].concat);
	var push$1 = functionUncurryThis([].push);
	var stringIndexOf$1 = functionUncurryThis(''.indexOf);
	var stringSlice$2 = functionUncurryThis(''.slice);

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	};

	// IE <= 11 replaces $0 with the whole match, as if it was $&
	// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
	var REPLACE_KEEPS_$0 = (function () {
	  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
	  return 'a'.replace(/./, '$0') === '$0';
	})();

	// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
	var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
	  if (/./[REPLACE]) {
	    return /./[REPLACE]('a', '$0') === '';
	  }
	  return false;
	})();

	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
	  return ''.replace(re, '$<a>') !== '7';
	});

	// @@replace logic
	fixRegexpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
	  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

	  return [
	    // `String.prototype.replace` method
	    // https://tc39.es/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = requireObjectCoercible(this);
	      var replacer = searchValue == undefined ? undefined : getMethod(searchValue, REPLACE);
	      return replacer
	        ? functionCall(replacer, searchValue, O, replaceValue)
	        : functionCall(nativeReplace, toString_1(O), searchValue, replaceValue);
	    },
	    // `RegExp.prototype[@@replace]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
	    function (string, replaceValue) {
	      var rx = anObject(this);
	      var S = toString_1(string);

	      if (
	        typeof replaceValue == 'string' &&
	        stringIndexOf$1(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
	        stringIndexOf$1(replaceValue, '$<') === -1
	      ) {
	        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
	        if (res.done) return res.value;
	      }

	      var functionalReplace = isCallable(replaceValue);
	      if (!functionalReplace) replaceValue = toString_1(replaceValue);

	      var global = rx.global;
	      if (global) {
	        var fullUnicode = rx.unicode;
	        rx.lastIndex = 0;
	      }
	      var results = [];
	      while (true) {
	        var result = regexpExecAbstract(rx, S);
	        if (result === null) break;

	        push$1(results, result);
	        if (!global) break;

	        var matchStr = toString_1(result[0]);
	        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
	      }

	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];

	        var matched = toString_1(result[0]);
	        var position = max$1(min$1(toIntegerOrInfinity(result.index), S.length), 0);
	        var captures = [];
	        // NOTE: This is equivalent to
	        //   captures = result.slice(1).map(maybeToString)
	        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
	        for (var j = 1; j < result.length; j++) push$1(captures, maybeToString(result[j]));
	        var namedCaptures = result.groups;
	        if (functionalReplace) {
	          var replacerArgs = concat([matched], captures, position, S);
	          if (namedCaptures !== undefined) push$1(replacerArgs, namedCaptures);
	          var replacement = toString_1(functionApply(replaceValue, undefined, replacerArgs));
	        } else {
	          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	        }
	        if (position >= nextSourcePosition) {
	          accumulatedResult += stringSlice$2(S, nextSourcePosition, position) + replacement;
	          nextSourcePosition = position + matched.length;
	        }
	      }
	      return accumulatedResult + stringSlice$2(S, nextSourcePosition);
	    }
	  ];
	}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

	var $map = arrayIteration.map;


	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('map');

	// `Array.prototype.map` method
	// https://tc39.es/ecma262/#sec-array.prototype.map
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

	var SPECIES = wellKnownSymbol('species');
	var Array$1 = global_1.Array;
	var max = Math.max;

	// `Array.prototype.slice` method
	// https://tc39.es/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject(this);
	    var length = lengthOfArrayLike(O);
	    var k = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
	    var Constructor, result, n;
	    if (isArray$1(O)) {
	      Constructor = O.constructor;
	      // cross-realm fallback
	      if (isConstructor(Constructor) && (Constructor === Array$1 || isArray$1(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject$1(Constructor)) {
	        Constructor = Constructor[SPECIES];
	        if (Constructor === null) Constructor = undefined;
	      }
	      if (Constructor === Array$1 || Constructor === undefined) {
	        return arraySlice(O, k, fin);
	      }
	    }
	    result = new (Constructor === undefined ? Array$1 : Constructor)(max(fin - k, 0));
	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
	    result.length = n;
	    return result;
	  }
	});

	// @@match logic
	fixRegexpWellKnownSymbolLogic('match', function (MATCH, nativeMatch, maybeCallNative) {
	  return [
	    // `String.prototype.match` method
	    // https://tc39.es/ecma262/#sec-string.prototype.match
	    function match(regexp) {
	      var O = requireObjectCoercible(this);
	      var matcher = regexp == undefined ? undefined : getMethod(regexp, MATCH);
	      return matcher ? functionCall(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString_1(O));
	    },
	    // `RegExp.prototype[@@match]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
	    function (string) {
	      var rx = anObject(this);
	      var S = toString_1(string);
	      var res = maybeCallNative(nativeMatch, rx, S);

	      if (res.done) return res.value;

	      if (!rx.global) return regexpExecAbstract(rx, S);

	      var fullUnicode = rx.unicode;
	      rx.lastIndex = 0;
	      var A = [];
	      var n = 0;
	      var result;
	      while ((result = regexpExecAbstract(rx, S)) !== null) {
	        var matchStr = toString_1(result[0]);
	        A[n] = matchStr;
	        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
	        n++;
	      }
	      return n === 0 ? null : A;
	    }
	  ];
	});

	// a string of all valid unicode whitespaces
	var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
	  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var replace$1 = functionUncurryThis(''.replace);
	var whitespace = '[' + whitespaces + ']';
	var ltrim = RegExp('^' + whitespace + whitespace + '*');
	var rtrim = RegExp(whitespace + whitespace + '*$');

	// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
	var createMethod = function (TYPE) {
	  return function ($this) {
	    var string = toString_1(requireObjectCoercible($this));
	    if (TYPE & 1) string = replace$1(string, ltrim, '');
	    if (TYPE & 2) string = replace$1(string, rtrim, '');
	    return string;
	  };
	};

	var stringTrim = {
	  // `String.prototype.{ trimLeft, trimStart }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
	  start: createMethod(1),
	  // `String.prototype.{ trimRight, trimEnd }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimend
	  end: createMethod(2),
	  // `String.prototype.trim` method
	  // https://tc39.es/ecma262/#sec-string.prototype.trim
	  trim: createMethod(3)
	};

	var trim = stringTrim.trim;


	var $parseInt = global_1.parseInt;
	var Symbol$1 = global_1.Symbol;
	var ITERATOR = Symbol$1 && Symbol$1.iterator;
	var hex = /^[+-]?0x/i;
	var exec$2 = functionUncurryThis(hex.exec);
	var FORCED = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22
	  // MS Edge 18- broken with boxed symbols
	  || (ITERATOR && !fails(function () { $parseInt(Object(ITERATOR)); }));

	// `parseInt` method
	// https://tc39.es/ecma262/#sec-parseint-string-radix
	var numberParseInt = FORCED ? function parseInt(string, radix) {
	  var S = trim(toString_1(string));
	  return $parseInt(S, (radix >>> 0) || (exec$2(hex, S) ? 16 : 10));
	} : $parseInt;

	// `parseInt` method
	// https://tc39.es/ecma262/#sec-parseint-string-radix
	_export({ global: true, forced: parseInt != numberParseInt }, {
	  parseInt: numberParseInt
	});

	/**
	 * 字符串转 byte 数组方法
	 * @param {需要转撑byte数组的字符串} str
	 */
	var stringToByte = function stringToByte(str) {
	  var bytes = new Array();
	  var len, c;
	  len = str.length;

	  for (var i = 0; i < len; i++) {
	    c = str.charCodeAt(i);

	    if (c >= 0x010000 && c <= 0x10ffff) {
	      bytes.push(c >> 18 & 0x07 | 0xf0);
	      bytes.push(c >> 12 & 0x3f | 0x80);
	      bytes.push(c >> 6 & 0x3f | 0x80);
	      bytes.push(c & 0x3f | 0x80);
	    } else if (c >= 0x000800 && c <= 0x00ffff) {
	      bytes.push(c >> 12 & 0x0f | 0xe0);
	      bytes.push(c >> 6 & 0x3f | 0x80);
	      bytes.push(c & 0x3f | 0x80);
	    } else if (c >= 0x000080 && c <= 0x0007ff) {
	      bytes.push(c >> 6 & 0x1f | 0xc0);
	      bytes.push(c & 0x3f | 0x80);
	    } else {
	      bytes.push(c & 0xff);
	    }
	  }

	  return bytes;
	};
	var byteToString = function byteToString(arr) {
	  if (typeof arr === 'string') {
	    return arr;
	  }

	  var str = '',
	      _arr = arr;

	  for (var i = 0; i < _arr.length; i++) {
	    var one = _arr[i].toString(2),
	        v = one.match(/^1+?(?=0)/);

	    if (v && one.length == 8) {
	      var bytesLength = v[0].length;

	      var store = _arr[i].toString(2).slice(7 - bytesLength);

	      for (var st = 1; st < bytesLength; st++) {
	        store += _arr[st + i].toString(2).slice(2);
	      }

	      str += String.fromCharCode(parseInt(store, 2));
	      i += bytesLength - 1;
	    } else {
	      str += String.fromCharCode(_arr[i]);
	    }
	  }

	  return str;
	};

	/**
	 *  base64.ts
	 *
	 *  Licensed under the BSD 3-Clause License.
	 *    http://opensource.org/licenses/BSD-3-Clause
	 *
	 *  References:
	 *    http://en.wikipedia.org/wiki/Base64
	 *
	 * @author Dan Kogai (https://github.com/dankogai)
	 */
	const _hasbtoa = typeof btoa === 'function';
	const _hasBuffer = typeof Buffer === 'function';
	typeof TextDecoder === 'function' ? new TextDecoder() : undefined;
	const _TE = typeof TextEncoder === 'function' ? new TextEncoder() : undefined;
	const b64ch = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	const b64chs = Array.prototype.slice.call(b64ch);
	((a) => {
	    let tab = {};
	    a.forEach((c, i) => tab[c] = i);
	    return tab;
	})(b64chs);
	const _fromCC = String.fromCharCode.bind(String);
	typeof Uint8Array.from === 'function'
	    ? Uint8Array.from.bind(Uint8Array)
	    : (it, fn = (x) => x) => new Uint8Array(Array.prototype.slice.call(it, 0).map(fn));
	const _mkUriSafe = (src) => src
	    .replace(/=/g, '').replace(/[+\/]/g, (m0) => m0 == '+' ? '-' : '_');
	/**
	 * polyfill version of `btoa`
	 */
	const btoaPolyfill = (bin) => {
	    // console.log('polyfilled');
	    let u32, c0, c1, c2, asc = '';
	    const pad = bin.length % 3;
	    for (let i = 0; i < bin.length;) {
	        if ((c0 = bin.charCodeAt(i++)) > 255 ||
	            (c1 = bin.charCodeAt(i++)) > 255 ||
	            (c2 = bin.charCodeAt(i++)) > 255)
	            throw new TypeError('invalid character found');
	        u32 = (c0 << 16) | (c1 << 8) | c2;
	        asc += b64chs[u32 >> 18 & 63]
	            + b64chs[u32 >> 12 & 63]
	            + b64chs[u32 >> 6 & 63]
	            + b64chs[u32 & 63];
	    }
	    return pad ? asc.slice(0, pad - 3) + "===".substring(pad) : asc;
	};
	/**
	 * does what `window.btoa` of web browsers do.
	 * @param {String} bin binary string
	 * @returns {string} Base64-encoded string
	 */
	const _btoa = _hasbtoa ? (bin) => btoa(bin)
	    : _hasBuffer ? (bin) => Buffer.from(bin, 'binary').toString('base64')
	        : btoaPolyfill;
	const _fromUint8Array = _hasBuffer
	    ? (u8a) => Buffer.from(u8a).toString('base64')
	    : (u8a) => {
	        // cf. https://stackoverflow.com/questions/12710001/how-to-convert-uint8-array-to-base64-encoded-string/12713326#12713326
	        const maxargs = 0x1000;
	        let strs = [];
	        for (let i = 0, l = u8a.length; i < l; i += maxargs) {
	            strs.push(_fromCC.apply(null, u8a.subarray(i, i + maxargs)));
	        }
	        return _btoa(strs.join(''));
	    };
	// This trick is found broken https://github.com/dankogai/js-base64/issues/130
	// const utob = (src: string) => unescape(encodeURIComponent(src));
	// reverting good old fationed regexp
	const cb_utob = (c) => {
	    if (c.length < 2) {
	        var cc = c.charCodeAt(0);
	        return cc < 0x80 ? c
	            : cc < 0x800 ? (_fromCC(0xc0 | (cc >>> 6))
	                + _fromCC(0x80 | (cc & 0x3f)))
	                : (_fromCC(0xe0 | ((cc >>> 12) & 0x0f))
	                    + _fromCC(0x80 | ((cc >>> 6) & 0x3f))
	                    + _fromCC(0x80 | (cc & 0x3f)));
	    }
	    else {
	        var cc = 0x10000
	            + (c.charCodeAt(0) - 0xD800) * 0x400
	            + (c.charCodeAt(1) - 0xDC00);
	        return (_fromCC(0xf0 | ((cc >>> 18) & 0x07))
	            + _fromCC(0x80 | ((cc >>> 12) & 0x3f))
	            + _fromCC(0x80 | ((cc >>> 6) & 0x3f))
	            + _fromCC(0x80 | (cc & 0x3f)));
	    }
	};
	const re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
	/**
	 * @deprecated should have been internal use only.
	 * @param {string} src UTF-8 string
	 * @returns {string} UTF-16 string
	 */
	const utob = (u) => u.replace(re_utob, cb_utob);
	//
	const _encode = _hasBuffer
	    ? (s) => Buffer.from(s, 'utf8').toString('base64')
	    : _TE
	        ? (s) => _fromUint8Array(_TE.encode(s))
	        : (s) => _btoa(utob(s));
	/**
	 * converts a UTF-8-encoded string to a Base64 string.
	 * @param {boolean} [urlsafe] if `true` make the result URL-safe
	 * @returns {string} Base64 string
	 */
	const encode = (src, urlsafe = false) => urlsafe
	    ? _mkUriSafe(_encode(src))
	    : _encode(src);

	// Unique ID creation requires a high quality random # generator. In the browser we therefore
	// require the crypto API and do not support built-in fallback to lower quality random number
	// generators (like Math.random()).
	var getRandomValues;
	var rnds8 = new Uint8Array(16);
	function rng() {
	  // lazy load so that environments that need to polyfill have a chance to do so
	  if (!getRandomValues) {
	    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
	    // find the complete implementation of crypto (msCrypto) on IE11.
	    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

	    if (!getRandomValues) {
	      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
	    }
	  }

	  return getRandomValues(rnds8);
	}

	var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

	function validate(uuid) {
	  return typeof uuid === 'string' && REGEX.test(uuid);
	}

	/**
	 * Convert array of 16 byte values to UUID string format of the form:
	 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
	 */

	var byteToHex = [];

	for (var i = 0; i < 256; ++i) {
	  byteToHex.push((i + 0x100).toString(16).substr(1));
	}

	function stringify(arr) {
	  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  // Note: Be careful editing this code!  It's been tuned for performance
	  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
	  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
	  // of the following:
	  // - One or more input array values don't map to a hex octet (leading to
	  // "undefined" in the uuid)
	  // - Invalid input values for the RFC `version` or `variant` fields

	  if (!validate(uuid)) {
	    throw TypeError('Stringified UUID is invalid');
	  }

	  return uuid;
	}

	//
	// Inspired by https://github.com/LiosK/UUID.js
	// and http://docs.python.org/library/uuid.html

	var _nodeId;

	var _clockseq; // Previous uuid creation time


	var _lastMSecs = 0;
	var _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

	function v1(options, buf, offset) {
	  var i = buf && offset || 0;
	  var b = buf || new Array(16);
	  options = options || {};
	  var node = options.node || _nodeId;
	  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
	  // specified.  We do this lazily to minimize issues related to insufficient
	  // system entropy.  See #189

	  if (node == null || clockseq == null) {
	    var seedBytes = options.random || (options.rng || rng)();

	    if (node == null) {
	      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
	      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
	    }

	    if (clockseq == null) {
	      // Per 4.2.2, randomize (14 bit) clockseq
	      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
	    }
	  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
	  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
	  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
	  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


	  var msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
	  // cycle to simulate higher resolution clock

	  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

	  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

	  if (dt < 0 && options.clockseq === undefined) {
	    clockseq = clockseq + 1 & 0x3fff;
	  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
	  // time interval


	  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
	    nsecs = 0;
	  } // Per 4.2.1.2 Throw error if too many uuids are requested


	  if (nsecs >= 10000) {
	    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
	  }

	  _lastMSecs = msecs;
	  _lastNSecs = nsecs;
	  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

	  msecs += 12219292800000; // `time_low`

	  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
	  b[i++] = tl >>> 24 & 0xff;
	  b[i++] = tl >>> 16 & 0xff;
	  b[i++] = tl >>> 8 & 0xff;
	  b[i++] = tl & 0xff; // `time_mid`

	  var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
	  b[i++] = tmh >>> 8 & 0xff;
	  b[i++] = tmh & 0xff; // `time_high_and_version`

	  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

	  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

	  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

	  b[i++] = clockseq & 0xff; // `node`

	  for (var n = 0; n < 6; ++n) {
	    b[i + n] = node[n];
	  }

	  return buf || stringify(b);
	}

	var getSymmetryPassword = function getSymmetryPassword() {
	  var uuid = v1().replace(/\-/g, '');
	  var keyArr = stringToByte('2' + uuid); // aes加密的 password

	  var password = keyArr.map(function (item, index) {
	    if (index % 3 == 2) {
	      return item ^ 2;
	    }

	    return item;
	  });
	  password = byteToString(password);
	  password = encode(password);
	  password = password.slice(0, 16);
	  return password;
	};

	// makes subclassing work correct for wrapped built-ins
	var inheritIfRequired = function ($this, dummy, Wrapper) {
	  var NewTarget, NewTargetPrototype;
	  if (
	    // it can work only with native `setPrototypeOf`
	    objectSetPrototypeOf &&
	    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
	    isCallable(NewTarget = dummy.constructor) &&
	    NewTarget !== Wrapper &&
	    isObject$1(NewTargetPrototype = NewTarget.prototype) &&
	    NewTargetPrototype !== Wrapper.prototype
	  ) objectSetPrototypeOf($this, NewTargetPrototype);
	  return $this;
	};

	var MATCH$1 = wellKnownSymbol('match');

	// `IsRegExp` abstract operation
	// https://tc39.es/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject$1(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
	};

	var defineProperty = objectDefineProperty.f;
	var getOwnPropertyNames = objectGetOwnPropertyNames.f;








	var enforceInternalState = internalState.enforce;





	var MATCH = wellKnownSymbol('match');
	var NativeRegExp = global_1.RegExp;
	var RegExpPrototype = NativeRegExp.prototype;
	var SyntaxError = global_1.SyntaxError;
	var getFlags = functionUncurryThis(regexpFlags);
	var exec$1 = functionUncurryThis(RegExpPrototype.exec);
	var charAt = functionUncurryThis(''.charAt);
	var replace = functionUncurryThis(''.replace);
	var stringIndexOf = functionUncurryThis(''.indexOf);
	var stringSlice$1 = functionUncurryThis(''.slice);
	// TODO: Use only propper RegExpIdentifierName
	var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
	var re1 = /a/g;
	var re2 = /a/g;

	// "new" should create a new object, old webkit bug
	var CORRECT_NEW = new NativeRegExp(re1) !== re1;

	var MISSED_STICKY = regexpStickyHelpers.MISSED_STICKY;
	var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y;

	var BASE_FORCED = descriptors &&
	  (!CORRECT_NEW || MISSED_STICKY || regexpUnsupportedDotAll || regexpUnsupportedNcg || fails(function () {
	    re2[MATCH] = false;
	    // RegExp constructor can alter flags and IsRegExp works correct with @@match
	    return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
	  }));

	var handleDotAll = function (string) {
	  var length = string.length;
	  var index = 0;
	  var result = '';
	  var brackets = false;
	  var chr;
	  for (; index <= length; index++) {
	    chr = charAt(string, index);
	    if (chr === '\\') {
	      result += chr + charAt(string, ++index);
	      continue;
	    }
	    if (!brackets && chr === '.') {
	      result += '[\\s\\S]';
	    } else {
	      if (chr === '[') {
	        brackets = true;
	      } else if (chr === ']') {
	        brackets = false;
	      } result += chr;
	    }
	  } return result;
	};

	var handleNCG = function (string) {
	  var length = string.length;
	  var index = 0;
	  var result = '';
	  var named = [];
	  var names = {};
	  var brackets = false;
	  var ncg = false;
	  var groupid = 0;
	  var groupname = '';
	  var chr;
	  for (; index <= length; index++) {
	    chr = charAt(string, index);
	    if (chr === '\\') {
	      chr = chr + charAt(string, ++index);
	    } else if (chr === ']') {
	      brackets = false;
	    } else if (!brackets) switch (true) {
	      case chr === '[':
	        brackets = true;
	        break;
	      case chr === '(':
	        if (exec$1(IS_NCG, stringSlice$1(string, index + 1))) {
	          index += 2;
	          ncg = true;
	        }
	        result += chr;
	        groupid++;
	        continue;
	      case chr === '>' && ncg:
	        if (groupname === '' || hasOwnProperty_1(names, groupname)) {
	          throw new SyntaxError('Invalid capture group name');
	        }
	        names[groupname] = true;
	        named[named.length] = [groupname, groupid];
	        ncg = false;
	        groupname = '';
	        continue;
	    }
	    if (ncg) groupname += chr;
	    else result += chr;
	  } return [result, named];
	};

	// `RegExp` constructor
	// https://tc39.es/ecma262/#sec-regexp-constructor
	if (isForced_1('RegExp', BASE_FORCED)) {
	  var RegExpWrapper = function RegExp(pattern, flags) {
	    var thisIsRegExp = objectIsPrototypeOf(RegExpPrototype, this);
	    var patternIsRegExp = isRegexp(pattern);
	    var flagsAreUndefined = flags === undefined;
	    var groups = [];
	    var rawPattern = pattern;
	    var rawFlags, dotAll, sticky, handled, result, state;

	    if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
	      return pattern;
	    }

	    if (patternIsRegExp || objectIsPrototypeOf(RegExpPrototype, pattern)) {
	      pattern = pattern.source;
	      if (flagsAreUndefined) flags = 'flags' in rawPattern ? rawPattern.flags : getFlags(rawPattern);
	    }

	    pattern = pattern === undefined ? '' : toString_1(pattern);
	    flags = flags === undefined ? '' : toString_1(flags);
	    rawPattern = pattern;

	    if (regexpUnsupportedDotAll && 'dotAll' in re1) {
	      dotAll = !!flags && stringIndexOf(flags, 's') > -1;
	      if (dotAll) flags = replace(flags, /s/g, '');
	    }

	    rawFlags = flags;

	    if (MISSED_STICKY && 'sticky' in re1) {
	      sticky = !!flags && stringIndexOf(flags, 'y') > -1;
	      if (sticky && UNSUPPORTED_Y$1) flags = replace(flags, /y/g, '');
	    }

	    if (regexpUnsupportedNcg) {
	      handled = handleNCG(pattern);
	      pattern = handled[0];
	      groups = handled[1];
	    }

	    result = inheritIfRequired(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype, RegExpWrapper);

	    if (dotAll || sticky || groups.length) {
	      state = enforceInternalState(result);
	      if (dotAll) {
	        state.dotAll = true;
	        state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
	      }
	      if (sticky) state.sticky = true;
	      if (groups.length) state.groups = groups;
	    }

	    if (pattern !== rawPattern) try {
	      // fails in old engines, but we have no alternatives for unsupported regex syntax
	      createNonEnumerableProperty(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
	    } catch (error) { /* empty */ }

	    return result;
	  };

	  var proxy = function (key) {
	    key in RegExpWrapper || defineProperty(RegExpWrapper, key, {
	      configurable: true,
	      get: function () { return NativeRegExp[key]; },
	      set: function (it) { NativeRegExp[key] = it; }
	    });
	  };

	  for (var keys = getOwnPropertyNames(NativeRegExp), index$1 = 0; keys.length > index$1;) {
	    proxy(keys[index$1++]);
	  }

	  RegExpPrototype.constructor = RegExpWrapper;
	  RegExpWrapper.prototype = RegExpPrototype;
	  redefine(global_1, 'RegExp', RegExpWrapper);
	}

	// https://tc39.es/ecma262/#sec-get-regexp-@@species
	setSpecies('RegExp');

	// 获取cookie
	var getCookie = function getCookie(key) {
	  if (key === undefined) return null;
	  var mReg = new RegExp('(^|;)\\s*' + key + '=([^;]*)(;|$)');
	  var mValue = document.cookie.match(mReg);
	  var ret = undefined;

	  if (mValue != null) {
	    ret = unescape(mValue[2]);

	    if (ret !== undefined) {
	      ret = ret.replace(/^\"|\'/i, '').replace(/\"|\'$/i, ''); // 过滤字符串最外层引号
	    }
	  }

	  return ret;
	};

	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
	    return typeof obj;
	  } : function (obj) {
	    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	  }, _typeof(obj);
	}

	var UNSUPPORTED_Y = regexpStickyHelpers.UNSUPPORTED_Y;
	var MAX_UINT32 = 0xFFFFFFFF;
	var min = Math.min;
	var $push = [].push;
	var exec = functionUncurryThis(/./.exec);
	var push = functionUncurryThis($push);
	var stringSlice = functionUncurryThis(''.slice);

	// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	// Weex JS has frozen built-in prototypes, so use try / catch wrapper
	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
	  // eslint-disable-next-line regexp/no-empty-group -- required for testing
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
	});

	// @@split logic
	fixRegexpWellKnownSymbolLogic('split', function (SPLIT, nativeSplit, maybeCallNative) {
	  var internalSplit;
	  if (
	    'abbc'.split(/(b)*/)[1] == 'c' ||
	    // eslint-disable-next-line regexp/no-empty-group -- required for testing
	    'test'.split(/(?:)/, -1).length != 4 ||
	    'ab'.split(/(?:ab)*/).length != 2 ||
	    '.'.split(/(.?)(.?)/).length != 4 ||
	    // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
	    '.'.split(/()()/).length > 1 ||
	    ''.split(/.?/).length
	  ) {
	    // based on es5-shim implementation, need to rework it
	    internalSplit = function (separator, limit) {
	      var string = toString_1(requireObjectCoercible(this));
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (separator === undefined) return [string];
	      // If `separator` is not a regex, use native split
	      if (!isRegexp(separator)) {
	        return functionCall(nativeSplit, string, separator, lim);
	      }
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var match, lastIndex, lastLength;
	      while (match = functionCall(regexpExec, separatorCopy, string)) {
	        lastIndex = separatorCopy.lastIndex;
	        if (lastIndex > lastLastIndex) {
	          push(output, stringSlice(string, lastLastIndex, match.index));
	          if (match.length > 1 && match.index < string.length) functionApply($push, output, arraySliceSimple(match, 1));
	          lastLength = match[0].length;
	          lastLastIndex = lastIndex;
	          if (output.length >= lim) break;
	        }
	        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
	      }
	      if (lastLastIndex === string.length) {
	        if (lastLength || !exec(separatorCopy, '')) push(output, '');
	      } else push(output, stringSlice(string, lastLastIndex));
	      return output.length > lim ? arraySliceSimple(output, 0, lim) : output;
	    };
	  // Chakra, V8
	  } else if ('0'.split(undefined, 0).length) {
	    internalSplit = function (separator, limit) {
	      return separator === undefined && limit === 0 ? [] : functionCall(nativeSplit, this, separator, limit);
	    };
	  } else internalSplit = nativeSplit;

	  return [
	    // `String.prototype.split` method
	    // https://tc39.es/ecma262/#sec-string.prototype.split
	    function split(separator, limit) {
	      var O = requireObjectCoercible(this);
	      var splitter = separator == undefined ? undefined : getMethod(separator, SPLIT);
	      return splitter
	        ? functionCall(splitter, separator, O, limit)
	        : functionCall(internalSplit, toString_1(O), separator, limit);
	    },
	    // `RegExp.prototype[@@split]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
	    //
	    // NOTE: This cannot be properly polyfilled in engines that don't support
	    // the 'y' flag.
	    function (string, limit) {
	      var rx = anObject(this);
	      var S = toString_1(string);
	      var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);

	      if (res.done) return res.value;

	      var C = speciesConstructor(rx, RegExp);

	      var unicodeMatching = rx.unicode;
	      var flags = (rx.ignoreCase ? 'i' : '') +
	                  (rx.multiline ? 'm' : '') +
	                  (rx.unicode ? 'u' : '') +
	                  (UNSUPPORTED_Y ? 'g' : 'y');

	      // ^(? + rx + ) is needed, in combination with some S slicing, to
	      // simulate the 'y' flag.
	      var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (S.length === 0) return regexpExecAbstract(splitter, S) === null ? [S] : [];
	      var p = 0;
	      var q = 0;
	      var A = [];
	      while (q < S.length) {
	        splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
	        var z = regexpExecAbstract(splitter, UNSUPPORTED_Y ? stringSlice(S, q) : S);
	        var e;
	        if (
	          z === null ||
	          (e = min(toLength(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p
	        ) {
	          q = advanceStringIndex(S, q, unicodeMatching);
	        } else {
	          push(A, stringSlice(S, p, q));
	          if (A.length === lim) return A;
	          for (var i = 1; i <= z.length - 1; i++) {
	            push(A, z[i]);
	            if (A.length === lim) return A;
	          }
	          q = p = e;
	        }
	      }
	      push(A, stringSlice(S, p));
	      return A;
	    }
	  ];
	}, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);

	(typeof window === "undefined" ? "undefined" : _typeof(window)) === '' + void 0;
	/**
	 *解析URL
	 *params: 
		url: 需要解析的地址
	 *return：
	 	一个长度对象
	 *其中scheme表示协议头，authority表示域名，path表示路径，query表示url中？后#之前的部分，fragment表示#后面的部分
	 */

	var url_parse = function url_parse() {
	  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location.href;
	  var reg = /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
	  var arr = url.match(reg);
	  return {
	    scheme: arr[2],
	    authority: arr[4],
	    path: arr[5],
	    query: qs.parse(arr[7]),
	    fragment: arr[9]
	  };
	};

	var inNode = (typeof window === "undefined" ? "undefined" : _typeof(window)) === '' + void 0;
	var getUid = function getUid(req) {
	  // 如果是node环境的话，query直接从req中拿，不是的话，照旧
	  var query = inNode && req ? req.query : url_parse().query;
	  var ppu = getCookie('PPU');
	  var uidStr = ppu.split('&')[0];
	  var uid = uidStr.split('=')[1] || getCookie('uid') || query.uid || '';
	  return uid;
	};

	var getUuid = function getUuid() {
	  return v1().replace(/\-/g, '');
	};

	var _excluded = ["cmd"];

	function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
	/**
	 *
	 * @param {Function} method 请求方法
	 * @returns
	 */

	var http_secret_zcm = function http_secret_zcm(obj) {
	  var _obj$url = obj.url,
	      url = _obj$url === void 0 ? '' : _obj$url,
	      _obj$params = obj.params,
	      params = _obj$params === void 0 ? {} : _obj$params,
	      _obj$req = obj.req,
	      req = _obj$req === void 0 ? null : _obj$req,
	      _obj$g_config = obj.g_config,
	      g_config = _obj$g_config === void 0 ? {} : _obj$g_config;
	  /* 
	    	处理请求参数
	   */

	  var config = {};
	  var symmetryPassword = '';

	  try {
	    // 设置header信息
	    var zpVersion = getCookie('zp-version', req) || '0.0.0';
	    config = {
	      contentType: 'form',
	      headers: {
	        'zp-version': zpVersion,
	        'Content-Type': 'application/x-www-form-urlencoded'
	      }
	    }; // 如果是服务端渲染，将node服务接收的request对象中的cookie携带

	    if (typeof window === 'undefined' && req) {
	      config.headers = _objectSpread(_objectSpread({}, config.headers), {}, {
	        Cookie: req.headers.cookie
	      });
	    }

	    config.withCredentials = true; // 获取UUID

	    var uuid = getUuid(); // 获取对称加密密钥

	    symmetryPassword = getSymmetryPassword(); // 加密过程

	    var _ref = params || {},
	        cmd = _ref.cmd,
	        others = _objectWithoutProperties(_ref, _excluded); // 对hbody加密


	    var hbody = Object.keys(others).length == 0 ? JSON.stringify({
	      uuid: uuid
	    }) : JSON.stringify(others);
	    hbody = cryptoJs.AES.encrypt(hbody, cryptoJs.enc.Utf8.parse(symmetryPassword), {
	      mode: cryptoJs.mode.ECB,
	      padding: cryptoJs.pad.Pkcs7
	    }).toString(); // 通过对一个由uuid,hbody,cmd,key,index等参数组成的字符串进行摘要，生成签名

	    var sign = cryptoJs.MD5("".concat(params.cmd, "&hbody=").concat(hbody, "&uuid=").concat(uuid, "&index=h5&h5")).toString(); // 两次encode规则

	    hbody = encodeURIComponent(hbody);
	    hbody = encodeURIComponent(hbody);
	    var requestBody = {
	      hbody: hbody,
	      uuid: uuid,
	      sign: sign,
	      cmd: cmd,
	      key: 'h5',
	      index: 'h5'
	    };

	    if (getUid(req).length > 0) {
	      requestBody.uid = getUid(req);
	    }

	    var formData = '';

	    for (var key in requestBody) {
	      formData += "".concat(key, "=").concat(requestBody[key], "&");
	    }

	    config = _objectSpread(_objectSpread({}, config), {}, {
	      data: formData,
	      method: 'post',
	      url: url
	    }, g_config);
	  } catch (error) {
	    console.error('参数处理异常:', error);
	    throw error;
	  }
	  /*
	  	请求
	  */


	  return new Promise(function (resolve, reject) {
	    try {
	      axios(config).then(function (res) {
	        //  解密过程
	        var _ref2 = res.data || {},
	            _ref2$result = _ref2.result,
	            result = _ref2$result === void 0 ? '' : _ref2$result,
	            _ref2$status = _ref2.status,
	            status = _ref2$status === void 0 ? -1 : _ref2$status;

	        if (typeof result == 'string') {
	          result = cryptoJs.AES.decrypt(result, cryptoJs.enc.Utf8.parse(symmetryPassword), {
	            mode: cryptoJs.mode.ECB,
	            padding: cryptoJs.pad.Pkcs7
	          }).toString(cryptoJs.enc.Utf8);

	          if (result === '') {
	            res.data.result = {};
	          } else {
	            res.data.result = JSON.parse(result);
	          }
	        }

	        resolve(res.data || {});
	      }).catch(function (err) {
	        reject(err.data);
	      });
	    } catch (error) {
	      console.error('JS异常:', error);
	      reject(error);
	    }
	  });
	};

	var index = {
	  http_secret_zcm: http_secret_zcm,
	  getUid: getUid
	};

	return index;

}));
//# sourceMappingURL=index.js.map
