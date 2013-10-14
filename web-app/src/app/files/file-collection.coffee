((App, Backbone) ->

  App.FileCollection = Backbone.Collection.extend

    model: (attrs, options) -> new App.File attrs, options # TODO set local here

    isLocal: true

    comparator: (file) -> file.get("lastModified") * -1

    sync: (method, file, options) ->
      App.localFileStore.sync method, file, options

) App, Backbone