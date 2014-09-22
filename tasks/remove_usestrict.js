/*
 * grunt-remove-usestrict
 *
 *
 * Copyright (c) 2014 HAKASHUN
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  var path = require('path');
  var chalk = require('chalk');

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('remove_usestrict', 'A task to remove usestrict', function () {

    // Iterate over all specified file groups.
    this.files.forEach(function (file) {
      var src = filterExistFile(file);
      if(src.length === 0) {
        grunt.log.warn( 'Destination (' + file.dest + ') not written because src files were empty.' );
        return;
      }
      var dest;
      var isExpandedPair;
      try {
        src.forEach(function(s){
          isExpandedPair = file.orig.expand || false;
          if (detectDestType(file.dest) === 'directory') {
            dest = (isExpandedPair) ? file.dest : unixifyPath(path.join(file.dest, s));
          } else {
            dest = file.dest;
          }
          if(!grunt.file.isDir(s)) {
            grunt.log.writeln('Removing "use strict" from ' + chalk.cyan(s) + ' to ' + chalk.cyan(dest));
            var sourceCode = '' + grunt.file.read(s, {encoding: 'utf8'});
            sourceCode = sourceCode.replace(/("|')use strict\1;?/g, '');
            grunt.file.write(dest, sourceCode, {encoding: 'utf8'});
          }
        });
      } catch(e) {
        outputError(e);
      }
    });
  });

  /**
   * filtering file array only exist file
   * @param file
   * @returns {array}
   */
  var filterExistFile = function(file) {
    return file.src.filter(function (filepath) {
      // Warn on and remove invalid source files (if nonull was set).
      if (!grunt.file.exists(filepath)) {
        grunt.log.warn('Source file "' + filepath + '" not found.');
        return false;
      } else {
        return true;
      }
    });
  };

  /**
   * output error
   * @param e
   */
  var outputError = function(e) {
    var err = new Error( 'Removing "use strict" is failed.' );
    if ( e.msg ) {
      err.message += ', ' + e.msg + '.';
    }
    err.origError = e;
    grunt.fail.warn( err );
  };

  /**
   * detectDestType
   * @param dest
   * @returns {string}
   */
  var detectDestType = function(dest) {
    if (grunt.util._.endsWith(dest, '/')) {
      return 'directory';
    } else {
      return 'file';
    }
  };

  /**
   * unixifyPath
   * @param filepath
   * @returns {*}
   */
  var unixifyPath = function(filepath) {
    if (process.platform === 'win32') {
      return filepath.replace(/\\/g, '/');
    } else {
      return filepath;
    }
  };
};
