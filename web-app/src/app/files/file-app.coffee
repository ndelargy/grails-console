App.module 'FileApp', (FileApp, App, Backbone, Marionette, $, _) ->

  API =
    files: ->
      App.trigger 'app:active', FileApp.view

  App.addInitializer ->
    router = new Marionette.AppRouter
      controller: API

    router.appRoute 'files', 'files'
    FileApp.view = new FileApp.FilesSectionView

#    FileApp.controller = new Controller