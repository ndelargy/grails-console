App.module 'EditorApp', (EditorApp, App, Backbone, Marionette, $, _) ->

  # TODO remove #result

  EditorApp.ResultCollectionView = Marionette.CompositeView.extend
  
    template: 'results'

    itemViewContainer: '.inner'

    events:
      'click button.clear': 'clear'

    getItemView: (item) -> EditorApp.ResultView

    onAfterItemAdded: (itemView) ->
      @scrollToResultView itemView

    initialize: ->
      @listenTo App.settings, "change:results.wrapText", @setWrap
      @listenTo @, 'itemview:complete', @scrollToResultView

    scrollToResultView: (resultView) ->
      console.log "top #{resultView.$el.position().top}"
      scroll = resultView.$el.position().top + @$("#result").scrollTop()
      console.log "animate #{scroll}"
      @$("#result").animate scrollTop: scroll

    setWrap: ->
      @$("#result").toggleClass "wrap", App.settings.get("results.wrapText")

    onRender: ->
      @setWrap()

    clear: ->
      @collection.reset()