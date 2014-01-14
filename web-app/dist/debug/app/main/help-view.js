(function() {
  App.module('Main', function(Main, App, Backbone, Marionette, $, _) {
    return Main.HelpView = Backbone.Marionette.ItemView.extend({
      template: 'main/help-modal',
      className: 'modal-dialog',
      serializeData: function() {
        return {
          implicitVars: App.data.implicitVars
        };
      }
    });
  });

}).call(this);
