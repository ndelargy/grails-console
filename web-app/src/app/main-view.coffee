((App, Backbone) ->

  App.MainView = Backbone.Marionette.Layout.extend

    template: 'main'

    attributes:
      id: 'main-content'

    regions:
      editorRegion: '.editor'
      filesRegion: '.files'

    initialize: ->
      @editorSectionView = new App.EditorSectionView
      @filesSectionView = new App.FilesSectionView

    onRender: ->
      @editorRegion.show @editorSectionView
      @filesRegion.show @filesSectionView

    showEditor: (file) ->
      @editorRegion.$el.show()
      @filesRegion.$el.hide()
      @editorSectionView.refresh()
      @editorSectionView.showFile file

    showFiles: ->
      @editorRegion.$el.hide()
      @filesRegion.$el.show()

) App, Backbone