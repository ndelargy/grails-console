((App, Backbone) ->

  App.View = Backbone.View.extend

    constructor: ->
      @subviews = []
      Backbone.View::constructor.apply this, arguments

      @listenTo @, 'show', ->
        console.log('hi')
        @onShow()
        view.onShow() for view in @subviews

    initialize: ->

    onShow: ->
      # do my stuff
      # do child stuff

) App, Backbone