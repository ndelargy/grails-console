((App, Backbone) ->

  App.MainView = App.View.extend

    attributes:
      id: "main-content"

    initialize: ->
      @editorSectionView = new App.EditorSectionView()
      @subviews.push @editorSectionView

      # TODO lazy
      @filesSectionView = new App.FilesSectionView

    render: ->
      @editorSectionView.render()
      @$el.append(@editorSectionView.$el.hide())
      @filesSectionView.render()
      @$el.append(@filesSectionView.$el.hide())
      @

    refresh: ->
      @editorSectionView.refresh()

    onShow: ->

    showEditor: (file) ->
      unless @editorSectionView.$el.is ':visible'
        @editorSectionView.$el.show()
        @filesSectionView.$el.hide()
        @editorSectionView.refresh()

      @editorSectionView.showFile file

    showFiles: ->
      @filesSectionView.render()
      @filesSectionView.showLocal()
      unless @filesSectionView.$el.is ':visible'
        @editorSectionView.$el.hide()
        @filesSectionView.$el.show()

) App, Backbone