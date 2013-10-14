(function() {
  App.module('FileApp', function(FileApp, App, Backbone, Marionette, $, _) {
    var API;
    API = {
      files: function() {
        console.log('yo');
        return App.trigger('app:active', FileApp.view);
      }
    };
    return App.addInitializer(function() {
      var router;
      router = new Marionette.AppRouter({
        controller: API
      });
      router.appRoute('files', 'files');
      console.log('init');
      return FileApp.view = new App.FilesSectionView;
    });
  });

}).call(this);
