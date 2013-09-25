(function (App, $){
    App.SettingsView = Backbone.View.extend({

        events: {
            'click .orientation-horizontal': 'onOrientationHorizontalClick',
            'click .orientation-vertical': 'onOrientationVerticalClick',
            'click .results-wrap': 'onResultsWrapClick',
            'click .results-show-script': 'onResultsShowScriptClick',
            'click .results-show-stdout': 'onResultsShowStdoutClick',
            'click .theme': 'onThemeClick'
        },

        initialize: function() {
            this.model = App.settings;
            this.listenTo(this.model, 'change', this.render, this);
        },

        render: function() {
            var oThis = this;
//            console.log(this.$('.orientation-horizontal'));
            this.$('.orientation-horizontal').toggleClass('selected', this.model.get('orientation') === 'horizontal');
            this.$('.orientation-vertical').toggleClass('selected', this.model.get('orientation') === 'vertical');
            this.$('.results-wrap').toggleClass('selected', this.model.get('results.wrapText'));
            this.$('.results-show-script').toggleClass('selected', this.model.get('results.showScript'));
            this.$('.results-show-stdout').toggleClass('selected', this.model.get('results.showStdout'));
            this.$('.results-show-result').toggleClass('selected', this.model.get('results.showResult'));
            this.$('.theme').each(function(index, el) {
                var $el = $(el);
                $el.toggleClass('selected', oThis.model.get('theme') === $el.data('theme'));
            });
        },

        onOrientationHorizontalClick: function(event) {
            event.preventDefault();
            event.stopPropagation();
            this.model.set('orientation', 'horizontal');
            this.model.save();
        },

        onOrientationVerticalClick: function(event) {
            event.preventDefault();
            event.stopPropagation();
            this.model.set('orientation', 'vertical');
            this.model.save();
        },

        onThemeClick: function(event) {
            event.preventDefault();
            event.stopPropagation();
            var $el = $(event.currentTarget);
            this.model.set('theme', $el.data('theme'));
            this.model.save();
        },

        onResultsWrapClick: function(event) {
            event.preventDefault();
            event.stopPropagation();
            this.model.toggle('results.wrapText');
            this.model.save();
        },

        onResultsShowScriptClick: function(event) {
            event.preventDefault();
            event.stopPropagation();
            this.model.toggle('results.showScript');
            this.model.save();
        },

        onResultsShowStdoutClick: function(event) {
            event.preventDefault();
            event.stopPropagation();
            this.model.toggle('results.showStdout');
            this.model.save();
        },

        onResultsShowResultClick: function(event) {
            event.preventDefault();
            event.stopPropagation();
            this.model.toggle('results.showResult');
            this.model.save();
        }

    });
})(App, jQuery);