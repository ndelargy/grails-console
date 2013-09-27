(function() {
  (function($, _, Backbone, JST) {
    var EditorSectionView, MainView, remoteFileStore;
    Handlebars.registerHelper("dateFormatTime", function(context) {
      var date;
      date = new Date(context);
      return date.toDateString() + " " + date.toTimeString();
    });
    MainView = Backbone.View.extend({
      attributes: {
        id: "main-content"
      },
      initialize: function() {
        return this.editorSectionView = new EditorSectionView({});
      },
      render: function() {
        this.editorSectionView.render();
        this.$el.append(this.editorSectionView.$el);
        return this;
      },
      refresh: function() {
        return this.editorSectionView.refresh();
      },
      showFile: function(file) {
        return this.editorSectionView.editorView.showFile(file);
      }
    });
    EditorSectionView = Backbone.View.extend({
      attributes: {
        "class": "full-height"
      },
      initialize: function() {
        return this.template = JST["editor-section"];
      },
      render: function() {
        this.$el.html(this.template());
        this.initLayout();
        this.editorView = new App.EditorView({
          el: this.$("#editor")[0]
        }).render();
        this.layout.initContent("center");
        this.editorView.resize();
        this.resultCollection = new App.ResultCollection();
        this.resultsView = new App.ResultCollectionView({
          collection: this.resultCollection
        }).render();
        this.listenTo(this.editorView, "execute", function(result) {
          return this.resultCollection.add(result);
        });
        this.editorView.on("clear", this.clearResults, this);
        this.showOrientation();
        App.settings.on("change:orientation", this.showOrientation, this);
        return this;
      },
      refresh: function() {
        this.editorView.refresh();
        this.layout.resizeAll();
        return this.showOrientation();
      },
      initLayout: function() {
        return this.layout = this.$el.layout({
          center__paneSelector: "#editor",
          center__contentSelector: "#code-wrapper",
          center__onresize: _.bind(function() {
            return this.editorView.refresh();
          }, this),
          east__paneSelector: ".east",
          east__contentSelector: "#result",
          east__initHidden: App.settings.get("orientation") !== "vertical",
          east__size: App.settings.get("layout.east.size"),
          east__onresize_end: _.bind(function(name, $el, state, opts) {
            App.settings.set("layout.east.size", state.size);
            return App.settings.save();
          }, this),
          south__paneSelector: ".south",
          south__contentSelector: "#result",
          south__initHidden: App.settings.get("orientation") !== "horizontal",
          south__size: App.settings.get("layout.south.size"),
          south__onresize_end: _.bind(function(name, $el, state, opts) {
            App.settings.set("layout.south.size", state.size);
            return App.settings.save();
          }, this),
          resizable: true,
          findNestedContent: true,
          fxName: ""
        });
      },
      showOrientation: function() {
        var orientation;
        orientation = App.settings.get("orientation");
        if (orientation === "vertical") {
          $(".orientation .vertical").button("toggle");
          $(".east").append(this.resultsView.el);
          this.layout.hide("south");
          this.layout.show("east");
          this.layout.initContent("east");
        } else {
          $(".orientation .horizontal").button("toggle");
          $(".south").append(this.resultsView.el);
          this.layout.hide("east");
          this.layout.show("south");
          this.layout.initContent("south");
        }
        return this.editorView.refresh();
      },
      showFile: function(file) {
        return this.mainView.showFile(file);
      },
      clearResults: function() {
        return this.resultsView.clear();
      }
    });
    window.App = {
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
        this.mainView = new MainView({
          el: $("#main-content")[0]
        }).render();
        this.mainView.$el.appendTo("body");
        this.mainView.refresh();
        this.showTheme();
        App.settings.on("change:theme", this.showTheme, this);
        $("body").css("visibility", "visible");
        return Backbone.history.start({
          pushState: false
        });
      },
      initRouter: function() {
        var oThis, router;
        oThis = this;
        router = new App.Router();
        App.router = router;
        App.router.on("route:openLocalFile", function(name) {
          var file;
          file = App.localFileStore.list().findWhere({
            name: name
          });
          if (!file) {
            console.log("TODO: no file");
          }
          return;
          return oThis.showFile(file);
        });
        App.router.on("route:openRemoteFile", function(name) {
          var jqxhr;
          jqxhr = $.get(oThis.data.baseUrl + "/console/loadFile", {
            filename: name
          });
          return jqxhr.done(function(response) {
            var file;
            file = App.localFileStore.newFile({
              name: name,
              text: response.text
            });
            return oThis.mainView.showFile(file);
          });
        });
        App.router.on("route:newFile", function() {
          var file;
          file = App.localFileStore.newFile({
            text: ""
          });
          return oThis.mainView.showFile(file);
        });
        App.router.on("route:defaultRoute", function() {
          console.log("TODO: grab the last file.");
          return router.navigate("new", {
            trigger: true
          });
        });
        return App.router.on("route:files", function() {
          var files, view;
          files = App.localFileStore.list();
          view = new App.FileCollectionView({
            collection: files
          }).render();
          return $("#main-content").html(view.$el);
        });
      },
      showTheme: function() {
        var theme;
        theme = App.settings.get("theme");
        return $("body").attr("data-theme", theme);
      }
    };
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
