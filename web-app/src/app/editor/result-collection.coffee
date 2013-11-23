App.module 'Editor', (Editor, App, Backbone, Marionette, $, _) ->

  Editor.ResultCollection = Backbone.Collection.extend

    model: (attrs, options) -> new Editor.Result attrs, options
