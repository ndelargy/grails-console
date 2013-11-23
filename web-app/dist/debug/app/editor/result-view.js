(function() {
  App.module('Editor', function(Editor, App, Backbone, Marionette, $, _) {
    return Editor.ResultView = Marionette.ItemView.extend({
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
        return this.model.get('input').replace(/^/gm, '> ');
      },
      formattedOutput: function() {
        if (this.model.get('output')) {
          return this.model.get('output').replace(/^/gm, '  ');
        } else {
          return null;
        }
      }
    });
  });

}).call(this);
