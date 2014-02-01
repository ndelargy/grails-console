App.module 'Files', (Files, App, Backbone, Marionette, $, _) ->

  showInModal = (view) ->
    $el = $('<div class="modal" data-backdrop="false"></div>').appendTo('body').html view.render().el
    $el.modal show: false

    $el.on 'shown.bs.modal', -> view.resize()

    $el.find('.modal-content').draggable
      handle: '.modal-header'
      addClasses: false

    $el.find('.modal-header').css 'cursor', 'move'

    $el.find('.modal-content').resizable
      addClasses: false
      resize: (event, ui) -> view.resize()
      stop: (event, ui) ->

    $el.find('.modal-header .close').on 'click', (event) ->
      event.preventDefault()
      view.close()

    $el.find('.modal-footer .cancel').on 'click', (event) ->
      event.preventDefault()
      view.close()

    view.on 'close', -> $el.modal 'hide'

    $el.on 'hidden.bs.modal', ->
      $el.remove()

    $el.modal 'show'

    $el

  Files.Controller = Marionette.Controller.extend

    initialize: ->
      @collection = new App.Entities.FileCollection()
      @collection.fetch() # TODO router init

      @listenTo App, 'file:opened', (file) =>
        @collection.fetchByStoreAndPath file.store, file.getParent()

      @listenTo App, 'file:created', (file) ->
        @collection.fetchByStoreAndPath file.store, file.getParent()

      @scriptsView = new Files.ScriptsView
        collection: @collection

      @listenTo @scriptsView, 'file:selected', (file) ->
        # TODO pass through
        if not App.Editor.controller.isDirty() or confirm 'Are you sure? You have unsaved changes.'
          file.fetch().done ->
            App.Editor.controller.showFile file
            App.router.showFile file

    promptForNewFile: ->
      dfd = $.Deferred()

      if App.Editor.controller.file.isNew()
        store = App.Files.controller.scriptsView.collection.store # TODO
        path = App.Files.controller.scriptsView.collection.path
      else
        store = App.Editor.controller.file.store
        path = App.Editor.controller.file.getParent()

      view = new Files.FilesSectionView
        store: store
        path: path

      showInModal view

      view.$el.find('.file-name').focus()

      view.on 'save', (file) ->
        dfd.resolveWith null, [file]
        view.close()

      view.on 'file:selected', (file) ->
        view.setName file.get('name')

      view.on 'close', ->
        dfd.resolve()

      dfd.promise()

