(function () {

	let Team = Backbone.Model.extend({
		//継承関係にある場合は、returnで返すようにする。
		defaults() {
			return {
				code: "code",
				name: "name"
			}
		}
	}); //end:office model
	let Condition = Backbone.Model.extend({
		//継承関係にある場合は、returnで返すようにする。
		defaults() {
			return {
				color: "red",
				metalLevel: "1",
				weapon: "gun"
			}
		}
	}); //end:office model

	let team = new Team();
	let condition = new Condition();

	let MainLayoutView = Mn.LayoutView.extend({
		regions: {
			main: "#main",
			teamAreaView: "#team-setting-area",
			conditionAreaView: "#condition-setting-area"
		},


		initialize: function () {
			this.getRegion('teamAreaView').attachView(new TeamAreaView({}));
		},

	});


	//	let mainView = new MainLayoutView();
	//	mainView.reigions.teamAreaView.attachView(new TeamAreaView({
	//	}));
	//	mainView.region.attachView();

	var TeamAreaView = Mn.ItemView.extend({
		el: "#team-setting-area",
		ui: {
			updBtn: "#updateButton"
		},
		events: {
			'click @ui.updBtn': 'updateItemInfo'
		},
		model: team,
		updateItemInfo: function () {
			console.debug('start updateItemInfo');
			alert('update');
		},



	});

	var ConditionAreaView = Mn.ItemView.extend({
		el: "#condition-setting-area",
		model: condition,
		events: {
			'click #conditonUpdButton': 'updateItemInfo'
		},
		updateItemInfo: function () {
			console.debug('start updateItemInfo');
			alert('update condition');
		}
	});


	new ConditionAreaView();
	new TeamAreaView();
	new MainLayoutView();
})();
