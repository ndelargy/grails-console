(function() {
  (function(App, Backbone, localStorage, JSON) {
    var localStorageKey;
    localStorageKey = "gconsole.settings";
    return App.Settings = Backbone.Model.extend({
      defaults: {
        "orientation": "vertical",
        "layout.east.size": "50%",
        "layout.south.size": "50%",
        "results.wrapText": true,
        "results.showScript": true,
        "results.showStdout": true,
        "results.showResult": true,
        "theme": "default"
      },
      toggle: function(attribute) {
        return this.set(attribute, !this.get(attribute));
      },
      save: function() {
        return localStorage.setItem(localStorageKey, JSON.stringify(this));
      },
      load: function() {
        var json;
        json = JSON.parse(localStorage.getItem(localStorageKey)) || {};
        return this.set(json);
      }
    });
  })(App, Backbone, localStorage, JSON);

}).call(this);
