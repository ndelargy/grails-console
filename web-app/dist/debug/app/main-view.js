(function() {
  (function(App, Backbone) {
    return App.MainView = Backbone.Marionette.Layout.extend({
      template: 'main',
      attributes: {
        id: "main-content"
      },
      regions: {
        editorRegion: '.editor',
        filesRegion: '.files'
      },
      initialize: function() {
        this.editorSectionView = new App.EditorSectionView;
        return this.filesSectionView = new App.FilesSectionView;
      },
      onRender: function() {
        this.editorRegion.show(this.editorSectionView);
        return this.filesRegion.show(this.filesSectionView);
      },
      showEditor: function(file) {
        this.editorRegion.$el.show();
        this.filesRegion.$el.hide();
        this.editorSectionView.refresh();
        return this.editorSectionView.showFile(file);
      },
      showFiles: function() {
        this.editorRegion.$el.hide();
        return this.filesRegion.$el.show();
      }
    });
  })(App, Backbone);

}).call(this);
