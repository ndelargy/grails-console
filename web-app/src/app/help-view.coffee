((App, Backbone) ->

  App.HelpView = Backbone.Marionette.ItemView.extend

    template: 'help-modal'

    className: 'modal-dialog'

    serializeData: ->
      implicitVars: App.data.implicitVars

) App, Backbone