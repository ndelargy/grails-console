module.exports = (grunt) ->

  # Project configuration.
  grunt.initConfig

    pkg: grunt.file.readJSON("package.json")

    jsSrc: [
      "web-app/js/jquery-1.7.1.min.js",
      "web-app/js/jquery-ui-1.8.17.custom.min.js",
      "web-app/lib/bootstrap/js/bootstrap.min.js",
      "web-app/js/underscore-min.js",
      "web-app/js/backbone-min.js",
      "web-app/js/handlebars.runtime.js",
      "web-app/js/jquery.layout-latest.min.js",
      "web-app/js/jquery.hotkeys.js",
      "web-app/lib/codemirror-3.15/lib/codemirror.js",
      "web-app/lib/codemirror-3.15/mode/groovy/groovy.js",
      "web-app/build/jst.js",
      "web-app/js/gconsole/app.js",
      "web-app/js/gconsole/router.js",
      "web-app/js/gconsole/settings-model.js",
      "web-app/js/gconsole/settings-view.js",
      "web-app/js/gconsole/result-model.js",
      "web-app/js/gconsole/result-collection.js",
      "web-app/js/gconsole/result-view.js",
      "web-app/js/gconsole/result-collection-view.js",
      "web-app/js/gconsole/editor-view.js",
      "web-app/js/gconsole/file-model.js",
      "web-app/js/gconsole/file-collection.js",
      "web-app/js/gconsole/file-collect-view.js",
      "web-app/js/gconsole/local-file-store.js"
    ]

    cssSrc: [
      "web-app/lib/bootstrap/css/bootstrap.min.css",
      "web-app/lib/bootstrap/css/bootstrap-theme.min.css",
      "web-app/lib/font-awesome/css/font-awesome.min.css",
      "web-app/lib/codemirror-3.15/lib/codemirror.css",
      "web-app/css/jquery.layout.css",
      "web-app/css/grails-console.css"
    ]

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
          src: "<%= cssSrc %>"
          dest: "web-app/build/gconsole.css"
        ]
      js:
        files: [
          src: "<%= jsSrc %>"
          dest: "web-app/build/gconsole.js"
        ]

    handlebars:
      compile:
        options:
          namespace: "JST"
          processName: (filePath) ->
            filePath.replace(/^web-app\/templates\//, "").replace(/\.hbs$/, "")

        files:
          "web-app/build/jst.js": "web-app/templates/**/*.hbs"

    jasmine:
      test:
        src: "<%= jsSrc %>"
        options:
          specs: 'web-app/build/spec/*spec.*'
          helpers: 'web-app/spec/*helper.js'
          keepRunner: true

    coffee:
      spec:
        expand: true
        cwd: "web-app/spec"
        src: ["**/*.coffee"]
        dest: "web-app/build/spec/"
        ext: ".js"

    clean:
      build: ['web-app/build']
#      release: ["path/to/another/dir/one", "path/to/another/dir/two"]

    watch:
      jst:
        files: 'web-app/templates/**/*.hbs'
        tasks: ['handlebars:compile']

  grunt.loadNpmTasks "grunt-contrib-concat"
  grunt.loadNpmTasks "grunt-contrib-copy"
  grunt.loadNpmTasks "grunt-contrib-handlebars"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-jasmine"
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-clean"

# Default task(s).
#  grunt.registerTask "default", ["uglify"]
  grunt.registerTask "test", ["coffee:spec", "jasmine"]