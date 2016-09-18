# [grunt-safer-regex](https://github.com/hex7c0/grunt-safer-regex)

[![NPM version](https://img.shields.io/npm/v/grunt-safer-regex.svg)](https://www.npmjs.com/package/grunt-safer-regex)
[![Linux Status](https://img.shields.io/travis/hex7c0/grunt-safer-regex.svg?label=linux)](https://travis-ci.org/hex7c0/grunt-safer-regex)
[![Dependency Status](https://img.shields.io/david/hex7c0/grunt-safer-regex.svg)](https://david-dm.org/hex7c0/grunt-safer-regex)

> Detect possibly exponential-time regular expressions

## Getting Started
This plugin requires Grunt `^1.0.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-safer-regex --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-safer-regex');
```

## The "endline" task

### Overview
In your project's Gruntfile, add a section named `safer` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  safer: {
    your_target: {
      // Target-specific file lists and/or options go here.
    }
  }
});
```

### Options

#### Custom Options
In this example, search regex inside `tmp` directory.

```js
grunt.initConfig({
    custom_options: {
        files: {
            src: 'tmp/**/*'
        }
    }
});
```

### [License GPLv3](LICENSE)
