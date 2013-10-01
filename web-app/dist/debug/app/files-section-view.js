(function() {
  (function(App, Backbone, JST) {
    return App.FilesSectionView = Backbone.View.extend({
      attributes: {
        "class": 'files-section-view'
      },
      events: {
        'click a.name': 'onNameClick'
      },
      initialize: function() {
        var files;
        this.template = JST["files-section"];
        files = new App.FileCollection;
        files.store = App.localFileStore;
        return this.localFilesView = new App.LocalFilesView({
          collection: files
        });
      },
      render: function() {
        this.$el.html(this.template());
        this.localFilesView.render();
        this.$el.append(this.localFilesView.$el.hide());
        return this;
      },
      showLocal: function() {
        return this.localFilesView.$el.show();
      },
      showRemote: function() {}
    });
  })(App, Backbone, JST);

}).call(this);
