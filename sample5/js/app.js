(function () {

    var Item = Backbone.Model.extend({

        //継承関係にある場合は、
        defaults: function () {
            return {
                newCar: false,
                smoking: ["noSelect"]
            }
        },
        isNoSmoking: function () {
            return this.get('smoking') === 'smoking' ? true : false;
        }

    });
    var item = new Item({
        newCar: false
    });


    //表示エリアのView
    var MainView = Mn.ItemView.extend({

        //ビューで登録できるイベントはelの子要素に限られるから必ずelは指定する。
        el: '#mainView',
        model: item,
        ui: {

        },
        initialize: function () {
            this.stickit();
            // this.listenTo(this.model, 'change', this.changeTest());
            // this.model.on('change', this.changeTest);
            // this.model.on('change', this.render);
            // TODO そもそもcollectionを使用してradioを表示しなければいけない？
        },
        modelEvents: {
            "change": "render"
        },
        events: {
            "click .smoking": "smokingModelChange",
            "click #testButton": "clickTest"
        },
        bindings: function () {
            return {
                '.smoking': {
                    observe: 'smoking',
                    update: function (value) {
                        console.log('smoking onGet value:' + value);
                    }
                },
                'input[type=checkbox]': {
                    attributes: [{
                        name: 'disabled',
                        observe: 'newCar',
                        onGet: 'isDisabledNewCar',
                        update: function ($el, value, model, options) {
                            console.log('newCar onGet value:' + value);
                            this.newCarModelChange;
                        }

                    }]
                },
            }
        },
        isDisabledNewCar: function (val) {
            console.log(this.model.get('smoking'));
            let smokingVal = this.model.get('smoking');
            return this.model.isNoSmoking();
        },
        newCarModelChange: function (e) {
            //            console.log('newCarModelChange');
            this.model.set('newCar', $(e.target).val());
        },
        smokingModelChange: function (e) {
            this.model.set('smoking', $(e.target).val());
        },
        clickTest: function () {
            this.model.set('newCar', true);
            console.log("clickTest: newCar value:" + this.model.get('newCar'));
        },
        render: function () {
            console.log('render');
            this.stickit();
        },

    });

    new MainView({});

})();
