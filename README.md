# weakmap.prototype.getorinsertcomputed <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![github actions][actions-image]][actions-url]
[![coverage][codecov-image]][codecov-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

An ESnext spec-compliant `WeakMap.prototype.getOrInsertComputed` shim/polyfill/replacement that works as far down as ES3.

This package implements the [es-shim API](https://github.com/es-shims/api) v3 interface. It works in an ES3-supported environment and complies with the proposed [spec](https://tc39.github.io/proposal-array-grouping/).

## Getting started

```sh
npm install --save weakmap.prototype.getorinsertcomputed
```

## Usage/Examples

```js
var getOrInsertComputed = require('weakmap.prototype.getorinsertcomputed');
var assert = require('assert');

var map = new WeakMap();
var key = {};
var value = {};

assert.equal(map.has(key), false);
assert.equal(getOrInsertComputed(map, key, () => value), value);
assert.equal(map.has(key), true);
```

```js
var getPolyfill = require('weakmap.prototype.getorinsertcomputed/polyfill');
var shim = require('weakmap.prototype.getorinsertcomputed/shim');
var assert = require('assert');
/* when WeakMap.prototype.getOrInsertComputed is not present */
delete WeakMap.prototype.getOrInsertComputed;
var shimmed = shim();

assert.equal(shimmed, getPolyfill());

var map = new WeakMap();
var key = {};
var value = {};

assert.equal(map.has(key), false);
assert.equal(map.getOrInsertComputed(key, () => value), value);
assert.equal(map.has(key), true);
```

```js
var shim = require('weakmap.prototype.getorinsertcomputed/shim');
var assert = require('assert');
/* when WeakMap.prototype.getOrInsertComputed is present */
var shimmed = shim();

assert.equal(shimmed, WeakMap.prototype.getOrInsertComputed);

var map = new WeakMap();
var key = {};
var value = {};

assert.equal(map.has(key), false);
assert.equal(map.getOrInsertComputed(key, () => value), value);
assert.equal(map.has(key), true);
```

## Tests
Simply clone the repo, `npm install`, and run `npm test`

[package-url]: https://npmjs.org/package/weakmap.prototype.getorinsertcomputed
[npm-version-svg]: https://versionbadg.es/es-shims/WeakMap.prototype.getOrInsertComputed.svg
[deps-svg]: https://david-dm.org/es-shims/WeakMap.prototype.getOrInsertComputed.svg
[deps-url]: https://david-dm.org/es-shims/WeakMap.prototype.getOrInsertComputed
[dev-deps-svg]: https://david-dm.org/es-shims/WeakMap.prototype.getOrInsertComputed/dev-status.svg
[dev-deps-url]: https://david-dm.org/es-shims/WeakMap.prototype.getOrInsertComputed#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/weakmap.prototype.getorinsertcomputed.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/weakmap.prototype.getorinsertcomputed.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/weakmap.prototype.getorinsertcomputed.svg
[downloads-url]: https://npm-stat.com/charts.html?package=weakmap.prototype.getorinsertcomputed
[codecov-image]: https://codecov.io/gh/es-shims/WeakMap.prototype.getOrInsertComputed/branch/main/graphs/badge.svg
[codecov-url]: https://app.codecov.io/gh/es-shims/WeakMap.prototype.getOrInsertComputed/
[actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/es-shims/WeakMap.prototype.getOrInsertComputed
[actions-url]: https://github.com/es-shims/WeakMap.prototype.getOrInsertComputed/actions
