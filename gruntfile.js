module.exports = function(grunt) {

  grunt.initConfig({
    less: {
      development: {
        options: {
          sourceMap: true,
          sourceMapFilename: 'style.css.map',
          sourceMapURL: "style.css.map"
        },
        files: {
          // target.css file: source.less file
          "style.css": "style.less"
        }
      }
    },
    watch: {
      styles: {
        // Which files to watch (all .less files recursively in the less directory)
        files: ['*.less'],
        tasks: ['less']
      }
    }
  });
 
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
 
  grunt.registerTask('default', ['watch']);

};