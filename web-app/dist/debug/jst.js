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