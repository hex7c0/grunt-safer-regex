'use strict';
/**
 * @file gruntfile
 * @subpackage main
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      all: [ 'Gruntfile.js', 'tasks/*.js', '<%= nodeunit.tests %>' ],
      options: {
        curly: true,
        indent: 2,
        quotmark: 'single',
        undef: true,
        unused: true,
        strict: true,
        node: true,
        // relax
        laxbreak: true,
        loopfunc: true,
        shadow: true
      }
    },

    safer: {

      object: {
        files: [ {
          src: 'tmp/invalid'
        }, {
          src: 'tmp/bad'
        }, {
          src: 'tmp/good'
        } ]
      },

      with_dot: {
        files: [ {
          src: 'tmp/**/*'
        } ]
      },

    },

    nodeunit: {
      tests: [ 'test/*_test.js' ]
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('test', [ 'lint', 'safer' ]);
  grunt.registerTask('lint', [ 'jshint' ]);
  grunt.registerTask('default', [ 'safer' ]);

};
