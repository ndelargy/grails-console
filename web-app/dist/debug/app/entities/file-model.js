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
      getPath: function() {
        return this.id;
      },
      getDir: function() {
        var index, name;
        name = this.get('name');
        index = name.lastIndexOf('/');
        if (index >= 0) {
          return name.substring(0, index);
        } else {
          return name;
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
