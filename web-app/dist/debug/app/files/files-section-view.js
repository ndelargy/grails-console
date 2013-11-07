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
        this.baseDir.on('change', function() {
          return console.log('ddd');
        });
        return this.listenTo(FileApp, 'app:path:selected', function(path) {
          return this.baseDir.set('path', path);
        });
      },
      onRender: function() {
        var dfd, filePathView, remotePath, _ref,
          _this = this;
        this.localFiles = App.request('local:file:entities');
        filePathView = new FileApp.FilePathView({
          model: this.baseDir
        });
        this.filePathRegion.show(filePathView);
        this.localFilesView = new FileApp.FileCollectionView({
          collection: this.localFiles
        });
        this.localRegion.show(this.localFilesView);
        remotePath = (_ref = App.settings.get('files.remote.lastDir')) != null ? _ref : '/';
        dfd = App.request('remote:file:entities', remotePath);
        dfd.done(function(remoteFiles) {
          _this.remoteFiles = remoteFiles;
          _this.remoteFilesView = new FileApp.FileCollectionView({
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
          this.remoteRegion.$el.hide();
          console.log('local ' + this.localFiles.path);
          return this.baseDir.set('path', this.localFiles.path);
        } else {
          this.localRegion.$el.hide();
          this.remoteRegion.$el.show();
          console.log('remote ' + this.remoteFiles.path);
          return this.baseDir.set('path', this.remoteFiles.path);
        }
      }
    });
  });

}).call(this);
