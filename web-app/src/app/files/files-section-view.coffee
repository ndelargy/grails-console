App.module 'Files', (Files, App, Backbone, Marionette, $, _) ->

  BaseDir = Backbone.Model.extend()

  Files.FilesSectionView = Marionette.Layout.extend

    template: 'files/files-section'

    regions:
      filePathRegion: '.file-path-region'
      storeRegion: '.store'

    attributes:
      'class': 'modal-dialog files-section-view'

    events:
      'click button.save': 'onSave'

    initialize: (options) ->
      @baseDir = new BaseDir()
      @listenTo @baseDir, 'change', @showCollection

      @collection = new App.Entities.FileCollection()
      @collection.store = options.store
      @collection.path = options.path
      @collection.fetch()

      @scriptsView = new Files.ScriptsView
        collection: @collection

      @listenTo @scriptsView, 'render', @resize

    onRender: ->
      @storeRegion.show @scriptsView

    onFileSelected: (file) ->
      if file.isDirectory()
        path = file.getAbsolutePath()
        @baseDir.set 'path', path
      else
        @trigger 'file:selected', file

    resize: ->
      if (@$el.is ':visible')
        modalBodyHeight = @$('.modal-content').height() - @$('.modal-header').outerHeight() - @$('.modal-footer').outerHeight()
        @$('.modal-body').height modalBodyHeight

        filesBodyHeight = modalBodyHeight - @$('.files-header').outerHeight()
        @$('.files-body').height filesBodyHeight
        @$('.files-body div.store').height filesBodyHeight
        @$('.files-body div.store .scripts').height filesBodyHeight

        filesWrapperHeight = filesBodyHeight - @$('.files-body div.store .scripts > .btn-toolbar').outerHeight() - @$('.files-body div.store .scripts > .folder').outerHeight()
        @$('.files-body div.store .scripts > .files-wrapper').height filesWrapperHeight

    onSave: (event) ->
      event.preventDefault()
      fileName = @$('input.file-name').val()
      store = @collection.store
      path = @collection.path
      path += '/' if path[path.length - 1] isnt '/'

      @trigger 'save', store, path, fileName

    setName: (name) ->
      @$('input.file-name').val name

    showCollection: ->
      @storeRegion.show new Files.LoadingView

      @collection.store = store
      @collection.path = path

      @collection.fetch()
        .done =>
          fileCollectionView = new Files.FileCollectionView
            collection: @collection

          @listenTo fileCollectionView, 'file:selected', @onFileSelected
#
          @storeRegion.show fileCollectionView

        .fail -> alert 'Failed to load remote files.' # TODO error view