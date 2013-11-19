App.module 'EditorApp', (EditorApp, App, Backbone, Marionette, $, _) ->

  EditorApp.Controller = Marionette.Controller.extend

    initialize: (options) ->
      @view = new EditorApp.EditorSectionView
      @listenTo @view, 'save', @save

    showFile: (file) ->
      console.log 'showfile ' + file.get('name')
      App.trigger 'file:show', file
      @file = file
      @view.refresh()
      @view.setValue file.get('text')

    save: (text) ->
      @file.set "text", text
      if @file.isNew()
        App.FileApp.promptForNewFileName().done (store, path, name) =>
          if store
            @file.set
              name: name
              path: path

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

