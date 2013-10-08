(function() {
  (function(App, Backbone, JST) {
    return App.RemoteFilesView = App.ItemView.extend({
      template: 'remote-files',
      attributes: {
        "class": 'remote-files-view'
      },
      events: {
        'click a.name': 'onNameClick',
        'click a.delete': 'onDeleteClick'
      },
      initialize: function() {
        this.listenTo(this.collection, 'all', this.render);
        return this.collection.fetch();
      },
      onNameClick: function(event) {
        var file, fileId;
        event.preventDefault();
        fileId = $(event.currentTarget).closest('li').data("fileId");
        file = this.collection.findWhere({
          id: fileId
        });
        return file.fetch().done(function() {
          return App.router.navigateToRemoteFile(file);
        });
      },
      onDeleteClick: function(event) {
        var file, fileId;
        event.preventDefault();
        fileId = $(event.currentTarget).closest('li').data("fileId");
        file = this.collection.findWhere({
          id: fileId
        });
        if (confirm('Are you sure you want to delete this file?')) {
          return file.destroy();
        }
      },
      serializeData: function() {
        return this.collection.toJSON();
      }
    });
  })(App, Backbone, JST);

}).call(this);
