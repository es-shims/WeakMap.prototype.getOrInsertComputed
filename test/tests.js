'use strict';

var forEach = require('for-each');
var inspect = require('object-inspect');
var v = require('es-value-fixtures');

module.exports = function (getOrInsertComputed, t) {
	t.equal(typeof getOrInsertComputed, 'function', 'is a function');

	t.test('no WeakMaps', { skip: typeof WeakMap !== 'undefined' }, function (st) {
		st['throws'](
			function () { getOrInsertComputed([], Boolean, function () {}); },
			SyntaxError,
			'WeakMaps are not supported'
		);

		st.end();
	});

	t.test('non-WeakMaps', function (st) {
		forEach(v.primitives.concat(v.objects), function (nonWeakMap) {
			st['throws'](
				function () { getOrInsertComputed(nonWeakMap, {}, function () {}); },
				typeof WeakMap === 'undefined' ? SyntaxError : TypeError,
				inspect(nonWeakMap) + ' is not a WeakMap'
			);
		});

		st.end();
	});

	t.test('functionality', { skip: typeof WeakMap === 'undefined' }, function (st) {
		var m = new WeakMap();
		var key = { key: true };
		var sentinel = { sentinel: true };
		var spy = st.captureFn(function () { return sentinel; });

		st.notOk(m.has(key), 'starts without key');

		st.equal(getOrInsertComputed(m, key, spy), sentinel, 'returns value');

		st.ok(m.has(key), 'ends with key');

		st.equal(getOrInsertComputed(m, key, spy), sentinel, 'still returns value');

		st.ok(m.has(key), 'still has key');

		forEach(v.nonSymbolPrimitives.concat(v.registeredSymbols), function (nonWeakable) {
			st['throws'](
				function () { getOrInsertComputed(m, nonWeakable, spy); },
				TypeError,
				inspect(nonWeakable) + ' is not a valid key'
			);
		});

		st.deepEqual(spy.calls, [
			{ args: [key], receiver: undefined, returned: sentinel }
		]);

		st.test('Maps', { skip: typeof Map !== 'function' }, function (s2t) {
			var s = new Map();

			s2t['throws'](
				function () { getOrInsertComputed(s); },
				typeof WeakMap === 'undefined' ? SyntaxError : TypeError,
				'Map is not a WeakMap'
			);

			s2t.end();
		});

		st.test('Sets', { skip: typeof Set !== 'function' }, function (s2t) {
			var s = new Set();

			s2t['throws'](
				function () { getOrInsertComputed(s); },
				typeof WeakMap === 'undefined' ? SyntaxError : TypeError,
				TypeError,
				'Set is not a Map'
			);

			s2t.end();
		});

		st.test('WeakSets', { skip: typeof WeakSet !== 'function' }, function (s2t) {
			var s = new WeakSet();

			s2t['throws'](
				function () { getOrInsertComputed(s); },
				typeof WeakMap === 'undefined' ? SyntaxError : TypeError,
				'WeakSet is not a WeakMap'
			);

			s2t.end();
		});

		st.end();
	});
};
