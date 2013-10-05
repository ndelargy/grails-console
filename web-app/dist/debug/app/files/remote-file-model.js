(function() {
  (function(App, Backbone) {
    return App.RemoteFile = Backbone.Model.extend({
      url: function() {
        return App.createLink('file') + '?path=' + this.get('id');
      }
    });
  })(App, Backbone);

}).call(this);
