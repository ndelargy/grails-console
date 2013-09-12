<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
                      "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Grails Debug Console</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <link rel="icon" type="image/png" href="${resource(dir: 'images', file: 'grails.logo.png', plugin: 'console')}" />
  <con:resources/>
  %{--<link href="${resource(dir: 'build', file: 'gconsole.css')}" type="text/css" rel="stylesheet" />--}%
  %{--<script type="text/javascript" src="${resource(dir: 'build', file: 'gconsole.js')}"></script>--}%
</head>

<body>
<div id="header">
  <div class="navbar">
    <a class="navbar-brand" href="#">Grails Debug Console</a>
    <form class="navbar-form pull-right">

      <div class="btn-group">
        <button class="clear btn-sm btn btn-default dropdown-toggle" title="(Esc)"  data-toggle="dropdown">
          <i class="icon-cog"></i>
          <span class="caret"></span>
        </button>
        <ul class="dropdown-menu pull-right settings" role="menu">
          <li role="presentation" class="dropdown-header">Orientation</li>
          <li><a href="#" class="orientation-horizontal"><i class="icon-check"></i> Horizontal</a></li>
          <li><a href="#" class="orientation-vertical"><i class="icon-check"></i> Vertical</a></li>
          <li role="presentation" class="divider"></li>
          <li role="presentation" class="dropdown-header">Results Pane</li>
          <li><a href="#" class="results-wrap"><i class="icon-check"></i> Wrap text</a></li>
          <li><a href="#" class="results-show-script"><i class="icon-check"></i> Show script</a></li>
          <li><a href="#" class="results-show-stdout"><i class="icon-check"></i> Show stdout</a></li>
          <li><a href="#" class="results-show-result"><i class="icon-check"></i> Show result</a></li>
        </ul>
      </div>
      %{--<div class="btn-group orientation" data-toggle="buttons">--}%
        %{--<label class="btn vertical btn-default active">--}%
          %{--<input type="radio" name="options">--}%
          %{--<img src="${resource(dir: 'images', file: 'v.png', plugin: 'console')}" alt="Vertical"/>--}%
        %{--</label>--}%
        %{--<label class="btn horizontal btn-default">--}%
          %{--<input type="radio" name="options">--}%
          %{--<img src="${resource(dir: 'images', file: 'h.png', plugin: 'console')}" alt="Horizontal"/>--}%
        %{--</label>--}%
      %{--</div>--}%
    </form>
  </div>
</div>

<div id="editor" style="display: none">
</div>

<div class="east results" style="display: none">
  <div class="btn-toolbar">
    <button class="clear btn btn-default" title="(Esc)"><i class="icon-eraser"></i> Clear</button>

    %{--<form class="navbar-form pull-right">--}%
      %{--<label class="checkbox-inline">--}%
        %{--<input type="checkbox"> Wrap text--}%
      %{--</label>--}%
    %{--</form>--}%
  </div>

  <div id="result"><div class="inner"></div></div>
</div>

<div class="south" style="display: none"></div>

<div id="helpModal" class="modal fade" style="display: none" data-backdrop="false">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">Help</h4>
      </div>

      <div class="modal-body">
        <h4>Implicit variables</h4>
        <table class="table">
          <tr><td>ctx</td><td>the Spring application context</td></tr>
          <tr><td>grailsApplication</td><td>the Grails application</td></tr>
          <tr><td>config</td><td>the Grails configuration</td></tr>
          <tr><td>request</td><td>the HTTP request</td></tr>
          <tr><td>session</td><td>the HTTP session</td></tr>
        </table>
        <h4>Shortcuts</h4>
        <table class="table">
          <tr><td>Execute</td><td>Ctrl-Enter</td></tr>
          <tr><td>Clear</td><td>Esc</td></tr>
        </table>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div id="newFileName" class="modal fade" style="display: none">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">File name</h4>
      </div>

      <div class="modal-body">
        <input class="form-control" type="text" />
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary ok">OK</button>
        </div>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<con:layoutResources/>
<script type="text/javascript" charset="utf-8">
  jQuery(function($){
    App.start({
      baseUrl: '${resource(plugin: 'none')}'
    });
  });
</script>

</body>
</html>
