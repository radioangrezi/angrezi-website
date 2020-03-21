# file-name [![NPM version](https://badge.fury.io/js/file-name.svg)](http://badge.fury.io/js/file-name)

> Get the basename of a filepath excluding extension.

Because I've typed the following one too many times:

```js
function filename(fp) {
  return path.basename(fp, path.extname(fp));
}
```

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i file-name --save
```

## Usage

```js
var filename = require('file-name');
filename('a/b/c/foo.json');
//=> 'foo'
```

## Related projects

Other useful node.js path utils:

* [is-absolute](https://www.npmjs.com/package/is-absolute): Return true if a file path is absolute. | [homepage](https://github.com/jonschlinkert/is-absolute)
* [is-relative](https://www.npmjs.com/package/is-relative): Returns `true` if the path appears to be relative. | [homepage](https://github.com/jonschlinkert/is-relative)
* [parse-filepath](https://www.npmjs.com/package/parse-filepath): Parse a filepath into an object. Falls back on the native node.js `path.parse` method if… [more](https://www.npmjs.com/package/parse-filepath) | [homepage](https://github.com/jonschlinkert/parse-filepath)
* [relative](https://www.npmjs.com/package/relative): Get the relative filepath from path A to path B. Calculates from file-to-directory, file-to-file, directory-to-file,… [more](https://www.npmjs.com/package/relative) | [homepage](https://github.com/jonschlinkert/relative)

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/file-name/issues/new).

## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2015 Jon Schlinkert
Released under the MIT license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on October 20, 2015._