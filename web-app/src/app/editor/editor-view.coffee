((App, Backbone, CodeMirror, JST) ->

  FileNameView = App.ItemView.extend
    initialize: ->
      html = '<div class="pull-right saving" style="display: none">Saving</div><div class="file-name"></div>'
      @listenTo @model, "change", @render
      @$el.html html

    render: ->
      name = @model.get("name") or "&nbsp;"
      @$(".file-name").html name
      @

  App.EditorView = App.ItemView.extend

    template: 'editor'

    events:
      'click button[data-function=execute]': "executeCode"
      'click button[data-function]': "onButtonClick"
      'click button.save': "save"
      'click button.help': "onHelpClick"

    initialize: ->
      $(window).on "beforeunload", => @onBeforeunload() # TODO unload

    onButtonClick: (event) ->
      fcn = $(event.currentTarget).data("function")
      @trigger fcn

    onRender: ->
      @initEditor()

    resize: ->
      @editor.refresh()

    initEditor: ->
      @editor = CodeMirror.fromTextArea(@$("textarea[name=code]")[0],
        matchBrackets: true
        mode: "groovy"
        lineNumbers: true
        extraKeys: # TODO $(document).trigger passthrough?
          'Ctrl-Enter': =>
            @executeCode()
          'Esc': =>
            @trigger "clear"

        theme: "lesser-dark"
      )
      @editor.focus()
      @editor.setValue ""
      @listenTo App.settings, 'change:theme', @setTheme
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
      @fileNameView.remove()  if @fileNameView
      @fileNameView = new FileNameView(model: file)
      @$(".file-name-section").html @fileNameView.render().el
      @editor.setValue @file.get("text")
      @editor.refresh()
      @editor.focus()

    isDirty: ->
      @file.get("text") isnt @editor.getValue()

    save: ->
      if @file.isNew()
        @prompt (name) =>
          # TODO store
          @file.set "name", name
          @save()
          App.router.navigate "local/#{name}", trigger: false
      else
        @$(".file-name-section .saving").show()
        @file.set "text", @editor.getValue()
        @file.save()
        @$(".file-name-section .saving").fadeOut()

    prompt: (callback) ->
      $el = $(JST['save-new-file-modal']()) #TODO modal region?
      $el.modal()
      $el.find("button.ok").click (event) ->
        value = $el.find("input[type=text]").val()
        $el.modal "hide"
        callback value

      $el.on 'hidden.bs.modal', ->
        $el.remove()
        $('.modal-backdrop').remove()

    executeCode: ->
      result = new App.Result
        loading: true
        input: @getValue()

      @trigger "execute", result
      jqxhr = $.post "#{App.data.baseUrl}/console/execute", code: @getValue() # TODO App.createLink

      jqxhr.done (response) ->
        result.set
          loading: false
          totalTime: response.totalTime
          exception: response.exception
          result: response.result
          output: response.output

      jqxhr.fail ->
        result.set
          loading: false
          error: "An error occurred."

    onBeforeunload: (event) ->
      "You have unsaved changes." if @editorView.isDirty()

    onShow: ->
      @editor.focus()

    onHelpClick: (event) ->
      event.preventDefault()
      $el = $(JST['help-modal']())
      $el.modal()
      $el.on 'hidden.bs.modal', ->
        $el.remove()
        $('.modal-backdrop').remove()


) App, Backbone, CodeMirror, JST