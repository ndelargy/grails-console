((App, Backbone) ->
  App.FilesSectionView = Backbone.Marionette.Layout.extend

    template: 'files-section'

    regions:
      localRegion: '.local'
      remoteRegion: '.remote'

    attributes:
      'class': 'files-section-view'

    events:
      'click a.local-select': 'onLocalClick'
      'click a.remote-select': 'onRemoteClick'

    initialize: ->
      files = new App.FileCollection
      files.store = App.localFileStore # TODO
      @localFilesView = new App.LocalFilesView
        collection: files

      remoteFiles = new App.RemoteFileCollection
      @remoteFilesView = new App.RemoteFilesView
        collection: remoteFiles

    onRender: ->
      @localRegion.show @localFilesView
      @remoteRegion.show @remoteFilesView
      @remoteRegion.$el.hide()

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

) App, Backbone