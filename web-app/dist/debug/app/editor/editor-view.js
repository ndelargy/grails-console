(function() {
  (function(App, Backbone, CodeMirror, JST) {
    var FileNameView;
    FileNameView = App.ItemView.extend({
      initialize: function() {
        var html;
        html = '<div class="pull-right saving" style="display: none">Saving</div><div class="file-name"></div>';
        this.listenTo(this.model, "change", this.render);
        return this.$el.html(html);
      },
      render: function() {
        var name;
        name = this.model.get("name") || "&nbsp;";
        this.$(".file-name").html(name);
        return this;
      }
    });
    return App.EditorView = App.ItemView.extend({
      template: 'editor',
      events: {
        'click button[data-function=execute]': "executeCode",
        'click button[data-function]': "onButtonClick",
        'click button.save': "save",
        'click button.help': "onHelpClick"
      },
      initialize: function() {
        var _this = this;
        return $(window).on("beforeunload", function() {
          return _this.onBeforeunload();
        });
      },
      onButtonClick: function(event) {
        var fcn;
        fcn = $(event.currentTarget).data("function");
        return this.trigger(fcn);
      },
      onRender: function() {
        return this.initEditor();
      },
      resize: function() {
        return this.editor.refresh();
      },
      initEditor: function() {
        var _this = this;
        this.editor = CodeMirror.fromTextArea(this.$("textarea[name=code]")[0], {
          matchBrackets: true,
          mode: "groovy",
          lineNumbers: true,
          extraKeys: {
            'Ctrl-Enter': function() {
              return _this.executeCode();
            },
            'Esc': function() {
              return _this.trigger("clear");
            }
          },
          theme: "lesser-dark"
        });
        this.editor.focus();
        this.editor.setValue("");
        this.listenTo(App.settings, 'change:theme', this.setTheme);
        return this.setTheme();
      },
      setTheme: function() {
        return this.editor.setOption("theme", App.settings.get("theme"));
      },
      getValue: function() {
        return this.editor.getValue();
      },
      setValue: function(value) {
        return this.editor.setValue(value);
      },
      refresh: function() {
        return this.editor.refresh();
      },
      showFile: function(file) {
        this.file = file;
        if (this.fileNameView) {
          this.fileNameView.remove();
        }
        this.fileNameView = new FileNameView({
          model: file
        });
        this.$(".file-name-section").html(this.fileNameView.render().el);
        this.editor.setValue(this.file.get("text"));
        this.editor.refresh();
        return this.editor.focus();
      },
      isDirty: function() {
        return this.file.get("text") !== this.editor.getValue();
      },
      save: function() {
        var _this = this;
        if (this.file.isNew()) {
          return this.prompt(function(name) {
            _this.file.set("name", name);
            _this.save();
            return App.router.navigate("local/" + name, {
              trigger: false
            });
          });
        } else {
          this.$(".file-name-section .saving").show();
          this.file.set("text", this.editor.getValue());
          this.file.save();
          return this.$(".file-name-section .saving").fadeOut();
        }
      },
      prompt: function(callback) {
        var $el;
        $el = $(JST['save-new-file-modal']());
        $el.modal();
        $el.find("button.ok").click(function(event) {
          var value;
          value = $el.find("input[type=text]").val();
          $el.modal("hide");
          return callback(value);
        });
        return $el.on('hidden.bs.modal', function() {
          $el.remove();
          return $('.modal-backdrop').remove();
        });
      },
      executeCode: function() {
        var jqxhr, result;
        result = new App.Result({
          loading: true,
          input: this.getValue()
        });
        this.trigger("execute", result);
        jqxhr = $.post("" + App.data.baseUrl + "/console/execute", {
          code: this.getValue()
        });
        jqxhr.done(function(response) {
          return result.set({
            loading: false,
            totalTime: response.totalTime,
            exception: response.exception,
            result: response.result,
            output: response.output
          });
        });
        return jqxhr.fail(function() {
          return result.set({
            loading: false,
            error: "An error occurred."
          });
        });
      },
      onBeforeunload: function(event) {
        if (this.editorView.isDirty()) {
          return "You have unsaved changes.";
        }
      },
      onShow: function() {
        return this.editor.focus();
      },
      onHelpClick: function(event) {
        var $el;
        event.preventDefault();
        $el = $(JST['help-modal']());
        $el.modal();
        return $el.on('hidden.bs.modal', function() {
          $el.remove();
          return $('.modal-backdrop').remove();
        });
      }
    });
  })(App, Backbone, CodeMirror, JST);

}).call(this);
