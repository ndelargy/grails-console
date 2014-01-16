this["JST"] = this["JST"] || {};

this["JST"]["editor/editor"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"btn-toolbar\">\n    <button class=\"execute btn btn-sm btn-default\" title=\"Execute (Ctrl + Enter)\"><i class=\"fa fa-play fa-lg\"></i></button>\n    <button class=\"btn btn-sm btn-default new\" title=\"New\"><i class=\"fa fa-file fa-lg\"></i></button>\n    <!--<button class=\"btn btn-sm btn-default files\" title=\"Open\"><i class=\"fa fa-folder fa-lg\"></i></button>-->\n    <div class=\"btn-group\">\n        <button class=\"save btn btn-sm btn-default\" title=\"Save\"><i class=\"fa fa-save fa-lg\"></i></button>\n        <button type=\"button\" class=\"btn btn-sm btn-default dropdown-toggle\" data-toggle=\"dropdown\">\n            <span class=\"caret\"></span>\n            <span class=\"sr-only\">Toggle Dropdown</span>\n        </button>\n        <ul class=\"dropdown-menu\" role=\"menu\">\n            <li><a href=\"#\" class=\"save-as\">Save as...</a></li>\n        </ul>\n    </div>\n</div>\n<div id=\"code-wrapper\" class=\"ui-layout-content\">\n    <textarea name=\"code\" rows=\"25\" cols=\"100\"></textarea>\n</div>";
  });

this["JST"]["editor/result"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n    <div class=\"loading\"><i class=\"fa fa-refresh fa-spin\"></i></div>\n";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, depth0.input, {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, depth0.output, {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <div class=\"result\">≫ ";
  if (stack1 = helpers.result) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.result; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <span class=\"result-time label label-default pull-right\">";
  if (stack1 = helpers.totalTime) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.totalTime; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " ms</span>\n      <div class=\"input\">";
  if (stack1 = helpers.input) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.input; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n    ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <div class=\"output\">";
  if (stack1 = helpers.output) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.output; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n    ";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, depth0.loading, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["JST"]["editor/results"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"btn-toolbar\">\n    <a class=\"clear btn btn-sm btn-default\" href=\"#\" title=\"Clear (Esc)\"><i class=\"fa fa-eraser fa-lg\"></i></a>\n</div>\n\n<div class=\"script-result-section\"><div class=\"inner\"></div></div>";
  });

this["JST"]["files/files-section"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"modal-content\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" aria-hidden=\"true\">&times;</button>\n        <h4 class=\"modal-title\">Save as</h4>\n    </div>\n\n    <div class=\"modal-body\">\n        <div class=\"files-header\">\n            <div class=\"section\">\n                <form class=\"form-horizontal file-info\">\n                    <input class=\"file-name form-control\" type=\"text\" placeholder=\"File name\"/>\n                </form>\n            </div>\n        </div>\n        <div class=\"files-body\">\n            <div class=\"store\">\n            </div>\n        </div>\n\n    </div>\n\n    <div class=\"modal-footer\">\n        <button type=\"button\" class=\"cancel btn btn-primary\">Cancel</button>\n        <button type=\"button\" class=\"save btn btn-primary\">Save</button>\n    </div>\n</div>";
  });

this["JST"]["files/scripts"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  
  return "<a href=\"#\" class=\"up\">../</a>";
  }

