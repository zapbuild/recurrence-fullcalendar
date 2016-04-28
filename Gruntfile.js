/*
 * Gruntfile.js
 * Purpose : It is used for npm test and push and npm push
 *
 */

 module.exports = function(grunt) {

  // A very basic default task.
  grunt.registerTask('default', 'Log some stuff.', function() {
    grunt.log.write('Logging some stuff...').ok();
  });

};
