((App, Backbone) ->
  App.FilesSectionView = Backbone.Marionette.Layout.extend

    template: 'files-section'

    regions:
      localRegion: '.local'
      remoteRegion: '.remote'

    attributes:
      'class': 'files-section-view'

    initialize: ->
      files = new App.FileCollection
      files.store = App.localFileStore
      @localFilesView = new App.LocalFilesView
        collection: files
      @remoteFilesView = new App.RemoteFilesView

    onRender: ->
      @localRegion.show @localFilesView
      @remoteRegion.show @remoteFilesView
      @remoteRegion.$el.hide()

) App, Backbone