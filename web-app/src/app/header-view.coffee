((App, Backbone) ->

  App.HeaderView = Backbone.Marionette.ItemView.extend

    template: 'header'

    attributes:
      class: 'navbar navbar-fixed-top'

    initialize: ->
      @listenTo App, 'file:show', (file) -> # TODO
        console.log 'file:show'
        name = file.get('name')
        if name
          @$('.title').html(file.get('name')).show()
        else
          @$('.title').hide()

    onRender: ->
      new App.SettingsView(el: @$('.dropdown-menu.settings')[0]).render() # TODO move to template

) App, Backbone