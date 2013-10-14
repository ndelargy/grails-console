(function() {
  (function(App, Backbone) {
    return App.FileCollection = Backbone.Collection.extend({
      model: function(attrs, options) {
        return new App.File(attrs, options);
      },
      isLocal: true,
      comparator: function(file) {
        return file.get("lastModified") * -1;
      },
      sync: function(method, file, options) {
        return App.localFileStore.sync(method, file, options);
      }
    });
  })(App, Backbone);

}).call(this);
