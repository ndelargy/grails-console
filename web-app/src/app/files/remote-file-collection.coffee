((App, Backbone) ->

  App.RemoteFileCollection = Backbone.Collection.extend

    url: -> App.createLink 'listFiles'

    model: App.RemoteFile

    comparator: (file) -> file.get("lastModified") * -1

#    parse: (response, options) ->
#      response.data

) App, Backbone