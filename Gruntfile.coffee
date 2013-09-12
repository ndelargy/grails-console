module.exports = (grunt) ->

  # Project configuration.
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")
#    uglify:
#      options:
#        banner: "/*! <%= pkg.name %> <%= grunt.template.today(\"yyyy-mm-dd\") %> */\n"
#
#      build:
#        src: "src/<%= pkg.name %>.js"
#        dest: "build/<%= pkg.name %>.min.js"

    concat:
      css:
        files: [
          src: [
            "web-app/lib/bootstrap/css/bootstrap.min.css",
            "web-app/lib/bootstrap/css/bootstrap-theme.min.css",
            "web-app/lib/font-awesome/css/font-awesome.min.css",
            "web-app/lib/codemirror-3.15/lib/codemirror.css",
            "web-app/css/jquery.layout.css",
            "web-app/css/grails-console.css"
          ]
          dest: "web-app/build/gconsole.css"
        ]
      js:
        files: [
          src: [
            "web-app/js/jquery-1.7.1.min.js",
            "web-app/js/jquery-ui-1.8.17.custom.min.js",
            "web-app/lib/bootstrap/js/bootstrap.min.js",
            "web-app/js/underscore-min.js",
            "web-app/js/backbone-min.js",
            "web-app/js/jquery.layout-latest.min.js",
            "web-app/js/jquery.hotkeys.js",
            "web-app/lib/codemirror-3.15/lib/codemirror.js",
            "web-app/lib/codemirror-3.15/mode/groovy/groovy.js",
            "web-app/js/gconsole/backbone-localstorage.js",
            "web-app/js/gconsole/console.js"
          ]
          dest: "web-app/build/gconsole.js"
        ]

    handlebars:
      compile:
        options:
          namespace: "JST"
          processName:  (filePath) ->
            filePath.replace(/^web-app\/templates\//, "").replace(/\.hbs$/, "")

        files:
          "web-app/build/jst.js": "web-app/templates/**/*.hbs"

    watch:
      jst:
        files: 'web-app/templates/**/*.hbs'
        tasks: ['handlebars:compile']

  # Load the plugin that provides the "uglify" task.
  #  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-concat"
  grunt.loadNpmTasks "grunt-contrib-copy"
  grunt.loadNpmTasks "grunt-contrib-handlebars"
  grunt.loadNpmTasks "grunt-contrib-watch"

# Default task(s).
#  grunt.registerTask "default", ["uglify"]