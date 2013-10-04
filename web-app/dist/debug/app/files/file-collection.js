(function() {
  (function(App, Backbone) {
    return App.FileCollection = Backbone.Collection.extend({
      model: App.File,
      comparator: function(file) {
        return file.get("lastModified") * -1;
      },
      sync: function(method, file, options) {
        return this.store.sync(method, file, options);
      }
    });
  })(App, Backbone);

}).call(this);
