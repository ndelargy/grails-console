App.module 'FileApp', (FileApp, App, Backbone, Marionette, $, _) ->

  FileApp.FilePathView = Marionette.ItemView.extend

    template: 'files/file-path'

    attributes:
      'class': 'breadcrumb-section'

    events:
      'click .breadcrumb a': 'onBreadcrumbClick'

    initialize: ->
      @listenTo @model, 'change', @render

    onBreadcrumbClick: (event) ->
      event.preventDefault()
      path = $(event.currentTarget).data('path')
      @trigger 'path:selected', path

    serializeData: ->
      baseDir: @model.get('path')

  Handlebars.registerHelper 'fileBreadcrumbs', (file, options) ->
    folders = @baseDir[1..].split('/')
    html = '<ol class="breadcrumb"><li><a href="#" data-path="/"><i class="fa fa-folder"></i></a></li>'
    for folder, i in folders
      path = '/' + folders[0..i].join('/')
      if (i < folders.length - 1)
        html += '<li><a href="#" data-path="' + path + '">' + folder + '</a></li>'
      else
        html += '<li class="active">' + folder + '</li>'
    html += '</ol>'
    new Handlebars.SafeString html
