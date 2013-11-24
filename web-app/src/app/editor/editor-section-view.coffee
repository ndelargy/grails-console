App.module 'Editor', (Editor, App, Backbone, Marionette, $, _) ->

  Editor.EditorSectionView = Marionette.Layout.extend

    template: 'editor/editor-section'

    attributes:
      class: 'full-height'

    regions:
      centerRegion: '.center'

    initialize: ->
      @listenTo App.settings, 'change:orientation', @showOrientation

      @editorView = new Editor.EditorView()

      @listenTo @editorView, 'execute', (result) ->
        @resultCollection.add result

      @listenTo @editorView, 'save', (text) ->
        @trigger 'save', text

      @listenTo @editorView, 'saveAs', (text) ->
        @trigger 'saveAs', text

      @listenTo @editorView, 'clear', @clearResults

      @resultCollection = new Editor.ResultCollection()
      @resultsView = new Editor.ResultCollectionView(collection: @resultCollection)

    onRender: ->
      @initLayout()

      @centerRegion.show @editorView

      @layout.initContent 'center'
      @editorView.refresh()

      @resultsView.render() # TODO region?

      @showOrientation()

    refresh: ->
      @editorView.refresh()
      @layout.resizeAll()
      @showOrientation()

    initLayout: ->
      @layout = @$el.layout
        center__paneSelector: '.center'
        center__contentSelector: '#code-wrapper'
        center__onresize: => @editorView.refresh()
        east__paneSelector: '.east'
        east__contentSelector: '.script-result-section'
        east__initHidden: App.settings.get('orientation') isnt 'vertical'
        east__size: App.settings.get('layout.east.size')
        east__onresize_end: (name, $el, state, opts) ->
          App.settings.set 'layout.east.size', state.size
          App.settings.save()
        east__resizerCursor: 'ew-resize'
        south__paneSelector: '.south'
        south__contentSelector: '.script-result-section'
        south__initHidden: App.settings.get('orientation') isnt 'horizontal'
        south__size: App.settings.get('layout.south.size')
        south__onresize_end: (name, $el, state, opts) ->
          App.settings.set 'layout.south.size', state.size
          App.settings.save()
        south__resizerCursor: 'ns-resize'
        resizable: true
        findNestedContent: true
        fxName: ''
        spacing_open: 3

    showOrientation: ->
      orientation = App.settings.get('orientation')
      if orientation is 'vertical'
        $('.east').append @resultsView.el
        @layout.hide 'south'
        @layout.show 'east'
        @layout.initContent 'east'
      else
        $('.south').append @resultsView.el
        @layout.hide 'east'
        @layout.show 'south'
        @layout.initContent 'south'
      @editorView.refresh()

    setValue: (text) ->
      @editorView.setValue text

    clearResults: ->
      @resultsView.clear()