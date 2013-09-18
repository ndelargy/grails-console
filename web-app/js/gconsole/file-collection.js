(function (App, Backbone){

    App.FileCollection = Backbone.Collection.extend({
        model: App.File
    });

})(App, Backbone);