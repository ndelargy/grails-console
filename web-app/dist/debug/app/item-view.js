(function() {
  (function(App, Backbone) {
    return App.ItemView = Backbone.Marionette.ItemView.extend({
      constructor: function() {
        this.subviews = [];
        Marionette.ItemView.prototype.constructor.apply(this, arguments);
        return this.listenTo(this, 'show', function() {
          var view, _i, _len, _ref, _results;
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
      render: function() {
        var data, html;
        this.isClosed = false;
        this.triggerMethod("before:render", this);
        this.triggerMethod("item:before:render", this);
        data = this.serializeData();
        data = this.mixinTemplateHelpers(data);
        html = this.renderHtml(data);
        this.$el.html(html);
        this.bindUIElements();
        this.triggerMethod("render", this);
        return this.triggerMethod("item:rendered", this);
      },
      renderHtml: function(data) {
        var template;
        template = this.getTemplate();
        return Marionette.Renderer.render(template, data);
      },
      onShow: function() {},
      log: function(string) {
        return typeof console !== "undefined" && console !== null ? console.log("" + this.cid + ": " + string) : void 0;
      }
    });
  })(App, Backbone);

}).call(this);
