App.module 'Editor', (Editor, App, Backbone, Marionette, $, _) ->

  Editor.ScriptsView = Marionette.ItemView.extend

    template: 'editor/scripts'

    attributes:
      class: 'scripts'

    events:
      'click li a.name': 'onNameClick'
      'click li a.delete': 'onDeleteClick'
      'click .store a': 'onStoreClick'
      'click .up': 'onUpClick'

      # TODO editor listen for delete
      # TODO no find file

    initialize: ->
      @listenTo App.settings, 'change:results.wrapText', @setWrap
      @listenTo @, 'itemview:complete', @scrollToResultView
      @listenTo App, 'app:editor:clear', @clear

      @lastPaths = {}

      @collection = new App.Entities.FileCollection()
      @collection.store = 'local'
      @collection.path = '/'

      @collection.fetch()

      @listenTo App, 'file:opened', (file) =>
        @collection.store = file.store
        @collection.path = file.getParent()

        @collection.fetch().done => @render()

      @listenTo App, 'file:created', (file) -> # TODO this is whack
        file = App.Editor.controller.file
        collection = @collection
        if file.getParent() is collection.path and file.store is collection.store
          collection.fetch().done => @render()


    onNameClick: (event) ->
      event.preventDefault()
      fileId = $(event.currentTarget).closest('li').data('fileId')
      file = @collection.findWhere(id: fileId)

      if file.get('type') is 'dir'
        path = file.getAbsolutePath()
        @collection.path = path
        @collection.fetch().done => @render()

      else
        if not App.Editor.controller.isDirty() or confirm 'Are you sure? You have unsaved changes.'
          file.fetch().done ->
            App.Editor.controller.showFile file
            App.router.showFile file

    onStoreClick: (event) ->
      event.preventDefault()
      @lastPaths[@collection.store] = @collection.path

      store = $(event.currentTarget).data('store')
      @collection.store = store

      @collection.path = @lastPaths[@collection.store] ? '/'
      @collection.fetch().done => @render()

    onUpClick: (event) ->
      event.preventDefault()
      @collection.path = @collection.getParent()
      @collection.fetch().done => @render()


    onDeleteClick: (event) ->
      event.preventDefault()
      fileId = $(event.currentTarget).closest('li').data('fileId')
      file = @collection.findWhere(id: fileId)
      if confirm 'Are you sure you want to delete this file?'
        file.destroy().done =>
          App.trigger 'file:deleted', file
          @render()

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