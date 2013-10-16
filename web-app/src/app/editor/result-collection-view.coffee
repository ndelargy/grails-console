App.module 'EditorApp', (EditorApp, App, Backbone, Marionette, $, _) ->

  EditorApp.ResultCollectionView = Backbone.View.extend
  
    events:
      "click button.clear": "clear"

    initialize: ->
      @template = JST.results
      @listenTo App.settings, "change:results.wrapText", @setWrap, this
      @resultViews = []
      @listenTo @collection, "add", (model, collection, options) ->
        resultView = new EditorApp.ResultView(model: model)
        @listenTo resultView, "render", ->
          @scrollToResultView resultView

        @$(".inner").append resultView.render().el
        @scrollToResultView resultView
        @resultViews.push resultView


    scrollToResultView: (resultView) ->
      scroll = resultView.$el.position().top + @$("#result").scrollTop()
      @$("#result").animate scrollTop: scroll

    setWrap: ->
      @$("#result").toggleClass "wrap", App.settings.get("results.wrapText")

    render: ->
      html = @template()
      @$el.html html
      @setWrap()
      this

    clear: ->
      _.each @resultViews, ((view) ->
        @stopListening view
        view.remove()
      ), this
      @resultViews = []