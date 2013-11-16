App.module 'Entities', (Entities, App, Backbone, Marionette, $, _) ->

  Entities.File = Backbone.Model.extend

    defaults:
      text: ''

    isLocal: ->
      @local is true or @collection?.isLocal is true

    getAbsolutePath: -> @id

    getDir: ->
      @get('path')

    getStore: ->
      if @isLocal() then 'local' else 'remote' # TODO ?

    sync: (method, file, options) ->
      if (file.isLocal())
        Entities.localFileStore.sync method, file, options
      else
        url = if file.isNew() then App.createLink 'file' else App.createLink 'file', path: file.get('id')
        Backbone.sync method, file, _.extend({url: url}, options)