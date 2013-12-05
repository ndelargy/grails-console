(function() {
  (function(App, Backbone) {
    return App.HeaderView = Backbone.Marionette.ItemView.extend({
      template: 'header',
      attributes: {
        "class": 'navbar navbar-fixed-top'
      },
      initialize: function() {
        return this.listenTo(App, 'file:show', function(file) {
          var name;
          name = file.get('name');
          if (name) {
            return this.$('.title').html(name).show();
          } else {
            return this.$('.title').hide();
          }
        });
      },
      onRender: function() {
        return new App.SettingsView({
          el: this.$('.dropdown-menu.settings')[0]
        }).render();
      }
    });
  })(App, Backbone);

}).call(this);
