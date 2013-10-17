App.module 'FileApp', (FileApp, App, Backbone, Marionette, $, _) ->

  FileApp.LocalFilesView = Marionette.CompositeView.extend

    template: 'files/file-list'

    attributes:
      class: 'files-view'

    events:
      'click a.name': 'onNameClick'
      'click a.delete': 'onDeleteClick'

    itemViewContainer: 'tbody'

    getItemView: (item) -> FileApp.FileView

    initialize: ->
      @collection.fetch() # TODO

    onNameClick: (event) ->
      event.preventDefault()
      fileId = $(event.currentTarget).closest('tr').data("fileId")
      file = @collection.findWhere(id: fileId)
      App.trigger 'app:file:selected', file

    onDeleteClick: (event) ->
      event.preventDefault()
      fileId = $(event.currentTarget).closest('tr').data("fileId")
      file = @collection.findWhere(id: fileId)
      file.destroy() if confirm 'Are you sure you want to delete this file?'

    serializeData: ->
      files: @collection.toJSON()