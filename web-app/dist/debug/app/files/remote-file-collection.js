(function() {
  (function(App, Backbone) {
    return App.RemoteFileCollection = Backbone.Collection.extend({
      url: function() {
        return App.createLink('listFiles');
      },
      model: function(attrs, options) {
        return new App.File(attrs, options);
      },
      isLocal: false,
      comparator: function(file) {
        return file.get('lastModified') * -1;
      }
    });
  })(App, Backbone);

}).call(this);
