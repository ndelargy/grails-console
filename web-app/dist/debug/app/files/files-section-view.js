(function() {
  (function(App, Backbone) {
    return App.FilesSectionView = Backbone.Marionette.Layout.extend({
      template: 'files-section',
      regions: {
        localRegion: '.local',
        remoteRegion: '.remote'
      },
      attributes: {
        'class': 'files-section-view'
      },
      initialize: function() {
        var files;
        files = new App.FileCollection;
        files.store = App.localFileStore;
        this.localFilesView = new App.LocalFilesView({
          collection: files
        });
        return this.remoteFilesView = new App.RemoteFilesView;
      },
      onRender: function() {
        this.localRegion.show(this.localFilesView);
        this.remoteRegion.show(this.remoteFilesView);
        return this.remoteRegion.$el.hide();
      }
    });
  })(App, Backbone);

}).call(this);
