(function() {
  (function(App, Backbone) {
    return App.RemoteFileCollection = Backbone.Collection.extend({
      url: function() {
        return App.createLink('listFiles');
      },
      model: App.RemoteFile,
      comparator: function(file) {
        return file.get("lastModified") * -1;
      }
    });
  })(App, Backbone);

}).call(this);
