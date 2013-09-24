<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
                      "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Grails Debug Console</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <link rel="icon" type="image/png" href="${resource(dir: 'src/img', file: 'grails.logo.png', plugin: 'console')}" />
  <con:resources/>
  %{--<link href="${resource(dir: 'build', file: 'gconsole.css')}" type="text/css" rel="stylesheet" />--}%
  %{--<script type="text/javascript" src="${resource(dir: 'build', file: 'gconsole.js')}"></script>--}%
</head>

<body style="visibility: hidden">
<div id="header"></div>

<div id="editor" style="display: none"></div>
<div class="east results" style="display: none"></div>
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
