#globals Player:false, Song: false
describe 'App.Router', ->

  beforeEach ->
    @router = new App.Router()
    Backbone.history.start()

  afterEach ->
    Backbone.history.stop()

  it 'should handle openLocalFile routes', ->
    callback = jasmine.createSpy()
    @router.on 'route:openLocalFile', callback
    @router.navigate 'l/filename', trigger: true
    expect(callback).toHaveBeenCalledWith('filename')