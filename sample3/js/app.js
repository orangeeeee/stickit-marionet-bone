(function () {

	var Item = Backbone.Model.extend({
		//見作成
		defaults: {
			code: "code",
			name: "name"
		}
	});
	var item = new Item();

	//入力エリアのView
	var ItemInputView = Backbone.View.extend({
		//ビューで登録できるイベントはelの子要素に限られるから必ずelは指定する。
		el: "#input-item-code-area",

		events: {
			'click #updateButton': 'updateItemInfo'
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
	var TaskView = Mn.ItemView.extend({
        tagName: 'li',
        events : {"click .command" : "test"},
        test:function() {alert('test');},
        template: '#task-template'
    });
	//表示エリアのView
	var ItemInfoView = Mn.ItemView.extend({
		
		//ビューで登録できるイベントはelの子要素に限られるから必ずelは指定する。
		el: '#result-area',
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
		**/
	});
	new ItemInputView({});
	new ItemInfoView({model: item});
})();
