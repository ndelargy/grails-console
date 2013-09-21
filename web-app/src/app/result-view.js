(function (App, Backbone, JST) {

    App.ResultView = Backbone.View.extend({

        attributes: {
            'class': 'script-result'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render, this);
            this.template = JST['result'];
        },

        render: function () {
            var html;
            if (this.model.get('loading')) {
                html = '<div class="loading">Executing Script...</div>';
            } else {
                var data = {
                    totalTime: this.model.get('totalTime'),
                    input: this.formattedInput(),
                    output: this.model.get('output'),
                    result: this.model.get('exception') || this.model.get('error') || this.model.get('result')
                };
                if (!this.model.isSuccess()) {
                    this.$el.addClass('stacktrace');
                }

                html = this.template(data);
            }
            this.$el.html(html);
            this.trigger('render');
            return this;
        },

        formattedInput: function () {
            var lines = this.model.get('input').trim().split('\n');
            return _.map(lines, function (line) {
                return 'groovy> ' + line;
            }).join('\n');
        }

    });
})(App, Backbone, JST);