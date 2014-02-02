App.module 'Entities', (Entities, App, Backbone, Marionette, $, _) ->

  Entities.File = Backbone.Model.extend

    defaults:
      text: ''

    getAbsolutePath: -> @id

    getParent: ->
      App.Util.Path.getParent @id

    isDirectory: ->
      @get('type') is 'dir'

    isFile: ->
      @get('type') is 'file'

    sync: (method, file, options) ->
      App.getFileStore(@store).syncFile method, file, options

  App.reqres.setHandler 'file:entity', (store, path) ->
    file = new Entities.File id: path
    file.store = store
    file.fetch().pipe -> file