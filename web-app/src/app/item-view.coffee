((App, Backbone) ->

  App.ItemView = Backbone.Marionette.ItemView.extend

    constructor: ->
      @subviews = []
      Marionette.ItemView::constructor.apply @, arguments

      @listenTo @, 'show', ->
        @onShow()
        view.onShow() for view in @subviews

    initialize: ->


    render: ->
      @isClosed = false
      @triggerMethod "before:render", @
      @triggerMethod "item:before:render", @
      data = @serializeData()
      data = @mixinTemplateHelpers data
      html = @renderHtml data
      @$el.html html
      @bindUIElements()
      @triggerMethod "render", @
      @triggerMethod "item:rendered", @

      @

    renderHtml: (data) ->
      template = @getTemplate()
      Marionette.Renderer.render template, data

    onShow: ->
      # do my stuff
      # do child stuff

    log: (string) ->
      console?.log "#{@cid}: #{string}"

) App, Backbone