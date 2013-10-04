((App, Backbone) ->

    App.File = Backbone.Model.extend

      sync: (method, file, options) ->
        store = @store ? @collection.store
        store.sync method, file, options

) App, Backbone