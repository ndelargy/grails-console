((App, Backbone) ->

  App.MainView = Backbone.Marionette.Layout.extend

    template: 'main'

    attributes:
      id: 'main-content'

    regions:
      editorRegion: '.editor'
      filesRegion: '.files'

    initialize: ->
      @editorController = new App.EditorController
        region: @editorRegion
      @filesSectionView = new App.FilesSectionView

    onRender: ->
      @editorRegion.show @editorController.view
      @editorRegion.$el.show()
      @filesRegion.show @filesSectionView

    showEditor: (file) ->
      @editorRegion.$el.show()
      @filesRegion.$el.hide()
      @editorController.showFile file

    showFiles: ->
      @editorRegion.$el.hide()
      @filesRegion.$el.show()

) App, Backbone