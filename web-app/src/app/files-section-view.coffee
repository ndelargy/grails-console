((App, Backbone, JST) ->
  App.FilesSectionView = Backbone.View.extend
    attributes:
      class: 'files-section-view'

    events:
      'click a.name': 'onNameClick'

    initialize: ->
      @template = JST["files-section"]
      files = new App.FileCollection
      files.store = App.localFileStore
      @localFilesView = new App.LocalFilesView
        collection: files

    render: ->
      @$el.html @template()

      @localFilesView.render()
      @$el.append @localFilesView.$el.hide()
#      @filesSectionView.render()
#      @$el.append(@filesSectionView.$el.hide())
      @

    showLocal: ->
      @localFilesView.$el.show()

    showRemote: ->

) App, Backbone, JST