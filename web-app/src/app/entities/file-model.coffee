App.module 'Entities', (Entities, App, Backbone, Marionette, $, _) ->

  Entities.File = Backbone.Model.extend

    defaults:
      text: ''

    isLocal: ->
      @local is true or @collection?.isLocal is true

    getPath: ->
      @id

    getDir: ->
      name = @get('name')
      index = name.lastIndexOf('/')
      if index >= 0 then name.substring(0,index) else name

    sync: (method, file, options) ->
      if (file.isLocal())
        Entities.localFileStore.sync method, file, options
      else
        url = if file.isNew() then App.createLink 'file' else App.createLink 'file', path: file.get('id')
        Backbone.sync method, file, _.extend({url: url}, options)