App.module 'Files', (Files, App, Backbone, Marionette, $, _) ->

  BaseDir = Backbone.Model.extend()

  Files.FilesSectionView = Marionette.Layout.extend

    template: 'files/files-section'

    regions:
      filePathRegion: '.file-path-region'
      storeRegion: '.store'

    attributes:
      'class': 'modal-dialog files-section-view'

    events:
      'change select[name=store]': 'onStoreChange'
      'click button.save': 'onSave'

    initialize: (options) ->
      @saving = options.saving

      store = App.settings.get('files.lastStore') ? 'local'
      path = App.settings.get("files.#{store}.lastDir") ? '/'

      @baseDir = new BaseDir(path: path, store: store)
      @listenTo @baseDir, 'change', @showCollection

      @collection = new App.Entities.FileCollection()

      @filePathView = new Files.FilePathView(model: @baseDir)
      @listenTo @filePathView, 'path:selected', @onPathSelected

    onRender: ->
      @filePathRegion.show @filePathView

      @showCollection()
      @$('select[name=store]').val @baseDir.get('store')

    onFileSelected: (file) ->
      if file.get('type') is 'dir'
        path = file.getAbsolutePath()
        @baseDir.set 'path', path
      else
        @trigger 'file:selected', file

    onPathSelected: (path) ->
      @baseDir.set 'path', path

    onSave: (event) ->
      event.preventDefault()
      fileName = @$('input.file-name').val()
      store = @baseDir.get('store')
      path = @baseDir.get('path')
      path += '/' if path[path.length - 1] isnt '/'

      @trigger 'save', store, path, fileName

    setName: (name) ->
      @$('input.file-name').val name

    showCollection: ->
      @storeRegion.show new Files.LoadingView

      store = @baseDir.get('store')
      path = @baseDir.get('path')

      @collection.store = store
      @collection.path = path

      @collection.fetch()
        .done =>
          fileCollectionView = new Files.FileCollectionView
            collection: @collection

          @listenTo fileCollectionView, 'file:selected', @onFileSelected
#
          @storeRegion.show fileCollectionView

        .fail -> alert 'Failed to load remote files.' # TODO error view

      App.settings.set('files.lastStore': store)
      App.settings.set("files.#{store}.lastDir", path).save()

    onStoreChange: (event) ->
      store = @$(event.currentTarget).val()
      path = App.settings.get("files.#{store}.lastDir") ? '/'

      @baseDir.set(store: store, path: path)

    serializeData: ->
      saving: @saving
