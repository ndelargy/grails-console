(function() {
  App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
    var S4, guid;
    S4 = function() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    guid = function() {
      return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
    };
    Entities.LocalFileStore = (function() {
      function LocalFileStore(name) {
        this.name = name;
        this._load();
      }

      LocalFileStore.prototype.fetch = function() {
        return _.values(this.data);
      };

      LocalFileStore.prototype.find = function(file) {
        return this.data[file.id];
      };

      LocalFileStore.prototype.create = function(file) {
        file.set("lastModified", new Date().getTime());
        if (!file.id) {
          file.id = file.attributes.id = guid();
        }
        this.data[file.id] = file.toJSON();
        this._save();
        return file.toJSON();
      };

      LocalFileStore.prototype.update = function(file) {
        file.set("lastModified", new Date().getTime());
        this.data[file.id] = file.toJSON();
        this._save();
        return file.toJSON();
      };

      LocalFileStore.prototype.destroy = function(file) {
        delete this.data[file.id];
        this._save();
        return file.toJSON();
      };

      LocalFileStore.prototype.destroyAll = function() {
        this.data = {};
        return localStorage.removeItem(this.name);
      };

      LocalFileStore.prototype._save = function() {
        return localStorage.setItem(this.name, JSON.stringify(this.data));
      };

      LocalFileStore.prototype._load = function() {
        var e, store;
        store = localStorage.getItem(this.name);
        try {
          return this.data = JSON.parse(store);
        } catch (_error) {
          e = _error;
          return this.data = {};
        }
      };

      LocalFileStore.prototype.sync = function(method, file, options) {
        var dfd, resp;
        resp = void 0;
        switch (method) {
          case "read":
            resp = file.id ? this.find(file) : this.fetch();
            break;
          case "create":
            resp = this.create(file);
            break;
          case "update":
            resp = this.update(file);
            break;
          case "delete":
            resp = this.destroy(file);
        }
        dfd = $.Deferred();
        dfd.resolveWith(this, [resp]);
        if (resp) {
          if (options != null) {
            if (typeof options.success === "function") {
              options.success(resp);
            }
          }
        } else {
          if (options != null) {
            if (typeof options.error === "function") {
              options.error("Record not found");
            }
          }
        }
        return dfd;
      };

      return LocalFileStore;

    })();
    App.on('initialize:before', function(options) {
      App.data = options;
      App.settings = new App.Settings;
      App.settings.load();
      return Entities.localFileStore = new Entities.LocalFileStore('gconsole.files');
    });
    Entities.LocalFileCollection = Backbone.Collection.extend({
      model: function(attrs, options) {
        return new Entities.File(attrs, options);
      },
      isLocal: true,
      comparator: function(file) {
        return file.get('lastModified') * -1;
      },
      sync: function(method, file, options) {
        return Entities.localFileStore.sync(method, file, options);
      }
    });
    App.reqres.setHandler('local:file:entities', function() {
      var files;
      files = new Entities.LocalFileCollection(Entities.localFileStore.fetch());
      files.store = Entities.localFileStore;
      return files;
    });
    return App.reqres.setHandler('local:file:entity', function(name) {
      return new Entities.LocalFileCollection(Entities.localFileStore.fetch()).findWhere({
        name: name
      });
    });
  });

}).call(this);
