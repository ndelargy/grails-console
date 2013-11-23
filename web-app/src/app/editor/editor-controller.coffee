App.module 'EditorApp', (EditorApp, App, Backbone, Marionette, $, _) ->

  EditorApp.Controller = Marionette.Controller.extend

    initialize: (options) ->
      @view = new EditorApp.EditorSectionView
      @listenTo @view, 'save', @save
      @listenTo @view, 'saveAs', @saveAs

    showFile: (file) ->
      App.trigger 'file:show', file
      @file = file
      @view.refresh()
      @view.setValue file.get('text')

    save: (text) ->
      @file.set 'text', text
      if @file.isNew()
        @saveAs text
      else
        App.savingOn()
        @file.save().then =>
          App.savingOff()

    saveAs: (text) ->
      App.Files.controller.promptForNewFileName().done (store, path, name) =>
        if store
          file = new App.Entities.File
            text: text
            name: name
            path: path

          file.local = store is 'local'

          App.savingOn()
          file.save().then =>
            App.savingOff()
            App.EditorApp.router.showFile file

    isDirty: ->
      @file.get("text") isnt @editor.getValue() #TODO

