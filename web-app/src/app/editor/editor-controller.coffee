App.module 'Editor', (Editor, App, Backbone, Marionette, $, _) ->

  Editor.Controller = Marionette.Controller.extend

    initialize: (options) ->
      $(window).on "beforeunload", (event) =>
        "You have unsaved changes." if @isDirty()

      @editorView = new Editor.EditorView()

      @listenTo @editorView, 'execute', (result) ->
        @resultCollection.add result

      @listenTo @editorView, 'save', @save

      @listenTo @editorView, 'saveAs', @saveAs

      @resultCollection = new Editor.ResultCollection()
      @resultsView = new Editor.ResultCollectionView(collection: @resultCollection)

      @listenTo App, 'app:editor:clear', ->
        @resultCollection.reset()

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
      @editorView.refresh()
      @editorView.setValue file.get('text')

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
            type: 'file'

          file.store = store

          App.savingOn()
          file.save().then =>
            App.savingOff()
            @showFile file
            App.router.showFile file
            App.trigger 'file:created', @file # TODO move to file-model

    isDirty: ->
      @file.get('text') isnt @editorView.getValue()

