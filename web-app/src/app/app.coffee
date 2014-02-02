Marionette.Renderer.render = (template, data) ->
  JST[template] data # use compiled templates

App = new (Backbone.Marionette.Application.extend

  fileStores: {}

  onStart: (data) ->
    App.headerRegion.show new App.Main.HeaderView

    @_initKeybindings()

    @showTheme()
    App.settings.on 'change:theme', @showTheme, this

    Backbone.history.start(pushState: false) if Backbone?.history
    $('body').css 'visibility', 'visible'

  _initKeybindings: ->
    $(document).bind 'keydown', 'Ctrl+return', -> App.trigger 'app:editor:execute'
    $(document).bind 'keydown', 'Meta+return', -> App.trigger 'app:editor:execute'
    $(document).bind 'keydown', 'Ctrl+s', (event) ->
      event.preventDefault()
      event.stopPropagation()
      App.trigger 'app:editor:save'
    $(document).bind 'keydown', 'Meta+s', (event) ->
      event.preventDefault()
      event.stopPropagation()
      App.trigger 'app:editor:save'
    $(document).bind 'keydown', 'esc', -> App.trigger 'app:editor:clear'

  createLink: (action, params) ->
    link = "#{@data.baseUrl}/console/#{action}"
    link += '?' + $.param(params, true) if params
    link

  showTheme: ->
    theme = App.settings.get('theme')
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
)

App.addRegions
  headerRegion: '#header'
  mainRegion: '#main-content'

App.on 'initialize:before', (options) ->
  App.data = options

App.addInitializer ->
  App.settings = App.request 'settings:entity'
  App.Editor.controller = new App.Editor.Controller
  App.Files.controller = new App.Files.Controller
  App.Result.controller = new App.Result.Controller
  App.router = new App.Main.Router()

  contentView = new App.Main.ContentView
    editorView: App.Editor.controller.editorView
    resultsView: App.Result.controller.resultsView
    scriptsView: App.Files.controller.scriptsView

  App.mainRegion.show contentView
  contentView.refresh()

App.on 'app:editor:execute', ->
  input = App.Editor.controller.getValue()
  App.Result.controller.execute input

App.on 'app:file:new', (file) ->
  if not App.Editor.controller.isDirty() or confirm 'Are you sure? You have unsaved changes.'
    App.router.showNew()
    App.Editor.controller.newFile()

App.on 'app:editor:saveAs', ->
  text = App.Editor.controller.getValue()

  if App.Editor.controller.file.isNew()
    store = App.Files.controller.scriptsView.collection.store # TODO
    path = App.Files.controller.scriptsView.collection.path
  else
    store = App.Editor.controller.file.store
    path = App.Editor.controller.file.getParent()

  App.Files.controller.promptForNewFile(store, path).done (file) =>
    if file
      file.set 'text', text

      App.savingOn()
      file.save().then =>
        App.savingOff()
        App.Editor.controller.showFile file
        App.router.showFile file
        App.trigger 'file:created', file # TODO move to file-model

App.on 'file:deleted', (file) ->
  if App.Editor.controller.file.id is file.id
    App.router.showNew()
    App.Editor.controller.newFile()

App.on 'help', ->
  # TODO modal region
  view = new App.Main.HelpView
  $el = $('<div class="modal fade" data-backdrop="false"></div>').appendTo('body').html view.render().el
  $el.modal()
  $el.on 'hidden.bs.modal', ->
    $el.remove()
    $('.modal-backdrop').remove()

window.App = App