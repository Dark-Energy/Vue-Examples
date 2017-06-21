// Project configuration. 
module.exports = function(grunt) {
	grunt.initConfig({
	uglify: {
      build: {
        src: ['js/*.js', 'js/run.js'],
        dest: 'build/dynalinks.min.js'
      }
	},
});

grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.registerTask('default', ['uglify']);

};