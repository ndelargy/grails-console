(function() {
  App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
    return Entities.File = Backbone.Model.extend({
      defaults: {
        text: ''
      },
      isLocal: function() {
        var _ref;
        return this.local === true || ((_ref = this.collection) != null ? _ref.isLocal : void 0) === true;
      },
      getAbsolutePath: function() {
        return this.id;
      },
      getDir: function() {
        return this.get('path');
      },
      getStore: function() {
        if (this.isLocal()) {
          return 'local';
        } else {
          return 'remote';
        }
      },
      sync: function(method, file, options) {
        var url;
        if (file.isLocal()) {
          return Entities.localFileStore.sync(method, file, options);
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
  });

}).call(this);
