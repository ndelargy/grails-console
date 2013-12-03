App.module 'Entities', (Entities, App, Backbone, Marionette, $, _) ->

  Entities.File = Backbone.Model.extend

    defaults:
      text: ''

    getAbsolutePath: -> @id

    getDir: ->
      @get('path')

    getStore: ->
      if @local then 'local' else 'remote' # TODO ?

    sync: (method, file, options) ->
      if (file.local)
        Entities.localFileStore.sync method, file, options
      else
        url = if file.isNew() then App.createLink 'file' else App.createLink 'file', path: file.get('id')
        Backbone.sync method, file, _.extend({url: url}, options)