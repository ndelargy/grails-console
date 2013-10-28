App.module 'EditorApp', (EditorApp, App, Backbone, Marionette, $, _) ->

  API =
    newFile: ->
      file = new App.Entities.File
      @showFile file

    openLocalFile: (name) ->
      file = App.request 'local:file:entity', name
      unless file
        alert 'no find file' # TODO
        return
      @showFile file

    openRemoteFile: (name) ->
      dfd = App.request 'remote:file:entity', name
      dfd.done (file) => @showFile file
      dfd.fail => alert 'no find file' # TODO parse response?

    showFile: (file) ->
#      App.trigger 'app:active', EditorApp.controller.view
      EditorApp.controller.showFile file

  App.addInitializer ->
    router = new Marionette.AppRouter
      controller: API

    router.appRoute 'new', 'newFile'
    router.appRoute /^local:(.*?)$/, 'openLocalFile'
    router.appRoute /^remote:(.*?)$/, 'openRemoteFile'

    EditorApp.router = router
    EditorApp.controller = new EditorApp.Controller

    App.mainRegion.show EditorApp.controller.view

  App.on 'app:file:selected', (file) ->
    if file.isLocal()
      EditorApp.router.navigate "local:#{file.get('name')}"
    else
      EditorApp.router.navigate "remote:#{file.id}"

    API.showFile file

  App.on 'app:file:new', (file) ->
    EditorApp.router.navigate "new", trigger: true

    API.newFile()
