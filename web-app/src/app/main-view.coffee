((App, Backbone) ->

  App.MainView = App.View.extend

    attributes:
      id: "main-content"

    initialize: ->
      @editorSectionView = new App.EditorSectionView()
      @subviews.push @editorSectionView

      # TODO lazy
      files = new App.FileCollection
      files.store = App.localFileStore
      @filesView = new App.FileCollectionView
        collection: files

    render: ->
      @editorSectionView.render()
      @$el.append(@editorSectionView.$el.hide())
      @filesView.render()
      @$el.append(@filesView.$el.hide())
      @

    refresh: ->
      @editorSectionView.refresh()

    onShow: ->

    showEditor: (file) ->
      unless @editorSectionView.$el.is ':visible'
        @editorSectionView.$el.show()
        @filesView.$el.hide()
        @editorSectionView.refresh()

      @editorSectionView.showFile file

    showFiles: ->
      @filesView.collection.fetch()
      @filesView.render()
      unless @filesView.$el.is ':visible'
        @editorSectionView.$el.hide()
        @filesView.$el.show()

) App, Backbone