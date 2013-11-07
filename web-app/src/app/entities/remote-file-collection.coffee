App.module 'Entities', (Entities, App, Backbone, Marionette, $, _) ->

  Entities.RemoteFileCollection = Backbone.Collection.extend

    url: -> App.createLink 'listFiles', path: @path

    model: (attrs, options) -> new Entities.File attrs, options

    isLocal: false

    path: '/' # TODO default

    comparator: (file) -> file.get('name') * -1

  App.reqres.setHandler 'remote:file:entity', (name) ->
    file = new Entities.File
      id: name # TODO search by path
    file.local = false
    file.fetch().pipe -> file

  App.reqres.setHandler 'remote:file:entities', (path) ->
    remoteFiles = new App.Entities.RemoteFileCollection
    remoteFiles.path = path
    remoteFiles.fetch(reset: true).pipe -> remoteFiles