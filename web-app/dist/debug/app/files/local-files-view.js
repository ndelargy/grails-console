(function() {
  App.module('FileApp', function(FileApp, App, Backbone, Marionette, $, _) {
    return FileApp.LocalFilesView = Marionette.CompositeView.extend({
      template: 'files/file-list',
      attributes: {
        "class": 'files-view'
      },
      events: {
        'click a.name': 'onNameClick',
        'click a.delete': 'onDeleteClick'
      },
      itemViewContainer: 'tbody',
      getItemView: function(item) {
        return FileApp.FileView;
      },
      initialize: function() {
        return this.collection.fetch();
      },
      onNameClick: function(event) {
        var file, fileId;
        event.preventDefault();
        fileId = $(event.currentTarget).closest('tr').data('fileId');
        file = this.collection.findWhere({
          id: fileId
        });
        return App.trigger('app:file:selected', file);
      },
      onDeleteClick: function(event) {
        var file, fileId;
        event.preventDefault();
        fileId = $(event.currentTarget).closest('tr').data('fileId');
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
  });

}).call(this);
