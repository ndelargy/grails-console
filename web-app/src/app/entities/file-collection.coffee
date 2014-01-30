App.module 'Entities', (Entities, App, Backbone, Marionette, $, _) ->

  Entities.FileCollection = Backbone.Collection.extend

    model: (attrs, options) ->
      file = new Entities.File attrs, options
      file.store = options.collection.store
      file

    comparator: (file) -> file.get('type') + file.get('name')

    store: 'local'

    path: '/'

    getParent: ->
      tokens = @path.split('/')
      newPath = '/' + tokens[0...tokens.length - 1].join('/')
      # TODO null if no parent
      newPath

    hasParent: ->
      tokens = @path.split('/')
      !!(tokens.length > 1 and tokens[1])

    fetchByStoreAndPath: (@store, @path) ->
      @trigger 'fetching'
      @fetch reset: true

    up: ->
      @fetchByStoreAndPath @store, @getParent()

    getCurrentDir: ->
      path = @path
      path = path.replace /^\s+|\s+$/gm, '' # trim
      path = path[0...-1] if path[-1..] is '/'
      tokens = path.split('/')
      tokens[tokens.length - 1]

    sync: (method, file, options) ->
      if @store is 'local'
        Entities.localFileStore.sync method, file, options
      else
        path = @path
        path = path + '/' if path[-1..] isnt '/'
        url = App.createLink 'listFiles', path: path
        Backbone.sync method, file, _.extend({url: url}, options)

    parse: (response) ->
      if @store is 'local'
        response
      else
        @path = response.path
        response.files

  App.reqres.setHandler 'file:entity', (store, path) ->
    file = new Entities.File
      id: path
    file.store = store
    file.fetch().pipe -> file
