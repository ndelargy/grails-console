(function (App, Backbone, JST) {

    App.HeaderView = Backbone.View.extend({

        attributes: {
            'class': 'navbar navbar-fixed-top'
        },

        events: {
//            'click button.new': 'onNewClick', // TODO triggers
            'click button.scripts': 'onScriptsClick' // TODO triggers
        },

        initialize: function () {
            this.template = JST.header;
        },

        render: function () {
            this.$el.html(this.template());

            new App.SettingsView({
                el: this.$('.dropdown-menu.settings')[0]
            }).render(); // TODO move to template

            console.log(this.$('.dropdown-menu.settings')[0]);
            return this;
        },

        onNewClick: function(event) {
            event.preventDefault();
            this.trigger('new');
        },

        onScriptsClick: function(event) {
            event.preventDefault();
            this.trigger('scripts');
        }

    });
})(App, Backbone, JST);