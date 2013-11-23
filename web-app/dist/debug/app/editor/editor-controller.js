(function() {
  App.module('EditorApp', function(EditorApp, App, Backbone, Marionette, $, _) {
    return EditorApp.Controller = Marionette.Controller.extend({
      initialize: function(options) {
        this.view = new EditorApp.EditorSectionView;
        this.listenTo(this.view, 'save', this.save);
        return this.listenTo(this.view, 'saveAs', this.saveAs);
      },
      showFile: function(file) {
        App.trigger('file:show', file);
        this.file = file;
        this.view.refresh();
        return this.view.setValue(file.get('text'));
      },
      save: function(text) {
        var _this = this;
        this.file.set('text', text);
        if (this.file.isNew()) {
          return this.saveAs(text);
        } else {
          App.savingOn();
          return this.file.save().then(function() {
            return App.savingOff();
          });
        }
      },
      saveAs: function(text) {
        var _this = this;
        return App.Files.controller.promptForNewFileName().done(function(store, path, name) {
          var file;
          if (store) {
            file = new App.Entities.File({
              text: text,
              name: name,
              path: path
            });
            file.local = store === 'local';
            App.savingOn();
            return file.save().then(function() {
              App.savingOff();
              return App.EditorApp.router.showFile(file);
            });
          }
        });
      },
      isDirty: function() {
        return this.file.get("text") !== this.editor.getValue();
      }
    });
  });

}).call(this);
