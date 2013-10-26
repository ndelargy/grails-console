module.exports = (grunt) ->

  # Project configuration.
  grunt.initConfig

    pkg: grunt.file.readJSON "package.json"

    jsSrc: [
      "web-app/vendor/js/libs/jquery-1.7.1.min.js"
      "web-app/vendor/js/libs/jquery-ui-1.8.17.custom.min.js"
      "web-app/vendor/bootstrap/js/bootstrap.min.js"
      "web-app/vendor/js/libs/underscore-min.js"
      "web-app/vendor/js/libs/backbone-min.js"
      "web-app/vendor/js/libs/backbone.marionette.min.js"
      "web-app/vendor/js/libs/handlebars.runtime.js"
      "web-app/vendor/jquery-layout/js/jquery.layout-latest.min.js"
      "web-app/vendor/js/plugins/jquery.hotkeys.js"
      "web-app/vendor/codemirror-3.18/lib/codemirror.js"
      "web-app/vendor/codemirror-3.18/mode/groovy/groovy.js"
      "web-app/dist/debug/jst.js"
      "web-app/dist/debug/app/app.js"
      "web-app/dist/debug/app/item-view.js"
      "web-app/dist/debug/app/router.js"
      "web-app/dist/debug/app/header-view.js"
      "web-app/dist/debug/app/settings-model.js"
      "web-app/dist/debug/app/settings-view.js"
      "web-app/dist/debug/app/main-view.js"
      "web-app/dist/debug/app/help-view.js"

      "web-app/dist/debug/app/entities/**/*.js"
      "web-app/dist/debug/app/editor/**/*.js"
      "web-app/dist/debug/app/files/**/*.js"
    ]

    cssSrc: [
      "web-app/vendor/bootstrap/css/bootstrap.min.css"
#      "web-app/vendor/bootstrap/css/bootstrap-theme.min.css"
      "web-app/vendor/font-awesome/css/font-awesome.min.css"
      "web-app/vendor/codemirror-3.18/lib/codemirror.css"
      "web-app/vendor/codemirror-3.18/theme/lesser-dark.css"
      "web-app/vendor/jquery-layout/css/jquery.layout.css"
      "web-app/dist/debug/app.css"
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
          "web-app/dist/debug/jst.js": "web-app/src/templates/**/*.hbs"

    jasmine:
      test:
        src: "<%= jsSrc %>"
        options:
          specs: 'web-app/target/spec/*spec.*'
          helpers: 'web-app/spec/*helper.js'
          keepRunner: true
          outfile: 'web-app/target/spec/SpecRunner.html'

    coffee:
      app:
        expand: true
        cwd: "web-app/src/app"
        src: ["**/*.coffee"]
        dest: "web-app/dist/debug/app"
        ext: ".js"
      spec:
        expand: true
        cwd: "web-app/spec"
        src: ["**/*.coffee"]
        dest: "web-app/target/spec/"
        ext: ".js"

    less:
      app:
        files:
          'web-app/dist/debug/app.css': 'web-app/src/styles/app.less'

    copy:
      js:
        expand: true,
        cwd: 'web-app/src/app'
        src: '**/*.js'
        dest: 'web-app/dist/debug/app'
      img:
        expand: true,
        cwd: 'web-app/src/img'
        src: '**/*'
        dest: 'web-app/dist/debug/img'


    clean:
      dist: ['web-app/dist']
      spec: 'web-app/target/spec/'
#      release: ["path/to/another/dir/one", "path/to/another/dir/two"]

    watch:
      jst:
        files: 'web-app/src/templates/**/*.hbs'
        tasks: ['handlebars:compile']
      less:
        files: 'web-app/src/styles/**/*.less'
        tasks: ['less:app']
      js:
        files: 'web-app/src/app/**/*.js'
        tasks: ['copy:js']
      coffee:
        files: 'web-app/src/app/**/*.coffee'
        tasks: ['coffee:app']
      gruntfile:
        files: 'Gruntfile.coffee'
        tasks: ['debug']

  grunt.loadNpmTasks "grunt-contrib-concat"
  grunt.loadNpmTasks "grunt-contrib-copy"
  grunt.loadNpmTasks "grunt-contrib-handlebars"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-jasmine"
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-clean"
  grunt.loadNpmTasks "grunt-contrib-less"

  grunt.registerTask "json", "Write resource config to file", ->
    json =
      jsSrc: grunt.file.expand(grunt.config.get('jsSrc'))
      cssSrc: grunt.file.expand(grunt.config.get('cssSrc'))
    grunt.file.write 'grails-app/conf/resources.json', JSON.stringify(json, undefined, 2)
#    grunt.log.writeln JSON.stringify(json)

  grunt.registerTask "default", ["debug"]
  grunt.registerTask "test", ["debug", "clean:spec", "coffee:spec", "jasmine"]
  grunt.registerTask "debug", ["clean:dist", "handlebars:compile", "coffee:app", "copy:img", "less:app", "json"]