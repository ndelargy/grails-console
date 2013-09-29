(function() {
  (function(App, _, localStorage, JSON, $) {
    var S4, guid;
    S4 = function() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    guid = function() {
      return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
    };
    return App.LocalFileStore = (function() {
      function LocalFileStore(name) {
        this.name = name;
        this._load();
      }

      LocalFileStore.prototype.list = function() {
        var models;
        models = _.map(this.data, function(value, key) {
          return this.newFile(value);
        }, this);
        return new App.FileCollection(models);
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

      LocalFileStore.prototype.newFile = function(data) {
        var file;
        console.log('newFile');
        file = new App.File(data);
        file.sync = _.bind(this.sync, this);
        return file;
      };

      LocalFileStore.prototype.sync = function(method, file, options) {
        var resp;
        resp = void 0;
        switch (method) {
          case "read":
            resp = this.find(file);
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

      return LocalFileStore;

    })();
  })(App, _, localStorage, JSON, jQuery);

}).call(this);
