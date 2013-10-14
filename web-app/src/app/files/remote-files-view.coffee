((App, Backbone, JST) ->

  App.RemoteFilesView = App.ItemView.extend

    template: 'remote-files'

    attributes:
      class: 'remote-files-view'

    events:
      'click a.name': 'onNameClick'
      'click a.delete': 'onDeleteClick'

    initialize: ->
      @listenTo @collection, 'all', @render
      @collection.fetch()

    onNameClick: (event) ->
      event.preventDefault()
      fileId = $(event.currentTarget).closest('tr').data("fileId")
      file = @collection.findWhere(id: fileId)
      file.fetch().done ->
        App.trigger 'app:file:selected', file

    onDeleteClick: (event) ->
      event.preventDefault()
      fileId = $(event.currentTarget).closest('tr').data("fileId")
      file = @collection.findWhere(id: fileId)
      file.destroy() if confirm 'Are you sure you want to delete this file?'

    serializeData: ->
      files: @collection.toJSON()
      baseDir: App.data.baseDir

) App, Backbone, JST