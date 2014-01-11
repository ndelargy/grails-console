(function() {
  App.module('Files', function(Files, App, Backbone, Marionette, $, _) {
    Files.ScriptsView = Marionette.ItemView.extend({
      template: 'files/scripts',
      attributes: {
        "class": 'scripts'
      },
      events: {
        'click li .name a': 'onNameClick',
        'click li a.delete': 'onDeleteClick',
        'click ul.store a': 'onStoreClick',
        'click .up': 'onUpClick'
      },
      initialize: function() {
        var _this = this;
        this.lastPaths = {};
        return this.listenTo(this.collection, 'add remove reset', function() {
          return _this.render();
        });
      },
      onNameClick: function(event) {
        var file, fileId, path;
        event.preventDefault();
        fileId = $(event.currentTarget).closest('li').data('fileId');
        file = this.collection.findWhere({
          id: fileId
        });
        if (file.isDirectory()) {
          path = file.getAbsolutePath();
          this.collection.path = path;
          return this.collection.fetch();
        } else {
          return this.trigger('file:selected', file);
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
        console.log("old: " + this.collection.path);
        this.collection.path = this.collection.getParent();
        console.log("new: " + this.collection.path);
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
