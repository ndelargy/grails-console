((App, Backbone) ->

  App.RemoteFileCollection = Backbone.Collection.extend

    url: -> App.createLink 'listFiles'

    model: (attrs, options) -> new App.File attrs, options

    isLocal: false

    comparator: (file) -> file.get('lastModified') * -1

) App, Backbone