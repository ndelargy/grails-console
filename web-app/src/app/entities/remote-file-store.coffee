App.module 'Entities', (Entities, App, Backbone, Marionette, $, _) ->

  class Entities.RemoteFileStore

    storeName: 'remote'

    displayName: 'Remote Storage'

    syncFile: (method, file, options) ->
      url = if file.isNew() then App.createLink 'file' else App.createLink 'file', path: file.get('id')
      Backbone.sync method, file, _.extend({url: url}, options)

    syncCollection: (method, collection, options) ->
      url = App.createLink 'listFiles', path: collection.getNormalizedPath() + '/'
      Backbone.sync method, collection, _.extend({url: url}, options)

    parseCollection: (collection, response, options) ->
      collection.path = response.path # path gets normalized
      response.files

  App.on 'initialize:before', (options) ->
    App.addFileStore new Entities.RemoteFileStore