(function() {
  App.module('EditorApp', function(EditorApp, App, Backbone, Marionette, $, _) {
    return EditorApp.Result = Backbone.Model.extend({
      isSuccess: function() {
        return !this.get("exception") && !this.get("error");
      }
    });
  });

}).call(this);
