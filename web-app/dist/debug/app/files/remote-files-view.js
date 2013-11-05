(function() {
  App.module('FileApp', function(FileApp, App, Backbone, Marionette, $, _) {
    FileApp.RemoteFilesView = Marionette.CompositeView.extend({
      template: 'files/file-list',
      attributes: {
        "class": 'remote-files-view'
      },
      events: {
        'click a.name': 'onNameClick',
        'click a.delete': 'onDeleteClick',
        'blur input[name=path]': 'onPathBlur'
      },
      _initialEvents: function() {
        if (this.collection) {
          this.listenTo(this.collection, 'add', this.addChildView);
          this.listenTo(this.collection, 'remove', this.removeItemView);
          return this.listenTo(this.collection, 'reset', this.render);
        }
      },
      itemViewContainer: 'tbody',
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
        return file.fetch().done(function() {
          return App.trigger('app:file:selected', file);
        });
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
      onPathBlur: function(event) {
        var path;
        path = $(event.currentTarget).val();
        this.collection.path = path;
        return this.collection.fetch({
          reset: true
        });
      },
      serializeData: function() {
        return {
          files: this.collection.toJSON(),
          baseDir: this.collection.path
        };
      }
    });
    Handlebars.registerHelper('fileIcon', function(file, options) {
      var clazz;
      clazz = this.type === 'dir' ? 'icon-folder-close' : 'icon-file';
      return new Handlebars.SafeString("<i class='" + clazz + "'></i>");
    });
    return Handlebars.registerHelper('fileIcon', function(file, options) {
      var clazz;
      clazz = this.type === 'dir' ? 'icon-folder-close' : 'icon-file';
      return new Handlebars.SafeString("<i class='" + clazz + "'></i>");
    });
  });

}).call(this);
