(function() {
  (function(App, Backbone) {
    return App.MainView = App.View.extend({
      attributes: {
        id: "main-content"
      },
      initialize: function() {
        var files;
        this.editorSectionView = new App.EditorSectionView();
        this.subviews.push(this.editorSectionView);
        files = new App.FileCollection;
        files.store = App.localFileStore;
        return this.filesView = new App.FileCollectionView({
          collection: files
        });
      },
      render: function() {
        this.editorSectionView.render();
        this.$el.append(this.editorSectionView.$el.hide());
        this.filesView.render();
        this.$el.append(this.filesView.$el.hide());
        return this;
      },
      refresh: function() {
        return this.editorSectionView.refresh();
      },
      onShow: function() {},
      showEditor: function(file) {
        if (!this.editorSectionView.$el.is(':visible')) {
          this.editorSectionView.$el.show();
          this.filesView.$el.hide();
          this.editorSectionView.refresh();
        }
        return this.editorSectionView.showFile(file);
      },
      showFiles: function() {
        this.filesView.collection.fetch();
        this.filesView.render();
        if (!this.filesView.$el.is(':visible')) {
          this.editorSectionView.$el.hide();
          return this.filesView.$el.show();
        }
      }
    });
  })(App, Backbone);

}).call(this);
