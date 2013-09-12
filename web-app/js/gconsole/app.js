(function ($, _, Backbone, JST) {

    window.App = ({
        start: function (data) {
            this.data = data;

            this.settings = App.Settings.getInstance();

            this.initLayout();
            this.initResults();
            this.initRouter();

            this.editorView = new App.EditorView({
                el: $('#editor')[0]
            }).render();
            App.layout.initContent('center');
            this.editorView.resize();

            this.editorView.on('execute', this.executeCode, this);
            this.editorView.on('new', this.newFileClick, this);
            this.editorView.on('open', this.openFileClick, this);
            this.editorView.on('clear', this.clearResults, this);


            $('.results button.clear').click(_.bind(this.clearResults, this));

            this.settings.on('change:orientation', this.showOrientation, this);

            $(document).on('keydown', 'Ctrl+return', _.bind(this.executeCode, this));
            $(document).on('keydown', 'esc', _.bind(this.clearResults, this));

            $(window).on('beforeunload', _.bind(this.onBeforeunload, this));

            this.showOrientation();

            new App.SettingsView({
                model: this.settings,
                el: $('.dropdown-menu.settings')[0]
            }).render();
            Backbone.history.start({pushState: false});
        },

        newFileClick: function (event) {
            // TODO check if file needs to be saved

            App.router.navigate('new', {trigger: true});
        },

        openFileClick: function(event) {

            var files = localFileStore.findAll(); // TODO sort last modified desc
            var html = JST['file-list']({
                files: _.map(files, function(file) {return file.toJSON()})
            });
            var $div = $(html);
            $('#editor').html($div);
        },

        onBeforeunload: function (event) {
            if (this.editorView.isDirty()) {
                return 'You have unsaved changes.';
            }
        },

        initRouter: function () {
            var oThis = this;

            var router = new App.Router();
            App.router = router;

            App.router.on("route:openLocalFile", function (name) {
                var file = _.find(localFileStore.findAll(), function(model){
                    return model.get('name') === name;
                });
                if (!file) {
                    console.log('TODO: no file');
                    return;
                }
                oThis.showFile(file);

            });
            App.router.on("route:openRemoteFile", function (name) {
                var jqxhr = $.get(oThis.data.baseUrl + '/console/loadFile', {filename: name});
                jqxhr.done(function (response) {
                    console.log(response);
                    var file = new File({name: name, text: response.text});
                    oThis.showFile(file);
                });
            });
            App.router.on('route:newFile', function () {
                var file = new File({text: ''});
                oThis.showFile(file);
            });
            App.router.on('route:defaultRoute', function () {
                console.log('TODO: grab the last file.');
                router.navigate('new', {trigger: true});
            });
        },

        initLayout: function () {
            this.layout = $('body').layout({
                north__paneSelector: '#header',
                north__spacing_open: 0,
                center__paneSelector: '#editor',
                center__contentSelector: '#code-wrapper',
                center__onresize: _.bind(function () { this.editorView.refresh(); }, this),
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
            this.editorView.showFile(file); // TODO
        },

        initResults: function () {
            $('#result').toggleClass('wrap', this.settings.get('results.wrapText'));
            this.settings.on('change:results.wrapText', function(model, value, options) {
                $('#result').toggleClass('wrap', value);
            }, this);
        },

        executeCode: function () {
            var result = new App.Result({
                loading: true,
                input: this.editorView.getValue()
            });
            var resultsView = new App.ResultView({model: result});

            $('#result .inner').append(resultsView.render().el);
            var $result = resultsView.$el;

            this.scrollToResult($result);
            $.post(this.data.baseUrl + '/console/execute', {code: this.editorView.getValue()})
                .done(_.bind(function (response) {
                    result.set({
                        loading: false,
                        totalTime: response.totalTime,
                        exception: response.exception,
                        result: response.result,
                        output: response.output
                    });
                    this.scrollToResult($result);
                }, this)).fail(_.bind(function () {
                    result.set({
                        loading: false,
                        error: 'An error occurred.'
                    });
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
            this.editorView.refresh();
        }

    });


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

})(jQuery, _, Backbone, JST);
