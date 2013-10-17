(function() {
  (function($, _, Backbone, JST, window) {
    var App;
    Handlebars.registerHelper("dateFormatTime", function(context) {
      var date;
      date = new Date(context);
      return "" + (date.toLocaleDateString()) + " " + (date.toLocaleTimeString());
    });
    Marionette.Renderer.render = function(template, data) {
      return JST[template](data);
    };
    App = new (Backbone.Marionette.Application.extend({
      onStart: function(data) {
        var headerView, mainView;
        headerView = new App.HeaderView().render();
        headerView.on("new", function() {
          return App.trigger('app:file:new');
        });
        headerView.on("files", function() {
          App.trigger('app:file:list');
          return Backbone.history.navigate("files", {
            trigger: true
          });
        });
        headerView.$el.appendTo("body");
        mainView = new App.MainView({
          el: $("#main-content")[0]
        }).render();
        mainView.$el.appendTo("body");
        this.showTheme();
        App.settings.on("change:theme", this.showTheme, this);
        $("body").css("visibility", "visible");
        if (Backbone != null ? Backbone.history : void 0) {
          return Backbone.history.start({
            pushState: false
          });
        }
      },
      createLink: function(action, params) {
        var link;
        link = "" + this.data.baseUrl + "/console/" + action;
        if (params) {
          link += '?' + $.param(params, true);
        }
        return link;
      },
      showTheme: function() {
        var theme;
        theme = App.settings.get("theme");
        return $("body").attr("data-theme", theme);
      },
      savingOn: function() {
        return $('.navbar .saving').fadeIn(100);
      },
      savingOff: function() {
        return $('.navbar .saving').fadeOut(100);
      }
    }));
    App.on('initialize:before', function(options) {
      App.data = options;
      App.settings = new App.Settings;
      return App.settings.load();
    });
    return window.App = App;
  })(jQuery, _, Backbone, JST, window);

}).call(this);
