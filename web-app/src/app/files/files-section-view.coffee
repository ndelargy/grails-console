App.module 'FileApp', (FileApp, App, Backbone, Marionette, $, _) ->

  BaseDir = Backbone.Model.extend()

  FileApp.FilesSectionView = Marionette.Layout.extend

    template: 'files/files-section'

    regions:
      filePathRegion: '.file-path-region'
      localRegion: '.local'
      remoteRegion: '.remote'

    attributes:
      'class': 'modal-dialog files-section-view'

    events:
      'change select[name=store]': 'onStoreChange'

    initialize: ->
      @baseDir = new BaseDir(path: '/')

      @listenTo FileApp, 'app:path:selected', (path) ->
        @baseDir.set 'path', path

    onRender: ->
      store = App.settings.get('files.lastStore') ? 'local'

      localPath = '/'
      @localFiles = App.request('local:file:entities')

      filePathView = new FileApp.FilePathView(model: @baseDir)
      @filePathRegion.show filePathView

      @localFilesView = new FileApp.FileCollectionView
        collection: @localFiles
      @localRegion.show @localFilesView

      @remoteRegion.show new FileApp.LoadingView

      @showStore store

      remotePath = App.settings.get('files.remote.lastDir') ? '/'
      dfd = App.request('remote:file:entities', remotePath)
      dfd.done (remoteFiles) =>
        @remoteFiles = remoteFiles
        @remoteFilesView = new FileApp.FileCollectionView
          collection: remoteFiles

        @remoteRegion.show @remoteFilesView

      dfd.fail -> alert 'Failed to load remote files.' # TODO

      if store is 'remote'
        @baseDir.set 'path', remotePath
      else
        @baseDir.set 'path', localPath

      @$('select[name=store]').val store

    showStore: (store) ->
      if store is 'local'
        @localRegion.$el.show()
        @remoteRegion.$el.hide()
        @baseDir.set 'path', @localFiles.path if @localFiles
      else
        @localRegion.$el.hide()
        @remoteRegion.$el.show()
        @baseDir.set 'path', @remoteFiles.path if @remoteFiles

      App.settings.set 'files.lastStore', store
      App.settings.save()

    onStoreChange: (event) ->
      @showStore @$(event.currentTarget).val()