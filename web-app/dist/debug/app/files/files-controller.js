(function() {
  App.module('Files', function(Files, App, Backbone, Marionette, $, _) {
    var showInModal;
    showInModal = function(view) {
      var $el;
      $el = $('<div class="modal" data-backdrop="false"></div>').appendTo('body').html(view.render().el);
      $el.modal({
        show: false
      });
      $el.on('shown.bs.modal', function() {
        return view.resize();
      });
      $el.find('.modal-content').draggable({
        handle: '.modal-header',
        addClasses: false
      });
      $el.find('.modal-header').css('cursor', 'move');
      $el.find('.modal-content').resizable({
        addClasses: false,
        resize: function(event, ui) {
          return view.resize();
        },
        stop: function(event, ui) {}
      });
      $el.find('.modal-header .close').on('click', function(event) {
        event.preventDefault();
        return view.close();
      });
      $el.find('.modal-footer .cancel').on('click', function(event) {
        event.preventDefault();
        return view.close();
      });
      view.on('close', function() {
        return $el.modal('hide');
      });
      $el.on('hidden.bs.modal', function() {
        return $el.remove();
      });
      $el.modal('show');
      return $el;
    };
    return Files.Controller = Marionette.Controller.extend({
      initialize: function() {
        var _this = this;
        this.collection = new App.Entities.FileCollection();
        this.collection.fetch();
        this.listenTo(App, 'file:opened', function(file) {
          return _this.collection.fetchByStoreAndPath(file.store, file.getParent());
        });
        this.listenTo(App, 'file:created', function(file) {
          var collection;
          file = App.Editor.controller.file;
          collection = this.collection;
          if (file.getParent() === collection.path && file.store === collection.store) {
            return collection.fetch();
          }
        });
        this.scriptsView = new Files.ScriptsView({
          collection: this.collection
        });
        return this.listenTo(this.scriptsView, 'file:selected', function(file) {
          if (!App.Editor.controller.isDirty() || confirm('Are you sure? You have unsaved changes.')) {
            return file.fetch().done(function() {
              App.Editor.controller.showFile(file);
              return App.router.showFile(file);
            });
          }
        });
      },
      promptForNewFileName: function() {
        var dfd, path, store, view;
        dfd = $.Deferred();
        if (App.Editor.controller.file.isNew()) {
          store = App.Files.controller.scriptsView.collection.store;
          path = App.Files.controller.scriptsView.collection.path;
        } else {
          store = App.Editor.controller.file.store;
          path = App.Editor.controller.file.getParent();
        }
        view = new Files.FilesSectionView({
          store: store,
          path: path
        });
        showInModal(view);
        view.$el.find('.file-name').focus();
        view.on('save', function(store, path, name) {
          dfd.resolveWith(null, [store, path, name]);
          return view.close();
        });
        view.on('file:selected', function(file) {
          return view.setName(file.get('name'));
        });
        view.on('close', function() {
          return dfd.resolve();
        });
        return dfd.promise();
      }
    });
  });

}).call(this);
