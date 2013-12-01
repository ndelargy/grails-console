(function() {
  App.module('Editor', function(Editor, App, Backbone, Marionette, $, _) {
    return Editor.Controller = Marionette.Controller.extend({
      initialize: function(options) {
        var _this = this;
        this.view = new Editor.EditorSectionView;
        this.listenTo(this.view, 'save', this.save);
        this.listenTo(this.view, 'saveAs', this.saveAs);
        return $(window).on("beforeunload", function(event) {
          if (_this.isDirty()) {
            return "You have unsaved changes.";
          }
        });
      },
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
              _this.showFile(file);
              return App.router.showFile(file);
            });
          }
        });
      },
      isDirty: function() {
        return this.file.get('text') !== this.view.getValue();
      }
    });
  });

}).call(this);
