# git-config-path [![NPM version](https://img.shields.io/npm/v/git-config-path.svg?style=flat)](https://www.npmjs.com/package/git-config-path) [![NPM monthly downloads](https://img.shields.io/npm/dm/git-config-path.svg?style=flat)](https://npmjs.org/package/git-config-path)  [![NPM total downloads](https://img.shields.io/npm/dt/git-config-path.svg?style=flat)](https://npmjs.org/package/git-config-path) [![Linux Build Status](https://img.shields.io/travis/jonschlinkert/git-config-path.svg?style=flat&label=Travis)](https://travis-ci.org/jonschlinkert/git-config-path)

> Resolve the path to the user's local or global .gitconfig.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save git-config-path
```

## Usage

Automatically gets the nearest `.git` config path, starting with the current working directory, then looking in the user's `home` directory.

```js
var gitConfigPath = require('git-config-path')();
//=> '/Users/jonschlinkert/dev/git-config-path/.git/config'
```

To force `git-config-path` to only look for a global config path, pass `global`:

```js
var gitConfigPath = require('git-config-path')('global');
//=> '/Users/jonschlinkert/.gitconfig'
```

## About

### Related projects

* [git-branch](https://www.npmjs.com/package/git-branch): Get the current branch for a local git repository. | [homepage](https://github.com/jonschlinkert/git-branch)
* [git-repo-name](https://www.npmjs.com/package/git-repo-name): Get the repository name from the git remote origin URL. | [homepage](https://github.com/jonschlinkert/git-repo-name)
* [git-user-name](https://www.npmjs.com/package/git-user-name): Get a user's name from git config at the project or global scope, depending on… [more](https://github.com/jonschlinkert/git-user-name) | [homepage](https://github.com/jonschlinkert/git-user-name)
* [git-username](https://www.npmjs.com/package/git-username): Get the username from a git remote origin URL. | [homepage](https://github.com/jonschlinkert/git-username)
* [is-git-url](https://www.npmjs.com/package/is-git-url): Regex to validate that a URL is a git url. | [homepage](https://github.com/jonschlinkert/is-git-url)
* [parse-git-config](https://www.npmjs.com/package/parse-git-config): Parse `.git/config` into a JavaScript object. sync or async. | [homepage](https://github.com/jonschlinkert/parse-git-config)

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Building docs

_(This document was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme) (a [verb](https://github.com/verbose/verb) generator), please don't edit the readme directly. Any changes to the readme must be made in [.verb.md](.verb.md).)_

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
Released under the [MIT license](https://github.com/jonschlinkert/git-config-path/blob/master/LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.2.0, on October 26, 2016._