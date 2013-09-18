(function (App, Backbone, JST) {

    App.FileCollectionView = Backbone.View.extend({

        events: {
            'click button.clear': 'clear'
        },

        initialize: function () {
            this.template = JST['file-list'];

            var files = App.localFileStore.findAll();
            files = _.sortBy(files, function(model) { return model.get('lastModified'); }).reverse();
            var html = JST['file-list']({
                files: _.map(files, function (file) {return file.toJSON()})
            });
            var $div = $(html);
            $('#editor').html($div);
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