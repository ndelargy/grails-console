(function() {
  (function(App, Backbone) {
    return App.MainView = App.View.extend({
      attributes: {
        id: "main-content"
      },
      initialize: function() {
        this.editorSectionView = new App.EditorSectionView();
        this.subviews.push(this.editorSectionView);
        return this.filesSectionView = new App.FilesSectionView;
      },
      render: function() {
        this.editorSectionView.render();
        this.$el.append(this.editorSectionView.$el.hide());
        this.filesSectionView.render();
        this.$el.append(this.filesSectionView.$el.hide());
        return this;
      },
      refresh: function() {
        return this.editorSectionView.refresh();
      },
      onShow: function() {},
      showEditor: function(file) {
        if (!this.editorSectionView.$el.is(':visible')) {
          this.editorSectionView.$el.show();
          this.filesSectionView.$el.hide();
          this.editorSectionView.refresh();
        }
        return this.editorSectionView.showFile(file);
      },
      showFiles: function() {
        this.filesSectionView.render();
        this.filesSectionView.showLocal();
        if (!this.filesSectionView.$el.is(':visible')) {
          this.editorSectionView.$el.hide();
          return this.filesSectionView.$el.show();
        }
      }
    });
  })(App, Backbone);

}).call(this);
