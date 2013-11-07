(function() {
  App.module('FileApp', function(FileApp, App, Backbone, Marionette, $, _) {
    return App.addInitializer(function() {
      var $el, sizeContent, view;
      view = new FileApp.FilesSectionView;
      $el = $('<div class="modal fade" data-backdrop="false"></div>').appendTo('body').html(view.render().el);
      $el.modal({
        show: false
      });
      sizeContent = function() {
        var h;
        h = $el.find('.modal-content').height() - $el.find('.modal-header').outerHeight() - $el.find('.modal-footer').outerHeight();
        $el.find('.modal-body').height(h);
        return App.DomUtils.sizeToFitVertical($el.find('.store .files-page-body'), $el.find('.modal-body')[0]);
      };
      $el.find('.modal-content').draggable({
        handle: '.modal-header',
        addClasses: false
      });
      $el.find('.modal-header').css('cursor', 'move');
      $el.find('.modal-content').resizable({
        addClasses: false,
        resize: function(event, ui) {},
        stop: function(event, ui) {}
      });
      $el.modal('show');
      $el.find('.modal-body').layout({
        north__paneSelector: '.files-header',
        north__spacing_open: 0,
        center__paneSelector: '.files-body',
        center__contentSelector: '.store',
        findNestedContent: true
      });
      $el.modal('hide');
      App.on('app:file:list', function() {
        return $el.modal('show');
      });
      return App.on('app:file:selected', function(file) {
        return $el.modal('hide');
      });
    });
  });

}).call(this);
