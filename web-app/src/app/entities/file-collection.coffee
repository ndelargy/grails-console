App.module 'Entities', (Entities, App, Backbone, Marionette, $, _) ->

  Entities.FileCollection = Backbone.Collection.extend

    model: (attrs, options) ->
      file = new Entities.File attrs, options
      file.store = options.collection.store
      file

    comparator: (file) -> file.get('name')

    getParent: ->
      tokens = @path.split('/')
      newPath = tokens[0...tokens.length - 1].join('/')
      newPath = '/' if not newPath
      # TODO null if no parent
      newPath

    sync: (method, file, options) ->
      if (@store is 'local')
        Entities.localFileStore.sync method, file, options
      else
        url = App.createLink 'listFiles', path: @path
        Backbone.sync method, file, _.extend({url: url}, options)

  App.reqres.setHandler 'file:entity', (store, path) ->
    file = new Entities.File
      id: path
    file.store = store
    file.fetch().pipe -> file
