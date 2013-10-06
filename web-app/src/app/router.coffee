((App) ->

  App.Router = Backbone.Router.extend

    routes:
      "new":          "newFile"
      "files":        "files"
      "*path":        "defaultRoute"

    initialize: ->
      @route /^local:(.*?)$/, 'openLocalFile'
      @route /^remote:(.*?)$/, 'openRemoteFile'

    navigateToFile: (file) ->
      @navigate "local:#{file.get('name')}", trigger: true

    navigateToRemoteFile: (file) ->
      @navigate "remote:#{file.get('id')}", trigger: true

) App