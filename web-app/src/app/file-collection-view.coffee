((App, Backbone, JST) ->
  App.FileCollectionView = Backbone.View.extend
    attributes:
      class: "files-view"

    events:
      "click tr": "onRowClick"

    initialize: ->
      @template = JST["file-list"]

    render: ->
      html = JST["file-list"](files: @collection.toJSON())
      @$el.html html
      this

    onRowClick: (event) ->
      event.preventDefault()
      $tr = $(event.currentTarget)
      file = @collection.findWhere(id: $tr.data("fileId"))
      @trigger "select", file


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