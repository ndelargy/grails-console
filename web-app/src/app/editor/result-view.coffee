App.module 'EditorApp', (EditorApp, App, Backbone, Marionette, $, _) ->

  EditorApp.ResultView = Marionette.ItemView.extend
  
    template: 'editor/result'

    attributes:
      class: 'script-result'

    modelEvents:
      change: 'render'

    onRender: ->
      unless @model.get('loading')
        @$el.addClass 'stacktrace' unless @model.isSuccess()
        @trigger 'complete'

    serializeData: ->
      loading: @model.get('loading')
      totalTime: @model.get('totalTime')
      input: @formattedInput()
      output: @formattedOutput()
      result: @model.get('exception') or @model.get('error') or @model.get('result')

    formattedInput: ->
      lines = @model.get('input').trim().split('\n')
      _.map(lines, (line) ->
        '> ' + line
      ).join '\n'
    formattedOutput: ->
      lines = @model.get('output')?.trim()?.split('\n')
      _.map(lines, (line) ->
        '  ' + line
      ).join '\n'