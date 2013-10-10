(function() {
  (function(App, Backbone) {
    return App.File = Backbone.Model.extend({
      defaults: {
        text: ''
      },
      isLocal: function() {
        var _ref;
        return this.local === true || ((_ref = this.collection) != null ? _ref.isLocal : void 0) === true;
      },
      sync: function(method, file, options) {
        var url;
        console.log(arguments);
        if (file.isLocal()) {
          console.log(arguments);
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
