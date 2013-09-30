((App, Backbone) ->

  App.View = Backbone.View.extend

    constructor: ->
      @subviews = []
      Backbone.View::constructor.apply this, arguments

      @listenTo @, 'show', ->
        @onShow()
        view.onShow() for view in @subviews

    initialize: ->

    onShow: ->
      # do my stuff
      # do child stuff

) App, Backbone