function program3(depth0,data) {
  
  
  return "\n      <div class=\"loading\"><i class=\"fa fa-refresh fa-spin\"></i></div>\n  ";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, depth0.files, {hash:{},inverse:self.program(9, program9, data),fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <ul class=\"files\">\n          ";
  stack1 = helpers.each.call(depth0, depth0.files, {hash:{},inverse:self.noop,fn:self.programWithDepth(7, program7, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </ul>\n    ";
  return buffer;
  }
function program7(depth0,data,depth1) {
  
  var buffer = "", stack1, options;
  buffer += "\n              <li data-file-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                ";
  options = {hash:{
    'linkFiles': (depth1.linkFiles),
    'showDelete': (depth1.showDelete)
  },data:data};
  buffer += escapeExpression(((stack1 = helpers.scriptsFileItem || depth1.scriptsFileItem),stack1 ? stack1.call(depth0, depth0, options) : helperMissing.call(depth0, "scriptsFileItem", depth0, options)))
    + "\n              </li>\n          ";
  return buffer;
  }

function program9(depth0,data) {
  
  
  return "\n        <div class=\"message\">No files</div>\n    ";
  }

  buffer += "<div class=\"btn-toolbar\">\n    <div class=\"btn-group\">\n        <button type=\"button\" class=\"btn btn-sm dropdown-toggle\" data-toggle=\"dropdown\">\n          ";
  if (stack1 = helpers.store) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.store; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n            <span class=\"caret\"></span>\n        </button>\n        <ul class=\"dropdown-menu store\" role=\"menu\">\n            <li><a href=\"#\" data-store=\"local\">Local Storage</a></li>\n            <li><a href=\"#\" data-store=\"remote\">Remote Storage</a></li>\n        </ul>\n    </div>\n</div>\n<div class=\"folder \">\n  ";
  stack1 = helpers['if'].call(depth0, depth0.hasUp, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<span title=\"";
  if (stack1 = helpers.path) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.path; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.currentDir) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.currentDir; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/</span>\n</div>\n<div class=\"files-wrapper\">\n  ";
  stack1 = helpers['if'].call(depth0, depth0.loading, {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  });

this["JST"]["main/content"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"outer-west\"></div>\n<div class=\"outer-center full-height\">\n  <div class=\"center\"><div id=\"editor\"></div></div>\n  <div class=\"east results\"></div>\n  <div class=\"south\"></div>\n</div>";
  });

this["JST"]["main/header"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<span class=\"navbar-brand\">Grails Debug Console</span>\n<p class=\"navbar-text title\"><span></span><i class=\"saving fa fa-refresh fa-spin\" style=\"display: none\"></i></p>\n<form class=\"navbar-form pull-right\">\n    <div class=\"btn-group settings-btn-group\">\n        <button class=\"clear btn-sm btn btn-default dropdown-toggle\" title=\"(Esc)\" data-toggle=\"dropdown\">\n            <i class=\"fa fa-cog\"></i>\n            <span class=\"caret\"></span>\n        </button>\n    </div>\n</form>\n";
  });

this["JST"]["main/help-modal"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <tr><td><code>"
    + escapeExpression(((stack1 = ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</code></td><td>"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</td></tr>\n            ";
  return buffer;
  }

  buffer += "<div class=\"modal-content help-section\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n        <h4 class=\"modal-title\">Help</h4>\n    </div>\n\n    <div class=\"modal-body\">\n        <h4>Implicit variables</h4>\n        <table class=\"table\">\n            ";
  stack1 = helpers.each.call(depth0, depth0.implicitVars, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </table>\n        <h4>Shortcuts</h4>\n        <table class=\"table\">\n            <tr><td><code>Ctrl-Enter</code></td><td>Execute</td></tr>\n            <tr><td><code>Esc</code></td><td>Clear</td></tr>\n        </table>\n    </div>\n\n    <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\">Close</button>\n    </div>\n</div>\n\n\n";
  return buffer;
  });

this["JST"]["main/settings"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<li role=\"presentation\" class=\"dropdown-header\">Layout</li>\n<li><a href=\"#\" class=\"setting orientation-horizontal\"><i class=\"fa fa-check\"></i> Horizontal</a></li>\n<li><a href=\"#\" class=\"setting orientation-vertical\"><i class=\"fa fa-check\"></i> Vertical</a></li>\n<li role=\"presentation\" class=\"divider\"></li>\n<li role=\"presentation\" class=\"dropdown-header\">Results Pane</li>\n<li><a href=\"#\" class=\"setting results-wrap\"><i class=\"fa fa-check\"></i> Wrap text</a></li>\n<li role=\"presentation\" class=\"divider\"></li>\n<li role=\"presentation\" class=\"dropdown-header\">Theme</li>\n<li><a href=\"#\" class=\"setting theme\" data-theme=\"default\"><i class=\"fa fa-check\"></i> Light</a></li>\n<li><a href=\"#\" class=\"setting theme\" data-theme=\"lesser-dark\"><i class=\"fa fa-check\"></i> Dark</a></li>\n<li role=\"presentation\" class=\"divider\"></li>\n<li><a href=\"#\" class=\"help\"><i class=\"fa fa-check\"></i> Help</a></li>";
  });
(function() {
  (function($, _, Backbone, window) {
    var App;
    Handlebars.registerHelper("dateFormatTime", function(context) {
      return moment(new Date(context)).format('MMM D, YYYY, h:mm a');
    });
    Marionette.Renderer.render = function(template, data) {
      return JST[template](data);
    };
    App = new (Backbone.Marionette.Application.extend({
      onStart: function(data) {
        App.headerRegion.show(new App.Main.HeaderView);
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
      var contentView;
      App.Editor.controller = new App.Editor.Controller;
      App.Files.controller = new App.Files.Controller;
      App.router = new App.Main.Router();
      contentView = new App.Main.ContentView({
        editorView: App.Editor.controller.editorView,
        resultsView: App.Editor.controller.resultsView,
        scriptsView: App.Files.controller.scriptsView
      });
      App.mainRegion.show(contentView);
      return contentView.refresh();
    });
    App.on('app:file:new', function(file) {
      if (!App.Editor.controller.isDirty() || confirm('Are you sure? You have unsaved changes.')) {
        App.router.showNew();
        return App.Editor.controller.newFile();
      }
    });
    App.on('file:deleted', function(file) {
      if (App.Editor.controller.file.id === file.id) {
        App.router.showNew();
        return App.Editor.controller.newFile();
      }
    });
    App.on('file:created', function(file) {
      return App.Files.controller.scriptsView.collection.fetchByStoreAndPath(file.store, file.getParent());
    });
    App.on('help', function() {
      var $el, view;
      view = new App.Main.HelpView;
      $el = $('<div class="modal fade" data-backdrop="false"></div>').appendTo('body').html(view.render().el);
      $el.modal();
      return $el.on('hidden.bs.modal', function() {
        $el.remove();
        return $('.modal-backdrop').remove();
      });
    });
    return window.App = App;
  })(jQuery, _, Backbone, window);

}).call(this);

(function() {
  App.module('Main', function(Main, App, Backbone, Marionette, $, _) {
    return Main.ContentView = Backbone.Marionette.Layout.extend({
      template: 'main/content',
      attributes: {
        "class": 'full-height'
      },
      regions: {
        centerRegion: '.center',
        westRegion: '.outer-west'
      },
      initialize: function(options) {
        var _this = this;
        this.listenTo(App.settings, 'change:orientation', this.showOrientation);
        this.editorView = options.editorView;
        this.resultsView = options.resultsView;
        this.scriptsView = options.scriptsView;
        this.listenTo(this.editorView, 'render', function() {
          return _this.layout.initContent('center');
        });
        return this.listenTo(this.scriptsView, 'render', function() {
          return _this.layoutOuter.initContent('west');
        });
      },
      onRender: function() {
        this.initLayout();
        this.centerRegion.show(this.editorView);
        this.westRegion.show(this.scriptsView);
        this.resultsView.render();
        return this.showOrientation();
      },
      refresh: function() {
        this.editorView.refresh();
        this.layoutOuter.resizeAll();
        this.layout.resizeAll();
        return this.showOrientation();
      },
      initLayout: function() {
        var _this = this;
        this.layoutOuter = this.$el.layout({
          center__paneSelector: '.outer-center',
          west__paneSelector: '.outer-west',
          west__contentSelector: '.files-wrapper',
          west__size: App.settings.get('layout.west.size'),
          west__onresize_end: function(name, $el, state, opts) {
            App.settings.set('layout.west.size', state.size);
            return App.settings.save();
          },
          resizable: true,
          findNestedContent: true,
          fxName: '',
          spacing_open: 3,
          spacing_closed: 3,
          slidable: false
        });
        return this.layout = this.$('.outer-center').layout({
          center__paneSelector: '.center',
          center__contentSelector: '#code-wrapper',
          center__onresize: function() {
            return _this.editorView.refresh();
          },
          east__paneSelector: '.east',
          east__contentSelector: '.script-result-section',
          east__initHidden: App.settings.get('orientation') !== 'vertical',
          east__size: App.settings.get('layout.east.size'),
          east__onresize_end: function(name, $el, state, opts) {
            App.settings.set('layout.east.size', state.size);
            return App.settings.save();
          },
          east__resizerCursor: 'ew-resize',
          south__paneSelector: '.south',
          south__contentSelector: '.script-result-section',
          south__initHidden: App.settings.get('orientation') !== 'horizontal',
          south__size: App.settings.get('layout.south.size'),
          south__onresize_end: function(name, $el, state, opts) {
            App.settings.set('layout.south.size', state.size);
            return App.settings.save();
          },
          south__resizerCursor: 'ns-resize',
          resizable: true,
          findNestedContent: true,
          fxName: '',
          spacing_open: 3,
          spacing_closed: 3,
          slidable: false
        });
      },
      showOrientation: function() {
        var orientation;
        orientation = App.settings.get('orientation');
        if (orientation === 'vertical') {
          this.$('.east').append(this.resultsView.el);
          this.layout.hide('south');
          this.layout.show('east');
          this.layout.initContent('east');
        } else {
          this.$('.south').append(this.resultsView.el);
          this.layout.hide('east');
          this.layout.show('south');
          this.layout.initContent('south');
        }
        return this.editorView.refresh();
      }
    });
  });

}).call(this);

(function() {
  App.module('Main', function(Main, App, Backbone, Marionette, $, _) {
    return Main.HeaderView = Backbone.Marionette.ItemView.extend({
      template: 'main/header',
      attributes: {
        "class": 'navbar navbar-fixed-top'
      },
      initialize: function() {
        return this.listenTo(App, 'file:show', function(file) {
          var name;
          name = file.get('name');
          if (name) {
            return this.$('.title span').html(name).show();
          } else {
            return this.$('.title span').hide();
          }
        });
      },
      onRender: function() {
        this.settingsView = new Main.SettingsView({
          model: App.settings
        });
        this.$('.settings-btn-group').append(this.settingsView.render().$el);
        return this.settingsView.render();
      },
      onClose: function() {
        return this.settingsView.close();
      }
    });
  });

}).call(this);

(function() {
  App.module('Main', function(Main, App, Backbone, Marionette, $, _) {
    return Main.HelpView = Backbone.Marionette.ItemView.extend({
      template: 'main/help-modal',
      className: 'modal-dialog',
      serializeData: function() {
        return {
          implicitVars: App.data.implicitVars
        };
      }
    });
  });

}).call(this);

(function() {
  App.module('Main', function(Main, App, Backbone, Marionette, $, _) {
    return Main.Router = Backbone.Router.extend({
      initialize: function() {
        this.route('*path', 'newFile');
        this.route('new', 'newFile');
        this.route(/^local:(.*?)$/, 'openLocalFile');
        return this.route(/^remote:(.*?)$/, 'openRemoteFile');
      },
      showFile: function(file) {
        return this.navigate("" + file.store + ":" + file.id);
      },
      showNew: function() {
        return this.navigate('new');
      },
      newFile: function() {
        return App.Editor.controller.newFile();
      },
      openLocalFile: function(name) {
        return App.Editor.controller.openFile('local', name);
      },
      openRemoteFile: function(name) {
        return App.Editor.controller.openFile('remote', name);
      }
    });
  });

}).call(this);

(function() {
  App.module('Main', function(Main, App, Backbone, Marionette, $, _) {
    return Main.SettingsView = Backbone.Marionette.ItemView.extend({
      template: 'main/settings',
      events: {
        'click .setting': 'onSettingClick',
        'click .help': 'onHelpClick'
      },
      tagName: 'ul',
      attributes: {
        'class': 'dropdown-menu pull-right settings',
        'role': 'menu'
      },
      initialize: function() {
        return this.listenTo(this.model, 'change', this.render);
      },
      onRender: function() {
        var _this = this;
        this.$('.orientation-horizontal').toggleClass('selected', this.model.get('orientation') === 'horizontal');
        this.$('.orientation-vertical').toggleClass('selected', this.model.get('orientation') === 'vertical');
        this.$('.results-wrap').toggleClass('selected', this.model.get('results.wrapText'));
        return this.$('.theme').each(function(index, el) {
          var $el;
          $el = $(el);
          return $el.toggleClass('selected', _this.model.get('theme') === $el.data('theme'));
        });
      },
      onSettingClick: function(event) {
        var $el;
        event.preventDefault();
        event.stopPropagation();
        $el = $(event.currentTarget);
        switch (false) {
          case !$el.is('.orientation-horizontal'):
            this.model.set('orientation', 'horizontal');
            break;
          case !$el.is('.orientation-vertical'):
            this.model.set('orientation', 'vertical');
            break;
          case !$el.is('.results-wrap'):
            this.model.toggle('results.wrapText');
            break;
          case !$el.is('.theme'):
            this.model.set('theme', $el.data('theme'));
        }
        return this.model.save();
      },
      onHelpClick: function(event) {
        event.preventDefault();
        return App.trigger('help');
      }
    });
  });

}).call(this);

(function() {
  App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
    Entities.FileCollection = Backbone.Collection.extend({
      model: function(attrs, options) {
        var file;
        file = new Entities.File(attrs, options);
        file.store = options.collection.store;
        return file;
      },
      comparator: function(file) {
        return file.get('name');
      },
      store: 'local',
      path: '/',
      getParent: function() {
        var newPath, tokens;
        tokens = this.path.split('/');
        newPath = tokens.slice(0, tokens.length - 1).join('/');
        if (!newPath) {
          newPath = '/';
        }
        return newPath;
      },
      fetchByStoreAndPath: function(store, path) {
        this.store = store;
        this.path = path;
        this.trigger('fetching');
        return this.fetch({
          reset: true
        });
      },
      up: function() {
        return this.fetchByStoreAndPath(this.store, this.getParent());
      },
      sync: function(method, file, options) {
        var url;
        if (this.store === 'local') {
          return Entities.localFileStore.sync(method, file, options);
        } else {
          url = App.createLink('listFiles', {
            path: this.path
          });
          return Backbone.sync(method, file, _.extend({
            url: url
          }, options));
        }
      }
    });
    return App.reqres.setHandler('file:entity', function(store, path) {
      var file;
      file = new Entities.File({
        id: path
      });
      file.store = store;
      return file.fetch().pipe(function() {
        return file;
      });
    });
  });

}).call(this);

(function() {
  App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
    return Entities.File = Backbone.Model.extend({
      defaults: {
        text: ''
      },
      getAbsolutePath: function() {
        return this.id;
      },
      getParent: function() {
        var parent, tokens;
        tokens = this.id.split('/');
        parent = tokens.slice(0, tokens.length - 1).join('/');
        return parent;
      },
      isDirectory: function() {
        return this.get('type') === 'dir';
      },
      isFile: function() {
        return this.get('type') === 'file';
      },
      sync: function(method, file, options) {
        var url;
        if (file.store === 'local') {
          return Entities.localFileStore.sync(method, file, options);
        } else {
          url = file.isNew() ? App.createLink('file') : App.createLink('file', {
            path: file.get('id')
          });
          return Backbone.sync(method, file, _.extend({
            url: url
          }, options));
        }
      }
    });
  });

}).call(this);

(function() {
  App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
    Entities.LocalFileStore = (function() {
      function LocalFileStore(name) {
        this.name = name;
        this._load();
      }

      LocalFileStore.prototype.list = function() {
        return new Entities.FileCollection(this.fetch());
      };

      LocalFileStore.prototype.fetch = function() {
        return _.values(this.data);
      };

      LocalFileStore.prototype.find = function(file) {
        return this.data[file.id];
      };

      LocalFileStore.prototype.create = function(file) {
        file.set('lastModified', new Date().getTime());
        file.set('id', file.get('path') + file.get('name'));
        this.data[file.id] = file.toJSON();
        this._save();
        return file.toJSON();
      };

      LocalFileStore.prototype.update = function(file) {
        file.set('lastModified', new Date().getTime());
        this.data[file.id] = file.toJSON();
        this._save();
        return file.toJSON();
      };

      LocalFileStore.prototype.destroy = function(file) {
        delete this.data[file.id];
        this._save();
        return file.toJSON();
      };

      LocalFileStore.prototype.destroyAll = function() {
        this.data = {};
        return localStorage.removeItem(this.name);
      };

      LocalFileStore.prototype._save = function() {
        return localStorage.setItem(this.name, JSON.stringify(this.data));
      };

      LocalFileStore.prototype._load = function() {
        var e, file, id, store, _ref, _ref1, _results;
        store = localStorage.getItem(this.name);
        try {
          this.data = (_ref = JSON.parse(store)) != null ? _ref : {};
        } catch (_error) {
          e = _error;
          this.data = {};
        }
        _ref1 = this.data;
        _results = [];
        for (id in _ref1) {
          file = _ref1[id];
          _results.push(file.type = 'file');
        }
        return _results;
      };

      LocalFileStore.prototype.sync = function(method, file, options) {
        var dfd, resp;
        resp = void 0;
        switch (method) {
          case 'read':
            resp = file.id ? this.find(file) : this.fetch();
            break;
          case 'create':
            resp = this.create(file);
            break;
          case 'update':
            resp = this.update(file);
            break;
          case 'delete':
            resp = this.destroy(file);
        }
        dfd = $.Deferred();
        dfd.resolveWith(this, [resp]);
        if (resp) {
          if (options != null) {
            if (typeof options.success === "function") {
              options.success(resp);
            }
          }
        } else {
          if (options != null) {
            if (typeof options.error === "function") {
              options.error('Record not found');
            }
          }
        }
        return dfd;
      };

      return LocalFileStore;

    })();
    return App.on('initialize:before', function(options) {
      return Entities.localFileStore = new Entities.LocalFileStore('gconsole.files');
    });
  });

}).call(this);

