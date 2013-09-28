((App) ->

  App.Router = Backbone.Router.extend

    routes:
      "local/:file":  "openLocalFile"
      "remote/*file": "openRemoteFile"
      "new":          "newFile"
      "files":        "files"
      "*path":        "defaultRoute"

    navigateToFile: (file) ->
      @navigate "local/#{file.get('name')}", trigger: true

) App