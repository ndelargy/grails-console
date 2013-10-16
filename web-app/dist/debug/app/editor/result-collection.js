(function() {
  App.module('EditorApp', function(EditorApp, App, Backbone, Marionette, $, _) {
    return EditorApp.ResultCollection = Backbone.Collection.extend({
      model: function(attrs, options) {
        return new EditorApp.Result(attrs, options);
      }
    });
  });

}).call(this);
