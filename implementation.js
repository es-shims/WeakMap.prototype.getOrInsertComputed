'use strict';

var callBound = require('call-bound');
var $SyntaxError = require('es-errors/syntax');
var $TypeError = require('es-errors/type');

var Call = require('es-abstract/2024/Call');
var CanBeHeldWeakly = require('es-abstract/2024/CanBeHeldWeakly');
var IsCallable = require('es-abstract/2024/IsCallable');

var $weakMapHas = callBound('WeakMap.prototype.has', true);
var $weakMapGet = callBound('WeakMap.prototype.get', true);
var $weakMapSet = callBound('WeakMap.prototype.set', true);

module.exports = function getOrInsertComputed(key, callbackfn) {
	if (!$weakMapHas) {
		throw new $SyntaxError('`getOrInsert` is not supported unless a native WeakMap exists');
	}

	var M = this; // step 1

	// 2. Perform ? RequireInternalSlot(M, [[WeakMapData]]).
	$weakMapHas(M, M); // step 2

	if (!CanBeHeldWeakly(key)) {
		throw new $TypeError('Key can not be held weakly: ' + key); // step 3
	}

	if (!IsCallable(callbackfn)) {
		throw new $TypeError('`callbackfn` must be a function'); // step 4
	}

	if ($weakMapHas(M, key)) { // step 5
		return $weakMapGet(M, key); // step 5.a
	}

	var value = Call(callbackfn, undefined, [key]); // step 6

	$weakMapSet(M, key, value); // step 7 - 10

	return value; // step 11
};
