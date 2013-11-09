App.module 'FileApp', (FileApp, App, Backbone, Marionette, $, _) ->

  FileApp.LoadingView = Marionette.ItemView.extend

    template: 'files/loading'

    attributes:
      'class': 'loading-view'