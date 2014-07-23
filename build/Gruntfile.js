var project = {
    dirs: {
        src : '../src',
        dist: '../dist',
        root: '../'
    }
};

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: ';'
            }
        },
        uglify: {
            options: {
                preserveComments: 'some'
            },
            dist: {
                files: {
                    '../dist/is.min.js': ['../src/is.js']
                }
            }
        },
        wrap: {
          basic: {
            src: ['../dist/is.min.js'],
            dest: project.dirs.dist + '/is_node.min.js',
            options: {
              wrapper: ['// Wrapped for node compatibility\n', 'module.exports = Is;\n']
            }
          }
        },

        mkdir           : {
            dist: {
                options: {
                    create: [project.dirs.dist]
                }
            }

        },
        clean           : {
            dist       : [project.dirs.dist]

        }

    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('build', 'run build', function () {
        var tasks = ['clean:dist', 'mkdir:dist', 'uglify', 'wrap'];
        grunt.option('force', true);
        grunt.task.run(tasks);
    });

};