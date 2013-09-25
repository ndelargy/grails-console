this["JST"] = this["JST"] || {};

this["JST"]["editor"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"btn-toolbar\">\n    <div class=\"btn-group\">\n        <button class=\"submit btn btn-default\" title=\"(Ctrl + Enter)\" data-function=\"execute\"><i class=\"icon-play\"></i> Execute</button>\n        <!--<button class=\"new btn btn-default\" data-function=\"new\"><i class=\"icon-file\"></i> New</button>-->\n        <!--<button class=\"open btn btn-default\" data-function=\"open\"><i class=\"icon-folder-close\"></i> Open</button>-->\n        <button class=\"save btn btn-default\"><i class=\"icon-save\"></i> Save</button>\n        <button class=\"btn btn-default\" data-function=\"fork\"><i class=\"icon-code-fork\"></i> Fork</button>\n        <button class=\"help btn btn-default\" data-toggle=\"modal\" data-target=\"#helpModal\"><i class=\"icon-question\"></i> Help</button>\n    </div>\n</div>\n<div class=\"file-name-section\"></div>\n\n<div id=\"code-wrapper\" class=\"ui-layout-content\" style=\"padding: 0\">\n    <textarea name=\"code\" rows=\"25\" cols=\"100\"></textarea>\n</div>";
  });

this["JST"]["file-list"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n      <tr>\n          <td><input type=\"checkbox\" /></td>\n          <td>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n          <td>";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.dateFormatTime || depth0.dateFormatTime),stack1 ? stack1.call(depth0, depth0.lastModified, options) : helperMissing.call(depth0, "dateFormatTime", depth0.lastModified, options)))
    + "</td>\n      </tr>\n  ";
  return buffer;
  }

  buffer += "<table class=\"table table-hover\">\n  ";
  stack1 = helpers.each.call(depth0, depth0.files, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</table>";
  return buffer;
  });

this["JST"]["header"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<a class=\"navbar-brand\" href=\"#\">Grails Debug Console</a>\n\n<form class=\"navbar-form pull-right\">\n\n    <button type=\"button\" class=\"btn btn-primary new\">New</button>\n    <button type=\"button\" class=\"btn btn-primary scripts\">Scripts</button>\n    <div class=\"btn-group\">\n        <button class=\"clear btn-sm btn btn-default dropdown-toggle\" title=\"(Esc)\" data-toggle=\"dropdown\">\n            <i class=\"icon-cog\"></i>\n            <span class=\"caret\"></span>\n        </button>\n        <ul class=\"dropdown-menu pull-right settings\" role=\"menu\">\n            <li role=\"presentation\" class=\"dropdown-header\">Orientation</li>\n            <li><a href=\"#\" class=\"orientation-horizontal\"><i class=\"icon-check\"></i> Horizontal</a></li>\n            <li><a href=\"#\" class=\"orientation-vertical\"><i class=\"icon-check\"></i> Vertical</a></li>\n            <li role=\"presentation\" class=\"divider\"></li>\n            <li role=\"presentation\" class=\"dropdown-header\">Results Pane</li>\n            <li><a href=\"#\" class=\"results-wrap\"><i class=\"icon-check\"></i> Wrap text</a></li>\n            <li><a href=\"#\" class=\"results-show-script\"><i class=\"icon-check\"></i> Show script</a></li>\n            <li><a href=\"#\" class=\"results-show-stdout\"><i class=\"icon-check\"></i> Show stdout</a></li>\n            <li><a href=\"#\" class=\"results-show-result\"><i class=\"icon-check\"></i> Show result</a></li>\n            <li role=\"presentation\" class=\"divider\"></li>\n            <li role=\"presentation\" class=\"dropdown-header\">Theme</li>\n            <li><a href=\"#\" class=\"theme\" data-theme=\"default\"><i class=\"icon-check\"></i> Light</a></li>\n            <li><a href=\"#\" class=\"theme\" data-theme=\"lesser-dark\"><i class=\"icon-check\"></i> Dark</a></li>\n        </ul>\n    </div>\n</form>";
  });

this["JST"]["result"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<span class=\"result-time label label-default pull-right\">";
  if (stack1 = helpers.totalTime) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.totalTime; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " ms</span>\n<div class=\"input\">";
  if (stack1 = helpers.input) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.input; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n<div class=\"output\">";
  if (stack1 = helpers.output) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.output; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n<div class=\"result\">";
  if (stack1 = helpers.result) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.result; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>";
  return buffer;
  });

this["JST"]["results"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"btn-toolbar\">\n    <button class=\"clear btn btn-default\" title=\"(Esc)\"><i class=\"icon-eraser\"></i> Clear</button>\n</div>\n\n<div id=\"result\"><div class=\"inner\"></div></div>";
  });