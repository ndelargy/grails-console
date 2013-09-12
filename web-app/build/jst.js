this["JST"] = this["JST"] || {};

this["JST"]["editor"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"btn-toolbar\">\n    <div class=\"btn-group\">\n        <button class=\"submit btn btn-default\" title=\"(Ctrl + Enter)\" data-function=\"execute\"><i class=\"icon-play\"></i> Execute</button>\n    </div>\n    <div class=\"btn-group\">\n        <button class=\"new btn btn-default\" data-function=\"new\"><i class=\"icon-file\"></i> New</button>\n        <button class=\"open btn btn-default\" data-function=\"open\"><i class=\"icon-folder-close\"></i> Open</button>\n        <button class=\"save btn btn-default\"><i class=\"icon-save\"></i> Save</button>\n        <button class=\"btn btn-default\" data-function=\"fork\"><i class=\"icon-code-fork\"></i> Fork</button>\n    </div>\n\n    <div class=\"btn-group\">\n        <button class=\"help btn btn-default\" data-toggle=\"modal\" data-target=\"#helpModal\"><i class=\"icon-question\"></i> Help</button>\n    </div>\n</div>\n<div class=\"file-name-section\"></div>\n\n<div id=\"code-wrapper\" class=\"ui-layout-content\" style=\"padding: 0\">\n    <textarea name=\"code\" rows=\"25\" cols=\"100\"></textarea>\n</div>";
  });

this["JST"]["file-list"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <tr>\n          <td>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n      </tr>\n  ";
  return buffer;
  }

  buffer += "<table class=\"table table-hover\">\n  ";
  stack1 = helpers.each.call(depth0, depth0.files, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</table>";
  return buffer;
  });