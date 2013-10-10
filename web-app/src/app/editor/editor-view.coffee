((App, Backbone, CodeMirror, JST) ->

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
      @editor.setValue ''
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

    setValue: (text) ->
      @editor.setValue text
      @editor.refresh()
      @editor.focus()

    save: ->
      @trigger 'save', @editor.getValue()

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