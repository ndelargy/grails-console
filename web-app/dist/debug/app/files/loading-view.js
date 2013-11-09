(function() {
  App.module('FileApp', function(FileApp, App, Backbone, Marionette, $, _) {
    return FileApp.LoadingView = Marionette.ItemView.extend({
      template: 'files/loading',
      attributes: {
        'class': 'loading-view'
      }
    });
  });

}).call(this);
