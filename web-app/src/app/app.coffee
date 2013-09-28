(($, _, Backbone, JST) ->

  Handlebars.registerHelper "dateFormatTime", (context) ->
    date = new Date(context)
    date.toDateString() + " " + date.toTimeString()


  window.App = (
    start: (data) ->
      @data = data

      App.settings = new App.Settings
      App.settings.load()

      App.localFileStore = new App.LocalFileStore("gconsole.files")
      @initRouter()

      headerView = new App.HeaderView().render()
      headerView.on "new", ->

        # TODO check if file needs to be saved
        App.router.navigate "new", trigger: true

      headerView.on "scripts", ->
        App.router.navigate "files", trigger: true

      headerView.$el.appendTo "body"
      @mainView = new App.MainView(el: $("#main-content")[0]).render()
      @mainView.$el.appendTo "body"
      @mainView.refresh()

      #            $(document).on('keydown', 'Ctrl+return', _.bind(this.executeCode, this)); TODO
      #            $(document).on('keydown', 'esc', _.bind(this.clearResults, this)); TODO
      @showTheme()
      App.settings.on "change:theme", @showTheme, this
      $("body").css "visibility", "visible"
      Backbone.history.start pushState: false

    initRouter: ->
      router = new App.Router()
      App.router = router
      App.router.on "route:openLocalFile", (name) =>
        file = App.localFileStore.list().findWhere(name: name)
        unless file
          console.log "TODO: no file"
          return
        @mainView.showFile file

      App.router.on "route:openRemoteFile", (name) =>
        jqxhr = $.get(@data.baseUrl + "/console/loadFile",
          filename: name
        )
        jqxhr.done (response) ->
          file = App.localFileStore.newFile(
            name: name
            text: response.text
          )
          @mainView.showFile file


      App.router.on "route:newFile", =>
        file = App.localFileStore.newFile(text: "")
        @mainView.showFile file

      App.router.on "route:defaultRoute", ->
        console.log "TODO: grab the last file."
        router.navigate "new",
          trigger: true


      App.router.on "route:files", ->
        files = App.localFileStore.list()
        view = new App.FileCollectionView(collection: files).render()
        $("#main-content").html view.$el # TODO switcher


    showTheme: ->
      theme = App.settings.get("theme")
      $("body").attr "data-theme", theme
  )


  remoteFileStore =
    load: (fileName) ->
      jqxhr = $.get(gconsole.data.baseUrl + "/console/loadFile",
        filename: fileName
      )
      jqxhr.done (response) ->
        file = new File(fileName, response.text)
        gconsole.showFile file


    save: (file) ->
      @lastModified = new Date()
      localStorage.setItem "file." + file.name, JSON.stringify(file)

) jQuery, _, Backbone, JST