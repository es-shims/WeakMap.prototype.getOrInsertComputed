'use strict';

var define = require('define-properties');

var getPolyfill = require('./polyfill');

module.exports = function shim() {
	var polyfill = getPolyfill();

	if (typeof WeakMap !== 'undefined') {
		define(
			WeakMap.prototype,
			{ getOrInsertComputed: polyfill },
			{ getOrInsertComputed: function () { return WeakMap.prototype.getOrInsertComputed !== polyfill; } }
		);
	}

	return polyfill;
};
