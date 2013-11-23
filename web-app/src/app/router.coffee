((App, Backbone) ->

  App.Router = Backbone.Router.extend

    initialize: ->
      @route '*path', 'newFile'
      @route 'new', 'newFile'
      @route /^local:(.*?)$/, 'openLocalFile'
      @route /^remote:(.*?)$/, 'openRemoteFile'

    showFile: (file) ->
      @navigate "#{file.getStore()}:#{file.id}"

    newFile: ->
      App.EditorApp.controller.newFile()

    openLocalFile: (name) ->
      App.EditorApp.controller.openLocalFile name

    openRemoteFile: (name) ->
      App.EditorApp.controller.openRemoteFile name

) App, Backbone