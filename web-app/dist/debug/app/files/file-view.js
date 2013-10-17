(function() {
  App.module('FileApp', function(FileApp, App, Backbone, Marionette, $, _) {
    return FileApp.FileView = Marionette.ItemView.extend({
      tagName: 'tr',
      template: 'files/file',
      onRender: function() {
        return this.$el.data('fileId', this.model.id);
      }
    });
  });

}).call(this);
