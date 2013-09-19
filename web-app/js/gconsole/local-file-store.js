(function (App, _, localStorage, JSON, $) {

    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    function guid() {
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    App.LocalFileStore = function (name) {
        this.name = name;
        this._load();
    };

    _.extend(App.LocalFileStore.prototype, {

        list: function () {
            var models =  _.map(this.data, function(value, key) { return this.newFile(value); }, this);
            return new App.FileCollection(models);
            //dfd ?
        },

        find: function (file) {
            return this.data[file.id];
        },

        create: function (file) {
            file.set('lastModified', new Date().getTime());
            if (!file.id) file.id = file.attributes.id = guid();
            this.data[file.id] = file.toJSON();
            this._save();
            return file.toJSON();
        },

        update: function (file) {
            console.log(file.toJSON());
            file.set('lastModified', new Date().getTime());
            this.data[file.id] = file.toJSON();
            this._save();
            return file.toJSON();
        },

        destroy: function (file) {
            delete this.data[file.id]
            this._save();
            return file.toJSON();
        },

        destroyAll: function () {
            this.data = {};
            localStorage.removeItem(this.name);
        },

        _save: function () {
            console.log(this.data);
            localStorage.setItem(this.name, JSON.stringify(this.data));
            console.log(localStorage.getItem(this.name));
        },

        _load: function () {
            var store = localStorage.getItem(this.name);
            try {
                this.data = JSON.parse(store);
            } catch (e) {
                this.data = {};
            }
        },

        newFile: function(data) {
            var file = new App.File(data)
            file.sync = _.bind(this.sync, this); // TODO
            return file;
        },

        sync: function (method, file, options) {
            var resp;
//            var store = model.localStorage || model.collection.localStorage;
//            var dfd = $.Deferred();

            switch (method) {
                case 'read':
                    resp = this.find(file); // fetch
                    break;
                case 'create':
                    resp = this.create(file); // save
                    break;
                case 'update':
                    resp = this.update(file); // save
                    break;
                case 'delete':
                    resp = this.destroy(file); // destroy
                    break;
            }

            if (resp) {
                options.success(resp);
            } else {
                options.error("Record not found");
            }
        }

    });

})(App, _, localStorage, JSON, jQuery);
