(function() {
  (function(App, Backbone) {
    var EditorController;
    EditorController = Backbone.Marionette.Controller.extend({
      initialize: function(options) {
        this.region = options.region;
        this.view = new App.EditorSectionView;
        return this.listenTo(this.view, 'save', this.save);
      },
      showFile: function(file) {
        this.file = file;
        this.view.refresh();
        return this.view.setValue(file.get('text'));
      },
      save: function(text) {
        this.file.set("text", text);
        if (this.file.isNew()) {
          return this.prompt();
        } else {
          App.savingOn();
          this.file.save();
          return App.savingOff();
        }
      },
      isDirty: function() {
        return this.file.get("text") !== this.editor.getValue();
      },
      prompt: function() {
        var $el,
          _this = this;
        $el = $(JST['save-new-file-modal']());
        $el.modal();
        $el.find("input[type=text]").focus();
        $el.find("button.ok").click(function(event) {
          var name, store;
          event.preventDefault();
          name = $el.find("input[type=text]").val();
          store = $('input[name=store]:checked').val();
          _this.file.set("name", name);
          _this.file.local = store === 'local';
          App.savingOn();
          _this.file.save().then(function() {
            App.savingOff();
            return App.router.navigateToFile(_this.file, {
              trigger: false
            });
          });
          return $el.modal("hide");
        });
        return $el.on('hidden.bs.modal', function() {
          $el.remove();
          return $('.modal-backdrop').remove();
        });
      }
    });
    return App.MainView = Backbone.Marionette.Layout.extend({
      template: 'main',
      attributes: {
        id: 'main-content'
      },
      regions: {
        editorRegion: '.editor',
        filesRegion: '.files'
      },
      initialize: function() {
        this.editorController = new EditorController({
          region: this.editorRegion
        });
        return this.filesSectionView = new App.FilesSectionView;
      },
      onRender: function() {
        this.editorRegion.show(this.editorController.view);
        this.editorRegion.$el.show();
        return this.filesRegion.show(this.filesSectionView);
      },
      showEditor: function(file) {
        this.editorRegion.$el.show();
        this.filesRegion.$el.hide();
        return this.editorController.showFile(file);
      },
      showFiles: function() {
        this.editorRegion.$el.hide();
        return this.filesRegion.$el.show();
      }
    });
  })(App, Backbone);

}).call(this);
