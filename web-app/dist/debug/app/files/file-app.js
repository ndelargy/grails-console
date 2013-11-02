(function() {
  App.module('FileApp', function(FileApp, App, Backbone, Marionette, $, _) {
    var API;
    API = {
      files: function() {
        return App.trigger('app:active', FileApp.view);
      }
    };
    return App.addInitializer(function() {
      var $el, view;
      view = new FileApp.FilesSectionView;
      $el = $('<div class="modal fade" data-backdrop="false"></div>').appendTo('body').html(view.render().el);
      $el.modal({
        show: false
      });
      $el.find('.modal-content').resizable();
      App.on('app:file:list', function() {
        return $el.modal('show');
      });
      return App.on('app:file:selected', function(file) {
        return $el.modal('hide');
      });
    });
  });

}).call(this);
