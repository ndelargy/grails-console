describe 'App.Files.FilesSectionView', ->

  beforeEach ->

  it 'should start with empty list', ->
    @view = new App.Files.FilesSectionView()
    expect(@store.list().length).toBe 0
