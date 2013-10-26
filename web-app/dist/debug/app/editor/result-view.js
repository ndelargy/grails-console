(function() {
  App.module('EditorApp', function(EditorApp, App, Backbone, Marionette, $, _) {
    return EditorApp.ResultView = Marionette.ItemView.extend({
      template: 'editor/result',
      attributes: {
        "class": 'script-result'
      },
      modelEvents: {
        change: 'render'
      },
      onRender: function() {
        if (!this.model.get('loading')) {
          if (!this.model.isSuccess()) {
            this.$el.addClass('stacktrace');
          }
          return this.trigger('complete');
        }
      },
      serializeData: function() {
        return {
          loading: this.model.get('loading'),
          totalTime: this.model.get('totalTime'),
          input: this.formattedInput(),
          output: this.formattedOutput(),
          result: this.model.get('exception') || this.model.get('error') || this.model.get('result')
        };
      },
      formattedInput: function() {
        var lines;
        lines = this.model.get('input').trim().split('\n');
        return _.map(lines, function(line) {
          return '> ' + line;
        }).join('\n');
      },
      formattedOutput: function() {
        var lines, _ref, _ref1;
        lines = (_ref = this.model.get('output')) != null ? (_ref1 = _ref.trim()) != null ? _ref1.split('\n') : void 0 : void 0;
        return _.map(lines, function(line) {
          return '  ' + line;
        }).join('\n');
      }
    });
  });

}).call(this);
