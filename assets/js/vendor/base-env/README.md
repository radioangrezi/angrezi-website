# base-env [![NPM version](https://img.shields.io/npm/v/base-env.svg?style=flat)](https://www.npmjs.com/package/base-env) [![NPM monthly downloads](https://img.shields.io/npm/dm/base-env.svg?style=flat)](https://npmjs.org/package/base-env) [![NPM total downloads](https://img.shields.io/npm/dt/base-env.svg?style=flat)](https://npmjs.org/package/base-env) [![Linux Build Status](https://img.shields.io/travis/base/base-env.svg?style=flat&label=Travis)](https://travis-ci.org/base/base-env)

> Base plugin, creates a normalized environment object from a function, filepath or instance of base.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save base-env
```

## Usage

```js
var Base = require('base');
var env = require('base-env');
var base = new Base();
base.use(env());
```

## API

### [createEnv](index.js#L42)

Create an `env` object with the given `name`, function, filepath or app instance, and options. See the [Env](#Env) API docs below.

**Params**

* `name` **{String}**
* `val` **{Object|Function|String}**
* `options` **{Object}**
* `returns` **{Object}**

**Example**

```js
var base = require('base');
var env = require('base-env');
var app = new Base();
app.use(env());

var env = app.createEnv('foo', function() {});
```

### [Env](lib/env.js#L33)

Create an instance of `Env` with the given `name`, `fn`, `app` instance, and options. The `Env` class is used by [base-generators][] to handle some of the heavy lifting for resolving generators.

**Params**

* `name` **{String}**
* `fn` **{Function|Object|String}**: Function to be lazily invoked, instance, or filepath that resolves to one of the other types when required.
* `app` **{Object}**: Base instance to use for invocation context.
* `options` **{Object}**

**Example**

```js
var env = new Env('foo', function(app) {
  // do stuff to app
});
```

### [.isMatch](lib/env.js#L67)

Returns true if the given `str` matches any of the following properties, in order:

* `env.key`
* `env.name`
* `env.alias`
* `env.dirname`
* `env.path`
* `env.basename`

**Params**

* `str` **{String}**: The string to match
* `returns` **{Boolean}**: Retuns true if a match is made.

**Example**

```js
var env = new Env('foo', fucntion(){});
console.log(env.isMatch('bar')) //=> false
console.log(env.isMatch('foo')) //=> true
```

### [.invoke](lib/env.js#L97)

Invoke `env.fn` with the given `context` and `options`.

**Params**

* `context` **{Object}**: The application instance to use for invoking `env.fn`
* `opptions` **{Object}**
* `returns` **{Object}**

**Example**

```js
var app = new Base();
env.fn(app, {doStuff: true});
```

### [.isDefault](lib/env.js#L165)

Getter that is set to `true` when the env being loaded is in the user's working directory.

* `returns` **{Boolean}**

**Example**

```js
var env = new Env('generator.js', generatorFn, {cwd: process.cwd()});
console.log(env.isDefault);
//=> true
```

### [.namespace](lib/env.js#L185)

Getter for resolving the `namespace` of an `env`. A namespace is created by joining the `namespace` from a parent instance (if exists) to `env.alias` (e.g. `parent.namespace + '.' + env.alias`).

```js
var env = new Env('foo', function() {});

* `returns` **{String}**  

## About
### Related projects
- [base-generators](https://www.npmjs.com/package/base-generators): Adds project-generator support to your `base` application. | [homepage](https://github.com/node-base/base-generators "Adds project-generator support to your `base` application.")
- [base-runner](https://www.npmjs.com/package/base-runner): Orchestrate multiple instances of base at once. | [homepage](https://github.com/node-base/base-runner "Orchestrate multiple instances of base at once.")
- [base](https://www.npmjs.com/package/base): Framework for rapidly creating high quality, server-side node.js applications, using plugins like building blocks | [homepage](https://github.com/node-base/base "Framework for rapidly creating high quality, server-side node.js applications, using plugins like building blocks")

### Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Contributors
| **Commits** | **Contributor** |  
| --- | --- |  
| 37 | [jonschlinkert](https://github.com/jonschlinkert) |  
| 6  | [doowb](https://github.com/doowb) |  

### Release history

### Building docs
_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

### Running tests

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test

```
### Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](https://twitter.com/jonschlinkert)

### License

Copyright © 2018, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.7.0, on July 19, 2018._

[verb]: https://github.com/verbose/verb

[base-generators]: https://github.com/node-base/base-generators
```