(function() {
  App.module('FileApp', function(FileApp, App, Backbone, Marionette, $, _) {
    return FileApp.FilesSectionView = Marionette.Layout.extend({
      template: 'files/files-section',
      regions: {
        localRegion: '.local',
        remoteRegion: '.remote'
      },
      attributes: {
        'class': 'modal-dialog files-section-view'
      },
      events: {
        'click a.local-select': 'onLocalClick',
        'click a.remote-select': 'onRemoteClick'
      },
      onRender: function() {
        var dfd, localFiles,
          _this = this;
        localFiles = App.request('local:file:entities');
        this.localFilesView = new FileApp.LocalFilesView({
          collection: localFiles
        });
        this.localRegion.show(this.localFilesView);
        dfd = App.request('remote:file:entities');
        dfd.done(function(remoteFiles) {
          _this.remoteFilesView = new FileApp.RemoteFilesView({
            collection: remoteFiles
          });
          _this.remoteRegion.show(_this.remoteFilesView);
          return _this.remoteRegion.$el.hide();
        });
        return dfd.fail(function() {
          return alert('Failed to load remote files.');
        });
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
  });

}).call(this);
