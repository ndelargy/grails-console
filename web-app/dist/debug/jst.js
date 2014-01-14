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

this["JST"]["files/loading"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"loading\"><i class=\"fa fa-refresh fa-spin\"></i></div>";
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
  


  return "<span class=\"navbar-brand\">Grails Debug Console</span>\n<p class=\"navbar-text title\"></p>\n<div class=\"saving\" style=\"display: none\">\n    <i class=\"fa fa-refresh fa-spin\"></i>\n    Saving\n</div>\n\n<form class=\"navbar-form pull-right\">\n    <div class=\"btn-group settings-btn-group\">\n        <button class=\"clear btn-sm btn btn-default dropdown-toggle\" title=\"(Esc)\" data-toggle=\"dropdown\">\n            <i class=\"fa fa-cog\"></i>\n            <span class=\"caret\"></span>\n        </button>\n    </div>\n</form>";
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
  buffer += "\n        </table>\n        <h4>Shortcuts</h4>\n        <table class=\"table\">\n            <tr><td><code>Ctrl-Enter</code></td><td>Execute</td></tr>\n            <tr><td><code>Esc</code></td><td>Clear</td></tr>\n        </table>\n    </div>\n\n    <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\">Close</button>\n    </div>\n</div><!-- /.modal-content -->\n\n\n";
  return buffer;
  });

this["JST"]["main/settings"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<li role=\"presentation\" class=\"dropdown-header\">Layout</li>\n<li><a href=\"#\" class=\"setting orientation-horizontal\"><i class=\"fa fa-check\"></i> Horizontal</a></li>\n<li><a href=\"#\" class=\"setting orientation-vertical\"><i class=\"fa fa-check\"></i> Vertical</a></li>\n<li role=\"presentation\" class=\"divider\"></li>\n<li role=\"presentation\" class=\"dropdown-header\">Results Pane</li>\n<li><a href=\"#\" class=\"setting results-wrap\"><i class=\"fa fa-check\"></i> Wrap text</a></li>\n<li role=\"presentation\" class=\"divider\"></li>\n<li role=\"presentation\" class=\"dropdown-header\">Theme</li>\n<li><a href=\"#\" class=\"setting theme\" data-theme=\"default\"><i class=\"fa fa-check\"></i> Light</a></li>\n<li><a href=\"#\" class=\"setting theme\" data-theme=\"lesser-dark\"><i class=\"fa fa-check\"></i> Dark</a></li>\n<li role=\"presentation\" class=\"divider\"></li>\n<li><a href=\"#\" class=\"help\"><i class=\"fa fa-check\"></i> Help</a></li>";
  });