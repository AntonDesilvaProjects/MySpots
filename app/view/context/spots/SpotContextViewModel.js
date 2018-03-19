Ext.define('MySpots.view.context.spots.SpotContextViewModel',{
	extend : 'Ext.app.ViewModel',
	requires : [
	],
	alias : 'viewmodel.spotContextViewModel',
	data : {
		currentMarker : undefined, //convenience reference to the currently selected marker
		userSpotInfo : {}
	}
});