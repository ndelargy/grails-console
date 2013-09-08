(function (App){

    App.Router = Backbone.Router.extend({

        routes: {
            "l/:file": "openLocalFile",
            "r/*file": "openRemoteFile",
            "new": "newFile",
            '*path': 'defaultRoute'
        }

    });

})(window.App = window.App || {});