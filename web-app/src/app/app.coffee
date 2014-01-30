(($, _, Backbone, window) ->

  Handlebars.registerHelper "dateFormatTime", (context) ->
    moment(new Date(context)).format('MMM D, YYYY, h:mm a')

  Marionette.Renderer.render = (template, data) -> JST[template] data

  App = new (Backbone.Marionette.Application.extend

    onStart: (data) ->
      App.headerRegion.show new App.Main.HeaderView

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

      @showTheme()
      App.settings.on 'change:theme', @showTheme, this

      Backbone.history.start(pushState: false) if Backbone?.history
      $('body').css 'visibility', 'visible'  # TODO still have FOUC


    createLink: (action, params) ->
      link = "#{@data.baseUrl}/console/#{action}"
      link += '?' + $.param(params, true) if params
      link

    showTheme: ->
      theme = App.settings.get('theme')
      $('body').attr 'data-theme', theme

    savingOn: -> # TODO events, view
      $('.navbar .saving').fadeIn(100)

    savingOff: ->
      $('.navbar .saving').fadeOut(100)

    handleXhrFail: (jqxhr) ->
      resp = null

      try
        resp = JSON.parse(jqxhr.responseText)
      catch ex

      error = resp?.error ? 'An error occurred.'
      alert error
  )

  App.addRegions 
    headerRegion: '#header'
    mainRegion: '#main-content'

  App.on 'initialize:before', (options) ->
    App.data = options
    App.settings = App.request 'settings:entity'

  App.addInitializer ->
    App.Editor.controller = new App.Editor.Controller
    App.Files.controller = new App.Files.Controller
    App.router = new App.Main.Router()

    scriptsView = App.Files.controller.scriptsView

    contentView = new App.Main.ContentView
      editorView: App.Editor.controller.editorView
      resultsView: App.Editor.controller.resultsView
      scriptsView: App.Files.controller.scriptsView

    App.mainRegion.show contentView
    contentView.refresh()

  App.on 'app:file:new', (file) ->
    if not App.Editor.controller.isDirty() or confirm 'Are you sure? You have unsaved changes.'
      App.router.showNew()
      App.Editor.controller.newFile()

  App.on 'file:deleted', (file) ->
    if App.Editor.controller.file.id is file.id
      App.router.showNew()
      App.Editor.controller.newFile()

  App.on 'file:created', (file) ->
    # TODO file controller
    App.Files.controller.scriptsView.collection.fetchByStoreAndPath file.store, file.getParent()

  App.on 'help', ->
    # TODO modal region
    view = new App.Main.HelpView
    $el = $('<div class="modal fade" data-backdrop="false"></div>').appendTo('body').html view.render().el
    $el.modal()
    $el.on 'hidden.bs.modal', ->
      $el.remove()
      $('.modal-backdrop').remove()

  window.App = App

) jQuery, _, Backbone, window