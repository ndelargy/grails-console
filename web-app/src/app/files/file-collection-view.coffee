App.module 'Files', (Files, App, Backbone, Marionette, $, _) ->

  Files.FileCollectionView = Marionette.CompositeView.extend

    template: 'files/file-list'

    attributes:
      class: 'full-height'

    events:
      'click a.name': 'onNameClick'
      'click a.delete': 'onDeleteClick'

    _initialEvents: ->
      if @collection
        @listenTo @collection, 'add', @addChildView
        @listenTo @collection, 'remove', @removeItemView
        @listenTo @collection, 'reset', @render

    itemViewContainer: 'tbody'

    getItemView: (item) -> Files.FileView

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
    clazz = if @type is 'dir' then 'fa fa-folder-o' else 'fa fa-file-o'
    new Handlebars.SafeString "<i class='#{clazz}'></i>"