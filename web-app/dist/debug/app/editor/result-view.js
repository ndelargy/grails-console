(function() {
  App.module('EditorApp', function(EditorApp, App, Backbone, Marionette, $, _) {
    return EditorApp.ResultView = Marionette.ItemView.extend({
      template: 'result',
      attributes: {
        "class": 'script-result'
      },
      modelEvents: {
        change: 'render'
      },
      onRender: function() {
        if (!(this.model.get('loading') || this.model.isSuccess())) {
          return this.$el.addClass('stacktrace');
        }
      },
      serializeData: function() {
        return {
          loading: this.model.get('loading'),
          totalTime: this.model.get('totalTime'),
          input: this.formattedInput(),
          output: this.model.get('output'),
          result: this.model.get('exception') || this.model.get('error') || this.model.get('result')
        };
      },
      formattedInput: function() {
        var lines;
        lines = this.model.get('input').trim().split('\n');
        return _.map(lines, function(line) {
          return 'groovy> ' + line;
        }).join('\n');
      }
    });
  });

}).call(this);
