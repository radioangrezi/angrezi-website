# src-stream [![NPM version](https://badge.fury.io/js/src-stream.svg)](http://badge.fury.io/js/src-stream)  [![Build Status](https://travis-ci.org/doowb/src-stream.svg)](https://travis-ci.org/doowb/src-stream)

> Wrap readable streams to turn them into passthrough streams.

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i src-stream --save
```

## Usage

```js
var src = require('src-stream');
```

## API

### [srcStream](index.js#L39)

Wrap a source stream to passthrough any data that's being written to it.

**Params**

* `stream` **{Stream}**: Readable stream to be wrapped.
* `returns` **{Stream}**: Duplex stream to handle reading and writing.

**Example**

```js
var src = require('src-stream');

// wrap something that returns a readable stream
var stream = src(plugin());

fs.createReadStream('./package.json')
  .pipe(stream)
  .on('data', console.log)
  .on('end', function () {
    console.log();
    console.log('Finished');
    console.log();
  });
```

## Related projects

* [duplexify](https://github.com/mafintosh/duplexify): Turn a writeable and readable stream into a streams2 duplex stream with support for async… [more](https://github.com/mafintosh/duplexify)
* [merge-stream](https://github.com/grncdr/merge-stream): Create a stream that emits events from multiple other streams
* [stream-loader](https://github.com/jonschlinkert/stream-loader): create a read stream from a glob of files. can be used as a loader-cache… [more](https://github.com/jonschlinkert/stream-loader)
* [through2](https://github.com/rvagg/through2#readme): A tiny wrapper around Node streams2 Transform to avoid explicit subclassing noise

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/doowb/src-stream/issues/new)

## Author

**Brian Woodward**

+ [github/doowb](https://github.com/doowb)
+ [twitter/doowb](http://twitter.com/doowb)

## License

Copyright © 2015 Brian Woodward
Released under the MIT license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on July 14, 2015._