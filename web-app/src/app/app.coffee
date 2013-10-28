(($, _, Backbone, JST, window) ->

  Handlebars.registerHelper "dateFormatTime", (context) ->
    date = new Date(context)
    "#{date.toLocaleDateString()} #{date.toLocaleTimeString()}"

  Marionette.Renderer.render = (template, data) -> JST[template] data



  #  App.addRegions TODO switch to two regions.

  App = new (Backbone.Marionette.Application.extend

    onStart: (data) ->
      headerView = new App.HeaderView().render()
      headerView.on "new", ->
        # TODO check if file needs to be saved
        App.trigger 'app:file:new'

      headerView.on "files", ->
        # TODO check if file needs to be saved
        App.trigger 'app:file:list'

      headerView.$el.appendTo "body"
#      mainView = new App.MainView(el: $("#main-content")[0]).render()
#      mainView.$el.appendTo "body"

      #            $(document).on('keydown', 'Ctrl+return', _.bind(this.executeCode, this)); TODO
      #            $(document).on('keydown', 'esc', _.bind(this.clearResults, this)); TODO

      @showTheme()
      App.settings.on "change:theme", @showTheme, this

      Backbone.history.start(pushState: false) if Backbone?.history
      $("body").css "visibility", "visible"  # TODO still have FOUC

    createLink: (action, params) ->
      link = "#{@data.baseUrl}/console/#{action}"
      if params
        link += '?' + $.param params, true

      link

    showTheme: ->
      theme = App.settings.get("theme")
      $("body").attr "data-theme", theme

    savingOn: -> # TODO
      $('.navbar .saving').fadeIn(100)

    savingOff: ->
      $('.navbar .saving').fadeOut(100)
  )

  App.addRegions mainRegion: '#main-content'

  App.on 'initialize:before', (options) ->
    App.data = options
    App.settings = App.request 'settings:entity'

  App.on 'help', ->
    # TODO modal region
    view = new App.HelpView
    $el = $('<div class="modal fade" data-backdrop="false"></div>').appendTo('body').html view.render().el
    $el.modal()
    $el.on 'hidden.bs.modal', ->
      $el.remove()
      $('.modal-backdrop').remove()

  window.App = App

) jQuery, _, Backbone, JST, window