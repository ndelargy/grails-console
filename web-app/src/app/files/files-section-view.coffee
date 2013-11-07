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
      localFiles = App.request('local:file:entities')

      filePathView = new FileApp.FilePathView(model: @baseDir)
      @filePathRegion.show filePathView

      @localFilesView = new FileApp.FileCollectionView
        collection: localFiles
      @localRegion.show @localFilesView

      dfd = App.request('remote:file:entities', '/')
      dfd.done (remoteFiles) =>
        @remoteFilesView = new FileApp.FileCollectionView
          collection: remoteFiles

        @remoteRegion.show @remoteFilesView
        @remoteRegion.$el.hide()

      dfd.fail -> alert 'Failed to load remote files.'

    onStoreChange: (event) ->
      if @$(event.currentTarget).val() is 'local'
        @localRegion.$el.show()
        @remoteRegion.$el.hide()
      else
        @localRegion.$el.hide()
        @remoteRegion.$el.show()