(function() {
  App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
    var instance, localStorageKey;
    localStorageKey = 'gconsole.settings';
    Entities.Settings = Backbone.Model.extend({
      defaults: {
        'orientation': 'vertical',
        'layout.east.size': '50%',
        'layout.south.size': '50%',
        'results.wrapText': true,
        'results.showScript': true,
        'results.showStdout': true,
        'results.showResult': true,
        'theme': 'default'
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
    instance = void 0;
    return App.reqres.setHandler('settings:entity', function() {
      if (!instance) {
        instance = new App.Settings;
        instance.load();
      }
      return instance;
    });
  });

}).call(this);
