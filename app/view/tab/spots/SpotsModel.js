Ext.define('MySpots.view.tab.spots.SpotsModel', {
	extend : 'Ext.app.ViewModel',
	alias : 'viewmodel.spotsModel',
	requires : [
		'MySpots.model.UserSpot'
	],
	data : {

	},
	stores : {
		userSpots : {
			model : 'MySpots.model.UserSpot',
			proxy : {
				type : 'ajax',
				url : '/static_data/userSpots.json',
				extraParams : {
					userId : 'v8ksjd63'
				},
				reader : {
					type : 'json',
					rootProperty : 'data'
				}
			},
			listeners : {
				load : 'onUserSpotsStoreLoad'
			},
			autoLoad : true
		}
	}
});

//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.7022802,-73.8215184&radius=1000&type=bus_station&key=AIzaSyAKCE6FKbwaROHan7GB4KeOe7jCUqTZoeI