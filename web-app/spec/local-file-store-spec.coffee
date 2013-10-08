describe 'App.LocalFileStore', ->

  beforeEach ->
    @store = new App.LocalFileStore('test')
    @store.destroyAll()


  it 'should start with empty list', ->
    expect(@store.list().length).toBe 0


  it 'should persist to localStorage', ->
    file = new App.File(name: 'test-name', text: 'test-text')
    @store.create file

    expect(@store.list().length).toBe 1

    @store = new App.LocalFileStore('test')
    expect(@store.list().length).toBe 1


  it 'should work with sync', ->
    file = new App.File(name: 'test-name', text: 'test-text')
    file.sync = _.bind(@store.sync, @store)

    expect(file.id).not.toBeDefined()
    spyOn(@store, 'create').andCallThrough()
    file.save()

    expect(@store.list().length).toBe 1
    expect(@store.create).toHaveBeenCalled()
    expect(file.id).toBeDefined()

    file.set 'name', 'different'
    expect(file.get('name')).toBe('different')

    spyOn(@store, 'find').andCallThrough()
    file.fetch()

    expect(@store.find).toHaveBeenCalled()
    expect(file.get('name')).toBe('test-name')

    spyOn(@store, 'update').andCallThrough()
    file.save()

    expect(@store.list().length).toBe 1
    expect(@store.update).toHaveBeenCalled()

    spyOn(@store, 'destroy').andCallThrough()
    file.destroy()

    expect(@store.list().length).toBe 0
    expect(@store.destroy).toHaveBeenCalled()