App.module 'Entities', (Entities, App, Backbone, Marionette, $, _) ->

  Entities.FileCollection = Backbone.Collection.extend

    model: (attrs, options) -> new Entities.File attrs, options

    comparator: (file) -> file.get('name')

    sync: (method, file, options) ->
      if (@local)
        Entities.localFileStore.sync method, file, options
      else
        url = App.createLink 'listFiles', path: @path
        Backbone.sync method, file, _.extend({url: url}, options)

  App.reqres.setHandler 'file:entities', (store, path) ->
    local = store is 'local'
    files = new App.Entities.FileCollection
    files.local = local
    files.path = path
    files.fetch(reset: true).pipe ->
      file.local = local for file in files.models
      files

  App.reqres.setHandler 'file:entity', (store, path) ->
    file = new Entities.File
      id: path
    file.local = store is 'local'
    file.fetch().pipe -> file
