App.module 'EditorApp', (EditorApp, App, Backbone, Marionette, $, _) ->

  EditorApp.ResultCollection = Backbone.Collection.extend

    model: (attrs, options) -> new EditorApp.Result attrs, options
