(function() {
  App.module('Editor', function(Editor, App, Backbone, Marionette, $, _) {
    return Editor.ResultCollectionView = Marionette.CompositeView.extend({
      template: 'editor/results',
      itemViewContainer: '.inner',
      events: {
        'click button.clear': 'clear'
      },
      getItemView: function(item) {
        return Editor.ResultView;
      },
      onAfterItemAdded: function(itemView) {
        return this.scrollToResultView(itemView);
      },
      initialize: function() {
        this.listenTo(App.settings, 'change:results.wrapText', this.setWrap);
        this.listenTo(this, 'itemview:complete', this.scrollToResultView);
        return this.listenTo(App, 'app:editor:clear', this.clear);
      },
      scrollToResultView: function(resultView) {
        var scroll;
        scroll = resultView.$el.position().top + this.$('.script-result-section').scrollTop();
        return this.$('.script-result-section').animate({
          scrollTop: scroll
        });
      },
      setWrap: function() {
        return this.$('.script-result-section').toggleClass('wrap', App.settings.get('results.wrapText'));
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
