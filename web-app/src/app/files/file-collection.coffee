((App, Backbone) ->

  App.FileCollection = Backbone.Collection.extend

    model: App.File

    isLocal: true

    comparator: (file) -> file.get("lastModified") * -1

    sync: (method, file, options) ->
      @store.sync method, file, options

) App, Backbone