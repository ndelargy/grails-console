(function() {
  App.module('FileApp', function(FileApp, App, Backbone, Marionette, $, _) {
    var $el, API, initView, view;
    $el = void 0;
    view = void 0;
    initView = function() {
      var sizeContent;
      view = new FileApp.FilesSectionView;
      $el = $('<div class="modal fade" data-backdrop="false"></div>').appendTo('body').html(view.render().el);
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
      return view;
    };
    API = {
      promptForNewFileName: function() {
        var dfd;
        dfd = $.Deferred();
        if (!view) {
          initView();
        }
        $el.modal('show');
        return dfd;
      },
      promptForFile: function() {
        var dfd;
        dfd = $.Deferred();
        if (!view) {
          initView();
        }
        $el.modal('show');
        return dfd;
      }
    };
    return App.addInitializer(function() {
      App.on('app:file:list', function() {
        if (!view) {
          initView();
        }
        return $el.modal('show');
      });
      return FileApp.on('file:selected', function(file) {
        $el.modal('hide');
        return App.trigger('app:file:selected', file);
      });
    });
  });

}).call(this);
