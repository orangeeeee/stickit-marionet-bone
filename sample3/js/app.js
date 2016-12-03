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
    var DateModel = Backbone.Model.extend({

		//継承関係にある場合は、
		defaults: function () {
			return {
				year: "2016",
				month: "1",
                day : "22"
			}
		}
	});
	var item = new Item();
    var dateModel = new DateModel;

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
		ui: {
			monthSelect: "#select_month",
            daySelect : "#select_day"
		},
        yearMonthMap : {},
        monthDayMap : {},
        monthOptions : "",
        model : dateModel,
    	events: {
            'change @ui.monthSelect': 'reRenderDaySelect'
		},
		initialize: function () {
                        
            //プルダウンの要素を作成
            this.setSelectOptions();
            //各プルダウンの表示
            this.renderDateSelect();
		},
        renderDateSelect : function() {
            
            //日付の<option>を作成
            $(this.ui.monthSelect).html(this.monthOptions);
            $(this.ui.monthSelect).val(this.model.get('month'));
            //親画面から渡された日付に合わせて設定する。
            $(this.ui.daySelect).html(this.monthDayMap.get(this.model.get('month')));
            $(this.ui.daySelect).val(this.model.get('day'));
            //日付をselectedにする処理を入れる。
            //日付が範囲外の場合は初期値を設定する。(いらないかも)
//            moment('2010-10-20').isBetween('2010-10-19', '2010-10-25');
            
        },
        reRenderDaySelect : function() {
            let selectVal =  $(this.ui.monthSelect).val();
            $(this.ui.daySelect).html(this.monthDayMap.get(selectVal));
        },
        //create map of key:month,value:year
        setSelectOptions : function() {
            
            let _yearMonthMap = new Map();
            let _monthDayMap = new Map();
            //Monthのselectのoption作成
            let _monthOptions = "";
            
            //最終月(Accepts numbers from 0 to 11.)
            let lastMonth = moment().add(90, 'd').month();
        
            let countMonth = 0;
            let countDate = moment();
            
            while(lastMonth != countMonth) {
                
                //年を取得
                let _year = moment(countDate).year();
                let _month;
                //最新日付でcurrentMonth
                countMonth = moment(countDate).month();
                //key用
                _month = countMonth + 1;
                //Mapに設定
                _yearMonthMap.set(_month, _year);
                //月のプルダウン作成
                _monthOptions += this.createOption(_month);
                //日のプルダウン作成
                dayOption = this.createDayOfMonth(_year,countMonth);
                _monthDayMap.set(_month.toString(), dayOption);
                //１ヶ後の日付を取得
                countDate = moment(countDate).add(1, 'M');
            }
            this.yearMonthMap = _yearMonthMap;
            this.monthOptions = _monthOptions;
            this.monthDayMap = _monthDayMap;
        },
        createDayOfMonth: function (year, month) {

            let _dayOption = "";
            
            // 月の最終日を取得 
            let toMonthEndDay = moment([year, month, 1]).daysInMonth();

            for (let i = 0; i < toMonthEndDay; i++) {
                _dayOption += this.createOption(i + 1);
            }
            return _dayOption;
        },
        createOption : function(str) {
            return '<option value="' + str + '" >' 
                + this.lZeroPad2Len(str); 
                + '</option>';
        },
        lZeroPad2Len : function (number) {
            let str = number.toString();
            return str.length < 2 ? '0' + str : str;
        }
	});
    
	new ItemInputView({});
	new ItemInfoView();
    new DateInfoView();
    
})();
