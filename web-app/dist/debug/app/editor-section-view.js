(function() {
  (function(App, Backbone, JST) {
    return App.EditorSectionView = App.View.extend({
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
        this.subviews.push(this.editorView);
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
        var _this = this;
        return this.layout = this.$el.layout({
          center__paneSelector: "#editor",
          center__contentSelector: "#code-wrapper",
          center__onresize: function() {
            return _this.editorView.refresh();
          },
          east__paneSelector: ".east",
          east__contentSelector: "#result",
          east__initHidden: App.settings.get("orientation") !== "vertical",
          east__size: App.settings.get("layout.east.size"),
          east__onresize_end: function(name, $el, state, opts) {
            App.settings.set("layout.east.size", state.size);
            return App.settings.save();
          },
          south__paneSelector: ".south",
          south__contentSelector: "#result",
          south__initHidden: App.settings.get("orientation") !== "horizontal",
          south__size: App.settings.get("layout.south.size"),
          south__onresize_end: function(name, $el, state, opts) {
            App.settings.set("layout.south.size", state.size);
            return App.settings.save();
          },
          resizable: true,
          findNestedContent: true,
          fxName: ""
        });
      },
      showOrientation: function() {
        var orientation;
        orientation = App.settings.get("orientation");
        if (orientation === "vertical") {
          $(".east").append(this.resultsView.el);
          this.layout.hide("south");
          this.layout.show("east");
          this.layout.initContent("east");
        } else {
          $(".south").append(this.resultsView.el);
          this.layout.hide("east");
          this.layout.show("south");
          this.layout.initContent("south");
        }
        return this.editorView.refresh();
      },
      showFile: function(file) {
        return this.editorView.showFile(file);
      },
      clearResults: function() {
        return this.resultsView.clear();
      }
    });
  })(App, Backbone, JST);

}).call(this);
