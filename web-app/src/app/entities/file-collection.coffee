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
      tokens = @getPathTokens()
      parent = null
      if tokens.length > 1
        parent = tokens[0...tokens.length - 1].join('/') + '/'

      parent

    hasParent: ->
      !!(@getParent())

    fetchByStoreAndPath: (@store, @path) ->
      @trigger 'fetching'
      @fetch reset: true

    up: ->
      @fetchByStoreAndPath @store, @getParent()

    getCurrentDir: ->
      tokens = @getPathTokens()
      tokens[tokens.length - 1]

    getPathTokens: ->
      @getNormalizedPath().split('/')

    getNormalizedPath: ->
      path = @path
      path = path.replace /^\s+|\s+$/gm, '' # trim
      path = path[0...-1] if path[-1..] is '/'
      path

    sync: (method, collection, options) ->
      App.getFileStore(@store).syncCollection method, collection, options

    parse: (response, options) ->
      App.getFileStore(@store).parseCollection @, response, options
