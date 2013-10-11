((App, Backbone) ->

    App.File = Backbone.Model.extend

      defaults:
        text: ''

      isLocal: ->
        @local is true or @collection?.isLocal is true

      sync: (method, file, options) ->
        if (file.isLocal())
          App.localFileStore.sync method, file, options
        else
          url = if file.isNew() then App.createLink 'file' else App.createLink 'file', path: file.get('id')
          Backbone.sync method, file, _.extend({url: url}, options)

) App, Backbone