xdescribe 'App.Router', -> # TODO move to subapps

  beforeEach ->
    @router = new App.Router()
    Backbone.history.start()

  afterEach ->
    Backbone.history.stop()

  it 'should handle openLocalFile routes', ->
    callback = jasmine.createSpy()
    @router.on 'route:openLocalFile', callback
    @router.navigate 'local/filename', trigger: true
    expect(callback).toHaveBeenCalledWith('filename')

  it 'should handle openRemoteFile routes', ->
    callback = jasmine.createSpy()
    @router.on 'route:openRemoteFile', callback
    @router.navigate 'remote/filename', trigger: true
    expect(callback).toHaveBeenCalledWith('filename')

  it 'should handle newFile routes', ->
    callback = jasmine.createSpy()
    @router.on 'route:newFile', callback
    @router.navigate 'new', trigger: true
    expect(callback).toHaveBeenCalledWith()

  it 'should handle default route', ->
    callback = jasmine.createSpy()
    @router.on 'route:defaultRoute', callback
    @router.navigate 'xxx', trigger: true
    expect(callback).toHaveBeenCalledWith('xxx')
