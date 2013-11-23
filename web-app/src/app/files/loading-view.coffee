App.module 'Files', (Files, App, Backbone, Marionette, $, _) ->

  Files.LoadingView = Marionette.ItemView.extend

    template: 'files/loading'

    attributes:
      'class': 'loading-view'