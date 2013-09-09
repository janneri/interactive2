module.exports = function(grunt) {
  "use strict";
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: ['Gruntfile.js', 'app/scripts/*.js']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['jshint']);

};
