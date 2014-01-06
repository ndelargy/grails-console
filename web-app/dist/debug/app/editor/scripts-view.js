(function() {
  App.module('Editor', function(Editor, App, Backbone, Marionette, $, _) {
    Editor.ScriptsView = Marionette.ItemView.extend({
      template: 'editor/scripts',
      attributes: {
        "class": 'scripts'
      },
      events: {
        'click li a.name': 'onNameClick',
        'click li a.delete': 'onDeleteClick',
        'click .store a': 'onStoreClick',
        'click .up': 'onUpClick'
      },
      initialize: function() {
        var _this = this;
        this.listenTo(App.settings, 'change:results.wrapText', this.setWrap);
        this.listenTo(this, 'itemview:complete', this.scrollToResultView);
        this.listenTo(App, 'app:editor:clear', this.clear);
        this.lastPaths = {};
        this.collection = new App.Entities.FileCollection();
        this.collection.store = 'local';
        this.collection.path = '/';
        this.collection.fetch();
        this.listenTo(App, 'file:opened', function(file) {
          _this.collection.store = file.store;
          _this.collection.path = file.getParent();
          return _this.collection.fetch().done(function() {
            return _this.render();
          });
        });
        return this.listenTo(App, 'file:created', function(file) {
          var collection,
            _this = this;
          file = App.Editor.controller.file;
          collection = this.collection;
          if (file.getParent() === collection.path && file.store === collection.store) {
            return collection.fetch().done(function() {
              return _this.render();
            });
          }
        });
      },
      onNameClick: function(event) {
        var file, fileId, path,
          _this = this;
        event.preventDefault();
        fileId = $(event.currentTarget).closest('li').data('fileId');
        file = this.collection.findWhere({
          id: fileId
        });
        if (file.get('type') === 'dir') {
          path = file.getAbsolutePath();
          this.collection.path = path;
          return this.collection.fetch().done(function() {
            return _this.render();
          });
        } else {
          if (!App.Editor.controller.isDirty() || confirm('Are you sure? You have unsaved changes.')) {
            return file.fetch().done(function() {
              App.Editor.controller.showFile(file);
              return App.router.showFile(file);
            });
          }
        }
      },
      onStoreClick: function(event) {
        var store, _ref,
          _this = this;
        event.preventDefault();
        this.lastPaths[this.collection.store] = this.collection.path;
        store = $(event.currentTarget).data('store');
        this.collection.store = store;
        this.collection.path = (_ref = this.lastPaths[this.collection.store]) != null ? _ref : '/';
        return this.collection.fetch().done(function() {
          return _this.render();
        });
      },
      onUpClick: function(event) {
        var _this = this;
        event.preventDefault();
        this.collection.path = this.collection.getParent();
        return this.collection.fetch().done(function() {
          return _this.render();
        });
      },
      onDeleteClick: function(event) {
        var file, fileId,
          _this = this;
        event.preventDefault();
        fileId = $(event.currentTarget).closest('li').data('fileId');
        file = this.collection.findWhere({
          id: fileId
        });
        if (confirm('Are you sure you want to delete this file?')) {
          return file.destroy().done(function() {
            App.trigger('file:deleted', file);
            return _this.render();
          });
        }
      },
      serializeData: function() {
        var currentDir, tokens;
        tokens = this.collection.path.split('/');
        currentDir = tokens[tokens.length - 1];
        return {
          files: this.collection.toJSON(),
          path: this.collection.path,
          currentDir: currentDir,
          hasUp: this.collection.path.length > 1,
          store: this.collection.store === 'local' ? 'Local Storage' : 'Remote Storage'
        };
      }
    });
    return Handlebars.registerHelper('scriptsFileIcon', function(file, options) {
      var clazz;
      clazz = this.type === 'dir' ? 'fa fa-folder-o' : 'fa fa-file-o';
      return new Handlebars.SafeString("<i class='" + clazz + "'></i>");
    });
  });

}).call(this);
