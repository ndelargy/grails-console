(function() {
  (function(App, Backbone) {
    return App.EditorController = Backbone.Marionette.Controller.extend({
      initialize: function(options) {
        this.region = options.region;
        this.view = new App.EditorSectionView;
        this.listenTo(this.view, 'save', this.save);
        return this.listenTo(this.view, 'fork', function(text) {
          this.showFile(new App.File({
            text: text
          }));
          return App.router.navigate("new", {
            trigger: false
          });
        });
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
  })(App, Backbone);

}).call(this);
