(function (App, Backbone, localStorage, JSON) {

    var localStorageKey = 'gconsole.settings'

    App.Settings = Backbone.Model.extend({
        defaults: {
            'orientation': 'vertical',
            'layout.east.size': '50%',
            'layout.south.size': '50%',
            'results.wrapText': true,
            'results.showScript': true,
            'results.showStdout': true,
            'results.showResult': true,
            'theme': 'default'
        },

        toggle: function (attribute) {
            this.set(attribute, !this.get(attribute));
        },

        save: function () {
            localStorage.setItem(localStorageKey, JSON.stringify(this));
        },

        load: function() {
            var json = JSON.parse(localStorage.getItem(localStorageKey)) || {};
            this.set(json);
        }
    });

})(App, Backbone, localStorage, JSON);