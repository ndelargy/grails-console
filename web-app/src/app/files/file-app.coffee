App.module 'FileApp', (FileApp, App, Backbone, Marionette, $, _) ->

  $el = undefined
  view = undefined

  initView = ->
    view = new FileApp.FilesSectionView

    $el = $('<div class="modal fade" data-backdrop="false"></div>').appendTo('body').html view.render().el
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

    view

  API =
    promptForNewFileName: ->
      dfd = $.Deferred()

      initView() if not view
      $el.modal 'show'

      # file
      # app event?

      # no file
      # modal close event?

      dfd

    promptForFile: ->
      dfd = $.Deferred()

      initView() if not view
      $el.modal 'show'

      # file
      # app event?

      # no file
      # modal close event?

      dfd

  App.addInitializer ->

    App.on 'app:file:list', ->
      initView() if not view
      $el.modal 'show'

    FileApp.on 'file:selected', (file) ->
      $el.modal 'hide'
      App.trigger 'app:file:selected', file