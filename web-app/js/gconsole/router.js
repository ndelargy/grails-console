(function (App){

    App.Router = Backbone.Router.extend({

        routes: {
            "local/:file": "openLocalFile",
            "remote/*file": "openRemoteFile",
            "new": "newFile",
            '*path': 'defaultRoute'
        }

    });

})(App);