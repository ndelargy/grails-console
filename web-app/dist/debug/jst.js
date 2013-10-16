this["JST"] = this["JST"] || {};

this["JST"]["editor-section"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"editor\" style=\"display: none\"></div>\n<div class=\"east results\" style=\"display: none\"></div>\n<div class=\"south\" style=\"display: none\"></div>";
  });

this["JST"]["editor"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"btn-toolbar\">\n    <!--<div class=\"btn-group\">-->\n        <button class=\"execute btn btn-default\" title=\"Execute (Ctrl + Enter)\"><i class=\"icon-play\"></i></button>\n        <button class=\"save btn btn-default\" title=\"Save\"><i class=\"icon-save\"></i></button>\n        <button class=\"fork btn btn-default\" title=\"Fork\"><i class=\"icon-code-fork\"></i></button>\n        <button class=\"help btn btn-default\" title=\"Help\"><i class=\"icon-question\"></i></button>\n    <!--</div>-->\n</div>\n<div id=\"code-wrapper\" class=\"ui-layout-content\">\n    <textarea name=\"code\" rows=\"25\" cols=\"100\"></textarea>\n</div>";
  });

this["JST"]["file-list"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <table class=\"table table-striped table-hover\">\n        <thead>\n        <tr>\n            <th></th>\n            <th>Name</th>\n            <th>Date Modified</th>\n        </tr>\n        </thead>\n      ";
  stack1 = helpers.each.call(depth0, depth0.files, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </table>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n          <tr data-file-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n              <td><a class=\"delete\" href=\"#\"><i class=\"icon-trash\"></i></a></td>\n              <td><a class=\"name\" href=\"#\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a></td>\n              <td>";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.dateFormatTime || depth0.dateFormatTime),stack1 ? stack1.call(depth0, depth0.lastModified, options) : helperMissing.call(depth0, "dateFormatTime", depth0.lastModified, options)))
    + "</td>\n          </tr>\n      ";
  return buffer;
  }

function program4(depth0,data) {
  
  
  return "\n    <div>\n        <div class=\"message\">No files</div>\n    </div>\n";
  }

  buffer += "<div class=\"files-page-header\">\n    <h1>Local Files</h1>\n</div>\n\n\n";
  stack1 = helpers['if'].call(depth0, depth0.files, {hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  });

this["JST"]["files-section"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"file-store-select\">\n    <ul class=\"nav nav-pills nav-stacked\">\n        <li class=\"active\"><a href=\"#\" class=\"local-select\">Local <i class=\"icon-chevron-right pull-right\"></i></a></li>\n        <li><a href=\"#\" class=\"remote-select\">Remote <i class=\"icon-chevron-right pull-right\"></i></a></li>\n    </ul>\n</div>\n<div class=\"store\">\n  <div class=\"local\"></div>\n  <div class=\"remote\"></div>\n</div>";
  });

this["JST"]["header"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<a class=\"navbar-brand\" href=\"#\">Grails Debug Console</a>\n\n<div class=\"saving\" style=\"display: none\">\n    <i class=\"icon-refresh icon-spin\"></i>\n    <!--<i class=\"icon-spinner icon-spin\"></i>-->\n    Saving\n</div>\n\n<form class=\"navbar-form pull-right\">\n\n    <button type=\"button\" class=\"btn btn-primary new\">New</button>\n    <button type=\"button\" class=\"btn btn-primary files\">Files</button>\n    <div class=\"btn-group\">\n        <button class=\"clear btn-sm btn btn-default dropdown-toggle\" title=\"(Esc)\" data-toggle=\"dropdown\">\n            <i class=\"icon-cog\"></i>\n            <span class=\"caret\"></span>\n        </button>\n        <ul class=\"dropdown-menu pull-right settings\" role=\"menu\">\n            <li role=\"presentation\" class=\"dropdown-header\">Layout</li>\n            <li><a href=\"#\" class=\"orientation-horizontal\"><i class=\"icon-check\"></i> Horizontal</a></li>\n            <li><a href=\"#\" class=\"orientation-vertical\"><i class=\"icon-check\"></i> Vertical</a></li>\n            <li role=\"presentation\" class=\"divider\"></li>\n            <li role=\"presentation\" class=\"dropdown-header\">Results Pane</li>\n            <li><a href=\"#\" class=\"results-wrap\"><i class=\"icon-check\"></i> Wrap text</a></li>\n            <li><a href=\"#\" class=\"results-show-script\"><i class=\"icon-check\"></i> Show script</a></li>\n            <li><a href=\"#\" class=\"results-show-stdout\"><i class=\"icon-check\"></i> Show stdout</a></li>\n            <li><a href=\"#\" class=\"results-show-result\"><i class=\"icon-check\"></i> Show result</a></li>\n            <li role=\"presentation\" class=\"divider\"></li>\n            <li role=\"presentation\" class=\"dropdown-header\">Theme</li>\n            <li><a href=\"#\" class=\"theme\" data-theme=\"default\"><i class=\"icon-check\"></i> Light</a></li>\n            <li><a href=\"#\" class=\"theme\" data-theme=\"lesser-dark\"><i class=\"icon-check\"></i> Dark</a></li>\n        </ul>\n    </div>\n</form>";
  });

