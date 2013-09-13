/**
 * http://mbrevoort.github.io/docco-husky/backbone/examples/backbone-localstorage.html
 */
(function (_, Backbone) {

    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    function guid() {
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    Backbone.LocalModelStore = function (name, Model) {
        this.name = name;
        var store = localStorage.getItem(this.name);
        Model.prototype.localStorage = this;
        Model.prototype.sync = Backbone.LocalModelStore.sync;
        this.data = {};
        if (store) {
            _.each(JSON.parse(store), function(v, k) {
                this.data[k] = new Model(v);
            }, this);
        }
    };

    _.extend(Backbone.LocalModelStore.prototype, {

        // Save the current state of the **Store** to *localStorage*.
        save: function () {
            var jsonData = _.map(this.data, function(it) { return it.toJSON() });
            localStorage.setItem(this.name, JSON.stringify(jsonData));
        },

        // Update a model by replacing its copy in `this.data`.
        update: function (model) {
            this.data[model.id] = model;
            this.save();
            return model;
        },

        // Add a model, giving it a (hopefully)-unique GUID, if it doesn't already
        // have an id of it's own.
        create: function (model) {
            if (!model.id) {
                model.set(model.idAttribute, guid());
            }
            this.data[model.id] = model;
            this.save();
            return model;
        },

        // Retrieve a model from `this.data` by id.
        find: function (model) {
            return this.data[model.id];
        },

        // Return the array of all models currently in storage.
        findAll: function () {
            return _.values(this.data);
        },

        first: function () {
            return _.first(this.findAll());
        },

        // Delete a model from `this.data`, returning it.
        destroy: function (model) {
            delete this.data[model.id];
            this.save();
            return model;
        }

    });

    Backbone.LocalModelStore.sync = function(method, model, options) {
        var resp;
        var store = model.localStorage || model.collection.localStorage;

        switch (method) {
            case "read":    resp = model.id ? store.find(model) : store.findAll(); break;
            case "create":  resp = store.create(model);                            break;
            case "update":  resp = store.update(model);                            break;
            case "delete":  resp = store.destroy(model);                           break;
        }

        if (resp) {
            options.success(resp);
        } else {
            options.error("Record not found");
        }
    };
})(_, Backbone);