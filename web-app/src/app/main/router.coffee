App.module 'Main', (Main, App, Backbone, Marionette, $, _) ->

  Main.Router = Backbone.Router.extend

    initialize: ->
      @route '*path', 'newFile'
      @route 'new', 'newFile'
      @route /^(.*?):(.*?)$/, 'openFile'

    showFile: (file) ->
      @navigate "#{file.store}:#{file.id}"

    showNew: ->
      @navigate 'new'

    newFile: ->
      App.execute 'new'

    openFile: (store, name) ->
      App.execute 'openFile', store, name