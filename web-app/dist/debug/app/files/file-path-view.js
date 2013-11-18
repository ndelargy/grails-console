(function() {
  App.module('FileApp', function(FileApp, App, Backbone, Marionette, $, _) {
    FileApp.FilePathView = Marionette.ItemView.extend({
      template: 'files/file-path',
      attributes: {
        'class': 'breadcrumb-section'
      },
      events: {
        'click .breadcrumb a': 'onBreadcrumbClick'
      },
      initialize: function() {
        return this.listenTo(this.model, 'change', this.render);
      },
      onBreadcrumbClick: function(event) {
        var path;
        event.preventDefault();
        path = $(event.currentTarget).data('path');
        return this.trigger('path:selected', path);
      },
      serializeData: function() {
        return {
          baseDir: this.model.get('path')
        };
      }
    });
    return Handlebars.registerHelper('fileBreadcrumbs', function(file, options) {
      var folder, folders, html, i, path, _i, _len;
      folders = this.baseDir.slice(1).split('/');
      html = '<ol class="breadcrumb"><li><a href="#" data-path="/"><i class="fa fa-folder"></i></a></li>';
      for (i = _i = 0, _len = folders.length; _i < _len; i = ++_i) {
        folder = folders[i];
        path = '/' + folders.slice(0, +i + 1 || 9e9).join('/');
        if (i < folders.length - 1) {
          html += '<li><a href="#" data-path="' + path + '">' + folder + '</a></li>';
        } else {
          html += '<li class="active">' + folder + '</li>';
        }
      }
      html += '</ol>';
      return new Handlebars.SafeString(html);
    });
  });

}).call(this);
