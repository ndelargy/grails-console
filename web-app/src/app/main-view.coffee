((App, Backbone) ->

  EditorController = Backbone.Marionette.Controller.extend

    initialize: (options) ->
      @region = options.region
      @view = new App.EditorSectionView
      @listenTo @view, 'save', @save

    showFile: (file) ->
      @file = file
      @view.refresh()
      @view.setValue file.get('text')

    save: (text) ->
      @file.set "text", text
      if @file.isNew()
        @prompt()
      else
#        @$(".file-name-section .saving").show()
        @file.save()
#        @$(".file-name-section .saving").fadeOut()

    isDirty: ->
      @file.get("text") isnt @editor.getValue()

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

#        @$(".file-name-section .saving").show() # TODO copied
#        @file.set "text", @editor.getValue()
        @file.save().then =>
#          @$(".file-name-section .saving").fadeOut()
          App.router.navigateToFile @file, trigger: false

        $el.modal "hide"

      $el.on 'hidden.bs.modal', ->
        $el.remove()
        $('.modal-backdrop').remove()

  App.MainView = Backbone.Marionette.Layout.extend

    template: 'main'

    attributes:
      id: 'main-content'

    regions:
      editorRegion: '.editor'
      filesRegion: '.files'

    initialize: ->
      @editorController = new EditorController
        region: @editorRegion
      @filesSectionView = new App.FilesSectionView

    onRender: ->
      @editorRegion.show @editorController.view
      @editorRegion.$el.show()
      @filesRegion.show @filesSectionView

    showEditor: (file) ->
      @editorRegion.$el.show()
      @filesRegion.$el.hide()
      @editorController.showFile file

    showFiles: ->
      @editorRegion.$el.hide()
      @filesRegion.$el.show()

) App, Backbone