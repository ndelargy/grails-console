(function() {
  App.module('FileApp', function(FileApp, App, Backbone, Marionette, $, _) {
    var BaseDir;
    BaseDir = Backbone.Model.extend();
    return FileApp.FilesSectionView = Marionette.Layout.extend({
      template: 'files/files-section',
      regions: {
        filePathRegion: '.file-path-region',
        localRegion: '.local',
        remoteRegion: '.remote'
      },
      attributes: {
        'class': 'modal-dialog files-section-view'
      },
      events: {
        'change select[name=store]': 'onStoreChange'
      },
      initialize: function() {
        this.baseDir = new BaseDir({
          path: '/'
        });
        return this.listenTo(FileApp, 'app:path:selected', function(path) {
          return this.baseDir.set('path', path);
        });
      },
      onRender: function() {
        var dfd, filePathView, localFiles,
          _this = this;
        localFiles = App.request('local:file:entities');
        filePathView = new FileApp.FilePathView({
          model: this.baseDir
        });
        this.filePathRegion.show(filePathView);
        this.localFilesView = new FileApp.LocalFilesView({
          collection: localFiles
        });
        this.localRegion.show(this.localFilesView);
        dfd = App.request('remote:file:entities', '/');
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
      onStoreChange: function(event) {
        if (this.$(event.currentTarget).val() === 'local') {
          this.localRegion.$el.show();
          return this.remoteRegion.$el.hide();
        } else {
          this.localRegion.$el.hide();
          return this.remoteRegion.$el.show();
        }
      }
    });
  });

}).call(this);
