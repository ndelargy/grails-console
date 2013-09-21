(function (App, Backbone, JST) {

    App.FileCollectionView = Backbone.View.extend({

        events: {
//            'click button.clear': 'clear'
        },

        initialize: function () {
            this.template = JST['file-list'];
        },

        render: function() {
            var html = JST['file-list']({
                files: this.collection.toJSON()
            });
            this.$el.html(html);
            return this;
        }
    });

    /*
    local
    - load all on start
    - save one

    remote
    - list
     */


    var RemoteFileStore = function() {

    };

    _.extend(RemoteFileStore.prototype, {

        listFiles: function() {
            $.get('xxx/listFiles');
            //dfd
        },

        getFileText: function(name) {
            $.get('xxx/getFileText');
            //dfd
        },

        saveFile: function(file) {
            $.get('xxx/saveFile');
            //dfd
        }

    });


})(App, Backbone, JST);