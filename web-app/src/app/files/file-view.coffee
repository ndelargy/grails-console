App.module 'FileApp', (FileApp, App, Backbone, Marionette, $, _) ->

  FileApp.FileView = Marionette.ItemView.extend

    tagName: 'tr'

    template: 'files/file'

    onRender: ->
      @$el.data 'fileId', @model.id

