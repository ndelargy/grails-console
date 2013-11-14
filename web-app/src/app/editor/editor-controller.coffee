App.module 'EditorApp', (EditorApp, App, Backbone, Marionette, $, _) ->

  EditorApp.Controller = Marionette.Controller.extend

    initialize: (options) ->
      @view = new EditorApp.EditorSectionView
      @listenTo @view, 'save', @save
      @listenTo @view, 'fork', (text) ->
        # TODO check dirty
        @showFile new App.FileApp.File
          text: text
        # TODO
        App.router.navigate "new", trigger: false # TODO event

    showFile: (file) ->
      @file = file
      @view.refresh()
      @view.setValue file.get('text')

    save: (text) ->
      @file.set "text", text
      if @file.isNew()
        App.FileApp.promptForNewFileName().done (store, absolutePath) =>
          if store and absolutePath
            @file.set 'name', absolutePath
            @file.local = store is 'local'

            App.savingOn()
            @file.save().then =>
              App.savingOff()
              App.EditorApp.router.showFile @file
      else
        App.savingOn()
        @file.save()
        App.savingOff()

    isDirty: ->
      @file.get("text") isnt @editor.getValue() #TODO