(function() {
  App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
    var instance, localStorageKey;
    localStorageKey = 'gconsole.settings';
    Entities.Settings = Backbone.Model.extend({
      defaults: {
        'orientation': 'vertical',
        'layout.west.size': 250,
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
        instance = new Entities.Settings;
        instance.load();
      }
      return instance;
    });
  });

}).call(this);

(function() {
  App.module('Editor', function(Editor, App, Backbone, Marionette, $, _) {
    return Editor.Controller = Marionette.Controller.extend({
      initialize: function(options) {
        var _this = this;
        $(window).on("beforeunload", function(event) {
          if (_this.isDirty()) {
            return "You have unsaved changes.";
          }
        });
        this.editorView = new Editor.EditorView();
        this.listenTo(this.editorView, 'execute', function(result) {
          return this.resultCollection.add(result);
        });
        this.listenTo(this.editorView, 'save', this.save);
        this.listenTo(this.editorView, 'saveAs', this.saveAs);
        this.resultCollection = new Editor.ResultCollection();
        this.resultsView = new Editor.ResultCollectionView({
          collection: this.resultCollection
        });
        return this.listenTo(App, 'app:editor:clear', function() {
          return this.resultCollection.reset();
        });
      },
      newFile: function() {
        var file;
        file = new App.Entities.File;
        return this.showFile(file);
      },
      openFile: function(store, name) {
        var dfd,
          _this = this;
        dfd = App.request('file:entity', store, name);
        dfd.done(function(file) {
          _this.showFile(file);
          return App.trigger('file:opened', file);
        });
        return dfd.fail(function() {
          alert('no find file');
          return _this.newFile();
        });
      },
      showFile: function(file) {
        App.trigger('file:show', file);
        this.file = file;
        this.editorView.refresh();
        return this.editorView.setValue(file.get('text'));
      },
      save: function(text) {
        var _this = this;
        this.file.set('text', text);
        if (this.file.isNew()) {
          return this.saveAs(text);
        } else {
          App.savingOn();
          return this.file.save().then(function() {
            return App.savingOff();
          });
        }
      },
      saveAs: function(text) {
        var _this = this;
        return App.Files.controller.promptForNewFileName().done(function(store, path, name) {
          var file;
          if (store) {
            file = new App.Entities.File({
              text: text,
              name: name,
              path: path,
              type: 'file'
            });
            file.store = store;
            App.savingOn();
            return file.save().then(function() {
              App.savingOff();
              _this.showFile(file);
              App.router.showFile(file);
              return App.trigger('file:created', _this.file);
            });
          }
        });
      },
      isDirty: function() {
        return this.file.get('text') !== this.editorView.getValue();
      }
    });
  });

}).call(this);

