(function() {
  App.module('Files', function(Files, App, Backbone, Marionette, $, _) {
    Files.ScriptsView = Marionette.ItemView.extend({
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
        this.lastPaths = {};
        this.listenTo(this.collection, 'add remove reset', function() {
          return _this.render();
        });
        this.listenTo(App, 'file:opened', function(file) {
          _this.collection.store = file.store;
          _this.collection.path = file.getParent();
          return _this.collection.fetch();
        });
        return this.listenTo(App, 'file:created', function(file) {
          var collection;
          file = App.Editor.controller.file;
          collection = this.collection;
          if (file.getParent() === collection.path && file.store === collection.store) {
            return collection.fetch();
          }
        });
      },
      onNameClick: function(event) {
        var file, fileId, path;
        event.preventDefault();
        fileId = $(event.currentTarget).closest('li').data('fileId');
        file = this.collection.findWhere({
          id: fileId
        });
        if (file.get('type') === 'dir') {
          path = file.getAbsolutePath();
          this.collection.path = path;
          return this.collection.fetch();
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
        var store, _ref;
        event.preventDefault();
        this.lastPaths[this.collection.store] = this.collection.path;
        store = $(event.currentTarget).data('store');
        this.collection.store = store;
        this.collection.path = (_ref = this.lastPaths[this.collection.store]) != null ? _ref : '/';
        return this.collection.fetch();
      },
      onUpClick: function(event) {
        event.preventDefault();
        this.collection.path = this.collection.getParent();
        return this.collection.fetch();
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
            return App.trigger('file:deleted', file);
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
