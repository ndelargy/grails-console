App.module 'EditorApp', (EditorApp, App, Backbone, Marionette, $, _) ->

  API =
    newFile: ->
      file = new App.Entities.File
      @showFile file

    openLocalFile: (name) ->
      file = App.request 'local:file:entity', name
      unless file
        alert 'no find file' # TODO
        @newFile()
        return
      @showFile file

    openRemoteFile: (name) ->
      dfd = App.request 'remote:file:entity', name
      dfd.done (file) => @showFile file
      dfd.fail =>
        alert 'no find file' # TODO parse response?
        @newFile()

    showFile: (file) ->
      EditorApp.controller.showFile file

  App.addInitializer ->
    Router = Marionette.AppRouter.extend
      showFile: (file) ->
        @navigate "#{file.getStore()}:#{file.id}"

    router = new Router controller: API

    router.appRoute '*path', 'newFile'
    router.appRoute 'new', 'newFile'
    router.appRoute /^local:(.*?)$/, 'openLocalFile'
    router.appRoute /^remote:(.*?)$/, 'openRemoteFile'

    EditorApp.router = router
    EditorApp.controller = new EditorApp.Controller
    App.Files.controller = new App.Files.Controller

    App.mainRegion.show EditorApp.controller.view

  App.on 'app:file:new', (file) ->
    EditorApp.router.navigate "new", trigger: true

    API.newFile()