(function() {
  App.module('Editor', function(Editor, App, Backbone, Marionette, $, _) {
    return Editor.EditorView = Marionette.ItemView.extend({
      template: 'editor/editor',
      events: {
        'click button.execute': 'onExecuteClick',
        'click button.new': 'onNewClick',
        'click button.save': 'onSaveClick',
        'click a.save-as': 'onSaveAsClick'
      },
      initialize: function() {
        return this.listenTo(App, 'app:editor:execute', this.executeCode);
      },
      attributes: {
        id: 'editor'
      },
      onRender: function() {
        return this.initEditor();
      },
      onNewClick: function(event) {
        event.preventDefault();
        return App.trigger('app:file:new');
      },
      initEditor: function() {
        var _this = this;
        this.editor = CodeMirror.fromTextArea(this.$("textarea[name=code]")[0], {
          matchBrackets: true,
          mode: "groovy",
          lineNumbers: true,
          extraKeys: {
            'Ctrl-Enter': function() {
              return _this.executeCode();
            },
            'Esc': function() {
              return App.trigger('app:editor:clear');
            }
          },
          theme: "lesser-dark"
        });
        this.editor.focus();
        this.editor.setValue('');
        this.listenTo(App.settings, 'change:theme', this.setTheme);
        return this.setTheme();
      },
      setTheme: function() {
        return this.editor.setOption('theme', App.settings.get('theme'));
      },
      getValue: function() {
        return this.editor.getValue();
      },
      setValue: function(value) {
        return this.editor.setValue(value);
      },
      refresh: function() {
        return this.editor.refresh();
      },
      setValue: function(text) {
        this.editor.setValue(text);
        this.editor.refresh();
        return this.editor.focus();
      },
      onSaveClick: function() {
        return this.trigger('save', this.editor.getValue());
      },
      onSaveAsClick: function(event) {
        event.preventDefault();
        return this.trigger('saveAs', this.editor.getValue());
      },
      onExecuteClick: function(event) {
        event.preventDefault();
        return this.executeCode();
      },
      executeCode: function() {
        var jqxhr, result;
        result = new Editor.Result({
          loading: true,
          input: this.getValue()
        });
        this.trigger('execute', result);
        jqxhr = $.post(App.createLink('execute'), {
          code: this.getValue()
        });
        jqxhr.done(function(response) {
          return result.set({
            loading: false,
            totalTime: response.totalTime,
            exception: response.exception,
            result: response.result,
            output: response.output
          });
        });
        return jqxhr.fail(function() {
          return result.set({
            loading: false,
            error: 'An error occurred.'
          });
        });
      },
      onShow: function() {
        return this.editor.focus();
      }
    });
  });

}).call(this);

