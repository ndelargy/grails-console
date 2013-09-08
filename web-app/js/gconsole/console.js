(function (App, $, _, Backbone) {

    var LocalObjectStore = function (name) {
        this.name = name;
    };

    _.extend(LocalObjectStore.prototype, {
        getObject: function (key) {
            var string = localStorage.getItem(this.name + '.' + key);
            return string && JSON.parse(string);
        },
        setObject: function (key, object) {
            localStorage.setItem(this.name + '.' + key, JSON.stringify(object));
        }
    });

    var localObjectStore = new LocalObjectStore('gconsole');

    var remoteFileStore = {
        load: function (fileName) {
            var jqxhr = $.get(
                gconsole.data.baseUrl + '/console/loadFile',
                {filename: fileName}
            );
            jqxhr.done(function (response) {
                var file = new File(fileName, response.text);
                gconsole.showFile(file);
            });
        },
        save: function (file) {
            this.lastModified = new Date();
            localStorage.setItem('file.' + file.name, JSON.stringify(file));
        }
    };

    var File = Backbone.Model.extend();
    var localFileStore = new Backbone.LocalModelStore('gconsole.files', File);

    App.File = File;
    App.fileStore = localFileStore;

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

    window.gconsole = ({
        start: function (data) {
            this.data = data;

            this.settings = App.Settings.load();

            this.initLayout();
            this.initEditor();
            this.initResults();
            this.initRouter();

            $('#editor button.submit').click(_.bind(this.executeCode, this));
            $('#editor button.save').click(_.bind(this.save, this));
            $('#editor button.new').click(_.bind(this.newFileClick, this));
            $('.results button.clear').click(_.bind(this.clearResults, this));


            this.settings.on('change:orientation', _.bind(this.showOrientation, this));

            $('.orientation .vertical').click(_.bind(function (event) { this.showOrientation('vertical'); }, this));
            $('.orientation .horizontal').click(_.bind(function (event) { this.showOrientation('horizontal'); }, this));

            $(document).on('keydown', 'Ctrl+return', _.bind(this.executeCode, this));
            $(document).on('keydown', 'esc', _.bind(this.clearResults, this));

            $(window).on('beforeunload', _.bind(this.onBeforeunload, this));

            this.showOrientation();
            Backbone.history.start({pushState: false});

            new App.SettingsView({
                model: this.settings,
                el: $('.dropdown-menu.settings')[0]
            }).render();
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

        },

        save: function () {
            if (!this.file.get('name')) {
                this.prompt('File name', _.bind(function(name) {
                    name = name + '.groovy'; // TODO
                    this.file.set('name', name);
                    this.save();
                    this.router.navigate('l/' + name, {trigger: false});
                }, this));
            } else {
                $('#editor .file-name-section .saving').show();
                this.file.set('text', this.editor.getValue());
                this.file.save();
                $('#editor .file-name-section .saving').fadeOut();
            }
        },

        newFileClick: function () {
            // TODO check if file needs to be saved

            this.router.navigate('new', {trigger: true});
        },

        onBeforeunload: function (e) {
            if (this.file.get('text') !== this.editor.getValue()) {
                return 'You have unsaved changes.';
            }
        },

        initRouter: function () {
            var oThis = this;
            var router = new App.Router();

            router.on("route:openLocalFile", function (name) {
                var file = _.find(localFileStore.findAll(), function(model){
                    return model.get('name') === name;
                });
                if (!file) {
                    console.log('TODO: no file');
                    return;
                }
                oThis.showFile(file);

            });
            router.on("route:openRemoteFile", function (name) {
                var jqxhr = $.get(oThis.data.baseUrl + '/console/loadFile', {filename: name});
                jqxhr.done(function (response) {
                    console.log(response);
                    var file = new File({name: name, text: response.text});
                    oThis.showFile(file);
                });
            });
            router.on('route:newFile', function () {
                var file = new File({text: ''});
                oThis.showFile(file);
            });
            router.on('route:defaultRoute', function () {
                console.log('TODO: grab the last file.');
                router.navigate('new', {trigger: true});
            });

            this.router = router;
        },

        initLayout: function () {
            this.layout = $('body').layout({
                north__paneSelector: '#header',
                north__spacing_open: 0,
                center__paneSelector: '#editor',
                center__contentSelector: '#code-wrapper',
                center__onresize: _.bind(function () { this.editor.refresh(); }, this),
                east__paneSelector: '.east',
                east__contentSelector: '#result',
                east__initHidden: this.settings.get('orientation') !== 'vertical',
                east__size: this.settings.get('layout.east.size'),
                east__onresize_end: _.bind(function (name, $el, state, opts) {
                    this.settings.set('layout.east.size', state.size);
                    this.settings.save();
                }, this),
                south__paneSelector: '.south',
                south__contentSelector: '#result',
                south__initHidden: this.settings.get('orientation') !== 'horizontal',
                south__size: this.settings.get('layout.south.size'),
                south__onresize_end: _.bind(function (name, $el, state, opts) {
                    this.settings.set('layout.south.size', state.size);
                    this.settings.save();
                }, this),
                resizable: true,
                fxName: ''
            });

            this.layout.allowOverflow("north");
        },

        showFile: function (file) {
            this.file = file;
            if (this.fileNameView) {
                this.fileNameView.remove();
            }
            this.fileNameView = new FileNameView({model: file});
            $('.file-name-section').html(this.fileNameView.render().el);

            this.editor.setValue(this.file.get('text'));
            this.editor.refresh();
        },

        initEditor: function () {
            this.editor = CodeMirror.fromTextArea($('textarea[name=code]')[0], {
                matchBrackets: true,
                mode: 'groovy',
                lineNumbers: true,
                extraKeys: {
                    'Ctrl-Enter': _.bind(this.executeCode, this),
                    'Esc': _.bind(this.clearResults, this)
                }
            });
            this.editor.focus();
            this.editor.setValue('');
        },

        initResults: function () {
            $('#result').toggleClass('wrap', this.settings.get('results.wrapText'));
            this.settings.on('change:results.wrapText', function(model, value, options) {
                $('#result').toggleClass('wrap', value);
            }, this);
        },

        executeCode: function () {
            this.doExecute({
                code: this.editor.getValue(),
                captureStdout: 'on'
            });
        },

        doExecute: function (postParams) {
            var $result = $('<div class="script-result loading">Executing Script...</div>');
            $('#result .inner').append($result);

            this.scrollToResult($result);
            $.post(this.data.baseUrl + '/console/execute', postParams)
                .done(_.bind(function (response) {
                    $result.removeClass('loading');
                    var timeSpan = '<span class="result-time label label-default pull-right">' + response.totalTime + ' ms</span>';
                    if (response.exception) {
                        $result.html(timeSpan + response.exception + response.result).addClass('stacktrace');
                    } else {
                        $result.html(timeSpan + response.output + response.result);
                    }
                    this.scrollToResult($result);
                }, this)).fail(_.bind(function () {
                    $result.removeClass('loading').addClass('stacktrace');
                    $result.html('An error occurred.');
                    this.scrollToResult($result);
                }, this));
        },

        clearResults: function () { $('#result .inner').html(''); },

        scrollToResult: function ($result) {
            var scroll = $result.position().top + $('#result').scrollTop();
            $('#result').animate({scrollTop: scroll});
        },

        showOrientation: function () {
            var orientation = this.settings.get('orientation');
            if (orientation === 'vertical') {
                $('.orientation .vertical').button('toggle');
                $('.east').append($('.south').children());
                this.layout.hide('south');
                this.layout.show('east');
                this.layout.initContent('east');
            } else {
                $('.orientation .horizontal').button('toggle');
                $('.south').append($('.east').children());
                this.layout.hide('east');
                this.layout.show('south');
                this.layout.initContent('south');
            }
            this.editor.refresh();
        }

    });
})(window.App = window.App || {}, jQuery, _, Backbone);
