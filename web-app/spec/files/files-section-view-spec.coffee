describe 'App.Files.FilesSectionView', ->

  beforeEach ->
    App.settings = new App.Entities.Settings()

    @$el = $('<div></div>').appendTo('body')
    @view = new App.Files.FilesSectionView collection: new App.Entities.FileCollection()

  afterEach ->
    @view.close()
    @$el.remove()

  it 'should render', ->
    @$el.append @view.render().$el
    expect(@view.$el).toBe 'div.modal-dialog.files-section-view'

  it 'should update name', ->
    @$el.append @view.render().$el
    @view.setName 'test'
    expect(@view.$('input.file-name').val()).toBe 'test'




