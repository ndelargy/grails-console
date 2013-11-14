App.module 'EditorApp', (EditorApp, App, Backbone, Marionette, $, _) ->

  EditorApp.EditorView = App.ItemView.extend

    template: 'editor/editor'

    events:
      'click button.execute': 'onExecuteClick'
      'click button.save': 'onSaveClick'
      'click button.fork': 'onForkClick'
      'click button.help': 'onHelpClick'

    initialize: ->
      $(window).on "beforeunload", => @onBeforeunload() # TODO unload
      @listenTo App, 'app:editor:execute', @executeCode

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
      @editor.setOption 'theme', App.settings.get('theme')

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

    onSaveClick: ->
      @trigger 'save', @editor.getValue()

    onForkClick: ->
      @trigger 'fork', @editor.getValue()

    onExecuteClick: (event) ->
      event.preventDefault()
#      $(event.currentTarget).blur()
      @executeCode()

    executeCode: ->
      result = new EditorApp.Result
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
      App.trigger 'help'