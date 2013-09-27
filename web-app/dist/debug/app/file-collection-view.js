(function() {
  (function(App, Backbone, JST) {
    var RemoteFileStore;
    App.FileCollectionView = Backbone.View.extend({
      attributes: {
        "class": "files-view"
      },
      events: {
        "click tr": "onRowClick"
      },
      initialize: function() {
        return this.template = JST["file-list"];
      },
      render: function() {
        var html;
        html = JST["file-list"]({
          files: this.collection.toJSON()
        });
        this.$el.html(html);
        return this;
      },
      onRowClick: function(event) {
        var $tr, file;
        event.preventDefault();
        $tr = $(event.currentTarget);
        file = this.collection.findWhere({
          id: $tr.data("fileId")
        });
        return this.trigger("select", file);
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
