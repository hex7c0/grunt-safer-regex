'use strict';
/**
 * @file grunt-safer-regex main
 * @module grunt-safer
 * @subpackage main
 * @version 0.1.0
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/*
 * functions
 */
function safer(grunt) {

  var safe = require('safer-regex');
  var detects = [ /[^\/](\/[^\/\n\r]+\/)[^\/]/g,
    /RegExp\(((?:'|")[^'"\n\r]+(?:'|"))/g ];
  var ii = detects.length;

  grunt.registerMultiTask('safer',
    'detect possibly exponential-time regular expressions', function() {

      var done = this.async();
      var success = true;
      var processed = {};

      this.files.forEach(function(file) {

        file.src.filter(function(filepath) {

          if (!grunt.file.exists(filepath)) {
            grunt.log.warn('Source file "' + filepath + '" not found.');
            return false;
          }
          return true;
        }).map(
          function(filepath) {

            var match;
            var filepathPrinted = false;
            var source = grunt.file.read(filepath);

            for (var i = 0; i < ii; ++i) {
              var detect = detects[i];

              while ((match = detect.exec(source)) !== null) {
                var regex = match[1];
                var isProcessed = processed[regex];

                if (isProcessed === true) {
                  continue;
                } else if (isProcessed === false) {
                  if (!filepathPrinted) {
                    grunt.log.writeln(grunt.log.wordlist([ ' > ' + filepath ],
                      {
                        color: 'cyan'
                      }));
                    filepathPrinted = true;
                  }
                  grunt.log.error(regex);
                  continue;
                }

                var lastIndex = regex.length - 1;
                var lastChar = regex[lastIndex];
                if (lastChar === 'g' || lastChar === 'm' || lastChar === 'i') { // regex flag
                  regex = regex.substring(0, lastIndex);
                }

                grunt.log.debug('match', regex);
                try {
                  safe(regex);
                  processed[regex] = true;
                } catch (err) {
                  if (err.message === 'regex is invalid or not safe') {
                    if (!filepathPrinted) {
                      grunt.log.writeln(grunt.log.wordlist(
                        [ ' > ' + filepath ], {
                          color: 'cyan'
                        }));
                      filepathPrinted = true;
                    }
                    grunt.log.error(regex);
                    processed[regex] = false;
                  } else { // detect fails
                    processed[regex] = true;
                  }
                }
              }
            }

            if (filepathPrinted) {
              grunt.log.writeln();
              success = false;
            }
          });
      });

      if (success) {
        grunt.log.ok('0 dangerous regex detected');
      }
      done(success);
    });
}
module.exports = safer;