this["JST"]["help-modal"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"modal fade\" data-backdrop=\"false\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n                <h4 class=\"modal-title\">Help</h4>\n            </div>\n\n            <div class=\"modal-body\">\n                <h4>Implicit variables</h4>\n                <table class=\"table\">\n                    <tr><td>ctx</td><td>the Spring application context</td></tr>\n                    <tr><td>grailsApplication</td><td>the Grails application</td></tr>\n                    <tr><td>config</td><td>the Grails configuration</td></tr>\n                    <tr><td>request</td><td>the HTTP request</td></tr>\n                    <tr><td>session</td><td>the HTTP session</td></tr>\n                </table>\n                <h4>Shortcuts</h4>\n                <table class=\"table\">\n                    <tr><td>Execute</td><td>Ctrl-Enter</td></tr>\n                    <tr><td>Clear</td><td>Esc</td></tr>\n                </table>\n            </div>\n\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\">Close</button>\n            </div>\n        </div><!-- /.modal-content -->\n    </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n\n\n";
  });

this["JST"]["main"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  return buffer;
  });

this["JST"]["remote-files"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <table class=\"table table-striped table-hover\">\n      <thead>\n      <tr>\n          <th></th>\n          <th>Name</th>\n          <th>Date Modified</th>\n      </tr>\n      </thead>\n    ";
  stack1 = helpers.each.call(depth0, depth0.files, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </table>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n        <tr data-file-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n            <td><a class=\"delete\" href=\"#\"><i class=\"icon-trash\"></i></a></td>\n            <td><a class=\"name\" href=\"#\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a></td>\n            <td>";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.dateFormatTime || depth0.dateFormatTime),stack1 ? stack1.call(depth0, depth0.lastModified, options) : helperMissing.call(depth0, "dateFormatTime", depth0.lastModified, options)))
    + "</td>\n        </tr>\n    ";
  return buffer;
  }

function program4(depth0,data) {
  
  
  return "\n  <div>\n      <div class=\"message\">No files</div>\n  </div>\n";
  }

  buffer += "<div class=\"files-page-header\">\n    <h1>Remote Files</h1>\n    <div class=\"dir\">";
  if (stack1 = helpers.baseDir) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.baseDir; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n    <!--<input type=\"text\" class=\"form-control\" value=\"";
  if (stack1 = helpers.baseDir) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.baseDir; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/>-->\n</div>\n\n";
  stack1 = helpers['if'].call(depth0, depth0.files, {hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  });

this["JST"]["result"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n    <div class=\"loading\">Executing Script...</div>\n";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <span class=\"result-time label label-default pull-right\">";
  if (stack1 = helpers.totalTime) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.totalTime; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " ms</span>\n    <div class=\"input\">";
  if (stack1 = helpers.input) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.input; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n    <div class=\"output\">";
  if (stack1 = helpers.output) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.output; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n    <div class=\"result\">";
  if (stack1 = helpers.result) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.result; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, depth0.loading, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["JST"]["results"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"btn-toolbar\">\n    <button class=\"clear btn btn-default\" title=\"(Esc)\"><i class=\"icon-eraser\"></i></button>\n</div>\n\n<div id=\"result\"><div class=\"inner\"></div></div>";
  });

this["JST"]["save-new-file-modal"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"modal fade\" data-backdrop=\"false\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n                <h4 class=\"modal-title\">Save new file</h4>\n            </div>\n\n            <div class=\"modal-body\">\n                <form role=\"form\">\n                    <div class=\"form-group\">\n                        <label>File name</label>\n                        <input type=\"text\" class=\"form-control\" placeholder=\"File name\">\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"radio\">\n                            <label><input type=\"radio\" name=\"store\" value=\"local\" checked /> Local</label>\n                        </div>\n                        <div class=\"radio\">\n                            <label><input type=\"radio\" name=\"store\" value=\"remote\" /> Remote</label>\n                        </div>\n                    </div>\n                </form>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>\n                    <button type=\"button\" class=\"btn btn-primary ok\">OK</button>\n                </div>\n            </div>\n        </div><!-- /.modal-content -->\n    </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->";
  });