(function() {
  App.module('EditorApp', function(EditorApp, App, Backbone, Marionette, $, _) {
    return EditorApp.Controller = Marionette.Controller.extend({
      initialize: function(options) {
        this.view = new EditorApp.EditorSectionView;
        return this.listenTo(this.view, 'save', this.save);
      },
      showFile: function(file) {
        console.log('showfile ' + file.get('name'));
        App.trigger('file:show', file);
        this.file = file;
        this.view.refresh();
        return this.view.setValue(file.get('text'));
      },
      save: function(text) {
        var _this = this;
        this.file.set("text", text);
        if (this.file.isNew()) {
          return App.FileApp.promptForNewFileName().done(function(store, path, name) {
            if (store) {
              _this.file.set({
                name: name,
                path: path
              });
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
