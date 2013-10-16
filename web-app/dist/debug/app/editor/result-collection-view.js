(function() {
  App.module('EditorApp', function(EditorApp, App, Backbone, Marionette, $, _) {
    return EditorApp.ResultCollectionView = Marionette.CompositeView.extend({
      template: 'results',
      itemViewContainer: '.inner',
      events: {
        'click button.clear': 'clear'
      },
      getItemView: function(item) {
        return EditorApp.ResultView;
      },
      onAfterItemAdded: function(itemView) {
        return this.scrollToResultView(itemView);
      },
      initialize: function() {
        this.listenTo(App.settings, "change:results.wrapText", this.setWrap);
        return this.listenTo(this, 'itemview:complete', this.scrollToResultView);
      },
      scrollToResultView: function(resultView) {
        var scroll;
        console.log("top " + (resultView.$el.position().top));
        scroll = resultView.$el.position().top + this.$("#result").scrollTop();
        console.log("animate " + scroll);
        return this.$("#result").animate({
          scrollTop: scroll
        });
      },
      setWrap: function() {
        return this.$("#result").toggleClass("wrap", App.settings.get("results.wrapText"));
      },
      onRender: function() {
        return this.setWrap();
      },
      clear: function() {
        return this.collection.reset();
      }
    });
  });

}).call(this);
