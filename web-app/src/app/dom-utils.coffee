App.module 'DomUtils', (DomUtils, App, Backbone, Marionette, $, _) ->

  setHeight = ($target) ->
    $container = $target.parent()
    childrenHeight = _.reduce(
      $container.children(':visible')
      (memo, el) -> memo + $(el).outerHeight true
      0
    )

    difference = $container.height() - childrenHeight
    $target.height $target.height() + difference


  sizeToFitVertical = (el, container) ->
    $target = $(el)

    if not container
      container = _.find $target.parents(), (el) ->
        $(el).css('position') is 'absolute' #or $(el)[0].style.height

    if not container
      container = $('body')[0]

    if container
      for ancestor in $target.parentsUntil(container).get().reverse()
        console.log "setHeight #{ancestor}"
        setHeight $(ancestor)

      setHeight $target

  DomUtils.sizeToFitVertical = sizeToFitVertical