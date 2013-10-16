(function() {
  App.module('EditorApp', function(EditorApp, App, Backbone, Marionette, $, _) {
    var API;
    API = {
      newFile: function() {
        var file;
        file = new App.File;
        return this.showFile(file);
      },
      openLocalFile: function(name) {
        var file;
        file = App.localFileStore.list().findWhere({
          name: name
        });
        if (!file) {
          alert('no find file');
          return;
        }
        return this.showFile(file);
      },
      openRemoteFile: function(name) {
        var file,
          _this = this;
        file = new App.File({
          id: name
        });
        file.local = false;
        return file.fetch().done(function() {
          return _this.showFile(file.fail(function() {
            return alert('no find file');
          }));
        });
      },
      showFile: function(file) {
        App.trigger('app:active', EditorApp.controller.view);
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
      EditorApp.router = router;
      return EditorApp.controller = new EditorApp.Controller;
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
