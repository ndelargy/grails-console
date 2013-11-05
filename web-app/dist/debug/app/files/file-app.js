(function() {
  App.module('FileApp', function(FileApp, App, Backbone, Marionette, $, _) {
    var API, view;
    view = void 0;
    API = {
      files: function() {
        return App.trigger('app:active', FileApp.view);
      }
    };
    return App.addInitializer(function() {
      var $el, sizeContent;
      view = new FileApp.FilesSectionView;
      $el = $('<div class="modal fade" data-backdrop="false"></div>').appendTo('body').html(view.render().el);
      $el.modal({
        show: false
      });
      sizeContent = function() {
        var h;
        h = $el.find('.modal-content').height() - $el.find('.modal-header').outerHeight() - $el.find('.modal-footer').outerHeight();
        $el.find('.modal-body').height(h);
        return App.DomUtils.sizeToFitVertical($el.find('.store'), $el.find('.modal-body')[0]);
      };
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
      App.on('app:file:list', function() {
        return $el.modal('show');
      });
      return App.on('app:file:selected', function(file) {
        return $el.modal('hide');
      });
    });
  });

}).call(this);
