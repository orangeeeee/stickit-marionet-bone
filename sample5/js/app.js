(function () {

    var Item = Backbone.Model.extend({

        //継承関係にある場合は、
        defaults: function () {
            return {
                newCar: "",
                smoking: ""
            }
        }

    });
    var item = new Item();


    //表示エリアのView
    var MainView = Mn.ItemView.extend({

        //ビューで登録できるイベントはelの子要素に限られるから必ずelは指定する。
        el: '#mainView',
        model: item,
        ui: {

        },
        initialize: function () {
            //            			this.listenTo(this.model, 'change', this.changeTest());
            //                        this.model.on('change', this.changeTest);
            //            this.model.on('change', this.render);


        },
        modelEvents: {
            "change": "render"
        },
        events: {
            "click #newCar": "newCarModelChange",
            "click .smoking": "smokingModelChange"
        },
        bindings: function () {
            return {
                '.smoking': {
                    observe: 'smoking',
                    onSet: function (value) {
                        console.log('onGet value:' + value);
                    }
                },
                '#newCar': {
                    observe: 'newCar',
                    onGet: function (value) {
                        console.log('newCar onGet value:' + value);
                    }
                },
            }
        },
        changeTest: function () {
            console.log('aaa');
        },
        newCarModelChange: function (e) {
            console.log('newCarModelChange');
            this.model.set('newCar', $(e.target).val());
        },
        smokingModelChange: function (e) {
            this.model.set('smoking', $(e.target).val());
        },
        render: function () {
            console.log('render');
            this.stickit();
        },

    });

    new MainView({});

})();
