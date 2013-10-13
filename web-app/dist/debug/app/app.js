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
      initRouter: function() {
        var router,
          _this = this;
        router = new App.Router();
        App.router = router;
        App.router.on("route:openLocalFile", function(name) {
          var file;
          file = App.localFileStore.list().findWhere({
            name: name
          });
          if (!file) {
            alert('no find file');
            return;
          }
          return _this.mainView.showEditor(file);
        });
        App.router.on("route:openRemoteFile", function(name) {
          var file;
          file = new App.File({
            id: name
          });
          file.local = false;
          return file.fetch().done(function() {
            return _this.mainView.showEditor(file);
          }).fail(function() {
            return alert('no find file');
          });
        });
        App.router.on("route:newFile", function() {
          var file;
          file = new App.File();
          return _this.mainView.showEditor(file);
        });
        App.router.on("route:defaultRoute", function() {
          return router.navigate("new", {
            trigger: true
          });
        });
        return App.router.on("route:files", function() {
          return _this.mainView.showFiles();
        });
      },
      onStart: function(data) {
        var headerView;
        this.data = data;
        App.settings = new App.Settings;
        App.settings.load();
        App.localFileStore = new App.LocalFileStore("gconsole.files");
        this.initRouter();
        headerView = new App.HeaderView().render();
        headerView.on("new", function() {
          return App.router.navigate("new", {
            trigger: true
          });
        });
        headerView.on("files", function() {
          console.log('files');
          return App.router.navigate("files", {
            trigger: true
          });
        });
        headerView.$el.appendTo("body");
        this.mainView = new App.MainView({
          el: $("#main-content")[0]
        }).render();
        this.mainView.$el.appendTo("body");
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
    App.on('initialize:after', function(options) {});
    return window.App = App;
  })(jQuery, _, Backbone, JST, window);

}).call(this);
