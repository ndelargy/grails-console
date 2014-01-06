(function() {
  (function(App, Backbone) {
    return App.ContentView = Backbone.Marionette.Layout.extend({
      template: 'editor/editor-section',
      attributes: {
        "class": 'full-height'
      },
      regions: {
        centerRegion: '.center',
        westRegion: '.west'
      },
      initialize: function(options) {
        var _this = this;
        this.listenTo(App.settings, 'change:orientation', this.showOrientation);
        this.editorView = options.editorView;
        this.resultsView = options.resultsView;
        this.scriptsView = options.scriptsView;
        return this.listenTo(this.scriptsView, 'render', function() {
          return _this.layout.initContent('west');
        });
      },
      onRender: function() {
        this.initLayout();
        this.centerRegion.show(this.editorView);
        this.westRegion.show(this.scriptsView);
        this.layout.initContent('center');
        this.editorView.refresh();
        this.resultsView.render();
        return this.showOrientation();
      },
      refresh: function() {
        this.editorView.refresh();
        this.layout.resizeAll();
        return this.showOrientation();
      },
      initLayout: function() {
        var _this = this;
        return this.layout = this.$el.layout({
          center__paneSelector: '.center',
          center__contentSelector: '#code-wrapper',
          center__onresize: function() {
            return _this.editorView.refresh();
          },
          west__paneSelector: '.west',
          west__contentSelector: '.files-wrapper',
          west__size: 250,
          east__paneSelector: '.east',
          east__contentSelector: '.script-result-section',
          east__initHidden: App.settings.get('orientation') !== 'vertical',
          east__size: App.settings.get('layout.east.size'),
          east__onresize_end: function(name, $el, state, opts) {
            App.settings.set('layout.east.size', state.size);
            return App.settings.save();
          },
          east__resizerCursor: 'ew-resize',
          south__paneSelector: '.south',
          south__contentSelector: '.script-result-section',
          south__initHidden: App.settings.get('orientation') !== 'horizontal',
          south__size: App.settings.get('layout.south.size'),
          south__onresize_end: function(name, $el, state, opts) {
            App.settings.set('layout.south.size', state.size);
            return App.settings.save();
          },
          south__resizerCursor: 'ns-resize',
          resizable: true,
          findNestedContent: true,
          fxName: '',
          spacing_open: 3
        });
      },
      showOrientation: function() {
        var orientation;
        orientation = App.settings.get('orientation');
        if (orientation === 'vertical') {
          this.$('.east').append(this.resultsView.el);
          this.layout.hide('south');
          this.layout.show('east');
          this.layout.initContent('east');
        } else {
          this.$('.south').append(this.resultsView.el);
          this.layout.hide('east');
          this.layout.show('south');
          this.layout.initContent('south');
        }
        return this.editorView.refresh();
      }
    });
  })(App, Backbone);

}).call(this);
