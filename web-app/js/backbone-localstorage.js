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
        Model.prototype.sync = _.bind(this.sync, this);
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
            model.set('lastModified', new Date().getTime());
            this.data[model.id] = model;
            this.save();
            return model;
        },

        // Add a model, giving it a (hopefully)-unique GUID, if it doesn't already
        // have an id of it's own.
        create: function (model) {
            model.set('lastModified', new Date().getTime());
            if (!model.id) model.id = model.attributes.id = guid();
            this.data[model.id] = model;
            this.save();
            return model;
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

        // Delete a model from `this.data`, returning it.
        destroy: function (model) {
            delete this.data[model.id];
            this.save();
            return model;
        },

        sync: function(method, model, options) {
            var resp;
//            var store = model.localStorage || model.collection.localStorage;

            switch (method) {
                case "read":    resp = model.id ? this.find(model) : this.findAll();  break;
                case "create":  resp = this.create(model);                            break;
                case "update":  resp = this.update(model);                            break;
                case "delete":  resp = this.destroy(model);                           break;
            }

            if (resp) {
                options.success(resp);
            } else {
                options.error("Record not found");
            }
        }

    });
})(_, Backbone);