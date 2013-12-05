describe 'App.Files.FilesSectionView', ->

  beforeEach ->
    App.settings = new App.Entities.Settings()

    @$el = $('<div></div>').appendTo('body')
    @view = new App.Files.FilesSectionView saving: false

  afterEach ->
    @view.close()
    @$el.remove()

  it 'should serialize correctly', ->
    expect(@view.serializeData()).toEqual saving: false

  it 'should render', ->
    @$el.append @view.render().$el
    expect(@view.$el).toBe 'div.modal-dialog.files-section-view'






