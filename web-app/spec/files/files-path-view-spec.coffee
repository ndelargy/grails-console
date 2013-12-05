describe 'App.Files.FilePathView', ->

  beforeEach ->
    App.settings = new App.Entities.Settings()

    @$el = $('<div></div>').appendTo('body')
    @model = new Backbone.Model(path: 'test-path')
    @view = new App.Files.FilePathView model: @model

  afterEach ->
    @view.close()
    @$el.remove()

  it 'should serialize correctly', ->
    expect(@view.serializeData()).toEqual baseDir: 'test-path'

  it 'should render', ->
    @$el.append @view.render().$el
    expect(@view.$el).toBe 'div.breadcrumb-section'

  it 'should display the correct breadcrumbs', ->
    @model.set 'path', '/a/b/c'

    @$el.append @view.render().$el

    expect(@view.$('.breadcrumb li').length).toBe 4





