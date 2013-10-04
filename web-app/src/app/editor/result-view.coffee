((App, Backbone, JST) ->
  App.ResultView = Backbone.View.extend(
    attributes:
      class: "script-result"

    initialize: ->
      @listenTo @model, "change", @render, this
      @template = JST["result"]

    render: ->
      html = undefined
      if @model.get("loading")
        html = "<div class=\"loading\">Executing Script...</div>"
      else
        data =
          totalTime: @model.get("totalTime")
          input: @formattedInput()
          output: @model.get("output")
          result: @model.get("exception") or @model.get("error") or @model.get("result")

        @$el.addClass "stacktrace"  unless @model.isSuccess()
        html = @template(data)
      @$el.html html
      @trigger "render"
      this

    formattedInput: ->
      lines = @model.get("input").trim().split("\n")
      _.map(lines, (line) ->
        "groovy> " + line
      ).join "\n"
  )
) App, Backbone, JST