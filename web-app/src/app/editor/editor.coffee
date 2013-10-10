((App, Backbone) ->

  App.EditorController = Backbone.Marionette.Controller.extend

    initialize: (options) ->
      @region = options.region
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

) App, Backbone