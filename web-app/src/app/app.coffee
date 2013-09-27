(($, _, Backbone, JST) ->

  Handlebars.registerHelper "dateFormatTime", (context) ->
    date = new Date(context)
    date.toDateString() + " " + date.toTimeString()

  MainView = Backbone.View.extend(
    attributes:
      id: "main-content"

    initialize: ->
      @editorSectionView = new EditorSectionView({})

    render: ->
      @editorSectionView.render()
      @$el.append @editorSectionView.$el
      this

    refresh: ->
      @editorSectionView.refresh()

    showFile: (file) ->
      @editorSectionView.editorView.showFile file # TODO
  )

  EditorSectionView = Backbone.View.extend(
    attributes:
      class: "full-height"

    initialize: ->
      @template = JST["editor-section"]

    render: ->
      @$el.html @template()
      @initLayout()
      @editorView = new App.EditorView(el: @$("#editor")[0]).render()
      @layout.initContent "center"
      @editorView.resize()
      @resultCollection = new App.ResultCollection()
      @resultsView = new App.ResultCollectionView(collection: @resultCollection).render()
      @listenTo @editorView, "execute", (result) ->
        @resultCollection.add result

      @editorView.on "clear", @clearResults, this
      @showOrientation()
      App.settings.on "change:orientation", @showOrientation, this
      this

    refresh: ->
      @editorView.refresh()
      @layout.resizeAll()
      @showOrientation()

    initLayout: ->
      @layout = @$el.layout(
        center__paneSelector: "#editor"
        center__contentSelector: "#code-wrapper"
        center__onresize: _.bind(->
          @editorView.refresh()
        , this)
        east__paneSelector: ".east"
        east__contentSelector: "#result"
        east__initHidden: App.settings.get("orientation") isnt "vertical"
        east__size: App.settings.get("layout.east.size")
        east__onresize_end: _.bind((name, $el, state, opts) ->
          App.settings.set "layout.east.size", state.size
          App.settings.save()
        , this)
        south__paneSelector: ".south"
        south__contentSelector: "#result"
        south__initHidden: App.settings.get("orientation") isnt "horizontal"
        south__size: App.settings.get("layout.south.size")
        south__onresize_end: _.bind((name, $el, state, opts) ->
          App.settings.set "layout.south.size", state.size
          App.settings.save()
        , this)
        resizable: true
        findNestedContent: true
        fxName: ""
      )

    showOrientation: ->
      orientation = App.settings.get("orientation")
      if orientation is "vertical"
        $(".orientation .vertical").button "toggle"
        $(".east").append @resultsView.el
        @layout.hide "south"
        @layout.show "east"
        @layout.initContent "east"
      else
        $(".orientation .horizontal").button "toggle"
        $(".south").append @resultsView.el
        @layout.hide "east"
        @layout.show "south"
        @layout.initContent "south"
      @editorView.refresh()

    showFile: (file) ->
      @mainView.showFile file

    clearResults: ->
      @resultsView.clear()
  )
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
        App.router.navigate "new",
          trigger: true


      headerView.on "scripts", ->
        App.router.navigate "files",
          trigger: true


      headerView.$el.appendTo "body"
      @mainView = new MainView(el: $("#main-content")[0]).render()
      @mainView.$el.appendTo "body"
      @mainView.refresh()

      #            $(document).on('keydown', 'Ctrl+return', _.bind(this.executeCode, this)); TODO
      #            $(document).on('keydown', 'esc', _.bind(this.clearResults, this)); TODO
      @showTheme()
      App.settings.on "change:theme", @showTheme, this
      $("body").css "visibility", "visible"
      Backbone.history.start pushState: false

    initRouter: ->
      oThis = this
      router = new App.Router()
      App.router = router
      App.router.on "route:openLocalFile", (name) ->
        file = App.localFileStore.list().findWhere(name: name)
        unless file
          console.log "TODO: no file"
        return
        oThis.showFile file

      App.router.on "route:openRemoteFile", (name) ->
        jqxhr = $.get(oThis.data.baseUrl + "/console/loadFile",
          filename: name
        )
        jqxhr.done (response) ->
          file = App.localFileStore.newFile(
            name: name
            text: response.text
          )
          oThis.mainView.showFile file


      App.router.on "route:newFile", ->
        file = App.localFileStore.newFile(text: "")
        oThis.mainView.showFile file

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