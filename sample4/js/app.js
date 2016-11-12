(function () {

	var Office = Backbone.Model.extend({
		
        //継承関係にある場合は、returnで返すようにする。
        defaults :function() {
        return {
            code: "code",
			name: "name"
            }
        }
	});//end:office model
	
	 var MainLayoutView = Mn.LayoutView.extend({
		 el: "#office-setting-area",
		 events: {
			'click #updateButton': 'updateItemInfo'
		 },
		updateItemInfo: function () {
			console.debug('start updateItemInfo');
			alert('update');
		}
	 });
	
	
	var ConditionAreaView = Mn.ItemView.extend({
		
	});
	
})();
