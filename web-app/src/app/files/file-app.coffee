App.module 'FileApp', (FileApp, App, Backbone, Marionette, $, _) ->

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

    # TODO modal region

    App.on 'app:file:list', ->
      $el.modal 'show'


#    $el.on 'hidden.bs.modal', ->
#      $el.remove()
#      $('.modal-backdrop').remove()

#    FileApp.controller = new Controller