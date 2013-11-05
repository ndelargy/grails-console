App.module 'FileApp', (FileApp, App, Backbone, Marionette, $, _) ->
  view = undefined
  API =
    files: ->
      App.trigger 'app:active', FileApp.view

  App.addInitializer ->
    view = new FileApp.FilesSectionView

    $el = $('<div class="modal fade" data-backdrop="false"></div>').appendTo('body').html view.render().el
    $el.modal show: false
#    $el.on 'hidden.bs.modal', ->
#      $el.remove()
#      $('.modal-backdrop').remove()

    sizeContent = ->
      h = $el.find('.modal-content').height() - $el.find('.modal-header').outerHeight() - $el.find('.modal-footer').outerHeight()
      $el.find('.modal-body').height(h)
      App.DomUtils.sizeToFitVertical($el.find('.store'), $el.find('.modal-body')[0])


    $el.find('.modal-content').draggable
      handle: '.modal-header'
      addClasses: false
    $el.find('.modal-header').css 'cursor', 'move'
    $el.find('.modal-content').resizable
      addClasses: false
      resize: (event, ui) ->
        sizeContent()
      stop: (event, ui) ->

    sizeContent()
    # TODO modal region

    App.on 'app:file:list', ->
      $el.modal 'show'


    App.on 'app:file:selected', (file) ->
      $el.modal 'hide'


#    $el.on 'hidden.bs.modal', ->
#      $el.remove()
#      $('.modal-backdrop').remove()

#    FileApp.controller = new Controller