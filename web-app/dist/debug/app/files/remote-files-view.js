(function() {
  App.module('FileApp', function(FileApp, App, Backbone, Marionette, $, _) {
    return FileApp.RemoteFilesView = Marionette.CompositeView.extend({
      template: 'files/remote-files',
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
      serializeData: function() {
        return {
          files: this.collection.toJSON(),
          baseDir: App.data.baseDir
        };
      }
    });
  });

}).call(this);
