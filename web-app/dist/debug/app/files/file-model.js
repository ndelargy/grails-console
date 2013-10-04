(function() {
  (function(App, Backbone) {
    return App.File = Backbone.Model.extend({
      sync: function(method, file, options) {
        var store, _ref;
        store = (_ref = this.store) != null ? _ref : this.collection.store;
        return store.sync(method, file, options);
      }
    });
  })(App, Backbone);

}).call(this);
