App.module 'Main', (Main, App, Backbone, Marionette, $, _) ->

  Main.Router = Backbone.Router.extend

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
      App.execute 'new'

    openLocalFile: (name) ->
      App.trigger 'app:editor:openFile', 'local', name

    openRemoteFile: (name) ->
      App.trigger 'app:editor:openFile', 'remote', name