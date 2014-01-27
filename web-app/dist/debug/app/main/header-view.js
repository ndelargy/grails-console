(function() {
  App.module('Main', function(Main, App, Backbone, Marionette, $, _) {
    return Main.HeaderView = Backbone.Marionette.ItemView.extend({
      template: 'main/header',
      attributes: {
        "class": 'navbar navbar-fixed-top'
      },
      initialize: function() {
        return this.listenTo(App, 'file:show', function(file) {
          var name;
          name = file.get('name');
          if (name) {
            return this.$('.title span').html(name).show();
          } else {
            return this.$('.title span').hide();
          }
        });
      },
      showDirty: function(isDirty) {
        return this.$('.title span').toggleClass('dirty', isDirty);
      },
      onRender: function() {
        this.settingsView = new Main.SettingsView({
          model: App.settings
        });
        this.$('.settings-btn-group').append(this.settingsView.render().$el);
        return this.settingsView.render();
      },
      onClose: function() {
        return this.settingsView.close();
      }
    });
  });

}).call(this);
