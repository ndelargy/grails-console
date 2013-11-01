(function() {
  (function(App, Backbone) {
    return App.HeaderView = Backbone.Marionette.ItemView.extend({
      template: 'header',
      attributes: {
        "class": 'navbar navbar-fixed-top'
      },
      triggers: {
        'click button.new': 'new',
        'click button.files': 'files'
      },
      onRender: function() {
        return new App.SettingsView({
          el: this.$('.dropdown-menu.settings')[0]
        }).render();
      }
    });
  })(App, Backbone);

}).call(this);
