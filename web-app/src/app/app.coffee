Marionette.Renderer.render = (template, data) ->
  JST[template] data # use compiled templates

Application = Backbone.Marionette.Application.extend

  fileStores: {}

  onInitializeBefore: (options) ->
    @data = options

    @addRegions
      headerRegion: '#header'
      mainRegion: '#main-content'

    @settings = App.request 'settings:entity'
    @editorController = new App.Editor.Controller
    @filesController = new App.Files.Controller
    @resultController = new App.Result.Controller
    @router = new App.Main.Router()

    contentView = new App.Main.ContentView
      editorView: @editorController.editorView
      resultsView: @resultController.resultsView
      scriptsView: @filesController.scriptsView

    @mainRegion.show contentView
    contentView.refresh()

    @on 'file:deleted', @onFileDeleted
    @on 'app:file:selected', @onFileSelected

    @commands.setHandler 'save', @handleSave, @
    @commands.setHandler 'saveAs', @handleSaveAs, @
    @commands.setHandler 'new', @handleNew, @
    @commands.setHandler 'execute', @handleExecute, @
    @commands.setHandler 'clear', @handleClear, @
    @commands.setHandler 'help', @handleHelp, @

  handleExecute: ->
    input = @editorController.getValue()
    @resultController.execute input

  handleClear: ->
    @resultController.clear()

  handleNew: ->
    if not @editorController.isDirty() or confirm 'Are you sure? You have unsaved changes.'
      @router.showNew()
      @editorController.newFile()

  handleSave: ->
    @editorController.save()

  handleSaveAs: ->
    text = @editorController.getValue()

    if @editorController.file.isNew()
      store = @filesController.collection.store # TODO
      path = @filesController.collection.path
    else
      store = @editorController.file.store
      path = @editorController.file.getParent()

    @filesController.promptForNewFile(store, path).done (file) =>
      if file
        file.set 'text', text

        @savingOn()
        file.save().then =>
          @savingOff()
          @editorController.showFile file
          @router.showFile file
          @trigger 'file:created', file # TODO move to file-model

  handleHelp:->
    # TODO modal region
    view = new App.Main.HelpView
    $el = $('<div class="modal fade" data-backdrop="false"></div>').appendTo('body').html view.render().el
    $el.modal()
    $el.on 'hidden.bs.modal', ->
      $el.remove()
      $('.modal-backdrop').remove()

  onFileDeleted: (file) ->
    if @editorController.file.id is file.id
      @router.showNew()
      @editorController.newFile()

  onFileSelected: (file) ->
    if not @editorController.isDirty() or confirm 'Are you sure? You have unsaved changes.'
      file.fetch().done =>
        @editorController.showFile file
        @router.showFile file

  onStart: (data) ->
    @headerRegion.show new App.Main.HeaderView

    @_initKeybindings()

    @showTheme()
    @settings.on 'change:theme', @showTheme, this

    Backbone.history.start(pushState: false) if Backbone?.history
    $('body').css 'visibility', 'visible'

  _initKeybindings: ->
    $(document).bind 'keydown', 'Ctrl+return', => @execute 'execute'
    $(document).bind 'keydown', 'Meta+return', => @execute 'execute'
    $(document).bind 'keydown', 'Ctrl+s', (event) =>
      event.preventDefault()
      event.stopPropagation()
      @execute 'save'
    $(document).bind 'keydown', 'Meta+s', (event) =>
      event.preventDefault()
      event.stopPropagation()
      @execute 'save'
    $(document).bind 'keydown', 'esc', => @execute 'clear'

  createLink: (action, params) ->
    link = "#{@data.baseUrl}/console/#{action}"
    link += '?' + $.param(params, true) if params
    link

  showTheme: ->
    theme = @settings.get('theme')
    $('body').attr 'data-theme', theme

  savingOn: ->
    $('.navbar .saving').fadeIn 100

  savingOff: ->
    $('.navbar .saving').fadeOut 100

  handleXhrFail: (jqxhr) ->
    resp = null

    try
      resp = JSON.parse(jqxhr.responseText)
    catch ex

    error = resp?.error ? 'An error occurred.'
    alert error

  addFileStore: (fileStore) ->
    @fileStores[fileStore.storeName] = fileStore

  getFileStore: (storeName) ->
    @fileStores[storeName]

window.App = new Application()