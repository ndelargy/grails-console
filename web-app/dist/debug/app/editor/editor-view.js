(function() {
  (function(App, Backbone, CodeMirror, JST) {
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
        this.editor.setValue('');
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
      setValue: function(text) {
        this.editor.setValue(text);
        this.editor.refresh();
        return this.editor.focus();
      },
      save: function() {
        return this.trigger('save', this.editor.getValue());
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
