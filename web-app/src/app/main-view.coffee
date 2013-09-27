((App, Backbone) ->

  App.MainView = Backbone.View.extend

    attributes:
      id: "main-content"

    initialize: ->
      @editorSectionView = new App.EditorSectionView()

    render: ->
      @editorSectionView.render()
      @$el.append @editorSectionView.$el
      this

    refresh: ->
      @editorSectionView.refresh()

    showFile: (file) ->
      @editorSectionView.editorView.showFile file # TODO

) App, Backbone