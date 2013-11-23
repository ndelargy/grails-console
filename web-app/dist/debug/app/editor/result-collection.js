(function() {
  App.module('Editor', function(Editor, App, Backbone, Marionette, $, _) {
    return Editor.ResultCollection = Backbone.Collection.extend({
      model: function(attrs, options) {
        return new Editor.Result(attrs, options);
      }
    });
  });

}).call(this);
