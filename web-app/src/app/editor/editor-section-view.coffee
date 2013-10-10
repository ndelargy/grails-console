((App, Backbone, JST) ->

  App.EditorSectionView = App.ItemView.extend

    template: 'editor-section'

    attributes:
      class: "full-height"

    onRender: ->
      @initLayout()

      @editorView = new App.EditorView(el: @$("#editor")[0])
      @editorView.render()
      @layout.initContent "center"
      @editorView.resize()
      @subviews.push @editorView

      @resultCollection = new App.ResultCollection()
      @resultsView = new App.ResultCollectionView(collection: @resultCollection).render()

      @listenTo @editorView, "execute", (result) ->
        @resultCollection.add result

      @listenTo @editorView, "save", (text) ->
        @trigger 'save', text

      @listenTo @editorView, "clear", @clearResults
      @showOrientation()
      @listenTo App.settings, "change:orientation", @showOrientation

    onVisible: ->
      @log 'onVisible'
      @refresh()

    refresh: ->
      @editorView.refresh()
      @layout.resizeAll()
      @showOrientation()

    initLayout: ->
      @layout = @$el.layout
        center__paneSelector: "#editor"
        center__contentSelector: "#code-wrapper"
        center__onresize: => @editorView.refresh()
        east__paneSelector: ".east"
        east__contentSelector: "#result"
        east__initHidden: App.settings.get("orientation") isnt "vertical"
        east__size: App.settings.get("layout.east.size")
        east__onresize_end: (name, $el, state, opts) ->
          App.settings.set "layout.east.size", state.size
          App.settings.save()
        south__paneSelector: ".south"
        south__contentSelector: "#result"
        south__initHidden: App.settings.get("orientation") isnt "horizontal"
        south__size: App.settings.get("layout.south.size")
        south__onresize_end: (name, $el, state, opts) ->
          App.settings.set "layout.south.size", state.size
          App.settings.save()
        resizable: true
        findNestedContent: true
        fxName: ""

    showOrientation: ->
      orientation = App.settings.get("orientation")
      if orientation is "vertical"
        $(".east").append @resultsView.el
        @layout.hide "south"
        @layout.show "east"
        @layout.initContent "east"
      else
        $(".south").append @resultsView.el
        @layout.hide "east"
        @layout.show "south"
        @layout.initContent "south"
      @editorView.refresh()

    setValue: (text) ->
      @editorView.setValue text

    clearResults: ->
      @resultsView.clear()

) App, Backbone, JST