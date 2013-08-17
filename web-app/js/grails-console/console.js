jQuery(function ($) {

    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    function guid() {
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    var Store = function (name) {
        this.name = name;
        var store = localStorage.getItem(this.name);
        this.data = (store && JSON.parse(store)) || {};
    };

    _.extend(Store.prototype, {

        // Save the current state of the **Store** to *localStorage*.
        save: function () {
            localStorage.setItem(this.name, JSON.stringify(this.data));
        },

        // Add a model, giving it a (hopefully)-unique GUID, if it doesn't already
        // have an id of it's own.
        create: function (model) {
            if (!model.id) model.set(model.idAttribute, guid());
            this.data[model.id] = model;
            this.save();
            return model;
        },

        // Update a model by replacing its copy in `this.data`.
        update: function (model) {
            this.data[model.id] = model;
            this.save();
            return model;
        },

        // Retrieve a model from `this.data` by id.
        find: function (model) {
            return this.data[model.id];
        },

        // Return the array of all models currently in storage.
        findAll: function () {
            return _.values(this.data);
        },

        // Delete a model from `this.data`, returning it.
        destroy: function (model) {
            delete this.data[model.id];
            this.save();
            return model;
        }

    });



    Backbone.sync = function (method, model, options) {

        var resp;
        var store = model.localStorage || model.collection.localStorage;

        switch (method) {
            case "read":
                resp = model.id ? store.find(model) : store.findAll();
                break;
            case "create":
                resp = store.create(model);
                break;
            case "update":
                resp = store.update(model);
                break;
            case "delete":
                resp = store.destroy(model);
                break;
        }

        if (resp) {
            options.success(resp);
        } else {
            options.error("Record not found");
        }
    };

    window.SomeCollection = Backbone.Collection.extend({

        localStorage: new Store("SomeCollection")

        // ... everything else is normal.

    });

    var File = function(name, text) {
        this.name = name;
        this.text = text;
    };

    _.extend(File.prototype, {
        save: function() {
            this.lastModified = new Date();
            localStorage.setItem('file.' + this.name, JSON.stringify(this));
        },
        toJSON: function() {
            return {name: this.name, text: this.text, lastModified: this.lastModified};
        }
    });

    _.extend(File, {
        load: function(name) {
            var string = localStorage.getItem('file.' + name);
            var file;
            if (string) {
                var data = JSON.parse(string);
                file = new File(data.name, data.text);
            }
            return file;
        },
        list: function() {
            var prefix = 'file.';
            return _.chain(localStorage)
                .keys()
                .filter(function(key) {
                    return key.indexOf(prefix) == 0;
                })
                .map(function(key) {
                    return key.substr(prefix.length);
                })
                .value();
        }
    });


    ({
        initialize: function () {

            this.settings = {
                orientation: $.Storage.get('console.orientation') || 'vertical',
                eastSize: $.Storage.get('console.eastSize') || '50%',
                southSize: $.Storage.get('console.southSize') || '50%',
                wrap: $.Storage.get('console.wrap') !== 'false',
            };

            this.initLayout();
            this.initEditor();
            this.initWrap();

            $('#editor button.submit').click($.proxy(this.executeCode, this));
            $('#editor button.fromFile').click($.proxy(this.executeFromFile, this));
            $('#editor button.save').click($.proxy(this.save, this));
            $('.results button.clear').click($.proxy(this.clearResults, this));


            $('.orientation .vertical').click($.proxy(function (event) { this.showOrientation('vertical'); }, this));
            $('.orientation .horizontal').click($.proxy(function (event) { this.showOrientation('horizontal'); }, this));

            $(document).on('keydown', 'Ctrl+return', $.proxy(this.executeCode, this));
            $(document).on('keydown', 'esc', $.proxy(this.clearResults, this));

            $(window).on('beforeunload', $.proxy(this.onBeforeunload, this));

            this.showOrientation(this.settings.orientation);
        },

        save: function() {
            this.file.text = this.editor.getValue();
            this.file.save();
        },

        onBeforeunload: function (e) {
            if (this.file.text !== this.editor.getValue()) {
                return 'You have unsaved changes.';
            }
        },

        initLayout: function () {
            this.layout = $('body').layout({
                north__paneSelector: '#header',
                north__spacing_open: 0,
                center__paneSelector: '#editor',
                center__contentSelector: '#code-wrapper',
                center__onresize: $.proxy(function () { this.editor.refresh(); }, this),
                east__paneSelector: '.east',
                east__contentSelector: '#result',
                east__initHidden: this.settings.orientation !== 'vertical',
                east__size: this.settings.eastSize,
                east__onresize_end: $.proxy(function (name, $el, state, opts) {
                    this.settings.eastSize = state.size;
                    this.storeSettings();
                }, this),
                south__paneSelector: '.south',
                south__contentSelector: '#result',
                south__initHidden: this.settings.orientation !== 'horizontal',
                south__size: this.settings.southSize,
                south__onresize_end: $.proxy(function (name, $el, state, opts) {
                    this.settings.southSize = state.size;
                    this.storeSettings();
                }, this),
                resizable: true,
                fxName: ''
            });
        },

        initEditor: function () {
            this.editor = CodeMirror.fromTextArea($('#code')[0], {
                matchBrackets: true,
                mode: 'groovy',
                lineNumbers: true,
                extraKeys: {
                    'Ctrl-Enter': $.proxy(this.executeCode, this),
                    'Esc': $.proxy(this.clearResults, this)
                }
            });
            this.editor.focus();

            this.file = File.load('last.groovy');
            if (!this.file) {
                this.file = new File('last.groovy', '');
            }

            this.editor.setValue(this.file.text);
        },

        initWrap: function () {
            var $input = $('label.wrap input');
            if (this.settings.wrap) {
                $input.prop('checked', 'checked');
            } else {
                $input.removeProp('checked');
            }
            $('#result').toggleClass('wrap', this.settings.wrap);

            $input.click($.proxy(function (event) {
                this.settings.wrap = event.currentTarget.checked;
                $('#result').toggleClass('wrap', this.settings.wrap);
                this.storeSettings();
            }, this));
        },

        executeCode: function () {
            this.storeSettings();

            this.doExecute({
                code: this.editor.getValue(),
                captureStdout: 'on'
            });
        },

        executeFromFile: function () {
            this.doExecute({
                filename: $('#filename').val(),
                captureStdout: 'on'
            });
        },

        doExecute: function (postParams) {
            var $result = $('<div class="script-result loading">Executing Script...</div>');
            $('#result .inner').append($result);

            this.scrollToResult($result);
            $.post(gconsole.executeLink, postParams)
                .done($.proxy(function (response) {
                    $result.removeClass('loading');
                    var timeSpan = '<span class="result_time">' + response.totalTime + ' ms</span>';
                    if (response.exception) {
                        $result.html(timeSpan + response.exception + response.result).addClass('stacktrace');
                    } else {
                        $result.html(timeSpan + response.output + response.result);
                    }
                    this.scrollToResult($result);
                }, this)).fail($.proxy(function () {
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

        showOrientation: function (orientation) {
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
            this.settings.orientation = orientation;
            this.storeSettings();
        },

        storeSettings: function () {
            $.Storage.set({
                'console.orientation': this.settings.orientation,
                'console.eastSize': '' + this.settings.eastSize,
                'console.southSize': '' + this.settings.southSize,
                'console.wrap': '' + this.settings.wrap,
            });
        }

    }.initialize());

});
