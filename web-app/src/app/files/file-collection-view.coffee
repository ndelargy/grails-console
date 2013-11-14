App.module 'FileApp', (FileApp, App, Backbone, Marionette, $, _) ->

  FileApp.FileCollectionView = Marionette.CompositeView.extend

    template: 'files/file-list'

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
      @trigger 'file:selected', file

    onDeleteClick: (event) ->
      event.preventDefault()
      fileId = $(event.currentTarget).closest('tr').data("fileId")
      file = @collection.findWhere(id: fileId)
      file.destroy() if confirm 'Are you sure you want to delete this file?'

    serializeData: ->
      files: @collection.toJSON()

  Handlebars.registerHelper 'fileIcon', (file, options) ->
    clazz = if @type is 'dir' then 'icon-folder-close' else 'icon-file'
    new Handlebars.SafeString "<i class='#{clazz}'></i>"