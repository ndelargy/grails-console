App.module 'EditorApp', (EditorApp, App, Backbone, Marionette, $, _) ->

  EditorApp.ResultView = Marionette.ItemView.extend
  
    template: 'result'

    attributes:
      class: 'script-result'

    modelEvents:
      change: 'render'

    onRender: ->
      @$el.addClass 'stacktrace' unless @model.get('loading') or @model.isSuccess()

    serializeData: ->
      loading: @model.get('loading')
      totalTime: @model.get('totalTime')
      input: @formattedInput()
      output: @model.get('output')
      result: @model.get('exception') or @model.get('error') or @model.get('result')

    formattedInput: ->
      lines = @model.get('input').trim().split('\n')
      _.map(lines, (line) ->
        'groovy> ' + line
      ).join '\n'