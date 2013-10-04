(function() {
  (function(App, Backbone) {
    return App.Result = Backbone.Model.extend({
      isSuccess: function() {
        return !this.get("exception") && !this.get("error");
      }
    });
  })(App, Backbone);

}).call(this);
