(function() {
  App.module('EditorApp', function(EditorApp, App, Backbone, Marionette, $, _) {
    return EditorApp.Controller = Marionette.Controller.extend({
      initialize: function(options) {
        this.view = new EditorApp.EditorSectionView;
        this.listenTo(this.view, 'save', this.save);
        return this.listenTo(this.view, 'fork', function(text) {
          this.showFile(new App.FileApp.File({
            text: text
          }));
          return App.router.navigate("new", {
            trigger: false
          });
        });
      },
      showFile: function(file) {
        this.file = file;
        this.view.refresh();
        return this.view.setValue(file.get('text'));
      },
      save: function(text) {
        var _this = this;
        this.file.set("text", text);
        if (this.file.isNew()) {
          return App.FileApp.promptForNewFileName().done(function(store, absolutePath) {
            if (store && absolutePath) {
              _this.file.set('name', absolutePath);
              _this.file.local = store === 'local';
              App.savingOn();
              return _this.file.save().then(function() {
                App.savingOff();
                return App.EditorApp.router.showFile(_this.file);
              });
            }
          });
        } else {
          App.savingOn();
          this.file.save();
          return App.savingOff();
        }
      },
      isDirty: function() {
        return this.file.get("text") !== this.editor.getValue();
      }
    });
  });

}).call(this);
