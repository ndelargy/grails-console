((App) ->

  App.Router = Backbone.Router.extend

    routes:
#      "new":          "newFile"
#      "files":        "files"
      "*path":        "defaultRoute"

    initialize: ->
#      @route /^local:(.*?)$/, 'openLocalFile'
#      @route /^remote:(.*?)$/, 'openRemoteFile'

    navigateToFile: (file, options) ->
      if file.isLocal()
        @navigate "local:#{file.get('name')}", options
      else
        @navigate "remote:#{file.id}", options

    navigateToRemoteFile: (file) ->
      @navigate "remote:#{file.get('id')}", trigger: true

) App