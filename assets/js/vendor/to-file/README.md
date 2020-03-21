# to-file [![NPM version](https://img.shields.io/npm/v/to-file.svg?style=flat)](https://www.npmjs.com/package/to-file) [![NPM downloads](https://img.shields.io/npm/dm/to-file.svg?style=flat)](https://npmjs.org/package/to-file) [![Build Status](https://img.shields.io/travis/jonschlinkert/to-file.svg?style=flat)](https://travis-ci.org/jonschlinkert/to-file)

Convert a file path to a vinyl file.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install to-file --save
```

## Usage

```js
var toFile = require('to-file');
var glob = require('glob');

var files = glob.sync('**/*.js')
files = files.map(function(fp) {
  return toFile(fp);
});
```

**glob parent**

Optionally pass the original glob pattern as the second argument to populate `file.base` from the [glob-parent](https://github.com/es128/glob-parent).

```js
var files = glob.sync('**/*.js')
files = files.map(function(fp) {
  return toFile(fp, '**/*.js');
});
```

**options**

If an options object is passed as the second or third argument, the `cwd` and `base` properties will be used to update the file object, and the `options` object will be added as a property on the `file` object.

```js
var files = glob.sync('**/*.js')
files = files.map(function(fp) {
  return toFile(fp, '**/*.js');
});
```

## Related projects

You might also be interested in these projects:

* [to-template](https://www.npmjs.com/package/to-template): Convert a vinyl file object to a Template-compatible template object. | [homepage](https://github.com/jonschlinkert/to-template)
* [to-vinyl](https://www.npmjs.com/package/to-vinyl): Convert an object to a vinyl file object. Safely mixes additional properties onto the file… [more](https://www.npmjs.com/package/to-vinyl) | [homepage](https://github.com/jonschlinkert/to-vinyl)

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/to-file/issues/new).

## Building docs

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install verb && npm run docs
```

Or, if [verb](https://github.com/verbose/verb) is installed globally:

```sh
$ verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/jonschlinkert/to-file/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on May 07, 2016._