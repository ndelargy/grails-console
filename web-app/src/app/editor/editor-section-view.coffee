App.module 'EditorApp', (EditorApp, App, Backbone, Marionette, $, _) ->

  EditorApp.EditorSectionView = App.ItemView.extend

    template: 'editor/editor-section'

    attributes:
      class: 'full-height'

    onRender: ->
      @initLayout()

      @editorView = new EditorApp.EditorView(el: @$('#editor')[0]) # TODO el
      @editorView.render()
      @layout.initContent 'center'
      @editorView.resize()
      @subviews.push @editorView

      @resultCollection = new EditorApp.ResultCollection()
      @resultsView = new EditorApp.ResultCollectionView(collection: @resultCollection).render()

      @listenTo @editorView, 'execute', (result) ->
        @resultCollection.add result

      @listenTo @editorView, 'save', (text) ->
        @trigger 'save', text

      @listenTo @editorView, 'fork', (text) ->
        @trigger 'fork', text

      @listenTo @editorView, 'clear', @clearResults

      @showOrientation()
      @listenTo App.settings, 'change:orientation', @showOrientation

    onVisible: ->
      @log 'onVisible'
      @refresh()

    refresh: ->
      @editorView.refresh()
      @layout.resizeAll()
      @showOrientation()

    initLayout: ->
      @layout = @$el.layout
        center__paneSelector: '#editor'
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