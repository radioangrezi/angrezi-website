var autoprefixer = require('autoprefixer');
module.exports = function(grunt) {

grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),

  // build
  sass: {
    dist: {
      options: {
        style: 'compressed'
      },
      files: {
        'css/main.css': 'sass/main.scss',
      }
    } 
  },
  postcss: {
      options: {
        processors: [
          autoprefixer({ browsers: ['> 1%'] }),
        ],
      },
      dist: {
          src: 'assets/css/*.css'
      }
    },
    // concat: {
    //   options: {
    //     separator: '\n;',
    //   },
    //   dist: {
    //     src: ['node_modules/jquery/dist/jquery.min.js', 'assets/js/script.js'],
    //     dest: 'assets/js/main.js',
    //   },
    // },
    // jshint: {
    //   files: ['assets/js/script.js'],
    //   options: {
    //     laxbreak: true,
    //   },
    // },

  // local dev
  watch: {
    css: {
      files: ['sass/*.scss'],
      tasks: ['sass']
    },
  },
  browserSync: {
    dev: {
      bsFiles: {
        src: [
              '**/*.php',
              '**/*.css',
              '**/*.js'
             ]
      },
      options: {
        proxy: 'localhost:8010',
        port: '9000',
        open: true,
        watchTask: true,
      }
    }
  },
  
});

grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-browser-sync');
/*grunt.loadNpmTasks('grunt-php');
grunt.loadNpmTasks('grunt-sftp-deploy');
grunt.loadNpmTasks('grunt-rsync');*/
grunt.loadNpmTasks('grunt-postcss');

grunt.registerTask('default', ['watch']);
grunt.registerTask('build', ['sass', 'postcss']); 
/*grunt.registerTask('deploy', ['build', 'rsync:deploy']);*/

/*grunt.registerTask('pull-content', ['rsync:pull-content']); 
grunt.registerTask('push-content', ['rsync:push-content']); */
};