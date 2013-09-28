(function() {
  (function($, _, Backbone, JST) {
    var remoteFileStore;
    Handlebars.registerHelper("dateFormatTime", function(context) {
      var date;
      date = new Date(context);
      return "" + (date.toLocaleDateString()) + " " + (date.toLocaleTimeString());
    });
    window.App = _.extend({
      start: function(data) {
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
        headerView.on("scripts", function() {
          return App.router.navigate("files", {
            trigger: true
          });
        });
        headerView.$el.appendTo("body");
        this.mainView = new App.MainView({
          el: $("#main-content")[0]
        }).render();
        this.mainView.$el.appendTo("body");
        this.mainView.refresh();
        this.mainView.trigger('show');
        this.showTheme();
        App.settings.on("change:theme", this.showTheme, this);
        $("body").css("visibility", "visible");
        return Backbone.history.start({
          pushState: false
        });
      },
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
            console.log("TODO: no file");
            return;
          }
          return _this.mainView.showEditor(file);
        });
        App.router.on("route:openRemoteFile", function(name) {
          var jqxhr;
          jqxhr = $.get(_this.data.baseUrl + "/console/loadFile", {
            filename: name
          });
          return jqxhr.done(function(response) {
            var file;
            file = App.localFileStore.newFile({
              name: name,
              text: response.text
            });
            return this.mainView.showFile(file);
          });
        });
        App.router.on("route:newFile", function() {
          var file;
          file = App.localFileStore.newFile({
            text: ""
          });
          return _this.mainView.showEditor(file);
        });
        App.router.on("route:defaultRoute", function() {
          console.log("TODO: grab the last file.");
          return router.navigate("new", {
            trigger: true
          });
        });
        return App.router.on("route:files", function() {
          return _this.mainView.showFiles();
        });
      },
      showTheme: function() {
        var theme;
        theme = App.settings.get("theme");
        return $("body").attr("data-theme", theme);
      },
      createLink: function(action) {
        return "" + this.data.baseUrl + "/console/" + action;
      }
    }, Backbone.Events);
    return remoteFileStore = {
      load: function(fileName) {
        var jqxhr;
        jqxhr = $.get(gconsole.data.baseUrl + "/console/loadFile", {
          filename: fileName
        });
        return jqxhr.done(function(response) {
          var file;
          file = new File(fileName, response.text);
          return gconsole.showFile(file);
        });
      },
      save: function(file) {
        this.lastModified = new Date();
        return localStorage.setItem("file." + file.name, JSON.stringify(file));
      }
    };
  })(jQuery, _, Backbone, JST);

}).call(this);
