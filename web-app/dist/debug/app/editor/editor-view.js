(function() {
  App.module('Editor', function(Editor, App, Backbone, Marionette, $, _) {
    return Editor.EditorView = Marionette.ItemView.extend({
      template: 'editor/editor',
      events: {
        'click button.execute': 'onExecuteClick',
        'click button.new': 'onNewClick',
        'click button.files': 'onFilesClick',
        'click button.save': 'onSaveClick',
        'click a.save-as': 'onSaveAsClick'
      },
      initialize: function() {
        var _this = this;
        $(window).on("beforeunload", function() {
          return _this.onBeforeunload();
        });
        return this.listenTo(App, 'app:editor:execute', this.executeCode);
      },
      attributes: {
        id: 'editor'
      },
      onRender: function() {
        return this.initEditor();
      },
      onNewClick: function(event) {
        event.preventDefault();
        return App.trigger('app:file:new');
      },
      onFilesClick: function(event) {
        event.preventDefault();
        return App.trigger('app:file:list');
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
        return this.editor.setOption('theme', App.settings.get('theme'));
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
      onSaveClick: function() {
        return this.trigger('save', this.editor.getValue());
      },
      onSaveAsClick: function(event) {
        event.preventDefault();
        return this.trigger('saveAs', this.editor.getValue());
      },
      onExecuteClick: function(event) {
        event.preventDefault();
        return this.executeCode();
      },
      executeCode: function() {
        var jqxhr, result;
        result = new Editor.Result({
          loading: true,
          input: this.getValue()
        });
        this.trigger("execute", result);
        jqxhr = $.post(App.createLink('execute'), {
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
      }
    });
  });

}).call(this);
