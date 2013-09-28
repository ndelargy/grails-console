(function() {
  (function(App, Backbone, JST) {
    var RemoteFileStore;
    App.FileCollectionView = Backbone.View.extend({
      attributes: {
        "class": 'files-view'
      },
      events: {
        'click a.name': 'onNameClick',
        'click a.delete': 'onDeleteClick'
      },
      initialize: function() {
        this.template = JST["file-list"];
        return this.listenTo(this.collection, 'all', function() {
          return this.render();
        });
      },
      render: function() {
        var html;
        html = JST["file-list"]({
          files: this.collection.toJSON()
        });
        this.$el.html(html);
        return this;
      },
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
