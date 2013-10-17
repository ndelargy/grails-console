(function() {
  App.module('FileApp', function(FileApp, App, Backbone, Marionette, $, _) {
    var API;
    API = {
      files: function() {
        return App.trigger('app:active', FileApp.view);
      }
    };
    return App.addInitializer(function() {
      var router;
      router = new Marionette.AppRouter({
        controller: API
      });
      router.appRoute('files', 'files');
      return FileApp.view = new FileApp.FilesSectionView;
    });
  });

}).call(this);
