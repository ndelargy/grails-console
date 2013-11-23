App.module 'Editor', (Editor, App, Backbone, Marionette, $, _) ->

  Editor.Result = Backbone.Model.extend

    isSuccess: ->
      not @get("exception") and not @get("error")