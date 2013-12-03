(function() {
  App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
    return Entities.File = Backbone.Model.extend({
      defaults: {
        text: ''
      },
      getAbsolutePath: function() {
        return this.id;
      },
      getDir: function() {
        return this.get('path');
      },
      getStore: function() {
        if (this.local) {
          return 'local';
        } else {
          return 'remote';
        }
      },
      sync: function(method, file, options) {
        var url;
        if (file.local) {
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
