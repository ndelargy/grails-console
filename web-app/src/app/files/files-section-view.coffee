App.module 'FileApp', (FileApp, App, Backbone, Marionette, $, _) ->

  BaseDir = Backbone.Model.extend()

  FileApp.FilesSectionView = Marionette.Layout.extend

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

    onRender: ->
      @baseDir = new BaseDir(path: '/')

      filePathView = new FileApp.FilePathView(model: @baseDir)
      @filePathRegion.show filePathView

      @listenTo filePathView, 'path:selected', (path) ->
        @baseDir.set 'path', path
        collection = @fileCollectionView.collection
        collection.path = path
        collection.fetch reset: true

      store = App.settings.get('files.lastStore') ? 'local'
      @showStore store

      @$('select[name=store]').val store

    onSave: (event) ->
      event.preventDefault()
      fileName = @$('input.file-name').val()
      path = @baseDir.get('path')
      path += '/' if path[path.length - 1] isnt '/'

      @trigger 'save', @store, path, fileName

    showStore: (store) ->
      @store = store
      @storeRegion.show new FileApp.LoadingView

      if store is 'remote'
        path = App.settings.get('files.remote.lastDir') ? '/'
      else
        path = '/'

      $.when(@getCollection(store, path))
        .done (collection) =>
          @fileCollectionView = new FileApp.FileCollectionView
            collection: collection

          @listenTo @fileCollectionView, 'file:selected', (file) ->
            if file.get('type') is 'dir'
              path = file.getAbsolutePath()
              @baseDir.set 'path', path
              collection.path = path
              collection.fetch reset: true
              App.settings.set 'files.remote.lastDir', path
              App.settings.save()
            else
              @trigger 'file:selected', file
#              file.fetch().done ->
#                FileApp.trigger 'file:selected', file

          @storeRegion.show @fileCollectionView

        .fail -> alert 'Failed to load remote files.' # TODO

      @baseDir.set 'path', path

      App.settings.set 'files.lastStore', store
      App.settings.save()

    onStoreChange: (event) ->
      @showStore @$(event.currentTarget).val()

    getCollection: (store, path) ->
      collection = undefined

      if store is 'local'
        collection = App.request('local:file:entities')
      else
        collection = App.request('remote:file:entities', path)

    serializeData: ->
      saving: @saving
