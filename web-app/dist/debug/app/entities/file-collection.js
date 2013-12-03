(function() {
  App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
    Entities.FileCollection = Backbone.Collection.extend({
      model: function(attrs, options) {
        return new Entities.File(attrs, options);
      },
      comparator: function(file) {
        return file.get('name');
      },
      sync: function(method, file, options) {
        var url;
        if (this.local) {
          return Entities.localFileStore.sync(method, file, options);
        } else {
          url = App.createLink('listFiles', {
            path: this.path
          });
          return Backbone.sync(method, file, _.extend({
            url: url
          }, options));
        }
      }
    });
    App.reqres.setHandler('file:entities', function(store, path) {
      var files, local;
      local = store === 'local';
      files = new App.Entities.FileCollection;
      files.local = local;
      files.path = path;
      return files.fetch({
        reset: true
      }).pipe(function() {
        var file, _i, _len, _ref;
        _ref = files.models;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          file = _ref[_i];
          file.local = local;
        }
        return files;
      });
    });
    return App.reqres.setHandler('file:entity', function(store, path) {
      var file;
      file = new Entities.File({
        id: path
      });
      file.local = store === 'local';
      return file.fetch().pipe(function() {
        return file;
      });
    });
  });

}).call(this);
