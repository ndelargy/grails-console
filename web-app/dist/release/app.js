this["JST"] = this["JST"] || {};

this["JST"]["editor/editor-section"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"editor\" style=\"display: none\"></div>\n<div class=\"east results\" style=\"display: none\"></div>\n<div class=\"south\" style=\"display: none\"></div>";
  });

this["JST"]["editor/editor"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"btn-toolbar\">\n    <button class=\"execute btn btn-sm btn-default\" title=\"Execute (Ctrl + Enter)\"><i class=\"fa fa-play\"></i></button>\n    <button class=\"btn btn-sm btn-default new\" title=\"New\"><i class=\"fa fa-file\"></i></button>\n    <button class=\"btn btn-sm btn-default files\" title=\"Open\"><i class=\"fa fa-folder\"></i></button>\n    <div class=\"btn-group\">\n        <button class=\"save btn btn-sm btn-default\" title=\"Save\"><i class=\"fa fa-save\"></i></button>\n        <button type=\"button\" class=\"btn btn-sm btn-default dropdown-toggle\" data-toggle=\"dropdown\">\n            <span class=\"caret\"></span>\n            <span class=\"sr-only\">Toggle Dropdown</span>\n        </button>\n        <ul class=\"dropdown-menu\" role=\"menu\">\n            <li><a href=\"#\" class=\"save-as\">Save as...</a></li>\n        </ul>\n    </div>\n</div>\n<div id=\"code-wrapper\" class=\"ui-layout-content\">\n    <textarea name=\"code\" rows=\"25\" cols=\"100\"></textarea>\n</div>";
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
  buffer += "\n    <div class=\"output\">";
  if (stack1 = helpers.output) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.output; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n    <div class=\"result\">≫ ";
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

  stack1 = helpers['if'].call(depth0, depth0.loading, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["JST"]["editor/results"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"btn-toolbar\">\n    <button class=\"clear btn btn-sm btn-default\" title=\"(Esc)\"><i class=\"fa fa-eraser\"></i></button>\n</div>\n\n<div class=\"script-result-section\"><div class=\"inner\"></div></div>";
  });

this["JST"]["files/file-list"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  
  return "\n      <table class=\"table table-striped table-hover\">\n          <thead>\n          <tr>\n              <th></th>\n              <th>Name</th>\n              <th>Date Modified</th>\n          </tr>\n          </thead>\n          <tbody></tbody>\n      </table>\n  ";
  }

function program3(depth0,data) {
  
  
  return "\n      <div class=\"message\">No files</div>\n  ";
  }

  buffer += "<div class=\"files-page-body full-height\">\n  ";
  stack1 = helpers['if'].call(depth0, depth0.files, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  });

this["JST"]["files/file-path"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression;


  if (stack1 = helpers.fileBreadcrumbs) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.fileBreadcrumbs; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  return escapeExpression(stack1);
  });

this["JST"]["files/file"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<td><a class=\"delete\" href=\"#\"><i class=\"fa fa-trash-o\"></i></a></td>\n<td>\n    ";
  if (stack1 = helpers.fileIcon) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.fileIcon; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n    <a class=\"name\" href=\"#\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\n</td>\n<td>";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.dateFormatTime || depth0.dateFormatTime),stack1 ? stack1.call(depth0, depth0.lastModified, options) : helperMissing.call(depth0, "dateFormatTime", depth0.lastModified, options)))
    + "</td>";
  return buffer;
  });

this["JST"]["files/files-section"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  
  return "\n                      <div class=\"form-group\">\n                          <label class=\"col-sm-2 control-label\">Save as</label>\n\n                          <div class=\"col-sm-10\">\n                              <input class=\"file-name form-control\" type=\"text\"/>\n                          </div>\n                      </div>\n                    ";
  }

