App.module 'Editor', (Editor, App, Backbone, Marionette, $, _) ->

  Editor.Controller = Marionette.Controller.extend

    initialize: (options) ->
      @view = new Editor.EditorSectionView
      @listenTo @view, 'save', @save
      @listenTo @view, 'saveAs', @saveAs

      $(window).on "beforeunload", (event) =>
        "You have unsaved changes." if @isDirty()

    newFile: ->
      file = new App.Entities.File
      @showFile file

    openFile: (store, name) ->
      dfd = App.request 'file:entity', store, name
      dfd.done (file) =>
        @showFile file
        App.trigger 'file:opened', file
      dfd.fail =>
        alert 'no find file' # TODO parse response?
        @newFile()

    showFile: (file) ->
      App.trigger 'file:show', file
      @file = file
      console.log 'hi'
      console.log file
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
      App.Files.controller.promptForNewFileName().done (store, path, name) => # TODO cmd?
        if store
          file = new App.Entities.File
            text: text
            name: name
            path: path

          file.store = store

          App.savingOn()
          file.save().then =>
            App.savingOff()
            @showFile file
            App.router.showFile file

    isDirty: ->
      @file.get('text') isnt @view.getValue()

