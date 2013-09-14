(function (App, Backbone, JST) {

    App.ResultCollectionView = Backbone.View.extend({

        events: {
            'click button.clear': 'clear'
        },

        initialize: function () {
            this.template = JST.results;
            this.listenTo(App.settings, 'change:results.wrapText', this.setWrap, this);

            this.resultViews = [];

            this.listenTo(this.collection, 'add', function (model, collection, options) {
                var resultView = new App.ResultView({model: model});
                this.listenTo(resultView, 'render', function () { this.scrollToResultView(resultView); });
                this.$('.inner').append(resultView.render().el);
                this.scrollToResultView(resultView);
                this.resultViews.push(resultView);
            });
        },

        scrollToResultView: function (resultView) {
            var scroll = resultView.$el.position().top + this.$('#result').scrollTop();
            this.$('#result').animate({scrollTop: scroll});
        },

        setWrap: function () {
            console.log(App.settings.get('results.wrapText'));
            console.log('pop');
            this.$('#result').toggleClass('wrap', App.settings.get('results.wrapText'));
        },

        render: function () {
            var html = this.template();
            this.$el.html(html);
            this.setWrap();
            return this;
        },

        clear: function () {
            _.each(this.resultViews, function (view) {
                this.stopListening(view);
                view.remove();
            }, this);
            this.resultViews = [];
        }
    });
})(App, Backbone, JST);