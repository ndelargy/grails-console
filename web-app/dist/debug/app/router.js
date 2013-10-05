(function() {
  (function(App) {
    return App.Router = Backbone.Router.extend({
      routes: {
        "local/:file": "openLocalFile",
        "remote/*file": "openRemoteFile",
        "new": "newFile",
        "files": "files",
        "*path": "defaultRoute"
      },
      navigateToFile: function(file) {
        return this.navigate("local/" + (file.get('name')), {
          trigger: true
        });
      },
      navigateToRemoteFile: function(file) {
        return this.navigate("remote/" + (file.get('name')), {
          trigger: true
        });
      }
    });
  })(App);

}).call(this);
