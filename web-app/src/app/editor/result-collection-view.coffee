App.module 'EditorApp', (EditorApp, App, Backbone, Marionette, $, _) ->

  EditorApp.ResultCollectionView = Marionette.CompositeView.extend
  
    template: 'editor/results'

    itemViewContainer: '.inner'

    events:
      'click button.clear': 'clear'

    getItemView: (item) -> EditorApp.ResultView

    onAfterItemAdded: (itemView) ->
      @scrollToResultView itemView

    initialize: ->
      @listenTo App.settings, 'change:results.wrapText', @setWrap
      @listenTo @, 'itemview:complete', @scrollToResultView

    scrollToResultView: (resultView) ->
      scroll = resultView.$el.position().top + @$('.script-result-section').scrollTop()
      @$('.script-result-section').animate scrollTop: scroll

    setWrap: ->
      @$('.script-result-section').toggleClass 'wrap', App.settings.get('results.wrapText')

    onRender: ->
      @setWrap()

    clear: ->
      @collection.reset()