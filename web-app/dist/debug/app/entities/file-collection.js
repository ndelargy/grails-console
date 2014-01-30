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
        newPath = '/' + tokens.slice(0, tokens.length - 1).join('/');
        return newPath;
      },
      hasParent: function() {
        var tokens;
        tokens = this.path.split('/');
        return !!(tokens.length > 1 && tokens[1]);
      },
      fetchByStoreAndPath: function(store, path) {
        this.store = store;
        this.path = path;
        this.trigger('fetching');
        return this.fetch({
          reset: true
        });
      },
      up: function() {
        return this.fetchByStoreAndPath(this.store, this.getParent());
      },
      getCurrentDir: function() {
        var path, tokens;
        path = this.path;
        path = path.replace(/^\s+|\s+$/gm, '');
        if (path.slice(-1) === '/') {
          path = path.slice(0, -1);
        }
        tokens = path.split('/');
        return tokens[tokens.length - 1];
      },
      sync: function(method, file, options) {
        var path, url;
        if (this.store === 'local') {
          return Entities.localFileStore.sync(method, file, options);
        } else {
          path = this.path;
          if (path.slice(-1) !== '/') {
            path = path + '/';
          }
          url = App.createLink('listFiles', {
            path: path
          });
          return Backbone.sync(method, file, _.extend({
            url: url
          }, options));
        }
      },
      parse: function(response) {
        if (this.store === 'local') {
          return response;
        } else {
          this.path = response.path;
          return response.files;
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
