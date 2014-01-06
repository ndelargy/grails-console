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

    sync: (method, file, options) ->
      if (file.store is 'local')
        Entities.localFileStore.sync method, file, options
      else
        url = if file.isNew() then App.createLink 'file' else App.createLink 'file', path: file.get('id')
        Backbone.sync method, file, _.extend({url: url}, options)