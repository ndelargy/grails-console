(function() {
  App.module('Files', function(Files, App, Backbone, Marionette, $, _) {
    var showInModal;
    showInModal = function(view) {
      var $el, sizeContent;
      $el = $('<div class="modal" data-backdrop="false"></div>').appendTo('body').html(view.render().el);
      $el.modal({
        show: false
      });
      sizeContent = function() {
        var filesBodyHeight, modalBodyHeight;
        modalBodyHeight = $el.find('.modal-content').height() - $el.find('.modal-header').outerHeight() - $el.find('.modal-footer').outerHeight();
        $el.find('.modal-body').height(modalBodyHeight);
        filesBodyHeight = modalBodyHeight - $el.find('.files-header').outerHeight();
        return $el.find('.files-body').height(filesBodyHeight);
      };
      $el.on('shown.bs.modal', function() {
        return sizeContent();
      });
      $el.find('.modal-content').draggable({
        handle: '.modal-header',
        addClasses: false
      });
      $el.find('.modal-header').css('cursor', 'move');
      $el.find('.modal-content').resizable({
        addClasses: false,
        resize: function(event, ui) {
          return sizeContent();
        },
        stop: function(event, ui) {}
      });
      sizeContent();
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
      promptForNewFileName: function() {
        var dfd, view;
        dfd = $.Deferred();
        view = new Files.FilesSectionView({
          title: 'Save',
          saving: true
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
      },
      promptForFile: function() {
        var dfd, view;
        dfd = $.Deferred();
        view = new Files.FilesSectionView({
          title: 'Open',
          saving: false
        });
        view.on('file:selected', function(file) {
          dfd.resolveWith(null, [file]);
          return view.close();
        });
        view.on('close', function() {
          return dfd.resolve();
        });
        showInModal(view);
        return dfd.promise();
      }
    });
  });

}).call(this);
