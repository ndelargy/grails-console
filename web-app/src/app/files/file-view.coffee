App.module 'Files', (Files, App, Backbone, Marionette, $, _) ->

  Files.FileView = Marionette.ItemView.extend

    tagName: 'tr'

    template: 'files/file'

    onRender: ->
      @$el.data 'fileId', @model.id

