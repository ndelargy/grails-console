App.module 'Entities', (Entities, App, Backbone, Marionette, $, _) ->

  Entities.LocalFileCollection = Backbone.Collection.extend

    model: (attrs, options) -> new Entities.File attrs, options # TODO set local here

    isLocal: true

    comparator: (file) -> file.get('name') * -1

    sync: (method, file, options) ->
      Entities.localFileStore.sync method, file, options

  App.reqres.setHandler 'local:file:entities', ->
    files = new Entities.LocalFileCollection(Entities.localFileStore.fetch())
    files.store = Entities.localFileStore
    files.path = '/'
    files

  App.reqres.setHandler 'local:file:entity', (name) ->
    new Entities.LocalFileCollection(Entities.localFileStore.fetch()).findWhere(name: name) # TODO