function program3(depth0,data) {
  
  
  return "\n          <button type=\"button\" class=\"save btn btn-primary\">Save</button>\n        ";
  }

  buffer += "<div class=\"modal-content\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" aria-hidden=\"true\">&times;</button>\n        <h4 class=\"modal-title\">Files</h4>\n    </div>\n\n    <div class=\"modal-body\">\n        <div class=\"files-header\">\n            <div class=\"section\">\n                <form class=\"form-horizontal file-info\">\n                    ";
  stack1 = helpers['if'].call(depth0, depth0.saving, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">File store</label>\n\n                        <div class=\"col-sm-10\">\n                            <select class=\"form-control\" name=\"store\">\n                                <option value=\"local\">Local</option>\n                                <option value=\"remote\">Remote</option>\n                            </select>\n                        </div>\n                    </div>\n                </form>\n            </div>\n            <div class=\"file-path-region section\"></div>\n        </div>\n        <div class=\"files-body\">\n            <div class=\"store full-height\">\n            </div>\n        </div>\n\n    </div>\n\n    <div class=\"modal-footer\">\n        <button type=\"button\" class=\"cancel btn btn-primary\">Cancel</button>\n        ";
  stack1 = helpers['if'].call(depth0, depth0.saving, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n</div>\n<!-- /.modal-content -->";
  return buffer;
  });

this["JST"]["files/loading"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"loading\"><i class=\"fa fa-refresh fa-spin\"></i></div>";
  });

this["JST"]["header"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<span class=\"navbar-brand\">Grails Debug Console</span>\n<p class=\"navbar-text title\"></p>\n<div class=\"saving\" style=\"display: none\">\n    <i class=\"fa fa-refresh fa-spin\"></i>\n    Saving\n</div>\n\n<form class=\"navbar-form pull-right\">\n    <div class=\"btn-group\">\n        <button class=\"clear btn-sm btn btn-default dropdown-toggle\" title=\"(Esc)\" data-toggle=\"dropdown\">\n            <i class=\"fa fa-cog\"></i>\n            <span class=\"caret\"></span>\n        </button>\n        <ul class=\"dropdown-menu pull-right settings\" role=\"menu\">\n            <li role=\"presentation\" class=\"dropdown-header\">Layout</li>\n            <li><a href=\"#\" class=\"orientation-horizontal\"><i class=\"fa fa-check\"></i> Horizontal</a></li>\n            <li><a href=\"#\" class=\"orientation-vertical\"><i class=\"fa fa-check\"></i> Vertical</a></li>\n            <li role=\"presentation\" class=\"divider\"></li>\n            <li role=\"presentation\" class=\"dropdown-header\">Results Pane</li>\n            <li><a href=\"#\" class=\"results-wrap\"><i class=\"fa fa-check\"></i> Wrap text</a></li>\n            <li role=\"presentation\" class=\"divider\"></li>\n            <li role=\"presentation\" class=\"dropdown-header\">Theme</li>\n            <li><a href=\"#\" class=\"theme\" data-theme=\"default\"><i class=\"fa fa-check\"></i> Light</a></li>\n            <li><a href=\"#\" class=\"theme\" data-theme=\"lesser-dark\"><i class=\"fa fa-check\"></i> Dark</a></li>\n            <li role=\"presentation\" class=\"divider\"></li>\n            <li><a href=\"#\" class=\"help\"><i class=\"fa fa-check\"></i> Help</a></li>\n        </ul>\n    </div>\n</form>";
  });

this["JST"]["help-modal"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
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
  buffer += "\n        </table>\n        <h4>Shortcuts</h4>\n        <table class=\"table\">\n            <tr><td><code>Ctrl-Enter</code></td><td>Execute</td></tr>\n            <tr><td><code>Esc</code></td><td>Clear</td></tr>\n        </table>\n    </div>\n\n    <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\">Close</button>\n    </div>\n</div><!-- /.modal-content -->\n\n\n";
  return buffer;
  });
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
        var headerView;
        headerView = new App.HeaderView;
        headerView.on('new', function() {
          return App.trigger('app:file:new');
        });
        headerView.on('files', function() {
          return App.trigger('app:file:list');
        });
        App.headerRegion.show(headerView);
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
    App.on('app:file:list', function() {
      return App.FileApp.promptForFile().done(function(file) {
        if (file) {
          return file.fetch().done(function() {
            App.EditorApp.router.showFile(file);
            return App.EditorApp.controller.showFile(file);
          });
        }
      }).fail(function() {
        return alert('Couldnt load file!');
      });
    });
    return window.App = App;
  })(jQuery, _, Backbone, JST, window);

}).call(this);

