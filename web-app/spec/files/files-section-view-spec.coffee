describe 'App.Files.FilesSectionView', ->


  describe 'select-file mode', ->

    beforeEach ->
      App.settings = new App.Entities.Settings()

      @$el = $('<div></div>').appendTo('body')
      @view = new App.Files.FilesSectionView
        saving: false
        title: 'Open'

    afterEach ->
      @view.close()
      @$el.remove()

    it 'should serialize correctly', ->
      expect(@view.serializeData()).toEqual
        saving: false
        title: 'Open'


  describe 'save-as mode', ->

    beforeEach ->
      App.settings = new App.Entities.Settings()

      @$el = $('<div></div>').appendTo('body')
      @view = new App.Files.FilesSectionView
        saving: true
        title: 'Save'

    afterEach ->
      @view.close()
      @$el.remove()

    it 'should serialize correctly', ->
      expect(@view.serializeData()).toEqual
        saving: true
        title: 'Save'

    it 'should render', ->
      @$el.append @view.render().$el
      expect(@view.$el).toBe 'div.modal-dialog.files-section-view'

    it 'should update name', ->
      @$el.append @view.render().$el
      @view.setName 'test'
      expect(@view.$('input.file-name').val()).toBe 'test'




