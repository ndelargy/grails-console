((App, Backbone) ->

  App.HeaderView = Backbone.Marionette.ItemView.extend

    template: 'header'

    attributes:
      class: 'navbar navbar-fixed-top'

    initialize: ->
      @listenTo App, 'file:show', (file) -> # TODO
        name = file.get('name')
        if name
          @$('.title').html(name).show()
        else
          @$('.title').hide()

    onRender: ->
      @settingsView = new App.SettingsView(model: App.settings)
      @$('.settings-btn-group').append @settingsView.render().$el
      @settingsView.render()

    onClose: ->
      @settingsView.close()

) App, Backbone