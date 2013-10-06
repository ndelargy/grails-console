((App, Backbone) ->

  App.RemoteFile = Backbone.Model.extend

    url: -> App.createLink('file') + '?path=' + @get('id') # TODO encode or use a param

#    parse: (response, options) ->
#      response.file

) App, Backbone