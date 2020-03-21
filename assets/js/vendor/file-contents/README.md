# file-contents [![NPM version](https://badge.fury.io/js/file-contents.svg)](http://badge.fury.io/js/file-contents)

> Set the `contents` property on a file object. Abstraction from vinyl-fs to support stream or non-stream usage.

This is inspired by the code in [vinyl-fs](http://github.com/wearefractal/vinyl-fs) `src`. I needed a function that essentially did the same thing but could be used with stream or non-stream code.

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i file-contents --save
```

## Usage

```js
var through = require('through2');
var contents = require('file-contents');

function toStream(fp) {
  var stream = through.obj();
  stream.write({path: fp});
  stream.end();
  return stream;
}

toStream('README.md')
  .pipe(contents())
  .on('data', function (file) {
    console.log(file.contents.toString());
  });
```

**async**

An `.async()` method is exposed for non-stream, async usage.

```js
contents.async({path: 'README.md'}, function (err, file) {
  // results in something like:
  // 
  //   { path: 'README.md',
  //   stat:
  //    { dev: 16777218,
  //      mode: 33188,
  //      nlink: 1,
  //      uid: 501,
  //      gid: 20,
  //      rdev: 0,
  //      blksize: 4096,
  //      ino: 26436116,
  //      size: 2443,
  //      blocks: 8,
  //      atime: Fri Jul 17 2015 03:01:54 GMT-0400 (EDT),
  //      mtime: Wed Jul 15 2015 02:46:55 GMT-0400 (EDT),
  //      ctime: Wed Jul 15 2015 02:46:55 GMT-0400 (EDT),
  //      birthtime: Tue Jul 14 2015 23:03:58 GMT-0400 (EDT) },
  // contents: <Buffer 23 20 66 69 6c 65 2d 63 6f 6e 74 65 6e 74 73 20 5b 21 5b 4e 50 4d 20 76 65 72 73 69 6f 6e 5d 28 68 74 74 70 73 3a 2f 2f 62 61 64 67 65 2e 66 75 72 79 ... > }
});
```

**sync**

A `.sync()` method is exposed for non-stream, sync usage.

```js
var file = contents.sync({path: 'README.md'});
// results in something like:
// 
//   { path: 'README.md',
//   stat:
//    { dev: 16777218,
//      mode: 33188,
//      nlink: 1,
//      uid: 501,
//      gid: 20,
//      rdev: 0,
//      blksize: 4096,
//      ino: 26436116,
//      size: 2443,
//      blocks: 8,
//      atime: Fri Jul 17 2015 03:01:54 GMT-0400 (EDT),
//      mtime: Wed Jul 15 2015 02:46:55 GMT-0400 (EDT),
//      ctime: Wed Jul 15 2015 02:46:55 GMT-0400 (EDT),
//      birthtime: Tue Jul 14 2015 23:03:58 GMT-0400 (EDT) },
// contents: <Buffer 23 20 66 69 6c 65 2d 63 6f 6e 74 65 6e 74 73 20 5b 21 5b 4e 50 4d 20 76 65 72 73 69 6f 6e 5d 28 68 74 74 70 73 3a 2f 2f 62 61 64 67 65 2e 66 75 72 79 ... > }
```

## Changes

**v0.2.0**

* renames `.getContents` method to `.async`
* adds `.sync` method

## Related projects

* [file-stat](https://www.npmjs.com/package/file-stat): Set the `stat` property on a file object. Abstraction from vinyl-fs to support stream or… [more](https://www.npmjs.com/package/file-stat) | [homepage](https://github.com/jonschlinkert/file-stat)
* [file-symlinks](https://www.npmjs.com/package/file-symlinks): Resolve symlinks and expose the `stat` property on a file object. | [homepage](https://github.com/jonschlinkert/file-symlinks)
* [stream-loader](https://www.npmjs.com/package/stream-loader): create a read stream from a glob of files. can be used as a loader-cache… [more](https://www.npmjs.com/package/stream-loader) | [homepage](https://github.com/jonschlinkert/stream-loader)
* [vinyl](https://www.npmjs.com/package/vinyl): A virtual file format | [homepage](http://github.com/gulpjs/vinyl)
* [vinyl-fs](https://www.npmjs.com/package/vinyl-fs): Vinyl adapter for the file system | [homepage](http://github.com/wearefractal/vinyl-fs)

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/file-contents/issues/new).

## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2015 Jon Schlinkert
Released under the MIT license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on October 08, 2015._