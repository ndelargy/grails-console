(function() {
  (function(App, Backbone, JST) {
    return App.ResultCollectionView = Backbone.View.extend({
      events: {
        "click button.clear": "clear"
      },
      initialize: function() {
        this.template = JST.results;
        this.listenTo(App.settings, "change:results.wrapText", this.setWrap, this);
        this.resultViews = [];
        return this.listenTo(this.collection, "add", function(model, collection, options) {
          var resultView;
          resultView = new App.ResultView({
            model: model
          });
          this.listenTo(resultView, "render", function() {
            return this.scrollToResultView(resultView);
          });
          this.$(".inner").append(resultView.render().el);
          this.scrollToResultView(resultView);
          return this.resultViews.push(resultView);
        });
      },
      scrollToResultView: function(resultView) {
        var scroll;
        scroll = resultView.$el.position().top + this.$("#result").scrollTop();
        return this.$("#result").animate({
          scrollTop: scroll
        });
      },
      setWrap: function() {
        return this.$("#result").toggleClass("wrap", App.settings.get("results.wrapText"));
      },
      render: function() {
        var html;
        html = this.template();
        this.$el.html(html);
        this.setWrap();
        return this;
      },
      clear: function() {
        _.each(this.resultViews, (function(view) {
          this.stopListening(view);
          return view.remove();
        }), this);
        return this.resultViews = [];
      }
    });
  })(App, Backbone, JST);

}).call(this);
