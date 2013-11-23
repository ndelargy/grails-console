((App, Backbone) ->

  App.Router = Backbone.Router.extend

    initialize: ->
      @route '*path', 'newFile'
      @route 'new', 'newFile'
      @route /^local:(.*?)$/, 'openLocalFile'
      @route /^remote:(.*?)$/, 'openRemoteFile'

    showFile: (file) ->
      @navigate "#{file.getStore()}:#{file.id}"

    showNew: ->
      @navigate 'new'

    newFile: ->
      App.Editor.controller.newFile()

    openLocalFile: (name) ->
      App.Editor.controller.openLocalFile name

    openRemoteFile: (name) ->
      App.Editor.controller.openRemoteFile name

) App, Backbone