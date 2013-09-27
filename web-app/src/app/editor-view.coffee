((App, Backbone, CodeMirror, JST) ->

  FileNameView = Backbone.View.extend
    initialize: ->
      html = "<div class=\"pull-right saving\" style=\"display: none\">Saving</div><div class=\"file-name\"></div>"
      @listenTo @model, "change", _.bind(@render, this)
      @$el.html html

    render: ->
      name = @model.get("name") or "&nbsp;"
      @$(".file-name").html name
      this

  App.EditorView = Backbone.View.extend
    events:
      "click button[data-function=\"execute\"]": "executeCode"
      "click button[data-function]": "onButtonClick"
      "click button.save": "save"

    initialize: ->
      $(window).on "beforeunload", _.bind(@onBeforeunload, this) # TODO unload

    onButtonClick: (event) ->
      fcn = $(event.currentTarget).data("function")
      @trigger fcn

    render: ->
      html = JST["editor"]()
      @$el.html html
      @initEditor()
      this

    resize: ->
      @editor.refresh()

    initEditor: ->
      oThis = this
      @editor = CodeMirror.fromTextArea(@$("textarea[name=code]")[0],
        matchBrackets: true
        mode: "groovy"
        lineNumbers: true
        extraKeys: # TODO $(document).trigger passthrough?
          "Ctrl-Enter": ->
            oThis.executeCode()

          Esc: ->
            oThis.trigger "clear"

        theme: "lesser-dark"
      )
      @editor.focus()
      @editor.setValue ""
      App.settings.on "change:theme", @setTheme, this
      @setTheme()

    setTheme: ->
      @editor.setOption "theme", App.settings.get("theme")

    getValue: ->
      @editor.getValue()

    setValue: (value) ->
      @editor.setValue value

    refresh: ->
      @editor.refresh()

    showFile: (file) ->
      @file = file

      #            this.file.on('request', function() {
      #                console.log('request');
      #            });
      #            this.file.on('sync', function() {
      #                console.log('sync');
      #            });
      @fileNameView.remove()  if @fileNameView
      @fileNameView = new FileNameView(model: file)
      @$(".file-name-section").html @fileNameView.render().el
      @editor.setValue @file.get("text")
      @editor.refresh()

    isDirty: ->
      @file.get("text") isnt @editor.getValue()

    save: ->
      unless @file.get("name")
        @prompt "File name", _.bind((name) ->
          @file.set "name", name
          @save()
          App.router.navigate "local/" + name,
            trigger: false

        , this)
      else
        @$(".file-name-section .saving").show()
        @file.set "text", @editor.getValue()
        @file.save()
        @$(".file-name-section .saving").fadeOut()

    prompt: (message, callback) ->
      $("#newFileName").modal "show"
      $("#newFileName").find("button.ok").click (event) -> # TODO once
        value = $("#newFileName").find("input[type=text]").val()
        $("#newFileName").modal "hide"
        callback value

      $("#myModal").on "hidden.bs.modal", ->
        # do something…

    executeCode: ->
      result = new App.Result(
        loading: true
        input: @getValue()
      )
      @trigger "execute", result
      $.post(App.data.baseUrl + "/console/execute",
        code: @getValue()
      ).done((response) ->
        result.set
          loading: false
          totalTime: response.totalTime
          exception: response.exception
          result: response.result
          output: response.output

      ).fail ->
        result.set
          loading: false
          error: "An error occurred."



    onBeforeunload: (event) ->
      "You have unsaved changes."  if @editorView.isDirty()

) App, Backbone, CodeMirror, JST