(function() {
  (function(App, Backbone) {
    return App.ItemView = Backbone.Marionette.ItemView.extend({
      constructor: function() {
        this.subviews = [];
        Marionette.ItemView.prototype.constructor.apply(this, arguments);
        return this.listenTo(this, 'show', function() {
          var view, _i, _len, _ref, _results;
          this.onShow();
          _ref = this.subviews;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            view = _ref[_i];
            _results.push(view.onShow());
          }
          return _results;
        });
      },
      initialize: function() {},
      render: function() {
        var data, html;
        this.isClosed = false;
        this.triggerMethod("before:render", this);
        this.triggerMethod("item:before:render", this);
        data = this.serializeData();
        data = this.mixinTemplateHelpers(data);
        html = this.renderHtml(data);
        this.$el.html(html);
        this.bindUIElements();
        this.triggerMethod("render", this);
        this.triggerMethod("item:rendered", this);
        return this;
      },
      renderHtml: function(data) {
        var template;
        template = this.getTemplate();
        return Marionette.Renderer.render(template, data);
      },
      onShow: function() {},
      log: function(string) {
        return typeof console !== "undefined" && console !== null ? console.log("" + this.cid + ": " + string) : void 0;
      }
    });
  })(App, Backbone);

}).call(this);

(function() {
  (function(App, Backbone) {
    return App.HeaderView = Backbone.Marionette.ItemView.extend({
      template: 'header',
      attributes: {
        "class": 'navbar navbar-fixed-top'
      },
      initialize: function() {
        return this.listenTo(App, 'file:show', function(file) {
          var _ref;
          return this.$('.title').html((_ref = file.get('name')) != null ? _ref : '');
        });
      },
      onRender: function() {
        return new App.SettingsView({
          el: this.$('.dropdown-menu.settings')[0]
        }).render();
      }
    });
  })(App, Backbone);

}).call(this);

(function() {
  (function(App, $) {
    return App.SettingsView = Backbone.View.extend({
      events: {
        "click .orientation-horizontal": "onOrientationHorizontalClick",
        "click .orientation-vertical": "onOrientationVerticalClick",
        "click .results-wrap": "onResultsWrapClick",
        "click .results-show-script": "onResultsShowScriptClick",
        "click .results-show-stdout": "onResultsShowStdoutClick",
        "click .theme": "onThemeClick",
        "click .help": "onHelpClick"
      },
      initialize: function() {
        this.model = App.settings;
        return this.listenTo(this.model, "change", this.render, this);
      },
      render: function() {
        var _this = this;
        this.$(".orientation-horizontal").toggleClass("selected", this.model.get("orientation") === "horizontal");
        this.$(".orientation-vertical").toggleClass("selected", this.model.get("orientation") === "vertical");
        this.$(".results-wrap").toggleClass("selected", this.model.get("results.wrapText"));
        this.$(".results-show-script").toggleClass("selected", this.model.get("results.showScript"));
        this.$(".results-show-stdout").toggleClass("selected", this.model.get("results.showStdout"));
        this.$(".results-show-result").toggleClass("selected", this.model.get("results.showResult"));
        return this.$(".theme").each(function(index, el) {
          var $el;
          $el = $(el);
          return $el.toggleClass("selected", _this.model.get("theme") === $el.data("theme"));
        });
      },
      onOrientationHorizontalClick: function(event) {
        event.preventDefault();
        event.stopPropagation();
        this.model.set("orientation", "horizontal");
        return this.model.save();
      },
      onOrientationVerticalClick: function(event) {
        event.preventDefault();
        event.stopPropagation();
        this.model.set("orientation", "vertical");
        return this.model.save();
      },
      onThemeClick: function(event) {
        var $el;
        event.preventDefault();
        event.stopPropagation();
        $el = $(event.currentTarget);
        this.model.set("theme", $el.data("theme"));
        return this.model.save();
      },
      onResultsWrapClick: function(event) {
        event.preventDefault();
        event.stopPropagation();
        this.model.toggle("results.wrapText");
        return this.model.save();
      },
      onResultsShowScriptClick: function(event) {
        event.preventDefault();
        event.stopPropagation();
        this.model.toggle("results.showScript");
        return this.model.save();
      },
      onResultsShowStdoutClick: function(event) {
        event.preventDefault();
        event.stopPropagation();
        this.model.toggle("results.showStdout");
        return this.model.save();
      },
      onResultsShowResultClick: function(event) {
        event.preventDefault();
        event.stopPropagation();
        this.model.toggle("results.showResult");
        return this.model.save();
      },
      onHelpClick: function(event) {
        event.preventDefault();
        return App.trigger('help');
      }
    });
  })(App, jQuery);

}).call(this);

