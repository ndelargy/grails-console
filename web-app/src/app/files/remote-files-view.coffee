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
      fileId = $(event.currentTarget).closest('li').data("fileId")
      file = @collection.findWhere(id: fileId)
      file.fetch()
      App.router.navigateToRemoteFile file

    onDeleteClick: (event) ->
      event.preventDefault()
      fileId = $(event.currentTarget).closest('li').data("fileId")
      file = @collection.findWhere(id: fileId)
      # TODO confirm
      file.destroy()

    serializeData: ->
      @collection.toJSON()


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