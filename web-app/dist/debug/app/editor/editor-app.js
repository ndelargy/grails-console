(function() {
  App.module('EditorApp', function(EditorApp, App, Backbone, Marionette, $, _) {
    var API;
    API = {
      newFile: function() {
        var file;
        file = new App.Entities.File;
        return this.showFile(file);
      },
      openLocalFile: function(name) {
        var file;
        file = App.request('local:file:entity', name);
        if (!file) {
          alert('no find file');
          this.newFile();
          return;
        }
        return this.showFile(file);
      },
      openRemoteFile: function(name) {
        var dfd,
          _this = this;
        dfd = App.request('remote:file:entity', name);
        dfd.done(function(file) {
          return _this.showFile(file);
        });
        return dfd.fail(function() {
          alert('no find file');
          return _this.newFile();
        });
      },
      showFile: function(file) {
        return EditorApp.controller.showFile(file);
      }
    };
    App.addInitializer(function() {
      var Router, router;
      Router = Marionette.AppRouter.extend({
        showFile: function(file) {
          return this.navigate("" + (file.getStore()) + ":" + file.id);
        }
      });
      router = new Router({
        controller: API
      });
      router.appRoute('*path', 'newFile');
      router.appRoute('new', 'newFile');
      router.appRoute(/^local:(.*?)$/, 'openLocalFile');
      router.appRoute(/^remote:(.*?)$/, 'openRemoteFile');
      EditorApp.router = router;
      EditorApp.controller = new EditorApp.Controller;
      App.Files.controller = new App.Files.Controller;
      return App.mainRegion.show(EditorApp.controller.view);
    });
    return App.on('app:file:new', function(file) {
      EditorApp.router.navigate("new", {
        trigger: true
      });
      return API.newFile();
    });
  });

}).call(this);
