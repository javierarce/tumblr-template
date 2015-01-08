module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
          dist: {
            src: [
              'js/underscore.min.js',
              'js/d3.v3.min.js',
              'js/tumblr.plugins.js',
              'js/jquery.tumblr.plugin.js',
              'js/jquery.music.snitch.js',
              'js/blog.js',
            ],
            dest: 'blog/js/production.js'
          }
        },

        uglify: {
          build: {
            src: 'blog/js/production.js',
            dest: 'blog/js/production.min.js'
          }
        },

        jshint: {
          all: ['Gruntfile.js', 'js/blog.js']
        },

        compass: {
          dist: {
            options: {
              config: 'config.rb'
            }
          }
        },

        imagemin: {
          dynamic: {
            files: [{
              expand: true,
              cwd: 'img/',
              src: ['**/*.{png,jpg,gif}'],
              dest: 'img/'
            }]
          }
        },

        watch: {
          app: {
            files: ['js/**/*.js'],
            options: {
              livereload: false,
              spawn: false,
            },
          },
          scripts: {
            files: ['js/*.js'],
            tasks: ['concat', 'uglify', 'jshint'],
            options: {
              livereload: false,
              spawn: false,
            },
          },

          css: {
            files: ['scss/*.scss'],
            tasks: ['compass'],
            options: {
              livereload: false,
              spawn: false,
            }
          }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-deploy');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['watch', 'jshint', 'concat', 'uglify', 'imagemin', 'compass']);
    grunt.registerTask('generate', ['jshint', 'concat', 'uglify', 'imagemin', 'compass']);

};
