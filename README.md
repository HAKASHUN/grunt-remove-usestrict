grunt-remove-usestrict
======================

> A grunt task for removing "use strict" from your files.

## Getting Started

This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the
[Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create
a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins.
Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-remove-usestrict --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-remove-usestrict');
```

## Remove "usestrict" task

_Run this task with the `grunt remove_usestrict` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Usage


```js
remove_usestrict: {
  dist: {
    files: [
      {
        expand: true,
        cwd: 'public/app/js/',
        dest: 'build/app/js/',
        src: ['**/*.js']
      }
    ]
  }
}
```
