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
      App.execute 'openFile', 'local', name # TODO generify

    openRemoteFile: (name) ->
      App.execute 'openFile', 'remote', name