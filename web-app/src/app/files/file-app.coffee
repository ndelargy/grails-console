App.module 'FileApp', (FileApp, App, Backbone, Marionette, $, _) ->

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

  API =
    promptForNewFileName: ->
      dfd = $.Deferred()

      view = new FileApp.FilesSectionView
        saving: true

      showInModal view

      view.$el.find('.file-name').focus()

      view.on 'save', (store, path, name) ->
        dfd.resolveWith null, [store, path, name]
        view.close()

      view.on 'close', ->
        dfd.resolve()

      dfd.promise()

    promptForFile: ->
      dfd = $.Deferred()

      view = new FileApp.FilesSectionView
        saving: false

      view.on 'file:selected', (file) ->
        dfd.resolveWith null, [file]
        view.close()

      view.on 'close', ->
        dfd.resolve()

      showInModal view

      dfd.promise()

  FileApp.promptForFile = API.promptForFile
  FileApp.promptForNewFileName = API.promptForNewFileName

#  App.addInitializer ->
#
#    FileApp.on 'file:selected', (file) ->
#      $el.modal 'hide'
#      App.trigger 'app:file:selected', file