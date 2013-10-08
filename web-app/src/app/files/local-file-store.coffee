((App, _, localStorage, JSON, $) ->

  S4 = ->
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring 1

  guid = ->
    S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4()

  class App.LocalFileStore

    constructor: (@name) ->
      @_load()

    list: ->
      new App.FileCollection(@fetch())

    fetch: ->
      _.values @data

    find: (file) ->
      @data[file.id]

    create: (file) ->
      file.set "lastModified", new Date().getTime()
      file.id = file.attributes.id = guid() unless file.id
      @data[file.id] = file.toJSON()
      @_save()
      file.toJSON()

    update: (file) ->
      file.set "lastModified", new Date().getTime()
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
        @data = JSON.parse(store)
      catch e
        @data = {}

    newFile: (data) ->
      new App.File(data)

    sync: (method, file, options) ->
      resp = undefined

      #            var store = model.localStorage || model.collection.localStorage;
      #            var dfd = $.Deferred();
      switch method
        when "read"
          resp = if file.id then @find(file) else @fetch()
        when "create"
          resp = @create(file) # save
        when "update"
          resp = @update(file) # save
        when "delete"
          resp = @destroy(file)
      # destroy
      if resp
        options.success resp
      else
        options.error "Record not found"

) App, _, localStorage, JSON, jQuery