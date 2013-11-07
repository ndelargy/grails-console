(function() {
  App.module('FileApp', function(FileApp, App, Backbone, Marionette, $, _) {
    FileApp.FileCollectionView = Marionette.CompositeView.extend({
      template: 'files/file-list',
      attributes: {
        "class": 'remote-files-view'
      },
      events: {
        'click a.name': 'onNameClick',
        'click a.delete': 'onDeleteClick'
      },
      _initialEvents: function() {
        if (this.collection) {
          this.listenTo(this.collection, 'add', this.addChildView);
          this.listenTo(this.collection, 'remove', this.removeItemView);
          return this.listenTo(this.collection, 'reset', this.render);
        }
      },
      itemViewContainer: 'tbody',
      initialize: function() {
        return this.listenTo(FileApp, 'app:path:selected', function(path) {
          if (this.$el.is(':visible')) {
            this.collection.path = path;
            return this.collection.fetch({
              reset: true
            });
          }
        });
      },
      getItemView: function(item) {
        return FileApp.FileView;
      },
      onNameClick: function(event) {
        var file, fileId;
        event.preventDefault();
        fileId = $(event.currentTarget).closest('tr').data("fileId");
        file = this.collection.findWhere({
          id: fileId
        });
        if (file.get('type') === 'dir') {
          return FileApp.trigger('app:path:selected', file.getPath());
        } else {
          return file.fetch().done(function() {
            return App.trigger('app:file:selected', file);
          });
        }
      },
      onDeleteClick: function(event) {
        var file, fileId;
        event.preventDefault();
        fileId = $(event.currentTarget).closest('tr').data("fileId");
        file = this.collection.findWhere({
          id: fileId
        });
        if (confirm('Are you sure you want to delete this file?')) {
          return file.destroy();
        }
      },
      serializeData: function() {
        return {
          files: this.collection.toJSON()
        };
      }
    });
    return Handlebars.registerHelper('fileIcon', function(file, options) {
      var clazz;
      clazz = this.type === 'dir' ? 'icon-folder-close' : 'icon-file';
      return new Handlebars.SafeString("<i class='" + clazz + "'></i>");
    });
  });

}).call(this);
