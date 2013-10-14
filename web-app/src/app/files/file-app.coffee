App.module 'FileApp', (FileApp, App, Backbone, Marionette, $, _) ->

  API =
    files: ->
      console.log 'yo'
      App.trigger 'app:active', FileApp.view

  App.addInitializer ->
    router = new Marionette.AppRouter
      controller: API

    router.appRoute 'files', 'files'
    console.log 'init'
    FileApp.view = new App.FilesSectionView

#    FileApp.controller = new Controller