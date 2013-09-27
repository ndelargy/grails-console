((App, $) ->

  App.SettingsView = Backbone.View.extend

    events:
      "click .orientation-horizontal": "onOrientationHorizontalClick"
      "click .orientation-vertical": "onOrientationVerticalClick"
      "click .results-wrap": "onResultsWrapClick"
      "click .results-show-script": "onResultsShowScriptClick"
      "click .results-show-stdout": "onResultsShowStdoutClick"
      "click .theme": "onThemeClick"

    initialize: ->
      @model = App.settings
      @listenTo @model, "change", @render, this

    render: ->
      oThis = this

      #            console.log(this.$('.orientation-horizontal'));
      @$(".orientation-horizontal").toggleClass "selected", @model.get("orientation") is "horizontal"
      @$(".orientation-vertical").toggleClass "selected", @model.get("orientation") is "vertical"
      @$(".results-wrap").toggleClass "selected", @model.get("results.wrapText")
      @$(".results-show-script").toggleClass "selected", @model.get("results.showScript")
      @$(".results-show-stdout").toggleClass "selected", @model.get("results.showStdout")
      @$(".results-show-result").toggleClass "selected", @model.get("results.showResult")
      @$(".theme").each (index, el) ->
        $el = $(el)
        $el.toggleClass "selected", oThis.model.get("theme") is $el.data("theme")


    onOrientationHorizontalClick: (event) ->
      event.preventDefault()
      event.stopPropagation()
      @model.set "orientation", "horizontal"
      @model.save()

    onOrientationVerticalClick: (event) ->
      event.preventDefault()
      event.stopPropagation()
      @model.set "orientation", "vertical"
      @model.save()

    onThemeClick: (event) ->
      event.preventDefault()
      event.stopPropagation()
      $el = $(event.currentTarget)
      @model.set "theme", $el.data("theme")
      @model.save()

    onResultsWrapClick: (event) ->
      event.preventDefault()
      event.stopPropagation()
      @model.toggle "results.wrapText"
      @model.save()

    onResultsShowScriptClick: (event) ->
      event.preventDefault()
      event.stopPropagation()
      @model.toggle "results.showScript"
      @model.save()

    onResultsShowStdoutClick: (event) ->
      event.preventDefault()
      event.stopPropagation()
      @model.toggle "results.showStdout"
      @model.save()

    onResultsShowResultClick: (event) ->
      event.preventDefault()
      event.stopPropagation()
      @model.toggle "results.showResult"
      @model.save()

) App, jQuery