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

    initialize: (options) ->
      @lastPaths = {}

      @showDelete = options.showDelete ? true

      @listenTo @collection, 'fetching', =>
        @loading = true
        @render()

      @listenTo @collection, 'add remove reset', =>
        @loading = false
        @render()

    onNameClick: (event) ->
      event.preventDefault()
      fileId = $(event.currentTarget).closest('li').data('fileId')
      file = @collection.findWhere(id: fileId)

      if file.isDirectory()
        @collection.fetchByStoreAndPath file.store, file.getAbsolutePath()
      else
        @trigger 'file:selected', file

    onStoreClick: (event) ->
      event.preventDefault()
      @lastPaths[@collection.store] = @collection.path

      store = $(event.currentTarget).data('store')
      path = @lastPaths[store] ? '/'

      @collection.fetchByStoreAndPath store, path

    onUpClick: (event) ->
      event.preventDefault()
      @collection.up()

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
      showDelete: @showDelete
      loading: @loading

  Handlebars.registerHelper 'scriptsFileIcon', (file, options) ->
    clazz = if @type is 'dir' then 'fa fa-folder-o' else 'fa fa-file-o'
    new Handlebars.SafeString "<i class='#{clazz}'></i>"

  Handlebars.registerHelper 'scriptsFileItem', (file, options) ->
    showDelete = options.hash.showDelete
    iconClass = if @type is 'dir' then 'fa fa-folder-o' else 'fa fa-file-o'
    html = "<div class='name'><i class='#{iconClass}'></i><a class='name' href='#'>#{file.name}</a></div>"
    html += '<a class="delete" href="#">×</a>' if showDelete
    new Handlebars.SafeString html