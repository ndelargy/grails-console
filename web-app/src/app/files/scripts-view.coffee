App.module 'Files', (Files, App, Backbone, Marionette, $, _) ->

  Files.ScriptsView = Marionette.ItemView.extend

    template: 'files/scripts'

    attributes:
      class: 'scripts'

    events:
      'click li .name a': 'onNameClick'
      'click li a.delete': 'onDeleteClick'
      'click ul.store a': 'onStoreClick'
      'click .up': 'onUpClick'

    initialize: ->
      @lastPaths = {}
      @listenTo @collection, 'add remove reset', => @render()

    onNameClick: (event) ->
      event.preventDefault()
      fileId = $(event.currentTarget).closest('li').data('fileId')
      file = @collection.findWhere(id: fileId)

      if file.isDirectory()
        path = file.getAbsolutePath()
        @collection.path = path
        @collection.fetch()
      else
        @trigger 'file:selected', file

    onStoreClick: (event) ->
      event.preventDefault()
      @lastPaths[@collection.store] = @collection.path

      store = $(event.currentTarget).data('store')
      @collection.store = store

      @collection.path = @lastPaths[@collection.store] ? '/'
      @collection.fetch()

    onUpClick: (event) ->
      event.preventDefault()
      console.log "old: #{@collection.path}"
      @collection.path = @collection.getParent()
      console.log "new: #{@collection.path}"
      @collection.fetch()

    onDeleteClick: (event) ->
      event.preventDefault()
      fileId = $(event.currentTarget).closest('li').data('fileId')
      file = @collection.findWhere(id: fileId)
      if confirm 'Are you sure you want to delete this file?'
        file.destroy().done =>
          App.trigger 'file:deleted', file

    serializeData: ->
      tokens = @collection.path.split('/')
      currentDir = tokens[tokens.length - 1]

      files: @collection.toJSON()
      path: @collection.path
      currentDir: currentDir
      hasUp: @collection.path.length > 1
      store: if @collection.store is 'local' then 'Local Storage' else 'Remote Storage'

  Handlebars.registerHelper 'scriptsFileIcon', (file, options) ->
    clazz = if @type is 'dir' then 'fa fa-folder-o' else 'fa fa-file-o'
    new Handlebars.SafeString "<i class='#{clazz}'></i>"