(function() {
  App.module('Editor', function(Editor, App, Backbone, Marionette, $, _) {
    return Editor.ResultCollectionView = Marionette.CompositeView.extend({
      template: 'editor/results',
      itemViewContainer: '.inner',
      events: {
        'click .clear': 'onClearClick'
      },
      getItemView: function(item) {
        return Editor.ResultView;
      },
      onAfterItemAdded: function(itemView) {
        return this.scrollToResultView(itemView);
      },
      initialize: function() {
        this.listenTo(App.settings, 'change:results.wrapText', this.setWrap);
        return this.listenTo(this, 'itemview:complete', this.scrollToResultView);
      },
      scrollToResultView: function(resultView) {
        var scroll;
        scroll = resultView.$el.position().top + this.$('.script-result-section').scrollTop();
        return this.$('.script-result-section').animate({
          scrollTop: scroll
        });
      },
      setWrap: function() {
        return this.$('.script-result-section').toggleClass('wrap', App.settings.get('results.wrapText'));
      },
      onRender: function() {
        return this.setWrap();
      },
      onClearClick: function(event) {
        event.preventDefault();
        return App.trigger('app:editor:clear');
      }
    });
  });

}).call(this);

(function() {
  App.module('Editor', function(Editor, App, Backbone, Marionette, $, _) {
    return Editor.ResultCollection = Backbone.Collection.extend({
      model: function(attrs, options) {
        return new Editor.Result(attrs, options);
      }
    });
  });

}).call(this);

