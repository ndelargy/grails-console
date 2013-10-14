(function() {
  (function(App, Backbone) {
    return App.MainView = Backbone.Marionette.Layout.extend({
      template: 'main',
      attributes: {
        id: 'main-content'
      },
      initialize: function() {
        this.views = [];
        return this.listenTo(App, 'app:active', function(view) {
          var aview, _i, _len, _ref;
          if (!_.contains(this.views, view)) {
            this.$el.append(view.render().$el);
            this.views.push(view);
          }
          _ref = this.views;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            aview = _ref[_i];
            if (aview !== view) {
              aview.$el.hide();
            }
          }
          view.$el.show();
          return view.triggerMethod('visible');
        });
      }
    });
  })(App, Backbone);

}).call(this);
