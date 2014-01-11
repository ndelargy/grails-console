(function() {
  App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
    return Entities.File = Backbone.Model.extend({
      defaults: {
        text: ''
      },
      getAbsolutePath: function() {
        return this.id;
      },
      getParent: function() {
        var parent, tokens;
        tokens = this.id.split('/');
        parent = tokens.slice(0, tokens.length - 1).join('/');
        return parent;
      },
      isDirectory: function() {
        return this.get('type') === 'dir';
      },
      isFile: function() {
        return this.get('type') === 'file';
      },
      sync: function(method, file, options) {
        var url;
        if (file.store === 'local') {
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
