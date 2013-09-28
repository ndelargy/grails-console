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
        files = App.localFileStore.list();
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
      onShow: function() {
        return console.log('onShow');
      },
      showEditor: function(file) {
        if (!this.editorSectionView.$el.is(':visible')) {
          this.editorSectionView.$el.show();
          this.filesView.$el.hide();
          this.editorSectionView.refresh();
        }
        return this.editorSectionView.editorView.showFile(file);
      },
      showFiles: function() {
        if (!this.filesView.$el.is(':visible')) {
          this.editorSectionView.$el.hide();
          return this.filesView.$el.show();
        }
      }
    });
  })(App, Backbone);

}).call(this);
