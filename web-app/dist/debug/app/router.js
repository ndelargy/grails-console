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
      navigateToFile: function(file, options) {
        if (file.isLocal()) {
          return this.navigate("local:" + (file.get('name')), options);
        } else {
          return this.navigate("remote:" + file.id, options);
        }
      },
      navigateToRemoteFile: function(file) {
        return this.navigate("remote:" + (file.get('id')), {
          trigger: true
        });
      }
    });
  })(App);

}).call(this);
