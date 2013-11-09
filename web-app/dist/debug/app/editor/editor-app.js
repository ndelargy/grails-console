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
          return alert('no find file');
        });
      },
      showFile: function(file) {
        return EditorApp.controller.showFile(file);
      }
    };
    App.addInitializer(function() {
      var router;
      router = new Marionette.AppRouter({
        controller: API
      });
      router.appRoute('new', 'newFile');
      router.appRoute(/^local:(.*?)$/, 'openLocalFile');
      router.appRoute(/^remote:(.*?)$/, 'openRemoteFile');
      router.appRoute('*path', 'newFile');
      EditorApp.router = router;
      EditorApp.controller = new EditorApp.Controller;
      return App.mainRegion.show(EditorApp.controller.view);
    });
    App.on('app:file:selected', function(file) {
      if (file.isLocal()) {
        EditorApp.router.navigate("local:" + (file.get('name')));
      } else {
        EditorApp.router.navigate("remote:" + file.id);
      }
      return API.showFile(file);
    });
    return App.on('app:file:new', function(file) {
      EditorApp.router.navigate("new", {
        trigger: true
      });
      return API.newFile();
    });
  });

}).call(this);