(function() {
  App.module('Editor', function(Editor, App, Backbone, Marionette, $, _) {
    return Editor.Result = Backbone.Model.extend({
      isSuccess: function() {
        return !this.get("exception") && !this.get("error");
      }
    });
  });

}).call(this);

(function() {
  App.module('Editor', function(Editor, App, Backbone, Marionette, $, _) {
    return Editor.ResultView = Marionette.ItemView.extend({
      template: 'editor/result',
      attributes: {
        "class": 'script-result'
      },
      modelEvents: {
        change: 'render'
      },
      onRender: function() {
        if (!this.model.get('loading')) {
          if (!this.model.isSuccess()) {
            this.$el.addClass('stacktrace');
          }
          return this.trigger('complete');
        }
      },
      serializeData: function() {
        return {
          loading: this.model.get('loading'),
          totalTime: this.model.get('totalTime'),
          input: this.formattedInput(),
          output: this.formattedOutput(),
          result: this.model.get('exception') || this.model.get('error') || this.model.get('result')
        };
      },
      formattedInput: function() {
        return this.model.get('input').replace(/^/gm, '> ');
      },
      formattedOutput: function() {
        if (this.model.get('output')) {
          return this.model.get('output').replace(/^/gm, '  ');
        } else {
          return null;
        }
      }
    });
  });

}).call(this);

