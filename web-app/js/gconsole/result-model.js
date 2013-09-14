(function (App, Backbone){

    var Result = Backbone.Model.extend({

        isSuccess: function() {
            return !this.get('exception') && !this.get('error');
        }

    });

    App.Result = Result;

})(App, Backbone);