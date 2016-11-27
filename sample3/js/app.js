(function () {

	var Item = Backbone.Model.extend({

		//継承関係にある場合は、
		defaults: function () {
			return {
				code: "code",
				name: "name"
			}
		}
	});
	var item = new Item();

	//入力エリアのView
	var ItemInputView = Mn.ItemView.extend({
		//ビューで登録できるイベントはelの子要素に限られるから必ずelは指定する。
		el: "#input-item-code-area",
		ui: {
			updBtn: "#updateButton"
		},
		events: {
			'click @ui.updBtn': 'updateItemInfo'
		},
		updateItemInfo: function () {
			console.debug('start updateItemInfo');
			//ItemInfoViewのエリアを表示させる。
			//ここではModelの変化によるイベント発火を試したい。
			let _code = document.getElementById('input-item-code').value;
			//Modelの値を変更
			item.set("code", _code);
			item.set("name", 'iPhone' + _code);

			/* 以下のようにViewをインスタンス化して呼ぶ必要性はない。
			console.debug('input code:'+ _code);
			let _item = new Item({ code: _code, name:"iPhone" + _code });
			let _view = new ItemInfoView({model:_item});
			_view.render().el;
			*/
		}
	});

	//表示エリアのView
	var ItemInfoView = Mn.ItemView.extend({

		//ビューで登録できるイベントはelの子要素に限られるから必ずelは指定する。
		el: '#result-area',
		model: item,

		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
		},
		bindings: {
			//selecter : modelのメンバ
			"#codeId": "code"
		},
		//template: '#item-template', //Marionette Code.
		template: _.template($('#item-template').html()),
		
		render: function () {
			console.debug('ItemInfoView render stickit,underscoreの併用');
			//templateにunderscore.jsのbindingを使用。
			var template = this.template( this.model.toJSON() );
			this.$el.html(template);
			//codeのみstickitのbindingを使用。
			this.stickit();
			return this;
		}
	});

	/** Marionetteを使用した場合
	var ItemInfoView = Mn.ItemView.extend({

		//ビューで登録できるイベントはelの子要素に限られるから必ずelは指定する。
		el: '#result-area',
		model: item,
		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
		},

		template: '#item-template' //Marionette Code.

		/** definition backbone only.
		template: _.template( $('#item-template').html() ),
		render: function () {
			console.debug('ItemInfoView render');
			
			var template = this.template( this.model.toJSON() );
			this.$el.html(template);
			return this;
		}
	});
	**/
    
    	//表示エリアのView
	var DateInfoView = Mn.ItemView.extend({

		//ビューで登録できるイベントはelの子要素に限られるから必ずelは指定する。
		el: '#dateArea',
        yearMonthMap : {},
        monthDayMap : {},
    	events: {
		},
		initialize: function () {
			console.debug('dateInfoView initialize start');
            
            this.monthDayMap = new Map();
            
            let toDay = moment();
            //最終日を取得
            let lastDay = moment().add(90, 'd');
            //当月(Accepts numbers from 0 to 11.)
            let currentMonth = moment().month();
            //最終月(Accepts numbers from 0 to 11.)
            let lastMonth = moment(lastDay).month();
            
            console.log('currentMonth: ' + currentMonth + 1 
                            + '月- lastMonth: ' + lastMonth + 1 + '月' + (typeof lastMonth));
            
            this.yearMonthMap = this.getYearMonthMap(toDay,lastMonth);
            
            console.log(this.yearMonthMap);
            
			console.debug('dateInfoView initialize end');
		},
        getYearMonthMap : function(toDay,lastMonth) {
            
            let yearMonthMap = new Map();
            
            //90日分の年と月のMapを作成する。（Method化可能）
            let countDate = toDay;
            let countMonth = 0;//= moment(countDate).month();
            
            while(lastMonth != countMonth) {
                
                //年を取得
                let year = moment(countDate).year();
                countMonth = moment(countDate).month();
            
                console.log(year + '年 ' + (countMonth + 1) + '月' );
                
                //Mapに設定
                yearMonthMap.set(countMonth + 1, year);
                console.debug('cuuntMonth:' + countMonth);
                console.debug('countDate:' + moment(countDate).format('YYYY/MM/DD'));
                
                //１ヶ後の日付を取得
                countDate = moment(countDate).add(1, 'M');
            }
            return yearMonthMap;
        }
	});
    
	new ItemInputView({});
	new ItemInfoView();
    new DateInfoView();
    
})();
