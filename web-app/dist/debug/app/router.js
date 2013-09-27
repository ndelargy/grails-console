(function() {
  (function(App) {
    return App.Router = Backbone.Router.extend({
      routes: {
        "local/:file": "openLocalFile",
        "remote/*file": "openRemoteFile",
        "new": "newFile",
        "files": "files",
        "*path": "defaultRoute"
      }
    });
  })(App);

}).call(this);
