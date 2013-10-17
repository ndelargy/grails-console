(function() {
  App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
    Entities.RemoteFileCollection = Backbone.Collection.extend({
      url: function() {
        return App.createLink('listFiles');
      },
      model: function(attrs, options) {
        return new Entities.File(attrs, options);
      },
      isLocal: false,
      comparator: function(file) {
        return file.get('lastModified') * -1;
      }
    });
    App.reqres.setHandler('remote:file:entity', function(name) {
      var file;
      file = new Entities.File({
        id: name
      });
      file.local = false;
      return file.fetch().pipe(function() {
        return file;
      });
    });
    return App.reqres.setHandler('remote:file:entities', function(name) {
      var remoteFiles;
      remoteFiles = new App.Entities.RemoteFileCollection;
      return remoteFiles.fetch({
        reset: true
      }).pipe(function() {
        return remoteFiles;
      });
    });
  });

}).call(this);