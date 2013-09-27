((App, Backbone) ->

  App.Result = Backbone.Model.extend

    isSuccess: ->
      not @get("exception") and not @get("error")


) App, Backbone