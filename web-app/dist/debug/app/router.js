(function() {
  (function(App) {
    return App.Router = Backbone.Router.extend({
      routes: {
        "new": "newFile",
        "files": "files",
        "*path": "defaultRoute"
      },
      initialize: function() {
        this.route(/^local:(.*?)$/, 'openLocalFile');
        return this.route(/^remote:(.*?)$/, 'openRemoteFile');
      },
      navigateToFile: function(file) {
        return this.navigate("local:" + (file.get('name')), {
          trigger: true
        });
      },
      navigateToRemoteFile: function(file) {
        return this.navigate("remote:" + (file.get('id')), {
          trigger: true
        });
      }
    });
  })(App);

}).call(this);
