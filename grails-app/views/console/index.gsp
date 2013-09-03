<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
                      "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Grails Debug Console</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <link rel="icon" type="image/png" href="${resource(dir: 'images', file: 'grails.logo.png', plugin: 'console')}" />
  <con:resources/>
</head>

<body>
<div id="header">
  <div class="navbar">
    <a class="navbar-brand" href="#">Grails Debug Console</a>
    <form class="navbar-form pull-right">
      <div class="btn-group orientation" data-toggle="buttons">
        <label class="btn vertical btn-default active">
          <input type="radio" name="options">
          <img src="${resource(dir: 'images', file: 'v.png', plugin: 'console')}" alt="Vertical"/>
        </label>
        <label class="btn horizontal btn-default">
          <input type="radio" name="options">
          <img src="${resource(dir: 'images', file: 'h.png', plugin: 'console')}" alt="Horizontal"/>
        </label>
      </div>
    </form>
  </div>
</div>

<div id="editor" style="display: none">
  <div class="btn-toolbar">
    <div class="btn-group">
      <button class="submit btn btn-default" title="(Ctrl + Enter)"><i class="icon-play"></i></button>
    </div>
    <div class="btn-group">
      <button class="new btn btn-default"><i class="icon-file"></i></button>
      <button class="btn btn-default"><i class="icon-folder-close"></i></button>
      <button class="save btn btn-default"><i class="icon-save"></i></button>
      <button class="btn btn-default"><i class="icon-code-fork"></i></button>
    </div>

    <div class="btn-group">
      <button class="help btn btn-default" data-toggle="modal" data-target="#helpModal"><i class="icon-question"></i></button>
    </div>
  </div>
  <div class="file-name-section">
    <div class="pull-right saving" style="display: none">Saving</div>
    <div class="file-name">
    </div>
  </div>

  <div id="code-wrapper">
    <textarea name="code" rows="25" cols="100"></textarea>
  </div>
</div>

<div class="east results" style="display: none">
  <div class="btn-toolbar">
    <button class="clear btn-sm btn btn-default" title="(Esc)"><i class="icon-eraser"></i></button>
    <div class="btn-group">
      <button class="clear btn-sm btn btn-default dropdown-toggle" title="(Esc)"  data-toggle="dropdown">
        <i class="icon-cog"></i>
        <span class="caret"></span>
      </button>
      <ul class="dropdown-menu" role="menu">
        <li><a href="#">Action</a></li>
        <li><a href="#">Another action</a></li>
        <li><a href="#">Something else here</a></li>
        <li class="divider"></li>
        <li><a href="#">Separated link</a></li>
      </ul>
    </div>

    <form class="navbar-form pull-right">
      <label class="checkbox-inline">
        <input type="checkbox"> Wrap text
      </label>
    </form>
  </div>

  <div id="result"><div class="inner"></div></div>
</div>

<div class="south" style="display: none"></div>

<div id="helpModal" class="modal fade" style="display: none">
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
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<con:layoutResources/>
<script type="text/javascript" charset="utf-8">
  jQuery(function($){
    gconsole.start({
      baseUrl: '${resource(plugin: 'none')}'
    });
  });
</script>

</body>
</html>
