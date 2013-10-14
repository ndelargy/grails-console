((App, Backbone) ->

  App.MainView = Backbone.Marionette.Layout.extend

    template: 'main'

    attributes:
      id: 'main-content'

    initialize: ->
      @views = []

      @listenTo App, 'app:active', (view) ->

        if not _.contains(@views, view)
          @$el.append view.render().$el
          @views.push view

        for aview in @views
          aview.$el.hide() if aview isnt view
        view.$el.show()
        view.triggerMethod 'visible'

) App, Backbone