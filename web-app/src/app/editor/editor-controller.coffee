App.module 'Editor', (Editor, App, Backbone, Marionette, $, _) ->

  Editor.Controller = Marionette.Controller.extend

    initialize: (options) ->
      @view = new Editor.EditorSectionView
      @listenTo @view, 'save', @save
      @listenTo @view, 'saveAs', @saveAs

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
            App.router.showFile file

    isDirty: ->
      @file.get("text") isnt @editor.getValue() #TODO

