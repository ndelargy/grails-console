(function() {
  App.module('Editor', function(Editor, App, Backbone, Marionette, $, _) {
    return Editor.Controller = Marionette.Controller.extend({
      initialize: function(options) {
        var _this = this;
        $(window).on("beforeunload", function(event) {
          if (_this.isDirty()) {
            return "You have unsaved changes.";
          }
        });
        this.editorView = new Editor.EditorView();
        this.listenTo(this.editorView, 'execute', function(result) {
          return this.resultCollection.add(result);
        });
        this.listenTo(this.editorView, 'save', this.save);
        this.listenTo(this.editorView, 'saveAs', this.saveAs);
        this.resultCollection = new Editor.ResultCollection();
        this.resultsView = new Editor.ResultCollectionView({
          collection: this.resultCollection
        });
        return this.listenTo(App, 'app:editor:clear', function() {
          return this.resultCollection.reset();
        });
      },
      newFile: function() {
        var file;
        file = new App.Entities.File;
        return this.showFile(file);
      },
      openFile: function(store, name) {
        var dfd,
          _this = this;
        dfd = App.request('file:entity', store, name);
        dfd.done(function(file) {
          _this.showFile(file);
          return App.trigger('file:opened', file);
        });
        return dfd.fail(function() {
          alert('no find file');
          return _this.newFile();
        });
      },
      showFile: function(file) {
        App.trigger('file:show', file);
        this.file = file;
        this.editorView.refresh();
        return this.editorView.setValue(file.get('text'));
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
            file.store = store;
            App.savingOn();
            return file.save().then(function() {
              App.savingOff();
              _this.showFile(file);
              App.router.showFile(file);
              return App.trigger('file:created', _this.file);
            });
          }
        });
      },
      isDirty: function() {
        return this.file.get('text') !== this.editorView.getValue();
      }
    });
  });

}).call(this);
