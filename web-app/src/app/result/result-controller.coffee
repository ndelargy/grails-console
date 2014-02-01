App.module 'Result', (Result, App, Backbone, Marionette, $, _) ->

  Result.Controller = Marionette.Controller.extend

    initialize: (options) ->
      @resultCollection = new App.Result.ResultCollection()
      @resultsView = new App.Result.ResultCollectionView(collection: @resultCollection) # TODO rename

      @listenTo App, 'app:editor:clear', @clear

    execute: (input) ->
      result = new App.Result.Result
        input: input

      result.execute()
      @resultCollection.add result

    clear: ->
      @resultCollection.reset()


