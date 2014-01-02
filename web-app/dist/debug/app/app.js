(function() {
  (function($, _, Backbone, JST, window) {
    var App;
    Handlebars.registerHelper("dateFormatTime", function(context) {
      return moment(new Date(context)).format('MMM D, YYYY, h:mm a');
    });
    Marionette.Renderer.render = function(template, data) {
      return JST[template](data);
    };
    App = new (Backbone.Marionette.Application.extend({
      onStart: function(data) {
        App.headerRegion.show(new App.HeaderView);
        $(document).bind('keydown', 'Ctrl+return', function() {
          return App.trigger('app:editor:execute');
        });
        $(document).bind('keydown', 'esc', function() {
          return App.trigger('app:editor:clear');
        });
        this.showTheme();
        App.settings.on('change:theme', this.showTheme, this);
        if (Backbone != null ? Backbone.history : void 0) {
          Backbone.history.start({
            pushState: false
          });
        }
        return $('body').css('visibility', 'visible');
      },
      createLink: function(action, params) {
        var link;
        link = "" + this.data.baseUrl + "/console/" + action;
        if (params) {
          link += '?' + $.param(params, true);
        }
        return link;
      },
      showTheme: function() {
        var theme;
        theme = App.settings.get('theme');
        return $('body').attr('data-theme', theme);
      },
      savingOn: function() {
        return $('.navbar .saving').fadeIn(100);
      },
      savingOff: function() {
        return $('.navbar .saving').fadeOut(100);
      }
    }));
    App.addRegions({
      headerRegion: '#header',
      mainRegion: '#main-content'
    });
    App.on('initialize:before', function(options) {
      App.data = options;
      return App.settings = App.request('settings:entity');
    });
    App.addInitializer(function() {
      App.Editor.controller = new App.Editor.Controller;
      App.Files.controller = new App.Files.Controller;
      App.router = new App.Router();
      return App.mainRegion.show(App.Editor.controller.view);
    });
    App.on('app:file:new', function(file) {
      if (!App.Editor.controller.isDirty() || confirm('Are you sure? You have unsaved changes.')) {
        App.router.showNew();
        return App.Editor.controller.newFile();
      }
    });
    App.on('help', function() {
      var $el, view;
      view = new App.HelpView;
      $el = $('<div class="modal fade" data-backdrop="false"></div>').appendTo('body').html(view.render().el);
      $el.modal();
      return $el.on('hidden.bs.modal', function() {
        $el.remove();
        return $('.modal-backdrop').remove();
      });
    });
    return window.App = App;
  })(jQuery, _, Backbone, JST, window);

}).call(this);