(function() {
  App.module('Files', function(Files, App, Backbone, Marionette, $, _) {
    var showInModal;
    showInModal = function(view) {
      var $el;
      $el = $('<div class="modal" data-backdrop="false"></div>').appendTo('body').html(view.render().el);
      $el.modal({
        show: false
      });
      $el.on('shown.bs.modal', function() {
        return view.resize();
      });
      $el.find('.modal-content').draggable({
        handle: '.modal-header',
        addClasses: false
      });
      $el.find('.modal-header').css('cursor', 'move');
      $el.find('.modal-content').resizable({
        addClasses: false,
        resize: function(event, ui) {
          return view.resize();
        },
        stop: function(event, ui) {}
      });
      $el.find('.modal-header .close').on('click', function(event) {
        event.preventDefault();
        return view.close();
      });
      $el.find('.modal-footer .cancel').on('click', function(event) {
        event.preventDefault();
        return view.close();
      });
      view.on('close', function() {
        return $el.modal('hide');
      });
      $el.on('hidden.bs.modal', function() {
        return $el.remove();
      });
      $el.modal('show');
      return $el;
    };
    return Files.Controller = Marionette.Controller.extend({
      initialize: function() {
        var _this = this;
        this.collection = new App.Entities.FileCollection();
        this.collection.fetch();
        this.listenTo(App, 'file:opened', function(file) {
          return _this.collection.fetchByStoreAndPath(file.store, file.getParent());
        });
        this.listenTo(App, 'file:created', function(file) {
          var collection;
          file = App.Editor.controller.file;
          collection = this.collection;
          if (file.getParent() === collection.path && file.store === collection.store) {
            return collection.fetch();
          }
        });
        this.scriptsView = new Files.ScriptsView({
          collection: this.collection
        });
        return this.listenTo(this.scriptsView, 'file:selected', function(file) {
          if (!App.Editor.controller.isDirty() || confirm('Are you sure? You have unsaved changes.')) {
            return file.fetch().done(function() {
              App.Editor.controller.showFile(file);
              return App.router.showFile(file);
            });
          }
        });
      },
      promptForNewFileName: function() {
        var dfd, path, store, view;
        dfd = $.Deferred();
        if (App.Editor.controller.file.isNew()) {
          store = App.Files.controller.scriptsView.collection.store;
          path = App.Files.controller.scriptsView.collection.path;
        } else {
          store = App.Editor.controller.file.store;
          path = App.Editor.controller.file.getParent();
        }
        view = new Files.FilesSectionView({
          store: store,
          path: path
        });
        showInModal(view);
        view.$el.find('.file-name').focus();
        view.on('save', function(store, path, name) {
          dfd.resolveWith(null, [store, path, name]);
          return view.close();
        });
        view.on('file:selected', function(file) {
          return view.setName(file.get('name'));
        });
        view.on('close', function() {
          return dfd.resolve();
        });
        return dfd.promise();
      }
    });
  });

}).call(this);

