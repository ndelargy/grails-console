App.module 'Editor', (Editor, App, Backbone, Marionette, $, _) ->

  Editor.Controller = Marionette.Controller.extend

    initialize: (options) ->
      $(window).on "beforeunload", (event) =>
        "You have unsaved changes." if @isDirty()

      @editorView = new Editor.EditorView()

      @listenTo App, 'app:editor:save', @save

    newFile: ->
      file = new App.Entities.File
      @showFile file

    openFile: (store, name) ->
      dfd = App.request 'file:entity', store, name
      dfd.done (file) =>
        @showFile file
        App.trigger 'file:opened', file
      dfd.fail (jqxhr, status, error) =>
        App.handleXhrFail jqxhr
        @newFile()

    showFile: (file) ->
      App.trigger 'file:show', file
      @file = file
      @editorView.refresh()
      @editorView.setValue file.get('text')

    save: ->
      text = @editorView.getValue()
      @file.set 'text', text
      if @file.isNew()
        @saveAs text
      else
        App.savingOn()
        @file.save().then => App.savingOff()

    isDirty: ->
      @normalizeText(@file.get('text')) isnt @normalizeText(@editorView.getValue())

    normalizeText: (text) -> # for Windows
      text.replace /(\r\n|\r)/gm, '\n'

    getValue: -> @editorView.getValue()





