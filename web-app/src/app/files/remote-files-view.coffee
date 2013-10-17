App.module 'FileApp', (FileApp, App, Backbone, Marionette, $, _) ->

  FileApp.RemoteFilesView = Marionette.CompositeView.extend

    template: 'files/remote-files'

    attributes:
      class: 'remote-files-view'

    events:
      'click a.name': 'onNameClick'
      'click a.delete': 'onDeleteClick'

    _initialEvents: ->
      if @collection
        @listenTo @collection, 'add', @addChildView
        @listenTo @collection, 'remove', @removeItemView
        @listenTo @collection, 'reset', @render

    itemViewContainer: 'tbody'

    getItemView: (item) -> FileApp.FileView

    onNameClick: (event) ->
      event.preventDefault()
      fileId = $(event.currentTarget).closest('tr').data("fileId")
      file = @collection.findWhere(id: fileId)
      file.fetch().done ->
        App.trigger 'app:file:selected', file

    onDeleteClick: (event) ->
      event.preventDefault()
      fileId = $(event.currentTarget).closest('tr').data("fileId")
      file = @collection.findWhere(id: fileId)
      file.destroy() if confirm 'Are you sure you want to delete this file?'

    serializeData: ->
      files: @collection.toJSON()
      baseDir: App.data.baseDir