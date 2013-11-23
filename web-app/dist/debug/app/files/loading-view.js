(function() {
  App.module('Files', function(Files, App, Backbone, Marionette, $, _) {
    return Files.LoadingView = Marionette.ItemView.extend({
      template: 'files/loading',
      attributes: {
        'class': 'loading-view'
      }
    });
  });

}).call(this);
