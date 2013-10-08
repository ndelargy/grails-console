((App, Backbone) ->

  App.RemoteFileCollection = Backbone.Collection.extend

    url: -> App.createLink 'listFiles'

    model: App.File

    isLocal: false

    comparator: (file) -> file.get('lastModified') * -1

) App, Backbone