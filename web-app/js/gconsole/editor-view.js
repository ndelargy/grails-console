(function (App, Backbone, CodeMirror) {

    var FileNameView = Backbone.View.extend({
        initialize: function() {
            var html = '<div class="pull-right saving" style="display: none">Saving</div><div class="file-name"></div>';
            this.listenTo(this.model, 'change', _.bind(this.render, this));
            this.$el.html(html);
        },
        render: function() {
            var name = this.model.get('name') || '&nbsp;';
            this.$('.file-name').html(name);
            return this;
        }
    });

    App.EditorView = Backbone.View.extend({

        events: {
            'click button[data-function]': 'onButtonClick',
            'click button.save': 'save'
        },

        onButtonClick: function(event) {
            var fcn = $(event.currentTarget).data('function');
            this.trigger(fcn);
        },

        render: function() {
            var html = JST['editor']();
            this.$el.html(html);

            this.initEditor();
            return this;
        },

        resize: function() {
            this.editor.refresh();
        },

        initEditor: function () {
            var oThis = this;
            this.editor = CodeMirror.fromTextArea(this.$('textarea[name=code]')[0], {
                matchBrackets: true,
                mode: 'groovy',
                lineNumbers: true,
                extraKeys: { // TODO $(document).trigger passthrough?
                    'Ctrl-Enter': function() { oThis.trigger('execute'); },
                    'Esc': function() { oThis.trigger('clear'); }
                }
            });
            this.editor.focus();
            this.editor.setValue('');
        },

        getValue: function() {
            return this.editor.getValue();
        },

        setValue: function(value) {
            this.editor.setValue(value);
        },

        refresh: function() {
            this.editor.refresh();
        },

        showFile: function (file) {
            this.file = file;
            this.file.on('request', function() {
                console.log('request');
            });
            this.file.on('sync', function() {
                console.log('sync');
            });
            if (this.fileNameView) {
                this.fileNameView.remove();
            }
            this.fileNameView = new FileNameView({model: file});
            this.$('.file-name-section').html(this.fileNameView.render().el);

            this.editor.setValue(this.file.get('text'));
            this.editor.refresh();
        },

        isDirty: function() {
            return this.file.get('text') !== this.editor.getValue();
        },

        save: function () {
            if (!this.file.get('name')) {
                this.prompt('File name', _.bind(function(name) {
                    this.file.set('name', name);
                    this.save();
                    App.router.navigate('l/' + name, {trigger: false});
                }, this));
            } else {
                this.$('.file-name-section .saving').show();
                this.file.set('text', this.editor.getValue());
                this.file.save();
                this.$('.file-name-section .saving').fadeOut();
            }
        },

        prompt: function(message, callback) {
            $('#newFileName').modal('show');
            $('#newFileName').find('button.ok').click(function(event) { // TODO once
                var value = $('#newFileName').find('input[type=text]').val();
                $('#newFileName').modal('hide');
                callback(value);
            });
            $('#myModal').on('hidden.bs.modal', function () {
                // do something…
            })

        }
    });
})(App, Backbone, CodeMirror);