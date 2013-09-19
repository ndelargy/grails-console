(function (App, Backbone){

    App.FileCollection = Backbone.Collection.extend({
        model: App.File,

        comparator: function(file) {
            return file.get('lastModified') * -1;
        }
    });

})(App, Backbone);