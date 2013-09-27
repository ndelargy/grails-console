(function() {
  (function(App, Backbone) {
    return App.View = Backbone.View.extend({
      constructor: function() {
        this.subviews = [];
        return Backbone.View.prototype.constructor.apply(this, arguments);
      },
      initialize: function() {},
      onShow: function() {}
    });
  })(App, Backbone);

}).call(this);