(function() {
  (function(App, Backbone) {
    return App.HelpView = Backbone.Marionette.ItemView.extend({
      template: 'help-modal',
      className: 'modal-dialog',
      serializeData: function() {
        return {
          implicitVars: App.data.implicitVars
        };
      }
    });
  })(App, Backbone);

}).call(this);

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

(function() {
  App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
    return Entities.File = Backbone.Model.extend({
      defaults: {
        text: ''
      },
      isLocal: function() {
        var _ref;
        return this.local === true || ((_ref = this.collection) != null ? _ref.isLocal : void 0) === true;
      },
      getAbsolutePath: function() {
        return this.id;
      },
      getDir: function() {
        return this.get('path');
      },
      getStore: function() {
        if (this.isLocal()) {
          return 'local';
        } else {
          return 'remote';
        }
      },
      sync: function(method, file, options) {
        var url;
        if (file.isLocal()) {
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
    Entities.LocalFileCollection = Backbone.Collection.extend({
      model: function(attrs, options) {
        return new Entities.File(attrs, options);
      },
      isLocal: true,
      comparator: function(file) {
        return file.get('name');
      },
      sync: function(method, file, options) {
        return Entities.localFileStore.sync(method, file, options);
      }
    });
    App.reqres.setHandler('local:file:entities', function() {
      var files;
      files = new Entities.LocalFileCollection(Entities.localFileStore.fetch());
      files.store = Entities.localFileStore;
      files.path = '/';
      return files;
    });
    return App.reqres.setHandler('local:file:entity', function(id) {
      return new Entities.LocalFileCollection(Entities.localFileStore.fetch()).get(id);
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
        return new Entities.LocalFileCollection(this.fetch());
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
        var e, file, store, _i, _len, _ref, _ref1, _results;
        store = localStorage.getItem(this.name);
        try {
          this.data = (_ref = JSON.parse(store)) != null ? _ref : {};
        } catch (_error) {
          e = _error;
          this.data = {};
        }
        _ref1 = this.data;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          file = _ref1[_i];
          _results.push(file.set('type', 'file'));
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
    Entities.RemoteFileCollection = Backbone.Collection.extend({
      url: function() {
        return App.createLink('listFiles', {
          path: this.path
        });
      },
      model: function(attrs, options) {
        return new Entities.File(attrs, options);
      },
      isLocal: false,
      path: '/',
      comparator: function(file) {
        return file.get('name');
      }
    });
    App.reqres.setHandler('remote:file:entity', function(name) {
      var file;
      file = new Entities.File({
        id: name
      });
      file.local = false;
      return file.fetch().pipe(function() {
        return file;
      });
    });
    return App.reqres.setHandler('remote:file:entities', function(path) {
      var remoteFiles;
      remoteFiles = new App.Entities.RemoteFileCollection;
      remoteFiles.path = path;
      return remoteFiles.fetch({
        reset: true
      }).pipe(function() {
        return remoteFiles;
      });
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
  App.module('EditorApp', function(EditorApp, App, Backbone, Marionette, $, _) {
    var API;
    API = {
      newFile: function() {
        var file;
        file = new App.Entities.File;
        return this.showFile(file);
      },
      openLocalFile: function(name) {
        var file;
        file = App.request('local:file:entity', name);
        if (!file) {
          alert('no find file');
          return;
        }
        return this.showFile(file);
      },
      openRemoteFile: function(name) {
        var dfd,
          _this = this;
        dfd = App.request('remote:file:entity', name);
        dfd.done(function(file) {
          return _this.showFile(file);
        });
        return dfd.fail(function() {
          return alert('no find file');
        });
      },
      showFile: function(file) {
        return EditorApp.controller.showFile(file);
      }
    };
    App.addInitializer(function() {
      var Router, router;
      Router = Marionette.AppRouter.extend({
        showFile: function(file) {
          return this.navigate("" + (file.getStore()) + ":" + file.id);
        }
      });
      router = new Router({
        controller: API
      });
      router.appRoute('*path', 'newFile');
      router.appRoute('new', 'newFile');
      router.appRoute(/^local:(.*?)$/, 'openLocalFile');
      router.appRoute(/^remote:(.*?)$/, 'openRemoteFile');
      EditorApp.router = router;
      EditorApp.controller = new EditorApp.Controller;
      return App.mainRegion.show(EditorApp.controller.view);
    });
    return App.on('app:file:new', function(file) {
      EditorApp.router.navigate("new", {
        trigger: true
      });
      return API.newFile();
    });
  });

}).call(this);

(function() {
  App.module('EditorApp', function(EditorApp, App, Backbone, Marionette, $, _) {
    return EditorApp.Controller = Marionette.Controller.extend({
      initialize: function(options) {
        this.view = new EditorApp.EditorSectionView;
        this.listenTo(this.view, 'save', this.save);
        return this.listenTo(this.view, 'saveAs', this.saveAs);
      },
      showFile: function(file) {
        console.log('showfile ' + file.get('name'));
        App.trigger('file:show', file);
        this.file = file;
        this.view.refresh();
        return this.view.setValue(file.get('text'));
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
        return App.FileApp.promptForNewFileName().done(function(store, path, name) {
          var file;
          if (store) {
            file = new App.Entities.File({
              text: text,
              name: name,
              path: path
            });
            file.local = store === 'local';
            App.savingOn();
            return file.save().then(function() {
              App.savingOff();
              return App.EditorApp.router.showFile(file);
            });
          }
        });
      },
      isDirty: function() {
        return this.file.get("text") !== this.editor.getValue();
      }
    });
  });

}).call(this);

(function() {
  App.module('EditorApp', function(EditorApp, App, Backbone, Marionette, $, _) {
    return EditorApp.EditorSectionView = App.ItemView.extend({
      template: 'editor/editor-section',
      attributes: {
        "class": 'full-height'
      },
      onRender: function() {
        this.initLayout();
        this.editorView = new EditorApp.EditorView({
          el: this.$('#editor')[0]
        });
        this.editorView.render();
        this.layout.initContent('center');
        this.editorView.resize();
        this.subviews.push(this.editorView);
        this.resultCollection = new EditorApp.ResultCollection();
        this.resultsView = new EditorApp.ResultCollectionView({
          collection: this.resultCollection
        }).render();
        this.listenTo(this.editorView, 'execute', function(result) {
          return this.resultCollection.add(result);
        });
        this.listenTo(this.editorView, 'save', function(text) {
          return this.trigger('save', text);
        });
        this.listenTo(this.editorView, 'saveAs', function(text) {
          return this.trigger('saveAs', text);
        });
        this.listenTo(this.editorView, 'clear', this.clearResults);
        this.showOrientation();
        return this.listenTo(App.settings, 'change:orientation', this.showOrientation);
      },
      onVisible: function() {
        this.log('onVisible');
        return this.refresh();
      },
      refresh: function() {
        this.editorView.refresh();
        this.layout.resizeAll();
        return this.showOrientation();
      },
      initLayout: function() {
        var _this = this;
        return this.layout = this.$el.layout({
          center__paneSelector: '#editor',
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
          spacing_open: 3
        });
      },
      showOrientation: function() {
        var orientation;
        orientation = App.settings.get('orientation');
        if (orientation === 'vertical') {
          $('.east').append(this.resultsView.el);
          this.layout.hide('south');
          this.layout.show('east');
          this.layout.initContent('east');
        } else {
          $('.south').append(this.resultsView.el);
          this.layout.hide('east');
          this.layout.show('south');
          this.layout.initContent('south');
        }
        return this.editorView.refresh();
      },
      setValue: function(text) {
        return this.editorView.setValue(text);
      },
      clearResults: function() {
        return this.resultsView.clear();
      }
    });
  });

}).call(this);

(function() {
  App.module('EditorApp', function(EditorApp, App, Backbone, Marionette, $, _) {
    return EditorApp.EditorView = App.ItemView.extend({
      template: 'editor/editor',
      events: {
        'click button.execute': 'onExecuteClick',
        'click button.new': 'onNewClick',
        'click button.files': 'onFilesClick',
        'click button.save': 'onSaveClick',
        'click a.save-as': 'onSaveAsClick'
      },
      initialize: function() {
        var _this = this;
        $(window).on("beforeunload", function() {
          return _this.onBeforeunload();
        });
        return this.listenTo(App, 'app:editor:execute', this.executeCode);
      },
      onRender: function() {
        return this.initEditor();
      },
      resize: function() {
        return this.editor.refresh();
      },
      onNewClick: function(event) {
        event.preventDefault();
        return App.trigger('app:file:new');
      },
      onFilesClick: function(event) {
        event.preventDefault();
        return App.trigger('app:file:list');
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
              return _this.trigger("clear");
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
        result = new EditorApp.Result({
          loading: true,
          input: this.getValue()
        });
        this.trigger("execute", result);
        jqxhr = $.post("" + App.data.baseUrl + "/console/execute", {
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
            error: "An error occurred."
          });
        });
      },
      onBeforeunload: function(event) {
        if (this.editorView.isDirty()) {
          return "You have unsaved changes.";
        }
      },
      onShow: function() {
        return this.editor.focus();
      }
    });
  });

}).call(this);

(function() {
  App.module('EditorApp', function(EditorApp, App, Backbone, Marionette, $, _) {
    return EditorApp.ResultCollectionView = Marionette.CompositeView.extend({
      template: 'editor/results',
      itemViewContainer: '.inner',
      events: {
        'click button.clear': 'clear'
      },
      getItemView: function(item) {
        return EditorApp.ResultView;
      },
      onAfterItemAdded: function(itemView) {
        return this.scrollToResultView(itemView);
      },
      initialize: function() {
        this.listenTo(App.settings, 'change:results.wrapText', this.setWrap);
        this.listenTo(this, 'itemview:complete', this.scrollToResultView);
        return this.listenTo(App, 'app:editor:clear', this.clear);
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
      clear: function() {
        return this.collection.reset();
      }
    });
  });

}).call(this);

(function() {
  App.module('EditorApp', function(EditorApp, App, Backbone, Marionette, $, _) {
    return EditorApp.ResultCollection = Backbone.Collection.extend({
      model: function(attrs, options) {
        return new EditorApp.Result(attrs, options);
      }
    });
  });

}).call(this);

(function() {
  App.module('EditorApp', function(EditorApp, App, Backbone, Marionette, $, _) {
    return EditorApp.Result = Backbone.Model.extend({
      isSuccess: function() {
        return !this.get("exception") && !this.get("error");
      }
    });
  });

}).call(this);

(function() {
  App.module('EditorApp', function(EditorApp, App, Backbone, Marionette, $, _) {
    return EditorApp.ResultView = Marionette.ItemView.extend({
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
        var lines;
        lines = this.model.get('input').trim().split('\n');
        return _.map(lines, function(line) {
          return '> ' + line;
        }).join('\n');
      },
      formattedOutput: function() {
        var lines, _ref, _ref1;
        lines = (_ref = this.model.get('output')) != null ? (_ref1 = _ref.trim()) != null ? _ref1.split('\n') : void 0 : void 0;
        return _.map(lines, function(line) {
          return '  ' + line;
        }).join('\n');
      }
    });
  });

}).call(this);

(function() {
  App.module('FileApp', function(FileApp, App, Backbone, Marionette, $, _) {
    var showInModal;
    showInModal = function(view) {
      var $el, sizeContent;
      $el = $('<div class="modal" data-backdrop="false"></div>').appendTo('body').html(view.render().el);
      $el.modal({
        show: false
      });
      sizeContent = function() {
        var filesBodyHeight, modalBodyHeight;
        modalBodyHeight = $el.find('.modal-content').height() - $el.find('.modal-header').outerHeight() - $el.find('.modal-footer').outerHeight();
        $el.find('.modal-body').height(modalBodyHeight);
        filesBodyHeight = modalBodyHeight - $el.find('.files-header').outerHeight();
        return $el.find('.files-body').height(filesBodyHeight);
      };
      $el.on('shown.bs.modal', function() {
        return sizeContent();
      });
      $el.find('.modal-content').draggable({
        handle: '.modal-header',
        addClasses: false
      });
      $el.find('.modal-header').css('cursor', 'move');
      $el.find('.modal-content').resizable({
        addClasses: false,
        resize: function(event, ui) {
          return sizeContent();
        },
        stop: function(event, ui) {}
      });
      sizeContent();
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
    FileApp.promptForNewFileName = function() {
      var dfd, view;
      dfd = $.Deferred();
      view = new FileApp.FilesSectionView({
        saving: true
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
    };
    return FileApp.promptForFile = function() {
      var dfd, view;
      dfd = $.Deferred();
      view = new FileApp.FilesSectionView({
        saving: false
      });
      view.on('file:selected', function(file) {
        dfd.resolveWith(null, [file]);
        return view.close();
      });
      view.on('close', function() {
        return dfd.resolve();
      });
      showInModal(view);
      return dfd.promise();
    };
  });

}).call(this);

(function() {
  App.module('FileApp', function(FileApp, App, Backbone, Marionette, $, _) {
    FileApp.FileCollectionView = Marionette.CompositeView.extend({
      template: 'files/file-list',
      attributes: {
        "class": 'full-height'
      },
      events: {
        'click a.name': 'onNameClick',
        'click a.delete': 'onDeleteClick'
      },
      _initialEvents: function() {
        if (this.collection) {
          this.listenTo(this.collection, 'add', this.addChildView);
          this.listenTo(this.collection, 'remove', this.removeItemView);
          return this.listenTo(this.collection, 'reset', this.render);
        }
      },
      itemViewContainer: 'tbody',
      getItemView: function(item) {
        return FileApp.FileView;
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
      clazz = this.type === 'dir' ? 'fa fa-folder-o' : 'fa fa-file-o';
      return new Handlebars.SafeString("<i class='" + clazz + "'></i>");
    });
  });

}).call(this);

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

(function() {
  App.module('FileApp', function(FileApp, App, Backbone, Marionette, $, _) {
    var BaseDir;
    BaseDir = Backbone.Model.extend();
    return FileApp.FilesSectionView = Marionette.Layout.extend({
      template: 'files/files-section',
      regions: {
        filePathRegion: '.file-path-region',
        storeRegion: '.store'
      },
      attributes: {
        'class': 'modal-dialog files-section-view'
      },
      events: {
        'change select[name=store]': 'onStoreChange',
        'click button.save': 'onSave'
      },
      initialize: function(options) {
        return this.saving = options.saving;
      },
      onRender: function() {
        var filePathView, store, _ref;
        this.baseDir = new BaseDir({
          path: '/'
        });
        filePathView = new FileApp.FilePathView({
          model: this.baseDir
        });
        this.filePathRegion.show(filePathView);
        this.listenTo(filePathView, 'path:selected', function(path) {
          var collection;
          this.baseDir.set('path', path);
          collection = this.fileCollectionView.collection;
          collection.path = path;
          return collection.fetch({
            reset: true
          });
        });
        store = (_ref = App.settings.get('files.lastStore')) != null ? _ref : 'local';
        this.showStore(store);
        return this.$('select[name=store]').val(store);
      },
      onSave: function(event) {
        var fileName, path;
        event.preventDefault();
        fileName = this.$('input.file-name').val();
        path = this.baseDir.get('path');
        if (path[path.length - 1] !== '/') {
          path += '/';
        }
        return this.trigger('save', this.store, path, fileName);
      },
      setName: function(name) {
        return this.$('input.file-name').val(name);
      },
      showStore: function(store) {
        var path, _ref,
          _this = this;
        this.store = store;
        this.storeRegion.show(new FileApp.LoadingView);
        if (store === 'remote') {
          path = (_ref = App.settings.get('files.remote.lastDir')) != null ? _ref : '/';
        } else {
          path = '/';
        }
        $.when(this.getCollection(store, path)).done(function(collection) {
          _this.fileCollectionView = new FileApp.FileCollectionView({
            collection: collection
          });
          _this.listenTo(_this.fileCollectionView, 'file:selected', function(file) {
            if (file.get('type') === 'dir') {
              path = file.getAbsolutePath();
              this.baseDir.set('path', path);
              collection.path = path;
              collection.fetch({
                reset: true
              });
              App.settings.set('files.remote.lastDir', path);
              return App.settings.save();
            } else {
              return this.trigger('file:selected', file);
            }
          });
          return _this.storeRegion.show(_this.fileCollectionView);
        }).fail(function() {
          return alert('Failed to load remote files.');
        });
        this.baseDir.set('path', path);
        App.settings.set('files.lastStore', store);
        return App.settings.save();
      },
      onStoreChange: function(event) {
        return this.showStore(this.$(event.currentTarget).val());
      },
      getCollection: function(store, path) {
        var collection;
        collection = void 0;
        if (store === 'local') {
          return collection = App.request('local:file:entities');
        } else {
          return collection = App.request('remote:file:entities', path);
        }
      },
      serializeData: function() {
        return {
          saving: this.saving
        };
      }
    });
  });

}).call(this);

(function() {
  App.module('FileApp', function(FileApp, App, Backbone, Marionette, $, _) {
    return FileApp.LoadingView = Marionette.ItemView.extend({
      template: 'files/loading',
      attributes: {
        'class': 'loading-view'
      }
    });
  });

}).call(this);
