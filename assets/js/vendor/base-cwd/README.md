# base-cwd [![NPM version](https://img.shields.io/npm/v/base-cwd.svg?style=flat)](https://www.npmjs.com/package/base-cwd) [![NPM downloads](https://img.shields.io/npm/dm/base-cwd.svg?style=flat)](https://npmjs.org/package/base-cwd) [![Build Status](https://img.shields.io/travis/node-base/base-cwd.svg?style=flat)](https://travis-ci.org/node-base/base-cwd)

Base plugin that adds a getter/setter for the current working directory.

## Table of Contents

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save base-cwd
```

## Usage

```js
var cwd = require('base-cwd');
var Base = require('base');
var app = new Base();
app.use(cwd());
```

Adds a `cwd` getter/setter to `app`:

```js
console.log(app.cwd);
//=> /Users/jonschlinkert/dev/base/base-cwd
console.log(app.cwd === process.cwd());
//=> true
```

If `app.options.cwd` is defined it will used by `app.cwd`:

```js
app.options.cwd = 'foo/bar';
console.log(app.cwd);
//=> /Users/jonschlinkert/dev/base/base-cwd/foo/bar
console.log(app.cwd === process.cwd());
//=> false
```

If `app.cwd` is set, it will also set the value to `app.cache.cwd`, to ensure that the user-defined value is used on the next _get_.

## About

### Related projects

* [base-option](https://www.npmjs.com/package/base-option): Adds a few options methods to base, like `option`, `enable` and `disable`. See the readme… [more](https://github.com/node-base/base-option) | [homepage](https://github.com/node-base/base-option "Adds a few options methods to base, like `option`, `enable` and `disable`. See the readme for the full API.")
* [base-pipeline](https://www.npmjs.com/package/base-pipeline): base-methods plugin that adds pipeline and plugin methods for dynamically composing streaming plugin pipelines. | [homepage](https://github.com/node-base/base-pipeline "base-methods plugin that adds pipeline and plugin methods for dynamically composing streaming plugin pipelines.")
* [base-plugins](https://www.npmjs.com/package/base-plugins): Upgrade's plugin support in base applications to allow plugins to be called any time after… [more](https://github.com/node-base/base-plugins) | [homepage](https://github.com/node-base/base-plugins "Upgrade's plugin support in base applications to allow plugins to be called any time after init.")
* [base-task](https://www.npmjs.com/package/base-task): base plugin that provides a very thin wrapper around [https://github.com/doowb/composer](https://github.com/doowb/composer) for adding task methods to… [more](https://github.com/node-base/base-task) | [homepage](https://github.com/node-base/base-task "base plugin that provides a very thin wrapper around <https://github.com/doowb/composer> for adding task methods to your application.")
* [base](https://www.npmjs.com/package/base): base is the foundation for creating modular, unit testable and highly pluggable node.js applications, starting… [more](https://github.com/node-base/base) | [homepage](https://github.com/node-base/base "base is the foundation for creating modular, unit testable and highly pluggable node.js applications, starting with a handful of common methods, like `set`, `get`, `del` and `use`.")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Building docs

_(This document was generated by [verb-generate-readme][] (a [verb](https://github.com/verbose/verb) generator), please don't edit the readme directly. Any changes to the readme must be made in [.verb.md](.verb.md).)_

To generate the readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install -g verb verb-generate-readme && verb
```

### Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

### License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/node-base/base-cwd/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on July 13, 2016._