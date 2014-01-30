describe 'App.Entities.FileCollection', ->

  beforeEach ->
    @collection = new App.Entities.FileCollection()

  it 'should return correct hasParent', ->
    data =
      '/':        false
      '/aaa':     true
      '/aaa/':    true
      '/aaa/bbb': true
      'C:/':      false
      'C:/aaa':   true

    for path, expected of data
      @collection.path = path
      expect(@collection.hasParent()).toBe expected

  it 'should return correct getCurrentDir', ->
    data =
      '/':          ''
      '/aaa':       'aaa'
      '/aaa/':      'aaa'
      '/aaa/bbb':   'bbb'
      'C:/  ':        'C:'
      'C:/aaa':     'aaa'
      'C:/aaa/bbb': 'bbb'

    for path, expected of data
      @collection.path = path
      expect(@collection.getCurrentDir()).toBe expected