(function() {
  (function(App, Backbone) {
    return App.MainView = Backbone.View.extend({
      attributes: {
        id: "main-content"
      },
      initialize: function() {
        return this.editorSectionView = new App.EditorSectionView();
      },
      render: function() {
        this.editorSectionView.render();
        this.$el.append(this.editorSectionView.$el);
        return this;
      },
      refresh: function() {
        return this.editorSectionView.refresh();
      },
      showFile: function(file) {
        return this.editorSectionView.editorView.showFile(file);
      }
    });
  })(App, Backbone);

}).call(this);
