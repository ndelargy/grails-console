App.module 'EditorApp', (EditorApp, App, Backbone, Marionette, $, _) ->

  EditorApp.Result = Backbone.Model.extend

    isSuccess: ->
      not @get("exception") and not @get("error")