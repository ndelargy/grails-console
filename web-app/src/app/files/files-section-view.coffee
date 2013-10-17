App.module 'FileApp', (FileApp, App, Backbone, Marionette, $, _) ->

  FileApp.FilesSectionView = Marionette.Layout.extend

    template: 'files/files-section'

    regions:
      localRegion: '.local'
      remoteRegion: '.remote'

    attributes:
      'class': 'files-section-view'

    events:
      'click a.local-select': 'onLocalClick'
      'click a.remote-select': 'onRemoteClick'

    onRender: ->
      localFiles = App.request('local:file:entities')
      @localFilesView = new FileApp.LocalFilesView
        collection: localFiles
      @localRegion.show @localFilesView

      dfd = App.request('remote:file:entities')
      dfd.done (remoteFiles) =>
        @remoteFilesView = new FileApp.RemoteFilesView
          collection: remoteFiles

        @remoteRegion.show @remoteFilesView
        @remoteRegion.$el.hide()

      dfd.fail -> alert 'Failed to load remote files.'

    onLocalClick: (event) ->
      event.preventDefault()
      @$(event.currentTarget).closest('ul').find('li').removeClass 'active' # TODO pull this out
      @$(event.currentTarget).closest('li').addClass 'active'
      @localRegion.$el.show()
      @remoteRegion.$el.hide()

    onRemoteClick: (event) ->
      event.preventDefault()
      @$(event.currentTarget).closest('ul').find('li').removeClass 'active'
      @$(event.currentTarget).closest('li').addClass 'active'
      @localRegion.$el.hide()
      @remoteRegion.$el.show()