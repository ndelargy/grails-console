(function() {
  (function(App, Backbone) {
    return App.View = Backbone.View.extend({
      constructor: function() {
        this.subviews = [];
        Backbone.View.prototype.constructor.apply(this, arguments);
        return this.listenTo(this, 'show', function() {
          var view, _i, _len, _ref, _results;
          console.log('hi');
          this.onShow();
          _ref = this.subviews;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            view = _ref[_i];
            _results.push(view.onShow());
          }
          return _results;
        });
      },
      initialize: function() {},
      onShow: function() {}
    });
  })(App, Backbone);

}).call(this);
