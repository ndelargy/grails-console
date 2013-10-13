((App, Backbone, JST) ->

  App.LocalFilesView = Backbone.Marionette.ItemView.extend # TODO convert to collection view i guess

    template: 'file-list'

    attributes:
      class: 'files-view'

    events:
      'click a.name': 'onNameClick'
      'click a.delete': 'onDeleteClick'

    initialize: ->
      @listenTo @collection, 'all', @render
      @collection.fetch()

    onBeforeRender: ->

    onNameClick: (event) ->
      event.preventDefault()
      fileId = $(event.currentTarget).closest('tr').data("fileId")
      file = @collection.findWhere(id: fileId)
      App.router.navigateToFile file, trigger: true

    onDeleteClick: (event) ->
      event.preventDefault()
      fileId = $(event.currentTarget).closest('tr').data("fileId")
      file = @collection.findWhere(id: fileId)
      file.destroy() if confirm 'Are you sure you want to delete this file?'

    serializeData: ->
      files: @collection.toJSON()

  #
  #    local
  #    - load all on start
  #    - save one
  #
  #    remote
  #    - list
  #     
  RemoteFileStore = ->

  _.extend RemoteFileStore::,
    listFiles: ->
      $.get "xxx/listFiles"


  #dfd
    getFileText: (name) ->
      $.get "xxx/getFileText"


  #dfd
    saveFile: (file) ->
      $.get "xxx/saveFile"


#dfd
) App, Backbone, JST