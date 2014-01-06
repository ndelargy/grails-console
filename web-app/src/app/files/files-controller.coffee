App.module 'Files', (Files, App, Backbone, Marionette, $, _) ->

  showInModal = (view) ->
    $el = $('<div class="modal" data-backdrop="false"></div>').appendTo('body').html view.render().el
    $el.modal show: false

    sizeContent = ->
      modalBodyHeight = $el.find('.modal-content').height() - $el.find('.modal-header').outerHeight() - $el.find('.modal-footer').outerHeight()
      $el.find('.modal-body').height modalBodyHeight

      filesBodyHeight = modalBodyHeight - $el.find('.files-header').outerHeight()
      $el.find('.files-body').height filesBodyHeight

    $el.on 'shown.bs.modal', ->
      sizeContent()

    $el.find('.modal-content').draggable
      handle: '.modal-header'
      addClasses: false

    $el.find('.modal-header').css 'cursor', 'move'

    $el.find('.modal-content').resizable
      addClasses: false
      resize: (event, ui) -> sizeContent()
      stop: (event, ui) ->

    sizeContent()
    # TODO modal region

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

      @scriptsView = new Files.ScriptsView
        collection: @collection

    promptForNewFileName: ->
      dfd = $.Deferred()

      view = new Files.FilesSectionView
        title: 'Save'
        saving: true

      showInModal view

      view.$el.find('.file-name').focus()

      view.on 'save', (store, path, name) ->
        dfd.resolveWith null, [store, path, name]
        view.close()

      view.on 'file:selected', (file) ->
        view.setName file.get('name')

      view.on 'close', ->
        dfd.resolve()

      dfd.promise()

