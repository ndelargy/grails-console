(function() {
  App.module('Files', function(Files, App, Backbone, Marionette, $, _) {
    return Files.FileView = Marionette.ItemView.extend({
      tagName: 'tr',
      template: 'files/file',
      onRender: function() {
        return this.$el.data('fileId', this.model.id);
      }
    });
  });

}).call(this);
