((App, Backbone, localStorage, JSON) ->

  localStorageKey = "gconsole.settings"

  App.Settings = Backbone.Model.extend

    defaults:
      "orientation": "vertical"
      "layout.east.size": "50%"
      "layout.south.size": "50%"
      "results.wrapText": true
      "results.showScript": true
      "results.showStdout": true
      "results.showResult": true
      "theme": "default"

    toggle: (attribute) ->
      @set attribute, not @get(attribute)

    save: ->
      localStorage.setItem localStorageKey, JSON.stringify(this)

    load: ->
      json = JSON.parse(localStorage.getItem(localStorageKey)) or {}
      @set json

  instance = undefined

  App.reqres.setHandler 'settings:entity', ->
    unless instance
      instance = new App.Settings
      instance.load()
    instance

) App, Backbone, localStorage, JSON