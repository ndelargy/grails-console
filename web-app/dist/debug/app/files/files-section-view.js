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
        var dfd, filePathView, localPath, remotePath, store, _ref, _ref1,
          _this = this;
        store = (_ref = App.settings.get('files.lastStore')) != null ? _ref : 'local';
        localPath = '/';
        this.localFiles = App.request('local:file:entities');
        filePathView = new FileApp.FilePathView({
          model: this.baseDir
        });
        this.filePathRegion.show(filePathView);
        this.localFilesView = new FileApp.FileCollectionView({
          collection: this.localFiles
        });
        this.localRegion.show(this.localFilesView);
        this.remoteRegion.show(new FileApp.LoadingView);
        this.showStore(store);
        remotePath = (_ref1 = App.settings.get('files.remote.lastDir')) != null ? _ref1 : '/';
        dfd = App.request('remote:file:entities', remotePath);
        dfd.done(function(remoteFiles) {
          _this.remoteFiles = remoteFiles;
          _this.remoteFilesView = new FileApp.FileCollectionView({
            collection: remoteFiles
          });
          return _this.remoteRegion.show(_this.remoteFilesView);
        });
        dfd.fail(function() {
          return alert('Failed to load remote files.');
        });
        if (store === 'remote') {
          this.baseDir.set('path', remotePath);
        } else {
          this.baseDir.set('path', localPath);
        }
        return this.$('select[name=store]').val(store);
      },
      showStore: function(store) {
        if (store === 'local') {
          this.localRegion.$el.show();
          this.remoteRegion.$el.hide();
          if (this.localFiles) {
            this.baseDir.set('path', this.localFiles.path);
          }
        } else {
          this.localRegion.$el.hide();
          this.remoteRegion.$el.show();
          if (this.remoteFiles) {
            this.baseDir.set('path', this.remoteFiles.path);
          }
        }
        App.settings.set('files.lastStore', store);
        return App.settings.save();
      },
      onStoreChange: function(event) {
        return this.showStore(this.$(event.currentTarget).val());
      }
    });
  });

}).call(this);
