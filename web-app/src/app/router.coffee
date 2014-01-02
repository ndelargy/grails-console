((App, Backbone) ->

  App.Router = Backbone.Router.extend

    initialize: ->
      @route '*path', 'newFile'
      @route 'new', 'newFile'
      @route /^local:(.*?)$/, 'openLocalFile'
      @route /^remote:(.*?)$/, 'openRemoteFile'

    showFile: (file) ->
      @navigate "#{file.store}:#{file.id}"

    showNew: ->
      @navigate 'new'

    newFile: ->
      App.Editor.controller.newFile()

    openLocalFile: (name) ->
      App.Editor.controller.openFile 'local', name

    openRemoteFile: (name) ->
      App.Editor.controller.openFile 'remote', name

) App, Backbone