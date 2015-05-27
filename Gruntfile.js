module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        watch: {
            options: {
                livereload: true
            },
            js: {
                files: ['**/*.js']
            },
            json: {
                files: ['**/*.json']
            },
            css: {
                files: ['**/*.less'],
                tasks: ['less']
            },
            html: {
                files: ['**/*.html']
            }
        },
        connect: {
            options: {
                port: 9002,
                hostname: '*',
                livereload: true
            },
            livereload: {
                options: {
                    open: false
                }
            }
        },
        open: {
            index: {
                path: 'http://localhost:<%= connect.options.port%>/index.html'
            },
            test: {
                path: 'http://localhost:<%= connect.options.port%>/tests.html'
            }
        },
        less: {
            dev: {
                options: {
                    paths: ['css/'],
                    cleancss: true
                },
                files: {
                    'css/style.css': ['css/*.less', 'css/**/*.less']
                }
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    src: [
                        'js/**/*.js',
                        'js/**/*.html',
                        'css/**/*.css',
                        'fonts/**',
                        'html/**/*.html',
						'favicon.ico',
                        'index.html',
                        '!js/test/**/*.js',
                        '!js/main-unit-tests.js'
                    ],
                    dest: 'dist/refactoring'
                }]

            }
        },
        clean: {
            dist: [
                'dist/**'
            ]
        },
        jshint: {
            options: {
                sub: true
            },
            all: [
                'js/**/*.js',
                '!js/lib/**',
                '!js/code/**',
                'js/test/**/*.js',
                '!js/test/lib/**/*.js'
            ]
        },
        jslint: {
            client: {
                src: [
                    'js/**/*.js',
                    '!js/lib/**',
                    '!js/code/**',
                    'js/test/**/*.js',
                    '!js/test/lib/**/*.js'
                ],
                directives: {
                    browser: true,
                    todo: true,
                    nomen: true,
                    sub: true,
                    plusplus: true,
                    unparam: true,
                    predef: [
                        '$',
                        '_',
                        'require',
                        'define',
                        'QUnit'
                    ]
                }
            }
        }
    });

    grunt.registerTask('default', [
        'clean',
        'less',
        'copy',
        'connect:livereload',
        'open:index',
        'watch'
    ]);

    grunt.registerTask('lint', [
        'jshint',
        'jslint'
    ]);

    grunt.registerTask('build', [
        'lint',
        'clean',
        'less',
        'copy'
    ]);

    grunt.registerTask('test', [
        'clean',
        'less',
        'connect:livereload',
        'open:test',
        'watch'
    ]);

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-fileindex');
};
