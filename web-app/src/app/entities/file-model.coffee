App.module 'Entities', (Entities, App, Backbone, Marionette, $, _) ->

  Entities.File = Backbone.Model.extend

    defaults:
      text: ''

    getAbsolutePath: -> @id

    getParent: ->
      tokens = @id.split('/')
      parent = tokens[0...tokens.length - 1].join('/')
      # TODO null if root
      parent

    isDirectory: ->
      @get('type') is 'dir'

    isFile: ->
      @get('type') is 'file'

    sync: (method, file, options) ->
      App.getFileStore(@store).syncFile(method, file, options)

  App.reqres.setHandler 'file:entity', (store, path) ->
    file = new Entities.File id: path
    file.store = store
    file.fetch().pipe -> file