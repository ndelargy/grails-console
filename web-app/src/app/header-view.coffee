((App, Backbone) ->

  App.HeaderView = Backbone.Marionette.ItemView.extend

    template: 'header'

    attributes:
      class: 'navbar navbar-fixed-top'

    triggers:
      'click button.new': 'new'
      'click button.files': 'files'

    onRender: ->
      new App.SettingsView(el: @$('.dropdown-menu.settings')[0]).render() # TODO move to template

) App, Backbone