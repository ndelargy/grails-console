((App, Backbone) ->

  App.ContentView = Backbone.Marionette.Layout.extend

    template: 'content'

    attributes:
      class: 'full-height'

    regions:
      centerRegion: '.center'
      westRegion: '.west'

    initialize: (options) ->
      @listenTo App.settings, 'change:orientation', @showOrientation

      @editorView = options.editorView
      @resultsView = options.resultsView
      @scriptsView = options.scriptsView

      @listenTo @editorView, 'render', => @layout.initContent 'center'
      @listenTo @scriptsView, 'render', => @layout.initContent 'west'


    onRender: ->
      @initLayout()

      @centerRegion.show @editorView
      @westRegion.show @scriptsView

#      @editorView.refresh()

      @resultsView.render()

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
        west__paneSelector: '.west'
        west__contentSelector: '.files-wrapper'
        west__size: App.settings.get('layout.west.size')
        west__onresize_end: (name, $el, state, opts) ->
          App.settings.set 'layout.west.size', state.size
          App.settings.save()
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
        spacing_closed: 3

    showOrientation: ->
      orientation = App.settings.get('orientation')
      if orientation is 'vertical'
        @$('.east').append @resultsView.el
        @layout.hide 'south'
        @layout.show 'east'
        @layout.initContent 'east'
      else
        @$('.south').append @resultsView.el
        @layout.hide 'east'
        @layout.show 'south'
        @layout.initContent 'south'
      @editorView.refresh()

) App, Backbone