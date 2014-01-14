(function() {
  App.module('Main', function(Main, App, Backbone, Marionette, $, _) {
    return Main.Router = Backbone.Router.extend({
      initialize: function() {
        this.route('*path', 'newFile');
        this.route('new', 'newFile');
        this.route(/^local:(.*?)$/, 'openLocalFile');
        return this.route(/^remote:(.*?)$/, 'openRemoteFile');
      },
      showFile: function(file) {
        return this.navigate("" + file.store + ":" + file.id);
      },
      showNew: function() {
        return this.navigate('new');
      },
      newFile: function() {
        return App.Editor.controller.newFile();
      },
      openLocalFile: function(name) {
        return App.Editor.controller.openFile('local', name);
      },
      openRemoteFile: function(name) {
        return App.Editor.controller.openFile('remote', name);
      }
    });
  });

}).call(this);