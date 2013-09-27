((App, Backbone) ->

  App.FileCollection = Backbone.Collection.extend
    model: App.File
    comparator: (file) ->
      file.get("lastModified") * -1

) App, Backbone