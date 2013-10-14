(($, _, Backbone, JST, window) ->

  Handlebars.registerHelper "dateFormatTime", (context) ->
    date = new Date(context)
    "#{date.toLocaleDateString()} #{date.toLocaleTimeString()}"

  Marionette.Renderer.render = (template, data) -> JST[template] data



  #  App.addRegions TODO switch to two regions. have subapps fire switch events

  App = new (Backbone.Marionette.Application.extend

    initRouter: ->
      router = new App.Router()
      App.router = router
      App.router.on "route:openLocalFile", (name) =>
        file = App.localFileStore.list().findWhere(name: name)
        unless file
          alert 'no find file' # TODO
          return
        @mainView.showEditor file

      App.router.on "route:openRemoteFile", (name) =>
        file = new App.File
          id: name # TODO search by path
        file.local = false
        file.fetch()
        .done =>
            @mainView.showEditor file
        .fail =>
            alert 'no find file' # TODO parse response?

      App.router.on "route:newFile", =>
        file = new App.File()
        @mainView.showEditor file

      App.router.on "route:defaultRoute", ->
        router.navigate "new", trigger: true

      App.router.on "route:files", =>
        @mainView.showFiles()

    onStart: (data) ->
      headerView = new App.HeaderView().render()
      headerView.on "new", ->
        # TODO check if file needs to be saved
        Backbone.history.navigate "new", trigger: true

      headerView.on "files", ->
        # TODO check if file needs to be saved
        Backbone.history.navigate "files", trigger: true

      headerView.$el.appendTo "body"
      @mainView = new App.MainView(el: $("#main-content")[0]).render()
      @mainView.$el.appendTo "body"
      #      @mainView.refresh()

      #            $(document).on('keydown', 'Ctrl+return', _.bind(this.executeCode, this)); TODO
      #            $(document).on('keydown', 'esc', _.bind(this.clearResults, this)); TODO

      @showTheme()
      App.settings.on "change:theme", @showTheme, this

      $("body").css "visibility", "visible"
      Backbone.history.start(pushState: false) if Backbone?.history

    createLink: (action, params) ->
      link = "#{@data.baseUrl}/console/#{action}"
      if params
        link += '?' + $.param params, true

      link

    showTheme: ->
      theme = App.settings.get("theme")
      $("body").attr "data-theme", theme

    savingOn: -> # TODO
  #      $('.navbar .saving i').addClass('icon-refresh icon-spin').removeClass('icon-ok')
      $('.navbar .saving').fadeIn(100)

    savingOff: ->
  #      $('.navbar .saving i').removeClass('icon-refresh icon-spin').addClass('icon-ok')
      $('.navbar .saving').fadeOut(100)
  )

  App.on 'initialize:before', (options) ->
    App.data = options

    App.settings = new App.Settings
    App.settings.load()

    App.localFileStore = new App.LocalFileStore("gconsole.files")


  window.App = App

) jQuery, _, Backbone, JST, window