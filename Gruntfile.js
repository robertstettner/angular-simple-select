'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  // Default task.
  grunt.registerTask('default', ['jshint', 'karma:unit','ngAnnotate', 'uglify', 'copy:main']);

  // TravisCI task.
  grunt.registerTask('travis', ['jshint', 'karma:unit']);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: ['/**',
        ' * <%= pkg.name %> - <%= pkg.description %>',
        ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>',
        ' * @link <%= pkg.homepage %>',
        ' * @license <%= pkg.license %>',
        ' */',
        ''].join('\n')
    },
    karma: {
      unit: {configFile: 'test/karma.conf.js', singleRun: true},
      continuous: {configFile: 'test/karma.conf.js',  background: true }
  },
    jshint: {
      src: {
        files:{ src : ['src/*.js', 'demo/**/*.js'] },
        options: { jshintrc: '.jshintrc' }
      },
      test: {
        files:{ src : [ 'test/*.spec.js', 'gruntFile.js'] },
        options: grunt.util._.extend({}, grunt.file.readJSON('.jshintrc'), {
          node: true,
          globals: {
            angular: false,
            inject: false,
            jQuery: false,

            jasmine: false,
            afterEach: false,
            beforeEach: false,
            ddescribe: false,
            describe: false,
            expect: false,
            iit: false,
            it: false,
            spyOn: false,
            xdescribe: false,
            xit: false
          }
        })
      }
    },
    copy: {
        main: {
            files: [
                { expand: true, cwd: 'src/', src: ['*.css'], dest: 'dist/' },
                { expand: true, cwd: 'build/', src: ['*.js'], dest: 'dist/'}
            ]
        }
    },
    uglify: {
      options: {banner: '<%= meta.banner %>'},
      build: {
        expand: true,
        cwd: 'dist',
        src: ['*.js'],
        ext: '.min.js',
        dest: 'dist'
      }
    },

    ngAnnotate: {
      main: {
        expand: true,
        cwd: 'src',
        src: ['*.js'],
        dest: 'build'
      }
    }
  });

};
