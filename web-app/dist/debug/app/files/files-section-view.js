(function() {
  App.module('FileApp', function(FileApp, App, Backbone, Marionette, $, _) {
    var BaseDir;
    BaseDir = Backbone.Model.extend();
    return FileApp.FilesSectionView = Marionette.Layout.extend({
      template: 'files/files-section',
      regions: {
        filePathRegion: '.file-path-region',
        storeRegion: '.store'
      },
      attributes: {
        'class': 'modal-dialog files-section-view'
      },
      events: {
        'change select[name=store]': 'onStoreChange',
        'click button.save': 'onSave'
      },
      initialize: function(options) {
        return this.saving = options.saving;
      },
      onRender: function() {
        var filePathView, store, _ref;
        this.baseDir = new BaseDir({
          path: '/'
        });
        filePathView = new FileApp.FilePathView({
          model: this.baseDir
        });
        this.filePathRegion.show(filePathView);
        this.listenTo(filePathView, 'path:selected', function(path) {
          var collection;
          this.baseDir.set('path', path);
          collection = this.fileCollectionView.collection;
          collection.path = path;
          return collection.fetch({
            reset: true
          });
        });
        store = (_ref = App.settings.get('files.lastStore')) != null ? _ref : 'local';
        this.showStore(store);
        return this.$('select[name=store]').val(store);
      },
      onSave: function(event) {
        var absolutePath;
        event.preventDefault();
        absolutePath = this.baseDir.get('path');
        if (absolutePath[absolutePath.length - 1] !== '/') {
          absolutePath += '/';
        }
        absolutePath += this.$('input.file-name').val();
        return this.trigger('save', this.store, absolutePath);
      },
      showStore: function(store) {
        var path, _ref,
          _this = this;
        this.store = store;
        this.storeRegion.show(new FileApp.LoadingView);
        if (store === 'remote') {
          path = (_ref = App.settings.get('files.remote.lastDir')) != null ? _ref : '/';
        } else {
          path = '/';
        }
        $.when(this.getCollection(store, path)).done(function(collection) {
          _this.fileCollectionView = new FileApp.FileCollectionView({
            collection: collection
          });
          _this.listenTo(_this.fileCollectionView, 'file:selected', function(file) {
            if (file.get('type') === 'dir') {
              path = file.getPath();
              this.baseDir.set('path', path);
              collection.path = path;
              collection.fetch({
                reset: true
              });
              App.settings.set('files.remote.lastDir', path);
              return App.settings.save();
            } else {
              return this.trigger('file:selected', file);
            }
          });
          return _this.storeRegion.show(_this.fileCollectionView);
        }).fail(function() {
          return alert('Failed to load remote files.');
        });
        this.baseDir.set('path', path);
        App.settings.set('files.lastStore', store);
        return App.settings.save();
      },
      onStoreChange: function(event) {
        return this.showStore(this.$(event.currentTarget).val());
      },
      getCollection: function(store, path) {
        var collection;
        collection = void 0;
        if (store === 'local') {
          return collection = App.request('local:file:entities');
        } else {
          return collection = App.request('remote:file:entities', path);
        }
      },
      serializeData: function() {
        return {
          saving: this.saving
        };
      }
    });
  });

}).call(this);
