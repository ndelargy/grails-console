App.module 'Editor', (Editor, App, Backbone, Marionette, $, _) ->

  Editor.EditorView = Marionette.ItemView.extend

    template: 'editor/editor'

    events:
      'click button.execute': 'onExecuteClick'
      'click button.new': 'onNewClick'
      'click button.save': 'onSaveClick'
      'click a.save-as': 'onSaveAsClick'

    initialize: ->
      @listenTo App.settings, 'change:theme', @setTheme

    attributes:
      id: 'editor'

    onRender: ->
      @initEditor()

    initEditor: ->
      @editor = CodeMirror.fromTextArea(@$('textarea[name=code]')[0],
        matchBrackets: true
        mode: 'groovy'
        lineNumbers: true
        extraKeys:
          'Ctrl-Enter': -> App.trigger 'app:editor:execute'
          'Cmd-Enter': -> App.trigger 'app:editor:execute'
          'Ctrl-S': -> App.trigger 'app:editor:save'
          'Cmd-S': -> App.trigger 'app:editor:save'
          'Esc': -> App.trigger 'app:editor:clear'
      )
      @editor.focus()
      @editor.setValue ''
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

    onNewClick: (event) ->
      event.preventDefault()
      App.trigger 'app:editor:new'

    onSaveClick: (event) ->
      event.preventDefault()
      App.trigger 'app:editor:save'

    onSaveAsClick: (event) ->
      event.preventDefault()
      App.trigger 'app:editor:saveAs'

    onExecuteClick: (event) ->
      event.preventDefault()
      App.trigger 'app:editor:execute'

    onShow: ->
      @editor.focus()