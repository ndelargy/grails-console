(function() {
  (function(App, Backbone) {
    return App.ResultCollection = Backbone.Collection.extend({
      model: App.Result
    });
  })(App, Backbone);

}).call(this);
