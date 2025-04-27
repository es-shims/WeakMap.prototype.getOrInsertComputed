'use strict';

var implementation = require('./implementation');

module.exports = function getPolyfill() {
	return (typeof WeakMap === 'function' && WeakMap.prototype.getOrInsertComputed) || implementation;
};
