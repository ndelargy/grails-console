(function (App, Backbone, JST) {

    App.ResultCollectionView = Backbone.View.extend({

        events: {
            'click button.clear': 'clear'
        },

        initialize: function () {
            var settings = App.settings;
            $('#result').toggleClass('wrap', settings.get('results.wrapText'));
            this.listenTo(settings, 'change:results.wrapText', this.onWrapTextChange, this);

            this.listenTo(this.collection, 'add', function (model, collection, options) {
                var resultView = new App.ResultView({model: model});
                this.listenTo(resultView, 'render', _.bind(function () { this.scrollToResultView(resultView); }, this)); // TODO cleanup events after clear
                this.$('.inner').append(resultView.render().el);
                this.scrollToResultView(resultView);
            });
        },

        scrollToResultView: function (resultView) {
            var scroll = resultView.$el.position().top + this.$('#result').scrollTop();
            this.$('#result').animate({scrollTop: scroll});
        },

        onWrapTextChange: function (model, value, options) {
            this.$('#result').toggleClass('wrap', value);
        },

        render: function () {
            var html = JST['results']();
            this.$el.html(html);
            return this;
        },

        clear: function () {
            this.$('.inner').html('');
        }
    });
})(App, Backbone, JST);