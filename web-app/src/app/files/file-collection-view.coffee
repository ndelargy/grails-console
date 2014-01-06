App.module 'Files', (Files, App, Backbone, Marionette, $, _) ->

  FileView = Marionette.ItemView.extend

    tagName: 'tr'

    template: 'files/file'

    onRender: ->
      @$el.data 'fileId', @model.id

  Files.FileCollectionView = Marionette.CompositeView.extend

    template: 'files/file-list'

    attributes:
      class: 'full-height'

    events:
      'click a.name': 'onNameClick'

    _initialEvents: ->
      @listenTo @collection, 'add', @addChildView
      @listenTo @collection, 'remove', @removeItemView
      @listenTo @collection, 'reset', @render

    itemViewContainer: 'tbody'

    getItemView: (item) -> FileView

    onNameClick: (event) ->
      event.preventDefault()
      fileId = $(event.currentTarget).closest('tr').data("fileId")
      file = @collection.findWhere(id: fileId)
      @trigger 'file:selected', file

    serializeData: ->
      files: @collection.toJSON()

  Handlebars.registerHelper 'fileIcon', (file, options) ->
    clazz = if @type is 'dir' then 'fa fa-folder' else 'fa fa-file'
    new Handlebars.SafeString "<i class='#{clazz}'></i>"