<%@ page import="grails.converters.JSON" %>
<!doctype html>
<html>

<head>
  <title>Grails Debug Console</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <link rel="icon" type="image/png" href="${resource(dir: 'src/img', file: 'grails.logo.png', plugin: 'console')}" />
  <con:resources/>
</head>

<body style="visibility: hidden">

<div id="main-content"></div>

<con:layoutResources/>
<script type="text/javascript" charset="utf-8">
  jQuery(function($){
    App.start(<%= json as JSON %>);
  });
</script>

</body>
</html>
