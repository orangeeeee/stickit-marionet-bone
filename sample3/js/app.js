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
				year: "2017",
				month: "01",
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
			monthSelect: ".select_month",
            daySelect : ".select_day",
            fromMonthSelect: "#from_select_month",
            fromDaySelect : "#from_select_day",
            toMonthSelect: "#to_select_month",
            toDaySelect : "#to_select_day"
            
		},
        monthYearMap : {},
        monthDayMap : {},
        monthOptions : "",
        model : dateModel,
    	events: {
            'change @ui.fromMonthSelect': 'reRenderFromMonthSelect',
            'change @ui.toMonthSelect': 'reRenderToMonthSelect'
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
        reRenderFromMonthSelect : function() {
            let selectVal =  $(this.ui.fromMonthSelect).val();
            $(this.ui.fromDaySelect).html(this.monthDayMap.get(selectVal));
            // Toの日付が変更したFromよりも過去の場合は、ToとFromを同じ日付に変更する。
            if(this.checkPastDate()) {

                //日付の<option>を作成
                $(this.ui.toMonthSelect).val($(this.ui.fromMonthSelect).val());
                $(this.ui.toDaySelect).val($(this.ui.fromDaySelect).val());
            }
        },
        checkPastDate : function() {
            let fromMonth = $(this.ui.fromMonthSelect).val();
            let fromYear = Number(this.monthYearMap.get(fromMonth));
            let fromDay = Number($(this.ui.fromDaySelect).val());
            let fromDate = moment([fromYear, Number(fromMonth)-1,fromDay]);
            
            let toMonth = $(this.ui.toMonthSelect).val();
            let toYear = Number(this.monthYearMap.get(toMonth));
            let toDay = Number($(this.ui.toDaySelect).val());
            let toDate = moment([toYear, Number(toMonth)-1,toDay]);
            
            return toDate.isBefore(fromDate);
        },
        reRenderToMonthSelect : function() {
            let selectVal =  $(this.ui.toMonthSelect).val();
            $(this.ui.toDaySelect).html(this.monthDayMap.get(selectVal));
            
        },
        //create map of key:month,value:year
        setSelectOptions : function() {
            
            let _monthYearMap = new Map();
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
                //Map[key:month,value:year]に設定['01',2017]
                _monthYearMap.set(this.lZeroPad2Len(_month), _year);
                //月のプルダウン作成
                _monthOptions += this.createOption(_month);
                //日のプルダウン作成
                dayOption = this.createDayOfMonth(_year, countMonth);
                _monthDayMap.set(this.lZeroPad2Len(_month), dayOption);
                //１ヶ後の日付を取得
                countDate = moment(countDate).add(1, 'M');
            }
            this.monthYearMap = _monthYearMap;
            this.monthOptions = _monthOptions;
            this.monthDayMap = _monthDayMap;
        },
        createDayOfMonth: function (year, month) {

            let _dayOption = "";
            
            // 月の最終日を取得 
            let toMonthEndDay = moment([year, month, 1]).daysInMonth();
            //当月の場合は、当日をiに設定する必要がある。
            let firstCount=0;
            
            if(moment().month() === month) {
                firstCount = moment().date() - 1;    
            }

            for (let i=firstCount; i < toMonthEndDay; i++) {
                _dayOption += this.createOption(i + 1);
            }
            return _dayOption;
        },
        createOption : function(str) {
            let lZeroPad2LenStr = this.lZeroPad2Len(str);
            return '<option value="' + lZeroPad2LenStr + '" >' 
                + lZeroPad2LenStr 
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
