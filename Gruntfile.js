module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({

    jshint        : {
      options       : {
        reporter      : require('jshint-stylish')
      },
      build        : [ 
        'js/*.js',
      ]
    },
    
    uglify      : {
      app      : {
        options		  : {
          mangle		  : true,
          compress    : {
            sequences   : true,
            dead_code   : true,
            conditionals: true,
            booleans    : true,
            unused      : true,
            if_return   : true,
            join_vars   : true,
            drop_console: true
          }
        },
        files       : {
          'public/app.min.js': ['js/app.js']
        }
      }
    },

    csslint: {
      strict: {
        options: {
          import: 2
        },
        src: ['css/*.css']
      }
    },
    
    cssmin: {
      target: {
        files: {
          'public/style.min.css': ['css/style.css']
        }
      }
    },
    
    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          'public/index.html': 'firechat.html',    // 'destination': 'source'
        }
      }
    },

    watch: {
  // Watch HTML files for changes
      html: {
        files       : [
          '*.html' 
        ], 
        tasks       : [
          'htmlmin',
        ],
        options     : {
  // Starts a live reload server on the default port 35729. Requires browser extension, download at: http://livereload.com/extensions/
          livereload  : true
        }
      },
  // Watch JS files for changes
      js: {
        files       : [
          'js/*.js', 
        ], 
        tasks       : [
          'jshint',
          'uglify:app'
        ],
        options     : {
  // Starts a live reload server on the default port 35729. Requires browser extension, download at: http://livereload.com/extensions/
          livereload  : true
        }
      },
  // Watch .css files for changes
      css: {
        files       : [
          'css/*.css'
        ], 
        tasks       : [
          'csslint','cssmin'
        ],
        options     : {
  // Starts a live reload server on the default port 35729. Requires browser extension, download at: http://livereload.com/extensions/
          livereload  : true
        }
      }
    }
  });
};
