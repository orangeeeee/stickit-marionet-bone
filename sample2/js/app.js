(function () {

    // Model

    var Task = Backbone.Model.extend({
        defaults: {
            title: "todo sample",
            completed: false
        }
    });
    
    var task = new Task();

    //Marionette.ItemView1の場合、renderが不要になる。
    var TaskView = Mn.ItemView.extend({
        tagName: 'li',
        template: '#task-template'
    });
    
    /*
        // BackBone.View
        var TaskView = Backbone.View.extend({
            tagName: 'li',
            template: _.template( $('#task-template').html() ),
            render: function() {
                var template = this.template( this.model.toJSON() );
                this.$el.html(template);
                return this;
            }
        });
    */
    var taskView = new TaskView({
        model: task
    });
    console.log(taskView.render().el);
    $('body').append(taskView.render().el);

})();
