(function() {
  App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
    Entities.RemoteFileCollection = Backbone.Collection.extend({
      url: function() {
        return App.createLink('listFiles', {
          path: this.path
        });
      },
      model: function(attrs, options) {
        return new Entities.File(attrs, options);
      },
      isLocal: false,
      path: '/',
      comparator: function(file) {
        return file.get('name') * -1;
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
    return App.reqres.setHandler('remote:file:entities', function(path) {
      var remoteFiles;
      remoteFiles = new App.Entities.RemoteFileCollection;
      remoteFiles.path = path;
      return remoteFiles.fetch({
        reset: true
      }).pipe(function() {
        return remoteFiles;
      });
    });
  });

}).call(this);
