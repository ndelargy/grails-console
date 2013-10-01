((App, Backbone, JST) ->
  App.LocalFilesView = Backbone.View.extend
    attributes:
      class: 'files-view'

    events:
      'click a.name': 'onNameClick'
      'click a.delete': 'onDeleteClick'

    initialize: ->
      @template = JST["file-list"]
#      @listenTo @collection, 'all', -> @render() # TODO remove

    render: ->
      @collection.fetch() # TODO
      html = JST["file-list"](files: @collection.toJSON())
      @$el.html html
      this

    onNameClick: (event) ->
      event.preventDefault()
      fileId = $(event.currentTarget).closest('li').data("fileId")
      file = @collection.findWhere(id: fileId)
      App.router.navigateToFile file

    onDeleteClick: (event) ->
      event.preventDefault()
      fileId = $(event.currentTarget).closest('li').data("fileId")
      file = @collection.findWhere(id: fileId)
      # TODO confirm
      file.destroy()


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