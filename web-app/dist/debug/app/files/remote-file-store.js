(function() {
  (function(App, _, localStorage, JSON, $) {
    var S4, guid;
    S4 = function() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    guid = function() {
      return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
    };
    return App.RemoteFileStore = (function() {
      function RemoteFileStore(name) {
        this.name = name;
        this._load();
      }

      RemoteFileStore.prototype.list = function() {
        var collection;
        collection = new App.FileCollection(this.fetch());
        collection.store = this;
        return collection;
      };

      RemoteFileStore.prototype.fetch = function() {
        return _.values(this.data);
      };

      RemoteFileStore.prototype.find = function(file) {
        return this.data[file.id];
      };

      RemoteFileStore.prototype.create = function(file) {
        file.set("lastModified", new Date().getTime());
        if (!file.id) {
          file.id = file.attributes.id = guid();
        }
        this.data[file.id] = file.toJSON();
        this._save();
        return file.toJSON();
      };

      RemoteFileStore.prototype.update = function(file) {
        file.set("lastModified", new Date().getTime());
        this.data[file.id] = file.toJSON();
        this._save();
        return file.toJSON();
      };

      RemoteFileStore.prototype.destroy = function(file) {
        delete this.data[file.id];
        this._save();
        return file.toJSON();
      };

      RemoteFileStore.prototype.destroyAll = function() {
        this.data = {};
        return localStorage.removeItem(this.name);
      };

      RemoteFileStore.prototype._save = function() {
        return localStorage.setItem(this.name, JSON.stringify(this.data));
      };

      RemoteFileStore.prototype._load = function() {
        var e, store;
        store = localStorage.getItem(this.name);
        try {
          return this.data = JSON.parse(store);
        } catch (_error) {
          e = _error;
          return this.data = {};
        }
      };

      RemoteFileStore.prototype.newFile = function(data) {
        var file;
        file = new App.File(data);
        file.sync = _.bind(this.sync, this);
        return file;
      };

      RemoteFileStore.prototype.sync = function(method, file, options) {
        var resp;
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
        if (resp) {
          return options.success(resp);
        } else {
          return options.error("Record not found");
        }
      };

      return RemoteFileStore;

    })();
  })(App, _, localStorage, JSON, jQuery);

}).call(this);
