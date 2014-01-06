(function() {
  App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
    Entities.FileCollection = Backbone.Collection.extend({
      model: function(attrs, options) {
        var file;
        file = new Entities.File(attrs, options);
        file.store = options.collection.store;
        return file;
      },
      comparator: function(file) {
        return file.get('name');
      },
      store: 'local',
      path: '/',
      getParent: function() {
        var newPath, tokens;
        tokens = this.path.split('/');
        newPath = tokens.slice(0, tokens.length - 1).join('/');
        if (!newPath) {
          newPath = '/';
        }
        return newPath;
      },
      sync: function(method, file, options) {
        var url;
        if (this.store === 'local') {
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
    return App.reqres.setHandler('file:entity', function(store, path) {
      var file;
      file = new Entities.File({
        id: path
      });
      file.store = store;
      return file.fetch().pipe(function() {
        return file;
      });
    });
  });

}).call(this);
