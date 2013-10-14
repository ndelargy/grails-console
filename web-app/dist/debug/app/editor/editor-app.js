(function() {
  App.module('EditorApp', function(EditorApp, App, Backbone, Marionette, $, _) {
    var API, Controller;
    Controller = Marionette.Controller.extend({
      initialize: function(options) {
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
    API = {
      newFile: function() {
        var file;
        console.log('API newFile');
        file = new App.File;
        return this.showFile(file);
      },
      openLocalFile: function() {
        var file;
        console.log('API openLocalFile');
        file = App.localFileStore.list().findWhere({
          name: name
        });
        if (!file) {
          alert('no find file');
          return;
        }
        this.mainView.showEditor(file);
        return this.showFile(file);
      },
      openRemoteFile: function() {
        var file,
          _this = this;
        console.log('API openRemoteFile');
        file = new App.File({
          id: name
        });
        file.local = false;
        file.fetch().done(function() {
          return _this.mainView.showEditor(file);
        }).fail(function() {
          return alert('no find file');
        });
        return this.showFile(file);
      },
      showFile: function(file) {
        App.trigger('app:active', EditorApp.controller.view);
        return EditorApp.controller.showFile(file);
      }
    };
    App.addInitializer(function() {
      var router;
      router = new Marionette.AppRouter({
        controller: API
      });
      router.appRoute('new', 'newFile');
      router.appRoute(/^local:(.*?)$/, 'openLocalFile');
      router.appRoute(/^remote:(.*?)$/, 'openRemoteFile');
      EditorApp.router = router;
      return EditorApp.controller = new Controller;
    });
    return App.on('app:file:selected', function(file) {
      if (file.isLocal()) {
        EditorApp.router.navigate("local:" + (file.get('name')));
      } else {
        EditorApp.router.navigate("remote:" + file.id);
      }
      return API.showFile(file);
    });
  });

}).call(this);
