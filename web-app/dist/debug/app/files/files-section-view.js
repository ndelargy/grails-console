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
      events: {
        'click a.local-select': 'onLocalClick',
        'click a.remote-select': 'onRemoteClick'
      },
      initialize: function() {
        var files, remoteFiles;
        files = new App.FileCollection;
        files.store = App.localFileStore;
        this.localFilesView = new App.LocalFilesView({
          collection: files
        });
        remoteFiles = new App.RemoteFileCollection;
        return this.remoteFilesView = new App.RemoteFilesView({
          collection: remoteFiles
        });
      },
      onRender: function() {
        this.localRegion.show(this.localFilesView);
        this.remoteRegion.show(this.remoteFilesView);
        return this.remoteRegion.$el.hide();
      },
      onLocalClick: function(event) {
        event.preventDefault();
        this.$(event.currentTarget).closest('ul').find('li').removeClass('active');
        this.$(event.currentTarget).closest('li').addClass('active');
        this.localRegion.$el.show();
        return this.remoteRegion.$el.hide();
      },
      onRemoteClick: function(event) {
        event.preventDefault();
        this.$(event.currentTarget).closest('ul').find('li').removeClass('active');
        this.$(event.currentTarget).closest('li').addClass('active');
        this.localRegion.$el.hide();
        return this.remoteRegion.$el.show();
      }
    });
  })(App, Backbone);

}).call(this);
