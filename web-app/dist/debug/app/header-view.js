(function() {
  (function(App, Backbone, JST) {
    return App.HeaderView = Backbone.View.extend({
      attributes: {
        "class": "navbar navbar-fixed-top"
      },
      events: {
        "click button.new": "onNewClick",
        "click button.files": "onFilesClick"
      },
      initialize: function() {
        return this.template = JST.header;
      },
      render: function() {
        this.$el.html(this.template());
        new App.SettingsView({
          el: this.$(".dropdown-menu.settings")[0]
        }).render();
        return this;
      },
      onNewClick: function(event) {
        event.preventDefault();
        return this.trigger("new");
      },
      onFilesClick: function(event) {
        event.preventDefault();
        return this.trigger("scripts");
      }
    });
  })(App, Backbone, JST);

}).call(this);
