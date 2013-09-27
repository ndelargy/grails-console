(function() {
  (function(App, Backbone, CodeMirror, JST) {
    var FileNameView;
    FileNameView = Backbone.View.extend({
      initialize: function() {
        var html;
        html = "<div class=\"pull-right saving\" style=\"display: none\">Saving</div><div class=\"file-name\"></div>";
        this.listenTo(this.model, "change", _.bind(this.render, this));
        return this.$el.html(html);
      },
      render: function() {
        var name;
        name = this.model.get("name") || "&nbsp;";
        this.$(".file-name").html(name);
        return this;
      }
    });
    return App.EditorView = Backbone.View.extend({
      events: {
        "click button[data-function=\"execute\"]": "executeCode",
        "click button[data-function]": "onButtonClick",
        "click button.save": "save"
      },
      initialize: function() {
        return $(window).on("beforeunload", _.bind(this.onBeforeunload, this));
      },
      onButtonClick: function(event) {
        var fcn;
        fcn = $(event.currentTarget).data("function");
        return this.trigger(fcn);
      },
      render: function() {
        var html;
        html = JST["editor"]();
        this.$el.html(html);
        this.initEditor();
        return this;
      },
      resize: function() {
        return this.editor.refresh();
      },
      initEditor: function() {
        var oThis;
        oThis = this;
        this.editor = CodeMirror.fromTextArea(this.$("textarea[name=code]")[0], {
          matchBrackets: true,
          mode: "groovy",
          lineNumbers: true,
          extraKeys: {
            "Ctrl-Enter": function() {
              return oThis.executeCode();
            },
            Esc: function() {
              return oThis.trigger("clear");
            }
          },
          theme: "lesser-dark"
        });
        this.editor.focus();
        this.editor.setValue("");
        App.settings.on("change:theme", this.setTheme, this);
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
        return this.editor.refresh();
      },
      isDirty: function() {
        return this.file.get("text") !== this.editor.getValue();
      },
      save: function() {
        if (!this.file.get("name")) {
          return this.prompt("File name", _.bind(function(name) {
            this.file.set("name", name);
            this.save();
            return App.router.navigate("local/" + name, {
              trigger: false
            });
          }, this));
        } else {
          this.$(".file-name-section .saving").show();
          this.file.set("text", this.editor.getValue());
          this.file.save();
          return this.$(".file-name-section .saving").fadeOut();
        }
      },
      prompt: function(message, callback) {
        $("#newFileName").modal("show");
        $("#newFileName").find("button.ok").click(function(event) {
          var value;
          value = $("#newFileName").find("input[type=text]").val();
          $("#newFileName").modal("hide");
          return callback(value);
        });
        return $("#myModal").on("hidden.bs.modal", function() {});
      },
      executeCode: function() {
        var result;
        result = new App.Result({
          loading: true,
          input: this.getValue()
        });
        this.trigger("execute", result);
        return $.post(App.data.baseUrl + "/console/execute", {
          code: this.getValue()
        }).done(function(response) {
          return result.set({
            loading: false,
            totalTime: response.totalTime,
            exception: response.exception,
            result: response.result,
            output: response.output
          });
        }).fail(function() {
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
      }
    });
  })(App, Backbone, CodeMirror, JST);

}).call(this);
