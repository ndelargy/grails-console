App.module 'EditorApp', (EditorApp, App, Backbone, Marionette, $, _) ->

  Controller = Marionette.Controller.extend

    initialize: (options) ->
      @view = new App.EditorSectionView
      @listenTo @view, 'save', @save
      @listenTo @view, 'fork', (text) ->
        # TODO check dirty
        @showFile new App.File
          text: text
        # TODO
        App.router.navigate "new", trigger: false

    showFile: (file) ->
      @file = file
      @view.refresh()
      @view.setValue file.get('text')

    save: (text) ->
      @file.set "text", text
      if @file.isNew()
        @prompt()
      else
        App.savingOn()
        @file.save()
        App.savingOff()

    isDirty: ->
      @file.get("text") isnt @editor.getValue() #TODO

    prompt: ->
      $el = $(JST['save-new-file-modal']()) #TODO modal region?
      $el.modal()
      $el.find("input[type=text]").focus()
      $el.find("button.ok").click (event) =>
        event.preventDefault()
        name = $el.find("input[type=text]").val()
        store = $('input[name=store]:checked').val()

        @file.set "name", name
        @file.local = store is 'local'

        App.savingOn()
        @file.save().then =>
          App.savingOff()
          App.router.navigateToFile @file, trigger: false

        $el.modal "hide"

      $el.on 'hidden.bs.modal', ->
        $el.remove()
        $('.modal-backdrop').remove()

  API =
    newFile: ->
      console.log 'API newFile'
      file = new App.File
      @showFile file

    openLocalFile: ->
      console.log 'API openLocalFile'
      file = App.localFileStore.list().findWhere(name: name)
      unless file
        alert 'no find file' # TODO
        return
      @mainView.showEditor file
      @showFile file

    openRemoteFile: ->
      console.log 'API openRemoteFile'
      file = new App.File
        id: name # TODO search by path
      file.local = false
      file.fetch()
      .done =>
          @mainView.showEditor file
      .fail =>
          alert 'no find file' # TODO parse response?
      @showFile file

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
    EditorApp.controller = new Controller

  App.on 'app:file:selected', (file) ->
    if file.isLocal()
      EditorApp.router.navigate "local:#{file.get('name')}"
    else
      EditorApp.router.navigate "remote:#{file.id}"

    API.showFile file
