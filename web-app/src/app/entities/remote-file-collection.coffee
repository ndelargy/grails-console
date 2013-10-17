App.module 'Entities', (Entities, App, Backbone, Marionette, $, _) ->

  Entities.RemoteFileCollection = Backbone.Collection.extend

    url: -> App.createLink 'listFiles'

    model: (attrs, options) -> new Entities.File attrs, options

    isLocal: false

    comparator: (file) -> file.get('lastModified') * -1

  App.reqres.setHandler 'remote:file:entity', (name) ->
    file = new Entities.File
      id: name # TODO search by path
    file.local = false
    file.fetch().pipe -> file

  App.reqres.setHandler 'remote:file:entities', (name) ->
    remoteFiles = new App.Entities.RemoteFileCollection #TODO reqres
    remoteFiles.fetch(reset: true).pipe -> remoteFiles