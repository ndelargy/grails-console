(function() {
  App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
    Entities.LocalFileCollection = Backbone.Collection.extend({
      model: function(attrs, options) {
        return new Entities.File(attrs, options);
      },
      isLocal: true,
      comparator: function(file) {
        return file.get('name');
      },
      sync: function(method, file, options) {
        return Entities.localFileStore.sync(method, file, options);
      }
    });
    App.reqres.setHandler('local:file:entities', function() {
      var files;
      files = new Entities.LocalFileCollection(Entities.localFileStore.fetch());
      files.store = Entities.localFileStore;
      files.path = '/';
      return files;
    });
    return App.reqres.setHandler('local:file:entity', function(id) {
      return new Entities.LocalFileCollection(Entities.localFileStore.fetch()).get(id);
    });
  });

}).call(this);