(function() {
  App.module('Files', function(Files, App, Backbone, Marionette, $, _) {
    return Files.FilesSectionView = Marionette.Layout.extend({
      template: 'files/files-section',
      regions: {
        filePathRegion: '.file-path-region',
        storeRegion: '.store'
      },
      attributes: {
        'class': 'modal-dialog files-section-view'
      },
      events: {
        'click button.save': 'onSave'
      },
      initialize: function(options) {
        this.collection = new App.Entities.FileCollection();
        this.collection.store = options.store;
        this.collection.path = options.path;
        this.collection.fetch();
        this.scriptsView = new Files.ScriptsView({
          collection: this.collection,
          showDelete: false
        });
        this.listenTo(this.scriptsView, 'render', this.resize);
        return this.listenTo(this.scriptsView, 'file:selected', this.onFileSelected);
      },
      onRender: function() {
        return this.storeRegion.show(this.scriptsView);
      },
      onFileSelected: function(file) {
        return this.setName(file.get('name'));
      },
      resize: function() {
        var filesBodyHeight, filesWrapperHeight, modalBodyHeight;
        if (this.$el.is(':visible')) {
          modalBodyHeight = this.$('.modal-content').height() - this.$('.modal-header').outerHeight() - this.$('.modal-footer').outerHeight();
          this.$('.modal-body').height(modalBodyHeight);
          filesBodyHeight = modalBodyHeight - this.$('.files-header').outerHeight();
          this.$('.files-body').height(filesBodyHeight);
          this.$('.files-body div.store').height(filesBodyHeight);
          this.$('.files-body div.store .scripts').height(filesBodyHeight);
          filesWrapperHeight = filesBodyHeight - this.$('.files-body div.store .scripts > .btn-toolbar').outerHeight() - this.$('.files-body div.store .scripts > .folder').outerHeight();
          return this.$('.files-body div.store .scripts > .files-wrapper').height(filesWrapperHeight);
        }
      },
      onSave: function(event) {
        var fileName, path, store;
        event.preventDefault();
        fileName = this.$('input.file-name').val();
        store = this.collection.store;
        path = this.collection.path;
        if (path[path.length - 1] !== '/') {
          path += '/';
        }
        return this.trigger('save', store, path, fileName);
      },
      setName: function(name) {
        return this.$('input.file-name').val(name);
      }
    });
  });

}).call(this);

(function() {
  App.module('Files', function(Files, App, Backbone, Marionette, $, _) {
    Files.ScriptsView = Marionette.ItemView.extend({
      template: 'files/scripts',
      attributes: {
        "class": 'scripts'
      },
      events: {
        'click li .name a': 'onNameClick',
        'click li a.delete': 'onDeleteClick',
        'click ul.store a': 'onStoreClick',
        'click .up': 'onUpClick'
      },
      initialize: function(options) {
        var _ref,
          _this = this;
        this.lastPaths = {};
        this.showDelete = (_ref = options.showDelete) != null ? _ref : true;
        this.listenTo(this.collection, 'fetching', function() {
          _this.loading = true;
          return _this.render();
        });
        return this.listenTo(this.collection, 'add remove reset', function() {
          _this.loading = false;
          return _this.render();
        });
      },
      onNameClick: function(event) {
        var file, fileId;
        event.preventDefault();
        fileId = $(event.currentTarget).closest('li').data('fileId');
        file = this.collection.findWhere({
          id: fileId
        });
        if (file.isDirectory()) {
          return this.collection.fetchByStoreAndPath(file.store, file.getAbsolutePath());
        } else {
          return this.trigger('file:selected', file);
        }
      },
      onStoreClick: function(event) {
        var path, store, _ref;
        event.preventDefault();
        this.lastPaths[this.collection.store] = this.collection.path;
        store = $(event.currentTarget).data('store');
        path = (_ref = this.lastPaths[store]) != null ? _ref : '/';
        return this.collection.fetchByStoreAndPath(store, path);
      },
      onUpClick: function(event) {
        event.preventDefault();
        return this.collection.up();
      },
      onDeleteClick: function(event) {
        var file, fileId,
          _this = this;
        event.preventDefault();
        fileId = $(event.currentTarget).closest('li').data('fileId');
        file = this.collection.findWhere({
          id: fileId
        });
        if (confirm('Are you sure you want to delete this file?')) {
          return file.destroy().done(function() {
            return App.trigger('file:deleted', file);
          });
        }
      },
      serializeData: function() {
        var currentDir, tokens;
        tokens = this.collection.path.split('/');
        currentDir = tokens[tokens.length - 1];
        return {
          files: this.collection.toJSON(),
          path: this.collection.path,
          currentDir: currentDir,
          hasUp: this.collection.path.length > 1,
          store: this.collection.store === 'local' ? 'Local Storage' : 'Remote Storage',
          showDelete: this.showDelete,
          loading: this.loading
        };
      }
    });
    Handlebars.registerHelper('scriptsFileIcon', function(file, options) {
      var clazz;
      clazz = this.type === 'dir' ? 'fa fa-folder-o' : 'fa fa-file-o';
      return new Handlebars.SafeString("<i class='" + clazz + "'></i>");
    });
    return Handlebars.registerHelper('scriptsFileItem', function(file, options) {
      var html, iconClass, showDelete;
      showDelete = options.hash.showDelete;
      iconClass = this.type === 'dir' ? 'fa fa-folder-o' : 'fa fa-file-o';
      html = "<div class='name'><i class='" + iconClass + "'></i><a class='name' href='#'>" + file.name + "</a></div>";
      if (showDelete && this.type === 'file') {
        html += '<a class="delete" href="#">×</a>';
      }
      return new Handlebars.SafeString(html);
    });
  });

}).call(this);
