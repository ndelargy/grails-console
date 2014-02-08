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
      @collection.fetchByStoreAndPath 'local', '/' # TODO router init

      @listenTo App, 'file:opened', (file) =>
        @collection.fetchByStoreAndPath file.store, file.getParent()

      @listenTo App, 'file:created', (file) ->
        @collection.fetchByStoreAndPath file.store, file.getParent()

      @scriptsView = new Files.ScriptsView
        collection: @collection

    promptForNewFile: (store, path) ->
      dfd = $.Deferred()

      collection = new App.Entities.FileCollection()
      collection.store = store
      collection.path = path

      view = new Files.FilesSectionView
        collection: collection

      collection.fetch()
      showInModal view

      view.$el.find('.file-name').focus()

      view.on 'save', (file) ->
        dfd.resolveWith null, [file]
        view.close()

      view.on 'close', -> dfd.resolve()

      dfd.promise()

