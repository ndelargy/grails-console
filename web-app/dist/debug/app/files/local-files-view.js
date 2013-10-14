(function() {
  (function(App, Backbone, JST) {
    var RemoteFileStore;
    App.LocalFilesView = Backbone.Marionette.ItemView.extend({
      template: 'file-list',
      attributes: {
        "class": 'files-view'
      },
      events: {
        'click a.name': 'onNameClick',
        'click a.delete': 'onDeleteClick'
      },
      initialize: function() {
        this.listenTo(this.collection, 'all', this.render);
        return this.collection.fetch();
      },
      onBeforeRender: function() {},
      onNameClick: function(event) {
        var file, fileId;
        event.preventDefault();
        fileId = $(event.currentTarget).closest('tr').data("fileId");
        file = this.collection.findWhere({
          id: fileId
        });
        return App.trigger('app:file:selected', file);
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
    RemoteFileStore = function() {};
    return _.extend(RemoteFileStore.prototype, {
      listFiles: function() {
        return $.get("xxx/listFiles");
      },
      getFileText: function(name) {
        return $.get("xxx/getFileText");
      },
      saveFile: function(file) {
        return $.get("xxx/saveFile");
      }
    });
  })(App, Backbone, JST);

}).call(this);
