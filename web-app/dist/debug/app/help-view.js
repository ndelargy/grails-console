(function() {
  (function(App, Backbone) {
    return App.HelpView = Backbone.Marionette.ItemView.extend({
      template: 'help-modal',
      className: 'modal-dialog',
      serializeData: function() {
        return {
          implicitVars: App.data.implicitVars
        };
      }
    });
  })(App, Backbone);

}).call(this);
