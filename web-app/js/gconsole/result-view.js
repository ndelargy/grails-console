(function (App, Backbone) {

    App.ResultView = Backbone.View.extend({

        attributes: {
            'class': 'script-result'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render, this);
        },

        render: function () {
            if (this.model.get('loading')) {
                this.$el.addClass('loading');
                this.$el.text('Executing Script...');
            } else {
                this.$el.removeClass('loading');
                var html = '';
                html += '<span class="result-time label label-default pull-right">' + this.model.get('totalTime') + ' ms</span>';
                if (this.model.get('exception')) {
                    this.$el.addClass('stacktrace');
                    html += '<div class="input">'+this.formattedInput()+'</div>';
                    html += '<div>'+this.model.get('exception')+'</div>';
                } else if (this.model.get('error')){
                    this.$el.addClass('stacktrace');
                    html += '<div>'+this.model.get('error')+'</div>'
                } else {
                    html += '<div class="input">'+this.formattedInput()+'</div>';
                    html += '<div class="output">'+this.model.get('output')+'</div>';
                    html += '<div class="result">'+this.model.get('result')+'</div>';
                }
                this.$el.html(html);
            }
            return this;
        },

        formattedInput: function() {
            var lines = this.model.get('input').trim().split('\n');
            var newInput = '';

            _.each(lines, function(line) {
                newInput += 'groovy> ' + line + '\n';
            });
            return newInput;
        }

    });
})(App, Backbone);