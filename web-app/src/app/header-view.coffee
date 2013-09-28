((App, Backbone, JST) ->
  App.HeaderView = Backbone.View.extend
    attributes:
      class: "navbar navbar-fixed-top"

    events:
      "click button.new": "onNewClick" # TODO triggers
      "click button.files": "onFilesClick" # TODO triggers

    initialize: ->
      @template = JST.header

    render: ->
      @$el.html @template()
      new App.SettingsView(el: @$(".dropdown-menu.settings")[0]).render() # TODO move to template
      this

    onNewClick: (event) ->
      event.preventDefault()
      @trigger "new"

    onFilesClick: (event) ->
      event.preventDefault()
      @trigger "scripts"

) App, Backbone, JST