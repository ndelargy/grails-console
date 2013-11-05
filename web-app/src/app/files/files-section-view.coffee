App.module 'FileApp', (FileApp, App, Backbone, Marionette, $, _) ->

  FileApp.FilesSectionView = Marionette.Layout.extend

    template: 'files/files-section'

    regions:
      localRegion: '.local'
      remoteRegion: '.remote'

    attributes:
      'class': 'modal-dialog files-section-view'

    events:
      'change select[name=store]': 'onStoreChange'

    onRender: ->
      localFiles = App.request('local:file:entities')
      @localFilesView = new FileApp.LocalFilesView
        collection: localFiles
      @localRegion.show @localFilesView

      dfd = App.request('remote:file:entities', '/')
      dfd.done (remoteFiles) =>
        @remoteFilesView = new FileApp.RemoteFilesView
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