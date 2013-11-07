(function() {
  App.module('DomUtils', function(DomUtils, App, Backbone, Marionette, $, _) {
    var setHeight, sizeToFitVertical;
    setHeight = function($target) {
      var $container, childrenHeight, difference;
      $container = $target.parent();
      childrenHeight = _.reduce($container.children(':visible'), function(memo, el) {
        return memo + $(el).outerHeight(true);
      }, 0);
      difference = $container.height() - childrenHeight;
      return $target.height($target.height() + difference);
    };
    sizeToFitVertical = function(el, container) {
      var $target, ancestor, _i, _len, _ref;
      $target = $(el);
      if (!container) {
        container = _.find($target.parents(), function(el) {
          return $(el).css('position') === 'absolute';
        });
      }
      if (!container) {
        container = $('body')[0];
      }
      if (container) {
        _ref = $target.parentsUntil(container).get().reverse();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          ancestor = _ref[_i];
          console.log("setHeight " + ancestor);
          setHeight($(ancestor));
        }
        return setHeight($target);
      }
    };
    return DomUtils.sizeToFitVertical = sizeToFitVertical;
  });

}).call(this);
