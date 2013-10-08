(function() {
  (function(App, Backbone) {
    return App.File = Backbone.Model.extend({
      isLocal: function() {
        var _ref;
        return this.local === true || ((_ref = this.collection) != null ? _ref.isLocal : void 0) === true;
      },
      sync: function(method, file, options) {
        var url;
        if (file.isLocal()) {
          return App.localFileStore.sync(method, file, options);
        } else {
          url = file.isNew() ? App.createLink('file') : App.createLink('file', {
            path: file.get('id')
          });
          return Backbone.sync(method, file, _.extend({
            url: url
          }, options));
        }
      }
    });
  })(App, Backbone);

}).call(this);
