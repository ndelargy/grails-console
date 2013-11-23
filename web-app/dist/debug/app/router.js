(function() {
  (function(App, Backbone) {
    return App.Router = Backbone.Router.extend({
      initialize: function() {
        this.route('*path', 'newFile');
        this.route('new', 'newFile');
        this.route(/^local:(.*?)$/, 'openLocalFile');
        return this.route(/^remote:(.*?)$/, 'openRemoteFile');
      },
      showFile: function(file) {
        return this.navigate("" + (file.getStore()) + ":" + file.id);
      },
      newFile: function() {
        return App.EditorApp.controller.newFile();
      },
      openLocalFile: function(name) {
        return App.EditorApp.controller.openLocalFile(name);
      },
      openRemoteFile: function(name) {
        return App.EditorApp.controller.openRemoteFile(name);
      }
    });
  })(App, Backbone);

}).call(this);
