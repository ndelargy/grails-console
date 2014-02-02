App.module 'Entities', (Entities, App, Backbone, Marionette, $, _) ->

  class Entities.LocalFileStore

    constructor: (@name) ->
      @_load()

    list: ->
      new Entities.FileCollection(@fetch())

    fetch: ->
      _.values @data

    find: (file) ->
      @data[file.id]

    create: (file) ->
      file.set 'lastModified', new Date().getTime()
      file.set 'id', file.get('path') + file.get('name')
      @data[file.id] = file.toJSON()
      @_save()
      file.toJSON()

    update: (file) ->
      file.set 'lastModified', new Date().getTime()
      @data[file.id] = file.toJSON()
      @_save()
      file.toJSON()

    destroy: (file) ->
      delete @data[file.id]

      @_save()
      file.toJSON()

    destroyAll: ->
      @data = {}
      localStorage.removeItem @name

    _save: ->
      localStorage.setItem @name, JSON.stringify(@data)

    _load: ->
      store = localStorage.getItem(@name)
      try
        @data = JSON.parse(store) ? {}
      catch e
        @data = {}
      file.type = 'file' for id, file of @data

    sync: (method, file, options) ->
      resp = undefined

      switch method
        when 'read'
          resp = if file.id then @find(file) else @fetch()
        when 'create'
          resp = @create(file) # save
        when 'update'
          resp = @update(file) # save
        when 'delete'
          resp = @destroy(file)

      dfd = $.Deferred()
      dfd.resolveWith @, [resp]

      if resp
        options?.success? resp
      else
        options?.error? 'Record not found'

      dfd

    storeName: 'local'

    displayName: 'Local Storage'

    syncFile: (method, file, options) -> @sync method, file, options

    syncCollection: (method, collection, options) ->
      console.log "syncCollection", arguments
      @sync method, collection, options

    parseCollection: (collection, response, options) -> response

  App.on 'initialize:before', (options) ->
    App.addFileStore new Entities.LocalFileStore('gconsole.files')