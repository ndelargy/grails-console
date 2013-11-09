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
        @prompt()
      else
        App.savingOn()
        @file.save()
        App.savingOff()

    isDirty: ->
      @file.get("text") isnt @editor.getValue() #TODO

    prompt: ->
      # request name


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
          App.trigger 'app:file:selected', @file

        $el.modal "hide"

      $el.on 'hidden.bs.modal', ->
        $el.remove()
        $('.modal-backdrop').remove()

