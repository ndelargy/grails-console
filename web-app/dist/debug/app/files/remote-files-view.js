(function() {
  (function(App, Backbone, JST) {
    var RemoteFileStore;
    App.RemoteFilesView = App.ItemView.extend({
      template: 'file-list',
      attributes: {
        "class": 'remote-files-view'
      },
      events: {
        'click a.name': 'onNameClick',
        'click a.delete': 'onDeleteClick'
      },
      initialize: function() {},
      onNameClick: function(event) {
        var file, fileId;
        event.preventDefault();
        fileId = $(event.currentTarget).closest('li').data("fileId");
        file = this.collection.findWhere({
          id: fileId
        });
        return App.router.navigateToFile(file);
      },
      onDeleteClick: function(event) {
        var file, fileId;
        event.preventDefault();
        fileId = $(event.currentTarget).closest('li').data("fileId");
        file = this.collection.findWhere({
          id: fileId
        });
        return file.destroy();
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
