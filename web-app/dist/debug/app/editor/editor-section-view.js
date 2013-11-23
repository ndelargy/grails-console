(function() {
  App.module('Editor', function(Editor, App, Backbone, Marionette, $, _) {
    return Editor.EditorSectionView = Marionette.ItemView.extend({
      template: 'editor/editor-section',
      attributes: {
        "class": 'full-height'
      },
      initialize: function() {
        return this.listenTo(App.settings, 'change:orientation', this.showOrientation);
      },
      onRender: function() {
        this.initLayout();
        this.editorView = new Editor.EditorView({
          el: this.$('#editor')[0]
        });
        this.editorView.render();
        this.layout.initContent('center');
        this.editorView.resize();
        this.resultCollection = new Editor.ResultCollection();
        this.resultsView = new Editor.ResultCollectionView({
          collection: this.resultCollection
        }).render();
        this.listenTo(this.editorView, 'execute', function(result) {
          return this.resultCollection.add(result);
        });
        this.listenTo(this.editorView, 'save', function(text) {
          return this.trigger('save', text);
        });
        this.listenTo(this.editorView, 'saveAs', function(text) {
          return this.trigger('saveAs', text);
        });
        this.listenTo(this.editorView, 'clear', this.clearResults);
        return this.showOrientation();
      },
      onVisible: function() {
        this.log('onVisible');
        return this.refresh();
      },
      refresh: function() {
        this.editorView.refresh();
        this.layout.resizeAll();
        return this.showOrientation();
      },
      initLayout: function() {
        var _this = this;
        return this.layout = this.$el.layout({
          center__paneSelector: '#editor',
          center__contentSelector: '#code-wrapper',
          center__onresize: function() {
            return _this.editorView.refresh();
          },
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
          $('.east').append(this.resultsView.el);
          this.layout.hide('south');
          this.layout.show('east');
          this.layout.initContent('east');
        } else {
          $('.south').append(this.resultsView.el);
          this.layout.hide('east');
          this.layout.show('south');
          this.layout.initContent('south');
        }
        return this.editorView.refresh();
      },
      setValue: function(text) {
        return this.editorView.setValue(text);
      },
      clearResults: function() {
        return this.resultsView.clear();
      }
    });
  });

}).call(this);
