(function() {
  (function(App, Backbone) {
    return App.HeaderView = Backbone.Marionette.ItemView.extend({
      template: 'header',
      attributes: {
        "class": 'navbar navbar-fixed-top'
      },
      onRender: function() {
        return new App.SettingsView({
          el: this.$('.dropdown-menu.settings')[0]
        }).render();
      }
    });
  })(App, Backbone);

}).call(this);
