App.module 'FileApp', (FileApp, App, Backbone, Marionette, $, _) ->
  FileApp.RemoteFilesView = Marionette.CompositeView.extend

    template: 'files/file-list'

    attributes:
      class: 'remote-files-view'

    events:
      'click a.name': 'onNameClick'
      'click a.delete': 'onDeleteClick'
      'blur input[name=path]': 'onPathBlur'

    _initialEvents: ->
      if @collection
        @listenTo @collection, 'add', @addChildView
        @listenTo @collection, 'remove', @removeItemView
        @listenTo @collection, 'reset', @render

    itemViewContainer: 'tbody'

    initialize: ->
      @listenTo FileApp, 'app:path:selected', (path) ->
        @collection.path = path
        @collection.fetch(reset: true)

    getItemView: (item) ->
      FileApp.FileView

    onNameClick: (event) ->
      event.preventDefault()
      fileId = $(event.currentTarget).closest('tr').data("fileId")
      file = @collection.findWhere(id: fileId)
      if file.get('type') is 'dir'
        FileApp.trigger 'app:path:selected', file.getPath()
      else
        file.fetch().done ->
          App.trigger 'app:file:selected', file

    onDeleteClick: (event) ->
      event.preventDefault()
      fileId = $(event.currentTarget).closest('tr').data("fileId")
      file = @collection.findWhere(id: fileId)
      file.destroy() if confirm 'Are you sure you want to delete this file?'

    onPathBlur: (event) ->
      path = $(event.currentTarget).val()
      @collection.path = path
      @collection.fetch(reset: true)

    serializeData: ->
      files: @collection.toJSON()

  Handlebars.registerHelper 'fileIcon', (file, options) ->
    clazz = if @type is 'dir' then 'icon-folder-close' else 'icon-file'
    new Handlebars.SafeString "<i class='#{clazz}'></i>"