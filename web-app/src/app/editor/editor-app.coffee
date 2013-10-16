App.module 'EditorApp', (EditorApp, App, Backbone, Marionette, $, _) ->

  API =
    newFile: ->
      file = new App.File
      @showFile file

    openLocalFile: (name) ->
      file = App.localFileStore.list().findWhere(name: name) # TODO reqres
      unless file
        alert 'no find file' # TODO
        return
      @showFile file

    openRemoteFile: (name) ->
      file = new App.File
        id: name # TODO search by path
      file.local = false
      file.fetch()
        .done => @showFile file
        .fail => alert 'no find file' # TODO parse response?

    showFile: (file) ->
      App.trigger 'app:active', EditorApp.controller.view
      EditorApp.controller.showFile file

  App.addInitializer ->
    router = new Marionette.AppRouter
      controller: API

    router.appRoute 'new', 'newFile'
    router.appRoute /^local:(.*?)$/, 'openLocalFile'
    router.appRoute /^remote:(.*?)$/, 'openRemoteFile'

    EditorApp.router = router
    EditorApp.controller = new EditorApp.Controller

  App.on 'app:file:selected', (file) ->
    if file.isLocal()
      EditorApp.router.navigate "local:#{file.get('name')}"
    else
      EditorApp.router.navigate "remote:#{file.id}"

    API.showFile file

  App.on 'app:file:new', (file) ->
    EditorApp.router.navigate "new", trigger: true

    API.newFile()
