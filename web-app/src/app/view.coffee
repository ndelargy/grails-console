((App, Backbone) ->

  App.View = Backbone.View.extend

    constructor: ->
      @subviews = []
      Backbone.View::constructor.apply this, arguments

    initialize: ->

    onShow: ->
      # do my stuff
      # do child stuff

) App, Backbone