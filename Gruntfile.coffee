module.exports = (grunt) ->

  # Project configuration.
  grunt.initConfig

    pkg: grunt.file.readJSON("package.json")

    jsSrc: [
      "web-app/vendor/js/libs/jquery-1.7.1.min.js",
      "web-app/vendor/js/libs/jquery-ui-1.8.17.custom.min.js",
      "web-app/vendor/bootstrap/js/bootstrap.min.js",
      "web-app/vendor/js/libs/underscore-min.js",
      "web-app/vendor/js/libs/backbone-min.js",
      "web-app/vendor/js/libs/handlebars.runtime.js",
      "web-app/vendor/jquery-layout/js/jquery.layout-latest.min.js",
      "web-app/vendor/js/plugins/jquery.hotkeys.js",
      "web-app/vendor/codemirror-3.15/lib/codemirror.js",
      "web-app/vendor/codemirror-3.15/mode/groovy/groovy.js",
      "web-app/build/jst.js",
      "web-app/src/app/app.js",
      "web-app/src/app/router.js",
      "web-app/src/app/settings-model.js",
      "web-app/src/app/settings-view.js",
      "web-app/src/app/result-model.js",
      "web-app/src/app/result-collection.js",
      "web-app/src/app/result-view.js",
      "web-app/src/app/result-collection-view.js",
      "web-app/src/app/editor-view.js",
      "web-app/src/app/file-model.js",
      "web-app/src/app/file-collection.js",
      "web-app/src/app/file-collect-view.js",
      "web-app/src/app/local-file-store.js"
    ]

    cssSrc: [
      "web-app/vendor/bootstrap/css/bootstrap.min.css",
      "web-app/vendor/bootstrap/css/bootstrap-theme.min.css",
      "web-app/vendor/font-awesome/css/font-awesome.min.css",
      "web-app/vendor/codemirror-3.15/lib/codemirror.css",
      "web-app/vendor/jquery-layout/css/jquery.layout.css",
      "web-app/src/styles/grails-console.css"
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
            filePath.replace(/^.*\/templates\//, "").replace(/\.hbs$/, "")

        files:
          "web-app/build/jst.js": "web-app/src/templates/**/*.hbs"

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