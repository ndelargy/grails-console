(function() {
  (function(App, $) {
    return App.SettingsView = Backbone.View.extend({
      events: {
        "click .orientation-horizontal": "onOrientationHorizontalClick",
        "click .orientation-vertical": "onOrientationVerticalClick",
        "click .results-wrap": "onResultsWrapClick",
        "click .results-show-script": "onResultsShowScriptClick",
        "click .results-show-stdout": "onResultsShowStdoutClick",
        "click .theme": "onThemeClick"
      },
      initialize: function() {
        this.model = App.settings;
        return this.listenTo(this.model, "change", this.render, this);
      },
      render: function() {
        var _this = this;
        this.$(".orientation-horizontal").toggleClass("selected", this.model.get("orientation") === "horizontal");
        this.$(".orientation-vertical").toggleClass("selected", this.model.get("orientation") === "vertical");
        this.$(".results-wrap").toggleClass("selected", this.model.get("results.wrapText"));
        this.$(".results-show-script").toggleClass("selected", this.model.get("results.showScript"));
        this.$(".results-show-stdout").toggleClass("selected", this.model.get("results.showStdout"));
        this.$(".results-show-result").toggleClass("selected", this.model.get("results.showResult"));
        return this.$(".theme").each(function(index, el) {
          var $el;
          $el = $(el);
          return $el.toggleClass("selected", _this.model.get("theme") === $el.data("theme"));
        });
      },
      onOrientationHorizontalClick: function(event) {
        event.preventDefault();
        event.stopPropagation();
        this.model.set("orientation", "horizontal");
        return this.model.save();
      },
      onOrientationVerticalClick: function(event) {
        event.preventDefault();
        event.stopPropagation();
        this.model.set("orientation", "vertical");
        return this.model.save();
      },
      onThemeClick: function(event) {
        var $el;
        event.preventDefault();
        event.stopPropagation();
        $el = $(event.currentTarget);
        this.model.set("theme", $el.data("theme"));
        return this.model.save();
      },
      onResultsWrapClick: function(event) {
        event.preventDefault();
        event.stopPropagation();
        this.model.toggle("results.wrapText");
        return this.model.save();
      },
      onResultsShowScriptClick: function(event) {
        event.preventDefault();
        event.stopPropagation();
        this.model.toggle("results.showScript");
        return this.model.save();
      },
      onResultsShowStdoutClick: function(event) {
        event.preventDefault();
        event.stopPropagation();
        this.model.toggle("results.showStdout");
        return this.model.save();
      },
      onResultsShowResultClick: function(event) {
        event.preventDefault();
        event.stopPropagation();
        this.model.toggle("results.showResult");
        return this.model.save();
      }
    });
  })(App, jQuery);

}).call(this);
