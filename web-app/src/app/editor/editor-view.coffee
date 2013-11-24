App.module 'Editor', (Editor, App, Backbone, Marionette, $, _) ->

  Editor.EditorView = Marionette.ItemView.extend

    template: 'editor/editor'

    events:
      'click button.execute': 'onExecuteClick'
      'click button.new': 'onNewClick'
      'click button.files': 'onFilesClick'
      'click button.save': 'onSaveClick'
      'click a.save-as': 'onSaveAsClick'

    initialize: ->
      $(window).on "beforeunload", => @onBeforeunload() # TODO unload
      @listenTo App, 'app:editor:execute', @executeCode

    attributes:
      id: 'editor'

    onRender: ->
      @initEditor()

    onNewClick: (event) ->
      event.preventDefault()
      App.trigger 'app:file:new'

    onFilesClick: (event) ->
      event.preventDefault()
      App.trigger 'app:file:list'

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

    onSaveAsClick: (event) ->
      event.preventDefault()
      @trigger 'saveAs', @editor.getValue()

    onExecuteClick: (event) ->
      event.preventDefault()
#      $(event.currentTarget).blur()
      @executeCode()

    executeCode: ->
      result = new Editor.Result
        loading: true
        input: @getValue()

      @trigger "execute", result
      jqxhr = $.post App.createLink('execute'), code: @getValue()

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