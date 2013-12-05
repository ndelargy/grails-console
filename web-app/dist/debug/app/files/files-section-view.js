(function() {
  App.module('Files', function(Files, App, Backbone, Marionette, $, _) {
    var BaseDir;
    BaseDir = Backbone.Model.extend();
    return Files.FilesSectionView = Marionette.Layout.extend({
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
        var path, store, _ref, _ref1;
        this.saving = options.saving;
        store = (_ref = App.settings.get('files.lastStore')) != null ? _ref : 'local';
        path = (_ref1 = App.settings.get("files." + store + ".lastDir")) != null ? _ref1 : '/';
        this.baseDir = new BaseDir({
          path: path,
          store: store
        });
        this.listenTo(this.baseDir, 'change', this.showCollection);
        this.collection = new App.Entities.FileCollection();
        this.filePathView = new Files.FilePathView({
          model: this.baseDir
        });
        return this.listenTo(this.filePathView, 'path:selected', this.onPathSelected);
      },
      onRender: function() {
        this.filePathRegion.show(this.filePathView);
        this.showCollection();
        return this.$('select[name=store]').val(this.baseDir.get('store'));
      },
      onFileSelected: function(file) {
        var path;
        if (file.get('type') === 'dir') {
          path = file.getAbsolutePath();
          return this.baseDir.set('path', path);
        } else {
          return this.trigger('file:selected', file);
        }
      },
      onPathSelected: function(path) {
        return this.baseDir.set('path', path);
      },
      onSave: function(event) {
        var fileName, path;
        event.preventDefault();
        fileName = this.$('input.file-name').val();
        path = this.baseDir.get('path');
        if (path[path.length - 1] !== '/') {
          path += '/';
        }
        return this.trigger('save', this.store, path, fileName);
      },
      setName: function(name) {
        return this.$('input.file-name').val(name);
      },
      showCollection: function() {
        var path, store,
          _this = this;
        this.storeRegion.show(new Files.LoadingView);
        store = this.baseDir.get('store');
        path = this.baseDir.get('path');
        this.collection.store = store;
        this.collection.path = path;
        this.collection.fetch().done(function() {
          var fileCollectionView;
          fileCollectionView = new Files.FileCollectionView({
            collection: _this.collection
          });
          _this.listenTo(fileCollectionView, 'file:selected', _this.onFileSelected);
          return _this.storeRegion.show(fileCollectionView);
        }).fail(function() {
          return alert('Failed to load remote files.');
        });
        App.settings.set({
          'files.lastStore': store
        });
        return App.settings.set("files." + store + ".lastDir", path).save();
      },
      onStoreChange: function(event) {
        var path, store, _ref;
        store = this.$(event.currentTarget).val();
        path = (_ref = App.settings.get("files." + store + ".lastDir")) != null ? _ref : '/';
        return this.baseDir.set({
          store: store,
          path: path
        });
      },
      serializeData: function() {
        return {
          saving: this.saving
        };
      }
    });
  });

}).call(this);
