module.exports = function(grunt) {
    var config = {
        pkg: grunt.file.readJSON('package.json'),
        browserify:     {
            options:      {
                transform:  [ require('brfs') ],
                browserifyOptions: {
                    basedir: "Frontend/src/js/"
                }
            },
            recipes: {
                src:        'Frontend/src/main.js',
                dest:       'Frontend/www/assets/js/main.js'
            }
        }
    };
    var watchDebug = {
        options: {
            'no-beep': true
        },
        scripts: {
            files: ['Frontend/src/**/*.js', 'Frontend/**/*.ejs'],
            tasks: ['browserify:recipes']
        }
    };
    config.watch = watchDebug;
    grunt.initConfig(config);
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default',
        [
            'browserify:recipes',
        ]
    );

};