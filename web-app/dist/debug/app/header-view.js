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
        this.settingsView = new App.SettingsView({
          model: App.settings
        });
        this.$('.settings-btn-group').append(this.settingsView.render().$el);
        return this.settingsView.render();
      },
      onClose: function() {
        return this.settingsView.close();
      }
    });
  })(App, Backbone);

}).call(this);
