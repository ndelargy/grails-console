(function() {
  App.module('Files', function(Files, App, Backbone, Marionette, $, _) {
    var FileView;
    FileView = Marionette.ItemView.extend({
      tagName: 'tr',
      template: 'files/file',
      onRender: function() {
        return this.$el.data('fileId', this.model.id);
      }
    });
    Files.FileCollectionView = Marionette.CompositeView.extend({
      template: 'files/file-list',
      attributes: {
        "class": 'full-height'
      },
      events: {
        'click a.name': 'onNameClick',
        'click a.delete': 'onDeleteClick'
      },
      _initialEvents: function() {
        this.listenTo(this.collection, 'add', this.addChildView);
        this.listenTo(this.collection, 'remove', this.removeItemView);
        return this.listenTo(this.collection, 'reset', this.render);
      },
      itemViewContainer: 'tbody',
      getItemView: function(item) {
        return FileView;
      },
      onNameClick: function(event) {
        var file, fileId;
        event.preventDefault();
        fileId = $(event.currentTarget).closest('tr').data("fileId");
        file = this.collection.findWhere({
          id: fileId
        });
        return this.trigger('file:selected', file);
      },
      onDeleteClick: function(event) {
        var file, fileId;
        event.preventDefault();
        fileId = $(event.currentTarget).closest('tr').data("fileId");
        file = this.collection.findWhere({
          id: fileId
        });
        if (confirm('Are you sure you want to delete this file?')) {
          return file.destroy();
        }
      },
      serializeData: function() {
        return {
          files: this.collection.toJSON()
        };
      }
    });
    return Handlebars.registerHelper('fileIcon', function(file, options) {
      var clazz;
      clazz = this.type === 'dir' ? 'fa fa-folder' : 'fa fa-file';
      return new Handlebars.SafeString("<i class='" + clazz + "'></i>");
    });
  });

}).call(this);
