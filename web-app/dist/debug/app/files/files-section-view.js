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
        'click button.save': 'onSave'
      },
      initialize: function(options) {
        this.baseDir = new BaseDir();
        this.listenTo(this.baseDir, 'change', this.showCollection);
        this.collection = new App.Entities.FileCollection();
        this.collection.store = options.store;
        this.collection.path = options.path;
        this.collection.fetch();
        this.scriptsView = new Files.ScriptsView({
          collection: this.collection
        });
        return this.listenTo(this.scriptsView, 'render', this.resize);
      },
      onRender: function() {
        return this.storeRegion.show(this.scriptsView);
      },
      onFileSelected: function(file) {
        var path;
        if (file.isDirectory()) {
          path = file.getAbsolutePath();
          return this.baseDir.set('path', path);
        } else {
          return this.trigger('file:selected', file);
        }
      },
      resize: function() {
        var filesBodyHeight, filesWrapperHeight, modalBodyHeight;
        if (this.$el.is(':visible')) {
          modalBodyHeight = this.$('.modal-content').height() - this.$('.modal-header').outerHeight() - this.$('.modal-footer').outerHeight();
          this.$('.modal-body').height(modalBodyHeight);
          filesBodyHeight = modalBodyHeight - this.$('.files-header').outerHeight();
          this.$('.files-body').height(filesBodyHeight);
          this.$('.files-body div.store').height(filesBodyHeight);
          this.$('.files-body div.store .scripts').height(filesBodyHeight);
          filesWrapperHeight = filesBodyHeight - this.$('.files-body div.store .scripts > .btn-toolbar').outerHeight() - this.$('.files-body div.store .scripts > .folder').outerHeight();
          return this.$('.files-body div.store .scripts > .files-wrapper').height(filesWrapperHeight);
        }
      },
      onSave: function(event) {
        var fileName, path, store;
        event.preventDefault();
        fileName = this.$('input.file-name').val();
        store = this.collection.store;
        path = this.collection.path;
        if (path[path.length - 1] !== '/') {
          path += '/';
        }
        return this.trigger('save', store, path, fileName);
      },
      setName: function(name) {
        return this.$('input.file-name').val(name);
      },
      showCollection: function() {
        var _this = this;
        this.storeRegion.show(new Files.LoadingView);
        this.collection.store = store;
        this.collection.path = path;
        return this.collection.fetch().done(function() {
          var fileCollectionView;
          fileCollectionView = new Files.FileCollectionView({
            collection: _this.collection
          });
          _this.listenTo(fileCollectionView, 'file:selected', _this.onFileSelected);
          return _this.storeRegion.show(fileCollectionView);
        }).fail(function() {
          return alert('Failed to load remote files.');
        });
      }
    });
  });

}).call(this);
