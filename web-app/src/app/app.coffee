(($, _, Backbone, JST, window) ->

  Handlebars.registerHelper "dateFormatTime", (context) ->
    moment(new Date(context)).format('MMM D, YYYY, h:mm a')

  Marionette.Renderer.render = (template, data) -> JST[template] data

  App = new (Backbone.Marionette.Application.extend

    onStart: (data) ->
      App.headerRegion.show new App.HeaderView

      $(document).bind 'keydown', 'Ctrl+return', -> App.trigger 'app:editor:execute'
      $(document).bind 'keydown', 'esc', -> App.trigger 'app:editor:clear'

      @showTheme()
      App.settings.on 'change:theme', @showTheme, this

      Backbone.history.start(pushState: false) if Backbone?.history
      $('body').css 'visibility', 'visible'  # TODO still have FOUC

    createLink: (action, params) ->
      link = "#{@data.baseUrl}/console/#{action}"
      if params
        link += '?' + $.param params, true

      link

    showTheme: ->
      theme = App.settings.get('theme')
      $('body').attr 'data-theme', theme

    savingOn: -> # TODO events, view
      $('.navbar .saving').fadeIn(100)

    savingOff: ->
      $('.navbar .saving').fadeOut(100)
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
    App.router = new App.Router()

    App.mainRegion.show App.Editor.controller.view

  App.on 'app:file:new', (file) ->
    App.router.showNew()
    App.Editor.controller.newFile()

  App.on 'help', ->
    # TODO modal region
    view = new App.HelpView
    $el = $('<div class="modal fade" data-backdrop="false"></div>').appendTo('body').html view.render().el
    $el.modal()
    $el.on 'hidden.bs.modal', ->
      $el.remove()
      $('.modal-backdrop').remove()

  App.on 'app:file:list', ->
    App.Files.controller.promptForFile()
      .done (file) ->
        if file
          file.fetch().done ->
            App.router.showFile file
            App.Editor.controller.showFile file
      .fail ->
        alert 'Couldnt load file!' # TODO

  window.App = App

) jQuery, _, Backbone, JST, window